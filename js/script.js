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
            var props;
            for (var objekte in ourData){
                props = ourData[objekte];
                console.log(props);
                ausflugMarker(props);
            };
            // Arbeitsfunktionen
            function ausflugMarker(props){ 
                    var marker = new google.maps.Marker({
                        name:"ausflug"+props.number,
                        position: new google.maps.LatLng(props.lat,props.lng),
                        map:map,
                        icon:"",
                    });
                    var infoFenster = new google.maps.InfoWindow({
                        content:'<div class="pop"><p>'+props.info+'</p></div>'
                    }); 
                    
                    marker.addListener('click',function(){
                        infoFenster.open(map,marker);
                    })
                    
                    if(props.status === "F"){
                        marker.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                    }
                    console.log(marker)
                };
}
            
