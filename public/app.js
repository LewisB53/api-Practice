var app = function(){
  var coords = {lat:56.796849,lng:-5.003525};
  var zoom = 11;
  var container = document.querySelector('#main-map')
  
  var mainMap = new MapWrapper(container,coords,zoom);
  mainMap.addMarker(coords)
  mainMap.addInfoWindow(coords, "you made an info window")
  clear.addEventListener('click', updateCoords);
 
  
  var url = 'https://munroapi.herokuapp.com/api/munros'
  var request = new XMLHttpRequest();
  request.open("get", url)

  request.addEventListener('load', function(){
    var jsonString = request.responseText
    var munros = JSON.parse(request.responseText)
    nameList(munros)
  }) 

  request.send();
}


var updateCoords =function(){
  var newCoords = localStorage.getItem('newCoords');
  var coords = JSON.parse(newCoords);
  var zoom = 11;
  var container = document.querySelector('#main-map')
  var mainMap = new MapWrapper(container,coords,zoom);
  mainMap.addMarker(coords)
}


var nameList = function(munros){
  var ul = document.createElement('ul');
  munros.forEach(function(munro, index){
  var li = document.createElement('li');
  ul.appendChild(li);
})

var munroArray =[]
var ShowDetails = function(){
  var selectedMunro = munros[this.value]
  selectedMunroLat =selectedMunro.latlng_lat
  selectedMunroLng =selectedMunro.latlng_lng
  var newCoords = {lat:selectedMunroLat,lng:selectedMunroLng}
  var jsonString = JSON.stringify(newCoords)
  localStorage.setItem('newCoords', jsonString); 

  munroArray.push(selectedMunro.height)
  new PieChart('selected Munros', selectedMunro.name, munroArray);

  var textBox = document.createElement('p')
  document.body.appendChild(textBox)
  textBox.innerText = "Name: " + selectedMunro.name + "\nHeight:" + selectedMunro.height + "m" + "\n Region: " + selectedMunro.region
   
  var jsonString = JSON.stringify(selectedMunro)
  localStorage.setItem('selectedMunro', jsonString); 
  }

  var select = document.createElement('select');

  munros.forEach(function(munro, index){
    var option = document.createElement('option');
    option.innerText = munro.name
    option.value = index;
    select.appendChild(option);
    })

  document.body.appendChild(select);
  console.log(select)
  select.addEventListener('change', ShowDetails)
  }


window.addEventListener('load', app);