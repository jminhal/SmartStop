let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID= user.user_id;
var moderador= user.user_moderador;



window.onload = async function () {
  document.getElementById("backArrow").href = "account.html";
  carregarDivConfPassword();




}

function logout() {
  sessionStorage.clear();
  window.location = "index.html";
}

/*
function Remover(id){
    let userON= false;
    EditarInformaçãoConta(id,userON);


}*/

function Atualizar(){
    //let userON= true;
    EditarInformaçãoConta();

}




//função que irá editar a informação do  para a base de dados 
async function EditarInformaçãoConta(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email");
    let pw = document.getElementById("pw").value;
    let data = document.getElementById("date").value;
    let nif = document.getElementById("nif").value;
    let telemovel = document.getElementById("telemovel").value;

    if (email != "" && pw != "" && data != "" && nif != "" && telemovel != "" && name != "") { //Verificar se o input do email não está vazio

        try {

            let info = {
                fullname: name,
                email: email,
                password: pw,
                birthday: data,
                mobile: telemovel,
                nif: nif
            }

            let user = await $.ajax({
              url: "/api/utilizadores/"+utilizadorID+"/editar",
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
        alert("Preenche todos os campos");
    }
    alert("Dados alterados com sucesso!");
    window.location = "account.html";


}



function carregarDivConfPassword(){
      //mete as lables
      let aux = "<div class='inputBox' id='inputBox'><label class='label'>Palavra-Chave:</label></div>";
      //mete as os inputs
      aux += "<div class='boxInput'><input type='password' placeholder='A sua senha' class='input' id='confpw'></div>";
      //mete os butttons
      aux += "<div class='btnBox'><button class='btn' onclick='ConfirmarPassword()'>Confirmar senha</button></div>";
  
      boxChild.style.width = "700px";
      confirmPassword.style.display = "flex";
  
      document.getElementById("boxChild").innerHTML = aux;
}


function ConfirmarPassword(){
  let password2= document.getElementById("confpw").value;
  CarregarInfo(password2);
}


async function CarregarInfo(password2){
    //let password2 = prompt("Confirmar password:");
    console.log(password2)

    if (password2 != null) {

      try {
  
        let utilizador = await $.ajax({
            url: "/api/utilizadores/login?email=" + user.user_email + "&password=" + password2,
            method: "get",
            dataType: "json"
        });
  
        if (utilizador.success == 1) {
          document.getElementById("name").value = user.user_fullname;
          document.getElementById("email").innerHTML = user.user_email;
          document.getElementById("pw").value = "******";
          document.getElementById("date").value = user.user_birthday;
          document.getElementById("nif").value = user.user_nif;
          document.getElementById("telemovel").value = user.user_mobile;

          lableInput.style.display = "flex";
          btnsBox.style.display = "flex";
          btnBox.style.display = "none";
          boxLabel.style.display = "flex";
          boxChild.style.display = "none";
  
        }
  
        else {
          alert("Erro na password");
          window.location = "account.html";
        }
  
      } catch (err) {
          console.log(err);
          if (err.status == 404) {
              alert(err.responseJSON.msg);
          }
      }
  
    } else {
      alert("Erro na password");
      window.location = "account.html";
    }
}