let user = JSON.parse(sessionStorage.getItem("user"));
let parque = JSON.parse(sessionStorage.getItem("parque"));
var utilizadorID = user.user_id;
var moderador = user.user_moderador;


let editarApagarParque = JSON.parse(sessionStorage.getItem("editarApagarParque"));
var tiposCategoria = [];





window.onload = async function () {

     //verificar se é moderador ou utilizador
    if (moderador == 0) {
        alert("Não tem premissões para aceder a esta pagina!");
        window.location = "prarques.html";

    }
    if (moderador == 1) {
        let userDropBox = "<a href='account.html' >Conta</a>" +
            "<a href='parques.html' >Parques</a>" +
            "<a href='#' class='selected' >Adicionar Parque</a>" +
            "<a href='dashboard.html' >Dashboard</a>"+
            "<a href='#' onclick='logout()'>Logout</a>";
        document.getElementById("userDropBox").innerHTML = userDropBox;

        if (editarApagarParque) {
            document.getElementById("topBoxTitulo").innerHTML = "Editar Parque";
            document.getElementById("nome").value = parque.park_name;
            document.getElementById("email").value = parque.park_email;
            document.getElementById("telemovel").value = parque.park_contact;
            document.getElementById("horaInicio").value = parque.park_hour_open;
            document.getElementById("horaFim").value = parque.park_hour_close;
            document.getElementById("localizacao").value = parque.park_localization;
            document.getElementById("horaPreco").value = parque.park_price_hour;
            document.getElementById("maxPessoas").value = parque.park_spots;

            document.getElementById("vCategoria").value = parque.park_types;

            document.getElementById("CriarParque").innerHTML = "";
            document.getElementById("CriarParque").innerHTML = "<button type='button' id='btnInfo' onclick='Remover("+parque.park_id+")' >Remover</button> <button type='button' id='btnInfo' onclick='Atualizar("+parque.park_id+")' >Atualizar</button> "



        }
        else {
            document.getElementById("topBoxTitulo").innerHTML = "Criar Parque";

        }


    }


    try {
        let tipos = await $.ajax({
            url: "/api/veiculos/tipoVeiculo",
            method: "get",
            dataType: "json"
        });
        let aux = "";
        for (let tipo of tipos) {
            tiposCategoria.push(tipo)
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



async function criarParque() {
    console.log("Criar acao")
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telemovel = document.getElementById("telemovel").value;
    let horaInicio = document.getElementById("horaInicio").value;
    let horaFim = document.getElementById("horaFim").value;
    let localizacao = document.getElementById("localizacao").value;
    let vCategoria = document.getElementById("vCategoria").value;
    let maxPessoas = document.getElementById("maxPessoas").value;
    let horaPreco = document.getElementById("horaPreco").value;

    if (nome != "" && email != "" && telemovel != "" && horaInicio != "" && horaFim != "" && localizacao != "" && vCategoria != "" && maxPessoas != "" && horaPreco != "") {
        try {
            //Usa a API do heroapi para saber a latitude, longitude e cidade de uma determinada rua
            await $.ajax({
                url: 'https://geocode.search.hereapi.com/v1/geocode?q=' + localizacao + '&apiKey=DOCDuZ1HR5WGPWZcSqcVS5YftYu2UVsQ1ILVd-uchJA',
            }).done(function (info) {//quando vai buscar as coisas ao URL
                //verificar se o array da localização está vazio

                if (info.items.length > 0) {
                    let infoLocalizacao = info.items[0];
                    let data = {
                        parkName: nome,
                        parkSports: maxPessoas,
                        parkTypes: vCategoria,
                        parkLatitude: infoLocalizacao.position.lat,
                        parkLongitude: infoLocalizacao.position.lng,
                        parkLocalizacao: infoLocalizacao.address.city,
                        parkOpenHour: horaInicio,
                        parkCloseHour: horaFim,
                        parkContact: telemovel,
                        parkEmail: email,
                        parkPrice: horaPreco,
                        parkUserCreate: utilizadorID
                    }

                    let result = $.ajax({
                        url: "/api/utilizadores/"+utilizadorID+"/parque/novo",
                        method: "post",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        dataType: "json"
                    });
                    alert("Parque adicionado com sucesso!!");
                    window.location = "parques.html";


                } else {
                    alert("Localização inválida!")
                }

            });

        }
        catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }
    }
    else {
        alert("Falta preencher campos do parque!");
    }

}







async function EditarParque(id, park_ON) {
    console.log("editar acao")

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telemovel = document.getElementById("telemovel").value;
    let horaInicio = document.getElementById("horaInicio").value;
    let horaFim = document.getElementById("horaFim").value;
    let localizacao = document.getElementById("localizacao").value;
    let vCategoria = document.getElementById("vCategoria").value;
    let maxPessoas = document.getElementById("maxPessoas").value;
    let horaPreco = document.getElementById("horaPreco").value;



    if (nome != "" && email != "" && telemovel != "" && horaInicio != "" && horaFim != "" && localizacao != "" && vCategoria != "" && maxPessoas != "" && horaPreco != "") {

        try {
            //Usa a API do heroapi para saber a latitude, longitude e cidade de uma determinada rua
            await $.ajax({
                url: 'https://geocode.search.hereapi.com/v1/geocode?q=' + localizacao + '&apiKey=DOCDuZ1HR5WGPWZcSqcVS5YftYu2UVsQ1ILVd-uchJA',
            }).done(function (info) {//quando vai buscar as coisas ao URL
                //verificar se o array da localização está vazio

                if (info.items.length > 0) {
                    console.log(park_ON)
                    console.log(id)
                    let infoLocalizacao = info.items[0];
                    let data = {
                        parkName: nome,
                        parkSports: maxPessoas,
                        parkTypes: vCategoria,
                        parkLatitude: infoLocalizacao.position.lat,
                        parkLongitude: infoLocalizacao.position.lng,
                        parkLocalizacao: infoLocalizacao.address.city,
                        parkOpenHour: horaInicio,
                        parkCloseHour: horaFim,
                        parkContact: telemovel,
                        parkEmail: email,
                        parkPrice: horaPreco,
                        parkUserCreate: utilizadorID,
                        parkON: park_ON,
                        parkID: id
                    }
                    console.log(data)

                    let result = $.ajax({
                        url: "/api/parques/" + utilizadorID + "/editar",
                        method: "put",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        dataType: "json"
                    });
                    var editarApagarParque=false;
                    sessionStorage.setItem("editarApagarParque", JSON.stringify(editarApagarParque));
                    if (park_ON) {
                        alert("Informações do parque alteradas com sucesso!");
                    }
                    else {
                        alert("Parque removido com sucesso!")
                    }
                    window.location = "parques.html";


                }
                else {
                    alert("Localização inválida!")
                }

            });

        }
        catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }
    }
    else {
        alert("Falta preencher campos do parque!");
    }



}



// função para dar logout

function logout() {
    sessionStorage.clear();
    window.location = "index.html";
  }
  

function Remover(id) {
    let park_ON = false;
    EditarParque(id, park_ON);


}

function Atualizar(id) {

    let park_ON = true;
    EditarParque(id, park_ON);

}


