var slideIndex = 1;
var LoginRegisto,fechar;

window.onload = async function () {
    LoginRegisto = document.getElementById("LoginRegisto");
    fechar = document.getElementById("fechar");
    
    showSlides();

}

function showSlides() {

    if (slideIndex > 4) slideIndex = 1;
    document.getElementById("carro").src = "./imagens/car"+slideIndex+".png";
    slideIndex++;
    setTimeout(showSlides, 15000); // Change image every 15 seconds

}





function CarregarRegisto() {
    //mete as lables
    let aux = "<div class='inputBox' id='inputBox'><div class='lableInput'><label class='label'>Nome Completo:</label><label class='label'>Palavra-Chave:</label><label class='label'>Email:</label><label class='label'>Data de Nascimento:</label> <label class='label'>Numero Telemovel:</label><label class='label'>NIF:</label></div></div>";
    //mete as os inputs
    aux += "<div class='boxInput'><input type='text' placeholder='Escreva o seu nome' class='input' id='name'><input type='password' placeholder='A sua senha' class='input' id='pw'><input type='text'  placeholder='Escreva o seu email' class='input' id='email'><input id='date' class='input' type='date' ><input type='text' placeholder='Escreva o seu telemovel' class='input' id='telemovel'><input type='text' placeholder='Escreva o seu nif' class='input' id='nif'></div>";
    //mete os butttons
    aux += "<div class='btnBox'><button class='btnVL' onclick='CarregarLogin()'>Voltar ao Login</button><button class='btnCC' id='btn' onclick='Registo()'>Criar conta</button></div>";
    



    boxChild.style.width = "700px";
    LoginRegisto.style.top = "30%";
    LoginRegisto.style.left = "35%";

    document.getElementById("boxChild").innerHTML = aux;



}

function CarregarLogin() {
    //mete as os inputs
    let aux = "<div class='inputBox' id='inputBox'><input type='text' placeholder='Escreva o seu email' class='input' id='email'><input type='password' placeholder='A sua senha' class='input' style='margin-top: 10%;' id='pw'> </div>";
    //mete os butttons
    aux += "<div class='btnBox'><button class='btn' onclick='Login()'>Login</button><button class='btn' onclick='CarregarRegisto()'>Registo</button> <class='btnBox'> <button class='newPasswordBTN' onclick='NewPassword()'>Esquecer da password</button></div>";


    document.getElementById("boxChild").innerHTML = aux;
    LoginRegisto.style.left = "40%";
    LoginRegisto.style.top = "35%";
    boxChild.style.width = "500px";


}

function teste() {
    CarregarLogin();

    LoginRegisto.style.display = "flex";
    indexInfo.style.filter = "blur(8px)";
    fechar.style.display = "flex";
}


function Fechar(){
    LoginRegisto.style.display = "none";
    indexInfo.style.filter = "none";
    fechar.style.display = "none";
}







async function Registo() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
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
            document.getElementById("btn").style.cursor = "wait";
            let utilizador = await $.ajax({
                url: "/api/utilizadores/register?email=" + email + "&password=" + pw,
                method: "post",
                data: JSON.stringify(info),
                contentType: "application/json",
                dataType: "json"
            });
            sessionStorage.setItem("userID", JSON.stringify(utilizador.data.insertId));
            var token;
            if (utilizador.success == 1) {

                token = prompt("Coloque o código enviado para o seu email:");

                let info = {
                    email: email,
                    password: pw,
                    token: token
                }

                let verify = await $.ajax({
                    url: "/api/utilizadores/verify",
                    method: "put",
                    data: JSON.stringify(info),
                    contentType: "application/json",
                    dataType: "json"
                });

                if (verify.success === 1) {

                    alert("Conta verificada com sucesso!");
                    window.location = "cuvp.html";
                }

            } else {
                alert(utilizador.msg);
            }

        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    }
    else {
        alert("Escreve um email/password");
    }

}


async function Login() {

    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;

    if (email != "" && pw != "") { //Verificar se o input do email não está vazio
        try {

            let utilizador = await $.ajax({
                url: "/api/utilizadores/login?email=" + email + "&password=" + pw,
                method: "get",
                dataType: "json"
            });

            if (utilizador.success == 1) {
                sessionStorage.setItem("user", JSON.stringify(utilizador.data));
                window.location = "account.html";
            }
            else {
                alert(utilizador.msg);
            }

        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    }
    else {
        alert("Escreve um email/password");
    }

}



