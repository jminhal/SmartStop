let user = JSON.parse(sessionStorage.getItem("user"));
let userID=user.user_id;
console.log(userID)




window.onload = async function () {

    try {
        let meios = await $.ajax({

            url: "/api/utilizadores/"+userID+"/meiospagamento",
            method: "get",
            dataType: "json"
          });
          let aux="";
          aux += "<option value= 'void' >  </option>";
        for(let meio of meios){

            aux += "<option value='"+ meio.payment_method_id +"'>  **** **** **** " + meio.payment_method_card_number.toString().substring(11,15)+ "</option>";


        }
            aux += "<option value= 'add' > Adicionar cartão </option>";
            document.getElementById("cartaoNumero").innerHTML= aux;

        
        }catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
    }

}

function Aparecer(){
    var cartaoNumero = document.getElementById("cartaoNumero");
    var selectedValue = cartaoNumero.options[cartaoNumero.selectedIndex].value;
    if(selectedValue=='add'){
        document.getElementById("lableInput").style.display="flex";
    }
    else if(selectedValue=='void'){
        document.getElementById("lableInput").style.display="none";
    }
    else{
        document.getElementById("lableInput").style.display="flex";
        let nTitular =    document.getElementById("nTitular").value;
        let nCartao=    document.getElementById("nCartao").value;
        let dCartao=    document.getElementById("dCartao").value;
        let cvcCode=    document.getElementById("cvcCode").value;
        nTitular=meio.payment_method_card_name;
        nCartao=meio.payment_method_card_number;
        dCartao=meio.payment_method_expiry_date;
        cvcCode=meio.payment_method_cvv;
    } 
}

/*
async function registo(){


    if(nTitular!="" && nCartao !="" && dCartao!="" && cvcCode!=""){
        try {
            let info = {
                cardName: nTitular,
                cardNumber: nCartao,
                cardExpiry: dCartao,
                cardCVV: cvcCode,
                cardUser:userID
        
            }

            let mPagamento = await $.ajax({
                url: "/api/utilizadores/"+userID+"/meiospagamento/novo",
                method: "post",
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
        alert("Falta preencher campos do meio de pagamento");
    } 

   

}

*/


