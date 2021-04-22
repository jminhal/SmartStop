async function login() {


    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;

    if (email != "" && pw != "") { //Verificar se o input do email não está vazio

        try {
            
            let utilizador = await $.ajax({
                url: "/api/utilizadores?email="+email+"pw="+pw,
                method: "get",
                dataType: "json"
            });
            
            sessionStorage.setItem("user", JSON.stringify(utilizador));
            window.location = "account.html";

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