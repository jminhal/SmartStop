let user = JSON.parse(sessionStorage.getItem("user"));
let userID = user.user_id;
var veiculos, tiposCategoria = [];



window.onload = async function () {
    document.getElementById("backArrow").href = "account.html";
    let aux = "";
    aux += "<option value= 'void' >  </option>";

    try {
        veiculos = await $.ajax({

            url: "/api/utilizadores/" + userID + "/veiculos",
            method: "get",
            dataType: "json"
        });
        for (let i in veiculos) {

            aux += "<option value='" + i + "'>" + veiculos[i].vehicle_model + " - " + veiculos[i].vehicle_brand + "</option>";


        }


    } catch (err) {
        console.log(err);
        if (err.status == 404) {
            alert(err.responseJSON.msg);
        }
    }
    aux += "<option value= 'add' > Adicionar veiculo </option>";
    document.getElementById("ModeloMarca").innerHTML = aux;


    try {
        let tipos = await $.ajax({
            url: "/api/veiculos/tipoVeiculo",
            method: "get",
            dataType: "json"
        });
        let aux = "";
        for (let tipo of tipos) {
            tiposCategoria.push(tipo);
            aux += "<option value='" + tipo.vehicleCategory_id + "'>" + tipo.category + "</option>";
        }
        document.getElementById("vCategoria").innerHTML = aux;

    } catch (err) {
        console.log(err);
        if (err.status == 404) {
            alert(err.responseJSON.msg);
        }
    }



}

function Aparecer() {
    var ModeloMarca = document.getElementById("ModeloMarca");
    var selectedValue = ModeloMarca.options[ModeloMarca.selectedIndex].value;

    if (selectedValue == 'add') {
        document.getElementById("lableInput").style.display = "flex";

        document.getElementById("vMarca").value = "";
        document.getElementById("vModelo").value = "";
        document.getElementById("vData").value = "";
        document.getElementById("vMatricula").value = "";
        document.getElementById("vCategoria").value = "";


        document.getElementById("btnBox").innerHTML = '<button class="btn" onclick="Adicionar()">Adicionar</button>';
        document.getElementById("checkBoxLable").innerHTML = "Deseja tornar este veiculo como principal?";
        document.getElementById("checkBoxInput").innerHTML = '<input  id="selectedVeiculo" value="selectedVeiculo" type="checkbox">';


    }
    else if (selectedValue == 'void') {
        document.getElementById("lableInput").style.display = "none";
        document.getElementById("btnBox").innerHTML = "";

    }


    else {
        document.getElementById("lableInput").style.display = "flex";
        document.getElementById("vMarca").value = veiculos[selectedValue].vehicle_model;
        document.getElementById("vModelo").value = veiculos[selectedValue].vehicle_brand;
        document.getElementById("vData").value = value = veiculos[selectedValue].vehicle_registration_date;
        document.getElementById("vMatricula").value = value = veiculos[selectedValue].vehicle_registration;
        document.getElementById("vCategoria").value = veiculos[selectedValue].vehicle_category;
        document.getElementById("btnBox").innerHTML = '<button class="btn" onclick="Remover(' + veiculos[selectedValue].vehicle_id + ',' + veiculos[selectedValue].vehicle_selected + ')">Remover</button><button class="btn" onclick="Atualizar(' + veiculos[selectedValue].vehicle_id + ')">Atualizar</button>';
        if (veiculos[selectedValue].vehicle_selected == false) {
            document.getElementById("checkBoxLable").innerHTML = "Deseja tornar este veiculo como principal?";
            document.getElementById("checkBoxInput").innerHTML = '<input  id="selectedVeiculo" value="selectedVeiculo" type="checkbox">';

        }
        else {
            document.getElementById("checkBoxLable").innerHTML = "";
            document.getElementById("checkBoxInput").innerHTML = "";
        }
    }
}






async function Adicionar() {
    let vMarca = document.getElementById("vMarca").value;
    let vModelo = document.getElementById("vModelo").value;
    let vData = document.getElementById("vData").value;
    let vMatricula = document.getElementById("vMatricula").value;
    let vCategoria = document.getElementById("vCategoria").value;
    let selectedVeiculo = document.getElementById("selectedVeiculo");

    if (vMarca != "" && vModelo != "" && vData != "" && vMatricula != "" && vCategoria != "") {
        try {
            let info = {
                vModel: vModelo,
                vBrand: vMarca,
                vRegistration: vMatricula,
                vDate: vData,
                vCategory: vCategoria,
                vSelected: selectedVeiculo.checked,
                vUserID: userID
            }
            let veiculo = await $.ajax({
                url: "/api/utilizadores/" + userID + "/veiculos/novo",
                method: "post",
                data: JSON.stringify(info),
                contentType: "application/json",
                dataType: "json"
            });

        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    }
    else {
        alert("Falta preencher campos do veiculo");
    }

    alert("Veiculo adicionado com sucesso!")
    window.location = "account.html";


}



function Remover(id, selecionado) {
    let veiculoON = false;
    EditarVeiculo(id, veiculoON, selecionado);


}

function Atualizar(id) {
    let veiculoON = true;
    let selectedVeiculo = document.getElementById("selectedVeiculo")?.checked;// se não tiver nada ele dá undefined
    EditarVeiculo(id, veiculoON, selectedVeiculo);

}




async function EditarVeiculo(id, veiculoON, selecionado) {

    let veiculoSelecionado;
    let vMarca = document.getElementById("vMarca").value;
    let vModelo = document.getElementById("vModelo").value;
    let vData = document.getElementById("vData").value;
    let vMatricula = document.getElementById("vMatricula").value;
    let vCategoria = document.getElementById("vCategoria").value;

    if (selecionado) {




        veiculoSelecionado = true;
        TirarSelecionado();
    }
    else if(selecionado==false) {


        console.log(selecionado)
        veiculoSelecionado = false;
    }
    else if(typeof selecionado === 'undefined'){


        veiculoSelecionado = true;
    }
    if (vMarca != "" && vModelo != "" && vData != "" && vMatricula != "" && vCategoria != "") {
        try {
            let info = {
                vModel: vModelo,
                vBrand: vMarca,
                vRegistration: vMatricula,
                vDate: vData,
                vCategory: vCategoria,
                vSelected: veiculoSelecionado,
                vON: veiculoON,
                vUserID: userID


            }

            console.log(info)
            let vehicle = await $.ajax({
                url: "/api/veiculos/" + id + "/editar",
                method: "put",
                data: JSON.stringify(info),
                contentType: "application/json",
                dataType: "json"
            });


        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    }
    else {
        if (veiculoON) {
            alert("Falta preencher campos do Veicuo");
        }
        else {
            alert("Por favor volte a selecionar o veiculo que deseja eleminar")
        }
    }
    if (veiculoON) {
        alert("Informações do veiculo alteradas com sucesso!");
    }
    else {
        alert("veiculo removido com sucesso!")
    }

    window.location = "account.html";

}








async function TirarSelecionado() {

    //vai apanhar o veiculo selecionado
    try {
        let vSelecionado = await $.ajax({

            url: "/api/veiculos/"+userID+"/selecionado",
            method: "get",
            dataType: "json"
        });

            console.log("tirar: " + vSelecionado.vehicle_id);
            //vai remover o veiculo selecionado
            try {
                let info = {
                    vModel: vSelecionado.vehicle_model,
                    vBrand: vSelecionado.vehicle_brand,
                    vRegistration: vSelecionado.vehicle_registration,
                    vDate: vSelecionado.vehicle_registration_date,
                    vCategory: vSelecionado.vehicle_category,
                    vSelected: false,
                    vON: vSelecionado.vehicle_ON,
                    vUserID: userID
                }
                //console.log(info)
                let vehicle = await $.ajax({
                    url: "/api/veiculos/"+vSelecionado.vehicle_id+"/editar",
                    method: "put",
                    data: JSON.stringify(info),
                    contentType: "application/json",
                    dataType: "json"
                });
    
            } catch (err) {
                console.log(err);
                if (err.status == 404) {
                    alert(err.responseJSON.msg);
                }
            }


    } catch (err) {
        console.log(err);
        if (err.status == 404) {
            alert(err.responseJSON.msg);
        }
    }
}