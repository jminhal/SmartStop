let user = JSON.parse(sessionStorage.getItem("user"));
var utilizadorID = user.user_id;
var moderador = user.user_moderador;


var editarApagarParque=false;
sessionStorage.setItem("editarApagarParque", JSON.stringify(editarApagarParque));

window.onload = async function () {

  //verificar se é moderador ou utilizador
  if (moderador == 0) {
    let userDropBox = "<a href='account.html'>Conta</a>" +
      "<a href='#' class='selected' >Parques</a>" +
      "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
  if (moderador == 1) {
    let userDropBox = "<a href='account.html'>Conta</a>" +
      "<a href='#' class='selected'>Parques</a>" +
      "<a href='parque.html'>Adicionar Parque</a>" +
      "<a href='dashboard.html' >Dashboard</a>"+
      "<a href='#' onclick='logout()'>Logout</a>";
    document.getElementById("userDropBox").innerHTML = userDropBox;

  }
  mapSetup();





}



// função para dar logout
function logout() {
  sessionStorage.clear();
  window.location = "index.html";
}




async function mapSetup() {
  map = L.map('map', { minZoom: 12 }).setView(new L.LatLng(38.7476289, -9.1518309), 13);
  let lista = document.getElementById("listaParques");
  try {

    let parques = await $.ajax({
      url: "/api/parques",
      method: "get",
      dataType: "json"
    });
    let html = "";
    for (let parque of parques) {

      let marker = new L.marker(new L.LatLng(parque.park_latitude, parque.park_longitude)).addTo(map);

      marker.bindPopup("<section class='popup'>" +
        "<section id='conteudo'><p> Nome do parque:" + parque.park_name + "</p>" +
        "<p> Total de lugares/ lugares ocupados:" + parque.park_spots + "/" + parque.lugarOcupados + "</p>" +
        "<p> Horas de abertura do parque:" + parque.park_hour_open + "</p>" +
        "<p> Horas de fecho do parque:" + parque.park_hour_close + "</p></section>" +
        "<section id='sectionBtnInfo' ><button id='btnInfo' onclick='maisInfo(" + parque.park_id + ")'>Informações</button></section></section>");

        //Lista com as ações
        html += "<div class='parqueLista' onclick='parqueCenter("+parque.park_latitude+","+parque.park_longitude+")'>"+
        "<p> Nome do parque:     " + parque.park_name + "</p>"+
        "<p> Total de lugares/ lugares ocupados:     " + parque.park_spots + "/" + parque.lugarOcupados + "</p></div><hr>";


      //Quando clica no parque
      marker.on("click", function () {
        marker.openPopup();
      });


    }
    lista.style.display = "block";
    lista.innerHTML = html;
  } catch (err) {
    console.log(err);
    if (err.status == 404) {
      alert(err.responseJSON.msg);
    }
  }

  L.tileLayer('https://api.mapbox.com/styles/v1/krscripter/ckigd79nk5gtv19qry86qdzsi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3JzY3JpcHRlciIsImEiOiJja2lnZDNlbWQwbmJvMnVxazYwcWU5MDRlIn0.jqnlOPKhrK-r7-Il14uaYQ', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}



function maisInfo(park_id) {
  sessionStorage.setItem("park_id", park_id);
  sessionStorage.setItem("pagina", "parques.html");
  window.location = "infoparque.html";

}

async function pesquisar() {
  let parquePesquisado = document.getElementById("parquePesquisado").value;
  try {

    let parques = await $.ajax({
      url: "/api/parques",
      method: "get",
      dataType: "json"
    });

    for (let parque of parques) {
      if (parque.park_name.toUpperCase() == parquePesquisado.toUpperCase()) {
        map.setView(new L.LatLng(parque.park_latitude, parque.park_longitude),30);
       
      }
    }
  } catch (err) {
    console.log(err);
    if (err.status == 404) {
      alert(err.responseJSON.msg);
    }
  }
}

function parqueCenter(lat, lng) {
  map.setView(new L.LatLng(lat, lng),30);
}
