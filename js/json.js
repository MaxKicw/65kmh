var ourRequest = new XMLHttpRequest();
ourRequest.open('GET',"https://raw.githubusercontent.com/MaxKicw/65kmh/master/js/data.json");
var ourData;
ourRequest.onload = function(){
    ourData = JSON.parse(ourRequest.responseText);
};
ourRequest.send();

           
