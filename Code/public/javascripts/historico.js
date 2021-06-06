let user = JSON.parse(sessionStorage.getItem("user"));
let userID = user.user_id;
var dateObj = new Date();



window.onload = async function () {
    let month = dateObj.getUTCMonth() + 1, day = dateObj.getUTCDate(), year = dateObj.getUTCFullYear(), diaAtual;
    diaAtual=day+"/"+month+"/"+year;
    let criarNomeTabela=true;
    let aux;
    document.getElementById("backArrow").href = "account.html";


try {
    reservas = await $.ajax({

        url: "/api/utilizadores/"+userID+"/reservas",
        method: "get",
        dataType: "json"
    });
    for (let i in reservas) {
        let dataReserva =reservas[i].reservation_start_day;

        if(diaAtual>dataReserva){
            if(criarNomeTabela){
                var h = document.createElement("h2");
                var t = document.createTextNode("Your H1 text"); // Create a text element 
                h.appendChild(t); // Append the text node to the H1 element 
                document.body.appendChild(h); // Append the H1 element to the document body 
                aux+="<table><tr><th>Nome do parque</th><th>Local</th><th>Dia de pagamento</th><th>Dia da reserva</th><th>Tempo da reserva</th><th>Veiculo</th><th>Meio de pagamento</th><th>Preço</th></tr>";
                criarNomeTabela=false;
            }
            aux+="<tr><td>"+reservas[i].park_name+"</td><td>"+reservas[i].park_localization+"</td><td>"+reservas[i].reservation_date+"</td><td>"+reservas[i].reservation_start_day+"</td><td>"+reservas[i].reservation_duration+"</td><td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td><td>**** **** **** "+reservas[i].payment_method_card_number.toString().substring(11,15)+"</td><td>"+reservas[i].reservation_duration*reservas[i].park_price_hour+"</td></tr>";

        }
        else{
            if(criarNomeTabela){
                var h = document.createElement("h2");
                var t = document.createTextNode("Your H1 text"); // Create a text element 
                h.appendChild(t); // Append the text node to the H1 element 
                document.body.appendChild(h); // Append the H1 element to the document body 
                aux+="<table><tr><th>Nome do parque</th><th>Local</th><th>Dia de pagamento</th><th>Dia da reserva</th><th>Tempo da reserva</th><th>Veiculo</th><th>Meio de pagamento</th><th>Preço</th></tr>";
                criarNomeTabela=false;
            }
            aux+="<tr><td>"+reservas[i].park_name+"</td><td>"+reservas[i].park_localization+"</td><td>"+reservas[i].reservation_date+"</td><td>"+reservas[i].reservation_start_day+"</td><td>"+reservas[i].reservation_duration+"</td><td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td><td>**** **** **** "+reservas[i].payment_method_card_number.toString().substring(11,15)+"</td><td>"+reservas[i].reservation_duration*reservas[i].park_price_hour+"</td></tr>";

        }
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
