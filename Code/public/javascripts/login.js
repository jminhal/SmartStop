async function login() {

    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;
    console.log(pw)
    if (email != "" && pw != "") { //Verificar se o input do email não está vazio
        let data = {
            email: email,
            pw: pw
    }

        try {
            
            let utilizador = await $.ajax({
                url: "/api/utilizadores",
                method: "get",
                data: JSON.stringify(data),
                contentType: "application/json",
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