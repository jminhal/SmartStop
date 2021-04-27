async function continuar() {


    let name = document.getElementById("name").value;
    let pw = document.getElementById("pw").value;
    let date = document.getElementById("date").value;
    let telemovel = document.getElementById("telemovel").value;
    let nif = document.getElementById("nif").value;

    if (name != "" && pw != "" && date != "" && telemovel != "" && nif != "") { //Verificar se o input não está vazio
        //sessionStorage.setItem("user", JSON.stringify(utilizador));
        window.location = "cuvp.html";
    }
    else {
        alert("preenche os campos anteriores");
    }

}