let userID = JSON.parse(sessionStorage.getItem("userID"));

window.onload = async function () {


    try {
        let tipos = await $.ajax({
            url: "/api/veiculos/tipoVeiculo",
            method: "get",
            dataType: "json"
          });
          let aux="";
        for(let tipo of tipos){

            aux += "<option value='"+ tipo.vehicleCategory_id +"'>" + tipo.category + "</option>";
        }
            document.getElementById("vCategoria").innerHTML = aux;
        
        }catch (err) {
            console.log(err);
            if (err.status == 404) {
                alert(err.responseJSON.msg);
            }
    }

}

async function registo(){
    let nTitular =    document.getElementById("nTitular").value;
    let nCartao=    document.getElementById("nCartao").value;
    let dCartao=    document.getElementById("dCartao").value;
    let cvcCode=    document.getElementById("cvcCode").value;
    let vMarca=    document.getElementById("vMarca").value;
    let vModelo=    document.getElementById("vModelo").value;
    let vData=    document.getElementById("vData").value;
    let vMatricula=    document.getElementById("vMatricula").value;
    let vCategoria=    document.getElementById("vCategoria").value;

    if(nTitular!="" && nCartao !="" && dCartao!="" && cvcCode!="" && vMarca!="" && vModelo!="" && vData!="" && vMatricula!="" && vCategoria!=""){

        try {
            let info = {
                cardName: nTitular,
                cardNumber: nCartao,
                cardExpiry: dCartao,
                cardCVV: cvcCode,
                selected: true,
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

            try {
                let info = {
                    vModel: vModelo,
                    vBrand: vMarca,
                    vRegistration: vMatricula,
                    vDate: vData,
                    vCategory:vCategoria,
                    vSelected:true,
                    vUserID:userID
    
                }
    
    
                let veiculo = await $.ajax({
                    url: "/api/utilizadores/"+userID+"/veiculos/novo",
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
 
        alert("Conta criada com sucesso, podes agora fazer login!");
        window.location = "login.html";

}






