let user = JSON.parse(sessionStorage.getItem("user")); 
var utilizadorID= user.user_id;
var moderador= user.user_moderador;
var editarApagarParque=false;
sessionStorage.setItem("editarApagarParque", JSON.stringify(editarApagarParque));



window.onload = async function () {


  //verificar se é moderador ou utilizador
  if(moderador==0){
    let userDropBox= "<a href='#' class='selected'>Conta</a>"+
    "<a href='parques.html' >Parques</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
  if(moderador==1){
    console.log("kaksdkd");
    let userDropBox= "<a href='#' class='selected'>Conta</a>"+
    "<a href='parques.html' >Parques</a>"+
    "<a href='parque.html'>Adicionar Parque</a>"+
    "<a href='dashboard.html' >Dashboard</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
}

// função para dar logout
function logout() {
  sessionStorage.clear();
  window.location = "index.html";
}

// função para carregar a pagina edição dos meios de pagamento
function editarMeioPagamento(){
  
  window.location = "meiopagamento.html";
}


// função para carregar a pagina edição dos veiculos
function editarVeiculo(){
  window.location = "veiculo.html";
}

// função para carregar a pagina de historico do utilizador
function historicoParques(){
  var userHistorico = true;
  sessionStorage.setItem("userHistorico", JSON.stringify(userHistorico));
  window.location = "historico.html";
}


// função para carregar a pagina edição informações de conta
function minhaConta(){
  window.location = "infoaccount.html";
}



