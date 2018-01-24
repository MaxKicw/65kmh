//Variablen definition //
var ourData;
var karte = document.getElementsByClassName("karte");
var allAusflugSammlung = [];
var ausflugSammlung = [];
var infoFensterSammlung=[];
var markerSammlung = [];
var marker;
var map;
var standort;
var featured;
var normal;
var sliderAmount;
/*Arbeitsfunktion mit Erklärung:
    -initMap() erstellt die Karte über die GoogleAPI und holt sie die Daten des JSON-Files
    -geoLocation() ermittelt die Geolocation von dem Nutzer und setze den Marker auf dessen Position
    -renderMarker() setzt die Marker
    -renderCards() setzt die Karten
    -filterUtility() filter alle Karten nach Filtereinstellungen
    -filter() filtert das Array allAusflugSammlung bezüglich den Filtereinstellungen von filterUtility()
    -sort() sortiert die Karten nach Sortiereinstellungen (WIP)
    -calcDistance() berechnet den Abstand zwischen dem aktuellen Standort und den Markern
*/
function initMap() {
            //Optionen zur Anzeige der Karte//
            var options = {
                center: {lat: 50.078218, lng: 8.239761},
                zoom: 15,
                styles:[
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 33
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2e5d4"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c5dac6"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#c5c6c6"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e4d7c6"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#fbfaf7"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#acbcc9"
                        }
                    ]
                }
            ]
            }
            //Die Karte//
            map = new google.maps.Map(document.getElementById('map'),options);
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
            //Die einzenen Objekte werden einzeln aus dem Response, gespeichert in ourData itteriert und in den Array allMarkersSammlung gepusht.//
                for (var objekte in ourData){
                    allAusflugSammlung.push(ourData[objekte]);
                    ausflugSammlung.push(ourData[objekte]);
                };
            //Das Array wird durchitteriert und die einzelnen Marker und Karten werden hinzugefügt :)//
                for(i=0;i<ausflugSammlung.length;i++){
                        renderMarker(ausflugSammlung[i],markerSammlung);
                        renderCards(ausflugSammlung[i],markerSammlung);
                };
            };
};
function geoLocation(){
    function onPositionReceived(position){
        console.log();
        standort = new google.maps.Marker({
            name:"HOLLa",
            draggable: true,
            position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
            map:map,
            icon:"../images/2018_01_22_marker_position.png",  
        });
        var infoFenster = new google.maps.InfoWindow({
                            content:"Ihr Standort"
        });
        calcDistance(standort,markerSammlung);
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onPositionReceived);
    }
     
};
function renderMarker(props,markerSammlung){
                        var marker = new google.maps.Marker({
                            name:props.number,
                            position: new google.maps.LatLng(props.lat,props.lng),
                            map:map,
                            icon:"../images/2018_01_22_marker_normal.png",
                        });
                        markerSammlung.push(marker);
                        var infoFenster = new google.maps.InfoWindow({
                            content:'<div class='+props.number+' class="pop" ><a>'+props.info+'</a></div>'
                        }); 
                        
                        marker.addListener('click',function(){
                            for(i=0;i<infoFensterSammlung.length;i++){
                                        infoFensterSammlung[i].close();
                                    }
                            infoFenster.open(map,marker);
                        });
                        if(props.status === "F"){
                            marker.icon = '../images/2018_01_22_marker_featured.png'
                        }
                        infoFensterSammlung.push(infoFenster);
                    };
function renderCards(props){
                    var karte = "<div class='karte' id='"+props.number+"'><i class='far fa-heart'></i><img class='img' src='./images/wald.jpg'><h6>"+props.info+"</h6><i class='fas fa-star'></i><p>"+props.beschreibung+"</p></div>";
                    if(props.status === "F"){
                        featured = document.getElementById("f");
                        featured.insertAdjacentHTML("beforeend",karte);
                        var karte = document.getElementById(props.number);
                        //Hinzufügen des Clicklisteners damit das Popup auf der Karte automatisch aufgeht.//
                        document.getElementById(props.number).addEventListener('click',function(){
                            console.log("Click");
                            console.log(karte);
                            for(i=0;i<ausflugSammlung.length;i++){
                                var popup = (markerSammlung[i]);
                                if(popup.number === parseInt(karte.id)){
                                    console.log(popup);
                                    google.maps.event.trigger(popup, 'click');
                                };
                            }
                        });
                    }else{
                        normal = document.getElementById("n");
                        normal.insertAdjacentHTML("beforeend", karte);
                        var karte = document.getElementById(props.number);
                        document.getElementById(props.number).addEventListener('click',function(){
                            for(i=0;i<ausflugSammlung.length;i++){
                                var popup = (ausflugSammlung[i]);
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
function filterUtility(sliderAmount){
                    //Slidervalue ermitteln
                    var slider = document.getElementById('distanz');
                    slider.innerHTML = sliderAmount;
                    filter(sliderAmount,allAusflugSammlung);
                    //sort(sliderAmount,allAusflugSammlung);
                    
                };
function filter(sliderAmount,allAusflugSammlung,featured,normal){
    console.log("Eingestellte max. Entfernung: "+sliderAmount);
    //Zurücksetzen der Map und Content auf 0;
    ausflugSammlung = [];
    markerSammlung = [];
    console.log(ausflugSammlung);
    for(i=0;i<markerSammlung.length;i++){
        markerSammlung[i].setMap(null);
    }
    calcDistance(standort,markerSammlung);
    var featured = document.getElementById("f");
    var normal = document.getElementById("n");
    while(featured.firstChild){
        featured.removeChild(featured.firstChild);
    };
    while(normal.firstChild){
        normal.removeChild(normal.firstChild);
    };
    //Prüfen welchen der allAusflugSammlung den Kriterien entsprechen
    for(i=0;i<allAusflugSammlung.length;i++){
        if(allAusflugSammlung[i].distanz < sliderAmount){
            ausflugSammlung.push(allAusflugSammlung[i]);
        }
    }
    for(i=0;i<ausflugSammlung.length;i++){
        renderCards(ausflugSammlung[i],markerSammlung);
        renderMarker(ausflugSammlung[i],markerSammlung);
    }
};
function sort(sliderAmount,allAusflugSammlung){
    console.log("Eingestellte max. Entfernung: "+sliderAmount);
    //Zurücksetzen der Map und Content auf 0;
    ausflugSammlung = [];
    for(i=0;i<markerSammlung.length;i++){
        markerSammlung[i].setMap(null);
    }
    var featured = document.getElementById("f");
    var normal = document.getElementById("n");
    while(featured.firstChild){
        featured.removeChild(featured.firstChild);
    };
    while(normal.firstChild){
        normal.removeChild(normal.firstChild);
    };
    //Sortierung
    
};
function calcDistance(standort,markerSammlung){
    for(i=0;i<markerSammlung.length;i++){
        //Extrahiert die Positionsdaten den Markern und des Standorts
        var mPosition = markerSammlung[i].getPosition();
        var sPosition = standort.getPosition();
        var abstand = google.maps.geometry.spherical.computeDistanceBetween(mPosition,sPosition);
        var abstand = Math.round(abstand);
        console.log("Der Abstand zwischen "+markerSammlung[i].name+" und dem Standort beträgt: "+abstand);
        //Updatet die Distanzen der Markerobjekte und der Cards
        markerSammlung[i].distanz = abstand;
        ausflugSammlung[i].distanz = abstand;
    }
    //console.log(google.maps.geometry.spherical.computeDistanceBetween())
};






