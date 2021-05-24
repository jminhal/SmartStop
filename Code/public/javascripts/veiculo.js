let user = JSON.parse(sessionStorage.getItem("user"));
let userID=user.user_id;
var veiculos;



window.onload = async function () {

    try {
        veiculos = await $.ajax({

            url: "/api/utilizadores/"+userID+"/veiculos",
            method: "get",
            dataType: "json"
          });
          let aux="";
          aux += "<option value= 'void' >  </option>";
        for(let i in veiculos){

            aux += "<option value='"+i+"'>" + veiculos[i].vehicle_model+ " - "+veiculos[i].vehicle_brand+ "</option>";


        }
            aux += "<option value= 'add' > Adicionar veiculo </option>";
            document.getElementById("ModeloMarca").innerHTML= aux;

        
        }catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
    }

}

function Aparecer(){
    var ModeloMarca = document.getElementById("ModeloMarca");
    var selectedValue = ModeloMarca.options[ModeloMarca.selectedIndex].value;

    if(selectedValue=='add'){
        document.getElementById("lableInput").style.display="flex";

        document.getElementById("vMarca").value= "";
        document.getElementById("vModelo").value= "";
        document.getElementById("vData").value= "";
        document.getElementById("vMatricula").value= "";
        document.getElementById("vCategoria").value= "";


        document.getElementById("btnBox").innerHTML='<button class="btn" onclick="Adicionar()">Adicionar</button>';
        document.getElementById("checkBoxLable").innerHTML="Deseja tornar este veiculo como principal?";
        document.getElementById("checkBoxInput").innerHTML= '<input type="checkbox">';


    }
    else if(selectedValue=='void'){
        document.getElementById("lableInput").style.display="none";
        document.getElementById("btnBox").innerHTML="";

    }











    else{
        document.getElementById("lableInput").style.display="flex";


        document.getElementById("vMarca").value= veiculos[selectedValue].vehicle_model;
        document.getElementById("vModelo").value= veiculos[selectedValue].vehicle_brand;
        document.getElementById("vData").value= value=veiculos[selectedValue].vehicle_registration_date;
        document.getElementById("vMatricula").value= value=veiculos[selectedValue].vehicle_registration;
        document.getElementById("vCategoria").value= veiculos[selectedValue].vehicle_category;

        document.getElementById("btnBox").innerHTML='<button class="btn" onclick="Remover()">Remover</button><button class="btn" onclick="Atualizar()">Atualizar</button>';
        if(meios[selectedValue].payment_method_selected==false){
            document.getElementById("checkBoxLable").innerHTML="Deseja tornar este veiculo como principal?";
            document.getElementById("checkBoxInput").innerHTML= '<input  id="selectedCartao" type="checkbox">';

        }
        else{
            document.getElementById("checkBoxLable").innerHTML="";
            document.getElementById("checkBoxInput").innerHTML="";
        }
    } 
}






async function Adicionar(){
    let vMarca=    document.getElementById("vMarca").value;
    let vModelo=    document.getElementById("vModelo").value;
    let vData=    document.getElementById("vData").value;
    let vMatricula=    document.getElementById("vMatricula").value;
    let vCategoria=    document.getElementById("vCategoria").value;

    if(vMarca!="" && vModelo!="" && vData!="" && vMatricula!="" && vCategoria!="" ){
        try {
            let info = {
                vehicleModel: vModelo,
                vehicleBrand: vMarca,
                vehicleRegistration: vMatricula,
                vehicleRegistrationDate: vData,
                vehicleUser:userID,
                vehicleCategory: vCategoria


            }


            let veiculo = await $.ajax({
                url: "/api/utilizadores/"+userID+"/veiculos/novo",
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
        alert("Conta criada com sucesso, podes agora fazer login!");
        window.location = "login.html";

    }
    else {
        alert("Falta preencher campos do meio de pagamento");
    }

}




