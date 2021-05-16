let userID = JSON.parse(sessionStorage.getItem("userID"));


if (user.user_moderador==0) {
    alert("Não tem premissões para aceder a esta pagina!"); 
    window.location = "prarques.html";
}

window.onload = async function () {

    document.getElementById("userName").innerHTML = user.user_fullname;
    if (moderador == 0) {
      let userDropBox = "<a href='account.html'>Conta</a>" +
        "<a href='parques.html' class='selected' >Parques</a>" +
        "<a href='#' onclick='logout()'>Logout</a>";
      document.getElementById("userDropBox").innerHTML = userDropBox;
  
    }
    if (moderador == 1) {
      let userDropBox = "<a href='#' >Conta</a>" +
        "<a href='parques.html' class='selected'>Parques</a>" +
        "<a href='addparque.html'>Adicionar Parque</a>" +
        "<a href='#' onclick='logout()'>Logout</a>";
      document.getElementById("userDropBox").innerHTML = userDropBox;
  
    }






    try {
        let tipos = await $.ajax({
            url: "/api/veiculos/tipoVeiculo",
            method: "get",
            dataType: "json"
          });
          let aux="";
        for(let tipo of tipos){

            aux += "<option value='"+ tipo.vehicleCategory_id +"'>" + tipo.category + "</option>";
        }
            document.getElementById("vCategoria").innerHTML = aux;
        
        }catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
    }

}



async function criarParque(){
    let nome =    document.getElementById("nome").value;
    let email=    document.getElementById("email").value;
    let telemovel=    document.getElementById("telemovel").value;
    let horaInicio=    document.getElementById("horaInicio").value;
    let horaFim=    document.getElementById("horaFim").value;
    let localizacao=    document.getElementById("localizacao").value;
    let vCategoria=    document.getElementById("vCategoria").value;
    let maxPessoas=    document.getElementById("maxPessoas").value;
    let horaPreco=    document.getElementById("horaPreco").value;

    if(nome != "" && email != "" && telemovel != "" && horaInicio != "" && horaFim != "" && localizacao != "" && vCategoria != "" && maxPessoas != "" && horaPreco != ""){

        try {
            //Usa a API do heroapi para saber a latitude, longitude e cidade de uma determinada rua
            await $.ajax({
                url: 'https://geocode.search.hereapi.com/v1/geocode?q='+localizacao+'&apiKey=DOCDuZ1HR5WGPWZcSqcVS5YftYu2UVsQ1ILVd-uchJA',
            }).done(function(info) {//quando vai buscar as coisas ao URL
                //verificar se o array da localização está vazio
                if (info.items.length > 0) {

                    let infoLocalizacao = info.items[0];
                    let data = {


                        name: nome,
                        sports: maxPessoas,
                        latitude: infoLocalizacao.position.lat,
                        longitude: infoLocalizacao.position.lng,
                        localizacao: infoLocalizacao.address.city,
                        openHour: horaInicio,
                        closeHour: horaFim,
                        contact: telemovel,
                        email: email,
                        vCategoria: vCategoria,
                        price: horaPreco,
                        create_user_id:userID
                    }

                    let result = $.ajax({
                        url: "/api/utilizadores/"+userID+"/parque/novo",
                        method: "post",
                        data: JSON.stringify(data),
                        contentType: "application/json",
                        dataType: "json"
                    });
        
                    alert("Parque adicionado com sucesso!!");
                    window.location = "login.html";

                }
                else {
                    alert("Localização inválida!")
                }

            });

          } 
          catch(err) {
            console.log(err);
          }   
    }
    else {
        alert("Falta preencher campos!");
    }
}


function logout(){
    sessionStorage.clear();
    window.location = "login.html";
  }



