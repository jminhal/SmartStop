let user = JSON.parse(sessionStorage.getItem("user"));
let userID=user.user_id;
var meios;





window.onload = async function () {
    document.getElementById("backArrow").href = "account.html";

    let aux="";
    aux += "<option value= 'void' >  </option>";
    try {
        meios = await $.ajax({

            url: "/api/utilizadores/"+userID+"/meiospagamento",
            method: "get",
            dataType: "json"
          });
          for(let i in meios){
            aux += "<option value='"+i+"'>  **** **** **** " + meios[i].payment_method_card_number.toString().substring(11,15)+ "</option>";
        }
    }
    catch (err) {
            console.log(err);   
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
    }
    aux += "<option value= 'add'> Adicionar cartão </option>";
    document.getElementById("cartaoNumero").innerHTML= aux;

}


function Aparecer(){
    var cartaoNumero = document.getElementById("cartaoNumero");
    var selectedValue = cartaoNumero.options[cartaoNumero.selectedIndex].value;
    if(selectedValue=='add'){
        document.getElementById("lableInput").style.display="flex";
        document.getElementById("nTitular").value= "";
        document.getElementById("nCartao").value= "";
        document.getElementById("dCartao").value= "";
        document.getElementById("cvcCode").value= "";
        document.getElementById("btnBox").innerHTML='<button class="btn" onclick="Adicionar()">Adicionar</button>';
        document.getElementById("checkBoxLable").innerHTML="Deseja tornar este cartão como principal?";
        document.getElementById("checkBoxInput").innerHTML= '<input id="selectedCartao" value="selectedCartao" type="checkbox">';


    }
    else if(selectedValue=='void'){
        document.getElementById("lableInput").style.display="none";
        document.getElementById("btnBox").innerHTML="";

    }
    else{
        document.getElementById("lableInput").style.display="flex";
        document.getElementById("nTitular").value=meios[selectedValue].payment_method_card_name;
        document.getElementById("nCartao").value=meios[selectedValue].payment_method_card_number;
        document.getElementById("dCartao").value=meios[selectedValue].payment_method_expiry_date;
        document.getElementById("cvcCode").value=meios[selectedValue].payment_method_cvv;
        document.getElementById("btnBox").innerHTML='<button class="btn" onclick="Remover('+meios[selectedValue].payment_method_id+','+meios[selectedValue].payment_method_selected+')">Remover</button><button class="btn" onclick="Atualizar('+meios[selectedValue].payment_method_id+')">Atualizar</button>';
        if(meios[selectedValue].payment_method_selected==false){
            document.getElementById("checkBoxLable").innerHTML="Deseja tornar este cartão como principal?";
            document.getElementById("checkBoxInput").innerHTML= '<input  id="selectedCartao" value="selectedCartao" type="checkbox">';

        }
        else{
            document.getElementById("checkBoxLable").innerHTML="";
            document.getElementById("checkBoxInput").innerHTML="";
        }
    } 
}

async function Adicionar(){
    let nTitular =    document.getElementById("nTitular").value;
    let nCartao=    document.getElementById("nCartao").value;
    let dCartao=    document.getElementById("dCartao").value;
    let cvcCode=    document.getElementById("cvcCode").value;
    let selectedCartao= document.getElementById("selectedCartao");




    if(selectedCartao){
        cartaoSelecionado=true;
        TirarSelecionado();
    }
    else if( selectedCartao==false) {
        cartaoSelecionado=false;
    }
    

    if(nTitular!="" && nCartao !="" && dCartao!="" && cvcCode!=""){
        try {
            let info = {
                cardName: nTitular,
                cardNumber: nCartao,
                cardExpiry: dCartao,
                cardCVV: cvcCode,
                selected: cartaoSelecionado,
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

    alert("Cartão adicionado com sucesso!")
    window.location="account.html";


}



function Remover(id,selecionado){
    let cartaoON= false;
    EditarMeioPagamento(id,cartaoON,selecionado);


}

function Atualizar(id){
    let cartaoON= true;
    let selectedCartao= document.getElementById("selectedCartao")?.checked;// se não tiver nada ele dá undefined
    EditarMeioPagamento(id,cartaoON,selectedCartao);

}



async function EditarMeioPagamento(id,cartaoON,selecionado){

    let cartaoSelecionado;
    let nTitular =    document.getElementById("nTitular").value;
    let nCartao =    document.getElementById("nCartao").value;
    let dCartao =    document.getElementById("dCartao").value;
    let cvcCode =    document.getElementById("cvcCode").value;

    if(selecionado){
        cartaoSelecionado=true;
        TirarSelecionado();
    }
    else if( selecionado==false) {
        cartaoSelecionado=false;



    }
    
    else if(typeof selecionado === 'undefined'){

        cartaoSelecionado=true;
    }











    

    if(nTitular!="" && nCartao !="" && dCartao!="" && cvcCode!=""){
        try {
            let info = {

                cardName: nTitular,
                cardNumber: nCartao,
                cardExpiry: dCartao,
                cardCVV: cvcCode,
                selected: cartaoSelecionado,
                paymentON:cartaoON,
                cardUserID:userID
            }


            console.log("selecionado: " + id);
            
            let mPagamento = await $.ajax({
                url: "/api/meiosPagamento/"+id+"/editar",
                method: "put",
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
        if(cartaoON){
            alert("Falta preencher campos do meio de pagamento");
        }
        else{
            alert("Por favor volte a selecionar o meio de pagamento que deseja eleminar")
        }
    } 
    if(cartaoON){
        alert("Informações do meio de pagamento alterados com sucesso!");
    }
    else{
        alert("meio de pagamento removido com sucesso!")
    }

    window.location="account.html";



}



async function TirarSelecionado() {

    //vai apanhar o meio de pagamento selecionado
    try {
        let mpSelecionado = await $.ajax({

            url: "/api/meiosPagamento/"+userID+"/selecionado",
            method: "get",
            dataType: "json"
          });
          if(mpSelecionado.data != "undefined"){
                console.log("tirar: " + mpSelecionado.payment_method_id);
                //vai remover o meio de pagamento selecionado
                try {
                    let info = {
                        cardName: mpSelecionado.payment_method_card_name,
                        cardNumber: mpSelecionado.payment_method_card_number,
                        cardExpiry: mpSelecionado.payment_method_expiry_date,
                        cardCVV:  mpSelecionado.payment_method_cvv,
                        selected: false,
                        paymentON: mpSelecionado.payment_method_ON,
                        cardUserID: userID
    /*
                        selected: false,
                        cardUserID: userID*/
                    }
                    console.log(info)
                    let mPagamento = await $.ajax({
                        url: "/api/meiosPagamento/"+mpSelecionado.payment_method_id+"/editar",
                        method: "put",
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
            
    } catch (err) {
        console.log(err);
        if (err.status == 404) {
            alert(err.responseJSON.msg);
        }
    }

}