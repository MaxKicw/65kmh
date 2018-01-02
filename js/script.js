/*------GoogleMapsApi-----------------*/
function initMap() {
            //Optionen zur Anzeige der Karte//
            var options = {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            }
            //Die Karte//
            var map = new google.maps.Map(document.getElementById('map'),options);
            
            //Die Daten//
            var ausflügeNormal = [
                [{lat: -34.300, lng: 150.600},"Mitte","N",1234],
                [{lat: -33.300, lng: 150.600},"Oben","F",1235],
                [{lat: -35.300, lng: 150.600},"Unten","N",1236],
                [{lat: -35.300, lng: 150.200},"Neuer","F",1237]
            ];  
              
            for (var i = 0;i < ausflügeNormal.length; i++){
                var props = ausflügeNormal[i];
                ausflugMarker(props);
            };
            
            
            // Arbeitsfunktionen
            function ausflugMarker(props){
                    var marker = new google.maps.Marker({
                        name:"ausflug"+props[3],
                        position:props[0],
                        map:map,
                        icon:"",
                    });
                    console.log(marker);
                    var infoFenster = new google.maps.InfoWindow({
                        content:'<div class="pop"><p>'+props[1]+'</p></div>'
                    }); 
                    
                    marker.addListener('click',function(){
                        infoFenster.open(map,marker);
                    })
                    
                    if(props[2] === "F"){
                        marker.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    }
                };
}
            
