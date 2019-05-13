
var earthquakes = [];
var earthquakeArr =[];
function GetEarthquakeData(){

    
    city=document.getElementById("city").value;
    radius=document.getElementById("radius").value;
    startDate=document.getElementById("startDate").value;
    endDate=document.getElementById("endDate").value;
    var date= new Date();
    
    if (new Date(endDate)>date) {
      document.getElementById("upozorenje").style.display = "block";
      return;
    }
    if (city=="" || radius=="" || startDate=="" || endDate=="") {
      alert("Morate popuniti sva polja!");
      return;
    } 

    let cityLength;
    let cityWidth;
try{
        let Api1="http://www.mapquestapi.com/geocoding/v1/address?inFormat=kvp&outFormat=json&location="+city+"&thumbMaps=false&maxResults=1&location=80401&key=fvBPkCf742T3gS1F755wgbrqjmOxfNcv";
        fetch(Api1)
        .then((resp)=> resp.json())
        .then(function(earthquakeData1){
        
            cityLength=earthquakeData1.results[0].locations[0].latLng.lat;
            cityWidth=earthquakeData1.results[0].locations[0].latLng.lng;
            console.log(cityLength);
            console.log(cityWidth);
            document.getElementById("upozorenje").style.display = "none";

        }).then(function() {
            let Api2="https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime="+startDate+"&endtime="+endDate+"&latitude="+cityLength+"&longitude="+cityWidth+"&maxradiuskm="+radius;
            fetch(Api2)
            .then((resp)=> resp.json())
            .then(function(earthquakeData2) {
              let secondApiData=earthquakeData2;
              console.log(secondApiData);
              console.log(buildTable(secondApiData.features));
              document.getElementById("content").appendChild(buildTable(secondApiData.features));
              
              earthquakeArr = secondApiData.features;
              for (let i = 0; i < earthquakeArr.length; i++) {
                earthquakes.push(earthquakeArr[i].id) ;
                
              }

              autocomplete(document.getElementById("myInput"), earthquakes);
               
            });
        });   
    }catch(ex){alert("u cathcu");}

}

function matching(){
  var match=[];
  for (let m = 0; m < earthquakeArr.length; m++) {
      for (let j = 0; j < listearthquake.length; j++) {
        if(earthquakeArr[m].id==listearthquake[j]){
          match.push({mag:earthquakeArr[m].properties.mag, id:earthquakeArr[m].id});
        }
      }
  }
console.log(match);
localStorage.setItem("match", JSON.stringify(match));

window.location.assign("details.html")
}

  function buildTable(data) {
      var table = document.createElement("table");
      table.className="gridtable";
      var thead = document.createElement("thead");
      var tbody = document.createElement("tbody");
      var headRow = document.createElement("tr");
      
      ["ID","Datum i vreme","Drzava","Max. intenzitet","Cunami","Interval","Znacajnost"].forEach(function(el) {
        var th=document.createElement("th");
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead); 
      data.forEach(function(el) {
        var tr = document.createElement("tr");         
          var td = document.createElement("td");
          td.appendChild(document.createTextNode(el.properties.net + el.properties.code));
          var td2 = document.createElement("td");
          td2.appendChild(document.createTextNode(el.properties.time));
          var td3 = document.createElement("td");
          td3.appendChild(document.createTextNode(el.properties.place));
          var td4 = document.createElement("td");
          td4.appendChild(document.createTextNode(el.properties.cdi || "/"));
          var td5 = document.createElement("td");
          td5.appendChild(document.createTextNode(el.properties.tsunami));
          var td6 = document.createElement("td");
          td6.appendChild(document.createTextNode(el.properties.rms|| "/"));
          var td7 = document.createElement("td");
          td7.appendChild(document.createTextNode(el.properties.sig));

          tr.appendChild(td);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          tr.appendChild(td7);
        
        tbody.appendChild(tr);  
      });
      table.appendChild(tbody);             
      return table;
  }


  function autocomplete(inp, arr) {
    
    var currentFocus;
    
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
      
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
       
        this.parentNode.appendChild(a);
        
        for (i = 0; i < arr.length; i++) {
         
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
           
            b = document.createElement("DIV");
           
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
           
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
           
                b.addEventListener("click", function(e) {
                
                inp.value = this.getElementsByTagName("input")[0].value;
               
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
         
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { 
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
         
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  var listearthquake = [];

  function addEarthquake(){
 
   var node = document.createElement("Li");
   var text = document.getElementById("myInput").value;
   var textnode=document.createTextNode(text);
  
   if(text == "" || !earthquakes.includes(text) || listearthquake.includes(text)){
 
     alert("You have to insert valid Earthquake!");
     return false;
  }else{
  listearthquake.push(text);
  node.appendChild(textnode);
  document.getElementById("list_item").appendChild(node);
  }
 }

 


    
  