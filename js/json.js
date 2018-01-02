var ourRequest = new XMLHttpRequest();
ourRequest.open('GET',"https://raw.githubusercontent.com/MaxKicw/65kmh/master/js/data.json");
var jsonData;
ourRequest.onload = function(){
    jsonData = JSON.parse(ourRequest.responseText);
    console.log(jsonData);
};

ourRequest.send();

           
