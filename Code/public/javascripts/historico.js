let user = JSON.parse(sessionStorage.getItem("user"));
let userID = user.user_id;



window.onload = async function () {
    document.getElementById("backArrow").href = "account.html";

    console.log(userID)
    let aux = "<table><tr><th>Nome do parque</th><th>Local</th><th>Dia de pagamento</th><th>Dia da reserva</th><th>Tempo da reserva</th><th>Veiculo</th><th>Meio de pagamento</th><th>Preço</th></tr>";

try {
    reservas = await $.ajax({

        url: "/api/utilizadores/"+userID+"/reservas",
        method: "get",
        dataType: "json"
    });
    for (let i in reservas) {


        aux+="<tr><td>"+reservas[i].park_name+"</td><td>"+reservas[i].park_localization+"</td><td>"+reservas[i].reservation_date+"</td><td>"+reservas[i].reservation_start_day+"</td><td>"+reservas[i].reservation_duration+"</td><td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td><td>**** **** **** "+reservas[i].payment_method_card_number.toString().substring(11,15)+"</td><td>"+reservas[i].reservation_duration*reservas[i].park_price_hour+"</td></tr>";
        /*+"<td>"+reservas[i].park_localization+"</td>"+
        +"<td>"+reservas[i].reservation_start_day+"</td>"+
        +"<td>"+reservas[i].reservation_duration+"</td>"+
        +"<td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td>"+
        +"<td>**** **** **** "+reservas[i].payment_method_card_number.toString().substring(11,15)+"</td>"+
        +"<td>"+reservas[i].reservation_duration*reservas[i].park_price_hour+"</td></tr>"; */

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
