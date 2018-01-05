var ourData;
function initMap() {
            //Optionen zur Anzeige der Karte//
            var options = {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            }
            //Die Karte//
            var map = new google.maps.Map(document.getElementById('map'),options);
            //Die Daten// 
            //--------XMLRequest------------------//
            //Besorgt die JSON-Daten über einen XML-Request an den gespeicherten Pfad//
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('GET',"https://raw.githubusercontent.com/MaxKicw/65kmh/master/js/data.json");
            ourRequest.send();
            //--------XMLRequestEnde--------------//
            //--------Die Daten verarbeiten------//
            ourRequest.onload = function(){
                console.log("Our Data vor dem Request: "+ourData);
                ourData = JSON.parse(ourRequest.responseText);
                console.log("Our Data nach dem Request: "+ourData);
            //Die einzenen Objekte werden einzeln aus dem Response, gespeichert in ourData itteriert und die ausflugMarker-Funktion mit dem Objekt ausgeführt.//
                for (var objekte in ourData){
                    props = ourData[objekte];
                    console.log(props)
                    ausflugMarker(props);
                    renderHTML(props);
                };
                /*  Arbeitsfunktionen mit Definition:
                    - ausflugMarker: Setzt die Marker auf die Karte, fügt ein Click_Listener hinzu und fügt ein InfoFenster mit Inhalt ein. (Alle Daten aus dem JSON-Response)
                    - renderHTML: Befüllt den jeweiligen Bereich mit den Karten und die Karteninhalte
                */
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
                    };
                function renderHTML(props){
                    var karte = "<div class='karte'>"+props.info+"</div>";
                    if(props.status === "F"){
                        var featured = document.getElementById("f");
                        featured.insertAdjacentHTML("beforeend",karte);
                    }else{
                        var normal = document.getElementById("n");
                        normal.insertAdjacentHTML("beforeend", karte);
                    };
                };
            };    
};

