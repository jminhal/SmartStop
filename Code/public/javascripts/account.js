let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID= user.user_id;
var moderador= user.moderador;

window.onload = async function () {
    try {
      let user = await $.ajax({
        url: "/api/utilizadores/"+utilizadorID,
        method: "get",
        dataType: "json"
      });
      document.getElementById("userName").innerHTML=user.username;
      if(moderador==0){
        let userDropBox= "<a href='#' class='selected'>Procurar ações</a>"+
        "<a href='suas_acoes.html' >As suas ações</a>"+
        "<a href='#' onclick='logout()'>Logout</a>";
        document.getElementById("userDropBox").innerHTML = userDropBox;
  
      }
      if(moderador==1){
        let userDropBox= "<a href='#' class='selected'>Procurar ações</a>"+
        "<a href='suas_acoes.html' >As suas ações</a>"+
        "<a href='criar_acoes.html'>Criar Acão</a>"+
        "<a href='#' onclick='logout()'>Logout</a>";
        document.getElementById("userDropBox").innerHTML = userDropBox;
  
      }
    } 
    catch(err) {
      console.log(err);
    }
    
  
  }