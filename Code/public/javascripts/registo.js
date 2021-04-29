async function registo() {

console.log("fdjfjdjdjgdjggjdjggjdjgjdg");

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;
    let data = document.getElementById("date").value;
    let nif = document.getElementById("nif").value;
    let telemovel = document.getElementById("telemovel").value;


    console.log(pw)
    if (email != "" && pw != ""&& pw != "" && data != "" && nif != "" && telemovel != "" && name != "") { //Verificar se o input do email não está vazio
        try {

            data = {
                fullname: name,
                email: email,
                password: pw,
                birthday: data,
                mobile: telemovel,
                nif: nif
            }
            
            let utilizador = await $.ajax({
                url: "/api/utilizadores/register?email="+email+"&password="+pw,
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json"
            });

            if (utilizador.success == 1) {
               
                console.log(utilizador.msg);

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