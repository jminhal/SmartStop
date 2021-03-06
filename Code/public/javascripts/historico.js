let user = JSON.parse(sessionStorage.getItem("user"));
let parque = JSON.parse(sessionStorage.getItem("parque"));
let userID = user.user_id;


let userHistorico = JSON.parse(sessionStorage.getItem("userHistorico"));



window.onload = async function () {
    let aux, precoPorHora;

    //Caso venha para ver o historico por onde a conta passou
    if(userHistorico){
        document.getElementById("backArrow").href = "account.html";


        // Vai buscar todas as reservas do utilizador
        try {
            reservas = await $.ajax({

                url: "/api/utilizadores/"+userID+"/reservas",
                method: "get",
                dataType: "json"
            });

            if(reservas.length > 0){

                aux = "<table><tr><th>Nome do parque</th><th>Local</th><th>Dia de pagamento</th><th>Dia da reserva</th><th>Tempo da reserva</th><th>Veiculo</th><th>Meio de pagamento</th><th>Preço</th></tr>";

                for (let i in reservas) {
            
                    precoPorHora = (parseFloat(reservas[i].reservation_duration.substring(0,2)) + (parseFloat(reservas[i].reservation_duration.substring(3,6)) /60)) *reservas[i].park_price_hour;

                    aux+="<tr><td>"+reservas[i].park_name+"</td><td>"+reservas[i].park_localization+"</td><td>"+reservas[i].reservation_date+"</td><td>"+reservas[i].reservation_start_day+"</td><td>"+reservas[i].reservation_duration+"</td><td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td><td>**** **** **** "+reservas[i].payment_method_card_number.toString().substring(11,15)+"</td><td>"+precoPorHora+"</td></tr>";
            
                }
                aux += " </table>";
                document.getElementById("tabela").innerHTML = aux;

            

            }
           
        
        } catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
        }

    }
    

    
        //Caso venha para saber quem passou por aquele parque

        else{  
            document.getElementById("backArrow").href = "infoparque.html";

            // Vai buscar todas as pessoas que passaram por aquele parque
            try {
                reservas = await $.ajax({
            
                    url: "/api/parques/"+parque.park_id+"/reservas",
                    method: "get",
                    dataType: "json"
                });
                console.log(reservas)
                if(reservas.length > 0){
                    document.getElementById("nomePagina").innerHTML="Historico do Parque:"+reservas[0].park_name;
                    
                    aux = "<table><tr><th>Nome do parque</th><th>Nome da reserva</th><th>Dia da reserva</th><th>Tempo da reserva</th><th>Preço do parque</th><th>veiculo</th><th>Meio de pagamento usado</th></tr>";
    
                    for (let i in reservas) {
                        precoPorHora = (parseFloat(reservas[i].reservation_duration.substring(0,2)) + (parseFloat(reservas[i].reservation_duration.substring(3,6)) /60)) *reservas[i].park_price_hour;
                        
                        
                        
                        

                 


                        aux+="<tr><td>"+reservas[i].park_name+"</td><td>"+reservas[i].user_fullname+"</td><td>"+reservas[i].reservation_start_day+"</td><td>"+reservas[i].reservation_duration+"</td><td>"+precoPorHora+"</td><td>"+reservas[i].vehicle_model+" - "+reservas[i].vehicle_brand+"</td><td>"+reservas[i].payment_method_card_number+"</td></tr>";
                        

                    }
                    aux += " </table>";
                    document.getElementById("tabela").innerHTML = aux;
    
                
    
                }

               
            
            } catch (err) {
                console.log(err);
                if (err.status == 404) {
                    alert(err.responseJSON.msg);
                }
            }
    
        }

    
    





}