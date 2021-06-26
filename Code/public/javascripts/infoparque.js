let user = JSON.parse(sessionStorage.getItem("user"));

var utilizadorID = user.user_id;
var moderador = user.user_moderador;
var map, park;


window.onload = async function () {
 //verificar se é moderador ou utilizador
 if (moderador == 0) {
  let userDropBox = "<a href='account.html'>Conta</a>" +
    "<a href='parques.html' >Parques</a>" +
    "<a href='#' onclick='logout()'>Logout</a>";
  document.getElementById("userDropBox").innerHTML = userDropBox;

}
if (moderador == 1) {
  let userDropBox = "<a href='account.html'>Conta</a>" +
    "<a href='parques.html' >Parques</a>" +
    "<a href='parque.html'>Adicionar Parque</a>" +
    "<a href='dashboard.html' >Dashboard</a>"+
    "<a href='#' onclick='logout()'>Logout</a>";
  document.getElementById("userDropBox").innerHTML = userDropBox;
  document.getElementById("btns").innerHTML = "<button id='btnHistoricoParque' onclick='historicoParque()' >Historico do parque</button> <button id='btnEditarParque' onclick='EditarParque()' >Editar Parque</button>";

  }
  
  document.getElementById("backArrow").href = sessionStorage.getItem("pagina");

  getLocalizacao();

  //Vai buscar a parque que guardou no sessionStorage
  let park_id = sessionStorage.getItem("park_id");
  try {
    park = await $.ajax({
      url: "/api/parques/" + park_id,
      method: "get",
      dataType: "json"
    });

  }
  catch (err) {
    console.log(err);
    if (err.status == 404) {
      alert(err.responseJSON.msg);
    }
  }

  sessionStorage.setItem("parque", JSON.stringify(park));


  document.getElementById("parqueNome").innerHTML = park.park_name;
  document.getElementById("email").innerHTML = park.park_email;
  document.getElementById("telemovel").innerHTML = park.park_contact;
  document.getElementById("horasAbertura").innerHTML = park.park_hour_open;
  document.getElementById("horaFecho").innerHTML = park.park_hour_close;
  document.getElementById("localizacao").innerHTML = park.park_localization;
  document.getElementById("lugaresMax").innerHTML = park.park_spots + "/" + park.lugarOcupados;
  document.getElementById("preco").innerHTML = park.park_price_hour+"€";
  let percentagem = Math.round((park.lugarOcupados * 100) / park.park_spots);
  document.getElementById("estatisticas").innerHTML = percentagem + '%';
  document.getElementById('estatisticas').style.width = percentagem + '%';

 

}



function mapSetup(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //faz aparecer o mapa 
  map = L.map('map').setView(new L.LatLng(38.7476289, -9.1518309), 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/krscripter/ckigd79nk5gtv19qry86qdzsi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3JzY3JpcHRlciIsImEiOiJja2lnZDNlbWQwbmJvMnVxazYwcWU5MDRlIn0.jqnlOPKhrK-r7-Il14uaYQ', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  //Vai adicionar o marker do utilizador
  L.marker([latitude, longitude]).addTo(map);


  //Vai adicionar o marker do parque
  L.marker(new L.LatLng(park.park_latitude, park.park_longitude)).addTo(map);

  getRoute(latitude, longitude, park.park_latitude, park.park_longitude);

}
// vai buscar a  nossa localizacao
function getLocalizacao() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mapSetup);
  }
}

function getRoute(latitude, longitude, park_latitude, park_longitude) {

  route = L.Routing.control({
    waypoints: [
      L.latLng(latitude, longitude),
      L.latLng(park_latitude, park_longitude)
    ],
    waypointMode: 'snap',
    createMarker: function () { } //Faz remover os markers criados pelo Routing
  }).addTo(map);
}

// função para dar logout
function logout() {
  sessionStorage.clear();
  window.location = "index.html";
}


function EditarParque() {
  var editarApagarParque = true;
  sessionStorage.setItem("editarApagarParque", JSON.stringify(editarApagarParque));
  window.location = "parque.html";
}

function historicoParque() {
  var userHistorico = false;
  sessionStorage.setItem("userHistorico", JSON.stringify(userHistorico));
  window.location = "historico.html";
}




