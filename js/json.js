var ourRequest = new XMLHttpRequest();
ourRequest.open('GET',"https://raw.githubusercontent.com/MaxKicw/jsontest/master/script.json");
var jsonData;
ourRequest.onload = function(){
    jsonData = JSON.parse(ourRequest.responseText);
    console.log(jsonData);
};
var ourData = JSON.parse(jsonData);
console.log(ourData);
ourRequest.send();

           
