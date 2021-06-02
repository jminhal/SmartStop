let user = JSON.parse(sessionStorage.getItem("user"));
let userID = user.user_id;



window.onload = async function () {
    document.getElementById("backArrow").href = "account.html";

    let aux = "<table><tr><th>Nome do parque</th><th>Local</th><th>Dia de inicio</th><th>Tempo total</th><th>Preço</th></tr></table>";

try {
    reservas = await $.ajax({

        url: "/api/utilizadores/" + userID + "/reservas",
        method: "get",
        dataType: "json"
    });
    for (let i in reservas) {
        console.log(i)

        /*linha   <tr>
<td>Alfreds Futterkiste</td>
<td>Maria Anders</td>
<td>Germany</td>
</tr>

        aux += ;*/


    }


} catch (err) {
    console.log(err);
    if (err.status == 404) {
        alert(err.responseJSON.msg);
    }
}




    document.getElementById("tabela").innerHTML = aux;

}
