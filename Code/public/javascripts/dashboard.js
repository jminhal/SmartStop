let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID= user.user_id;
var moderador= user.user_moderador;
var editarApagarParque=false;
sessionStorage.setItem("editarApagarParque", JSON.stringify(editarApagarParque));


window.onload = async function () {
    let tipoConta,Estado;
    
    //verificar se é moderador ou utilizador
    if (moderador == 0) {
        alert("Não tem premissões para aceder a esta pagina!");
        window.location = "prarques.html";

    }
      if(moderador==1){
        let userDropBox= "<a href='account.html' class='selected'>Conta</a>"+
        "<a href='parques.html' >Parques</a>"+
        "<a href='parque.html'>Adicionar Parque</a>"+
        "<a href='#' class='selected' >Dashboard</a>"+
        "<a onclick='logout()'>Logout</a>";
        document.getElementById("userDropBox").innerHTML = userDropBox;
    
      }



      let aux = "<table><tr><th>Nome do utilizador</th><th>Email</th><th>Data de nascimento</th><th>Contacto</th><th>NIF</th><th>Estado</th><th>Tipo de Conta</th></tr>";


try {
    users = await $.ajax({

        url: "/api/utilizadores/",
        method: "get",
        dataType: "json"
    });
    for (let i in users) {
        if(users[i].user_moderador){
            tipoConta="<td  style='color: #eed029;'>MODERADOR</td>";
            
        }
        else{
            tipoConta="<td  style='color:  #2D2D2D;'>UTILIZADOR</td>";
        }
        if(users[i].user_active){
            Estado= "<td  style='color: green;'>ATIVO</td>"
            
        }
        else{
            Estado= "<td  style='color: red;'>INATIVO</td>"
 
        }

        aux+="<tr><td>"+users[i].user_fullname+"</td><td>"+users[i].user_email+"</td><td>"+users[i].user_birthday+"</td><td>"+users[i].user_mobile+"</td><td>"+users[i].user_nif+"</td>"+Estado+""+tipoConta+"</tr>";
  

    }
    aux += " </table>";




} catch (err) {
    console.log(err);
    if (err.status == 404) {
        alert(err.responseJSON.msg);
    }
}




    document.getElementById("tabela").innerHTML = aux;

}

// função para dar logout
function logout() {
    sessionStorage.clear();
    window.location = "index.html";
  }
  
