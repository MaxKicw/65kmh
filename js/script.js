var ourData;
var karte = document.getElementsByClassName("karte");
var markerSammlung=[];
var infoFensterSammlung=[];
var marker;
function initMap() {
            //Optionen zur Anzeige der Karte//
            var options = {
                center: {lat: 50.078218, lng: 8.239761},
                zoom: 15
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
                    renderMarker(props);
                    renderCards(props);
                };
                /*  Arbeitsfunktionen mit Definition:
                    - renderMarker: Setzt die Marker auf die Karte, fügt ein Click_Listener hinzu und fügt ein InfoFenster mit Inhalt ein. (Alle Daten aus dem JSON-Response)
                    - renderCards: Befüllt den jeweiligen Bereich mit den Karten und die Karteninhalte
                */
                function renderMarker(props){ 
                        var marker = new google.maps.Marker({
                            name:props.number,
                            position: new google.maps.LatLng(props.lat,props.lng),
                            map:map,
                            icon:"",
                        });
                        var infoFenster = new google.maps.InfoWindow({
                            content:'<div class='+props.number+' class="pop" ><p>'+props.info+'</p></div>'
                        }); 
                        
                        marker.addListener('click',function(){
                            for(i=0;i<infoFensterSammlung.length;i++){
                                        infoFensterSammlung[i].close();
                                    }
                            infoFenster.open(map,marker);
                            map.setCenter(marker.getPosition());
                        });
                        if(props.status === "F"){
                            marker.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                        }
                        markerSammlung.push(marker);
                        infoFensterSammlung.push(infoFenster);
                    };
                function renderCards(props){
                    var karte = "<div class='karte' id='"+props.number+"'>"+props.info+"</div>";
                    if(props.status === "F"){
                        var featured = document.getElementById("f");
                        featured.insertAdjacentHTML("beforeend",karte);
                        var karte = document.getElementById(props.number);
                        document.getElementById(props.number).addEventListener('click',function(){
                            for(i=0;i<markerSammlung.length;i++){
                                var popup = (markerSammlung[i]);
                                if(popup.name === parseInt(karte.id)){
                                    for(i=0;i<infoFensterSammlung.length;i++){
                                        infoFensterSammlung[i].close();
                                    }
                                    google.maps.event.trigger(popup, 'click');
                                };
                            }
                        });
                    }else{
                        var normal = document.getElementById("n");
                        normal.insertAdjacentHTML("beforeend", karte);
                        var karte = document.getElementById(props.number);
                        document.getElementById(props.number).addEventListener('click',function(){
                            for(i=0;i<markerSammlung.length;i++){
                                var popup = (markerSammlung[i]);
                                if(popup.name === parseInt(karte.id)){
                                    for(i=0;i<infoFensterSammlung.length;i++){
                                        infoFensterSammlung[i].close();
                                    }
                                    google.maps.event.trigger(popup, 'click');
                                };
                            }
                        });
                    };
                };               
            };    
};





