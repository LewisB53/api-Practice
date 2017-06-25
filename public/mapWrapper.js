var MapWrapper = function(container,coords,zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom:zoom
  })
}

MapWrapper.prototype = {

addMarker: function(coords){
    var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  return marker
},


addInfoWindow: function(coords,text){
  var marker = this.addMarker(coords);
  marker.addListener('click',function(){
  var infoWindow = new google.maps.InfoWindow({
    context:text
  });
  infoWindow.open(this.googleMap,marker);
  }.bind(this));
},

}