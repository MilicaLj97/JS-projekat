

(function move() {
    var ea = JSON.parse(localStorage.getItem("match")); 
    var elem = document.getElementById("myProgress");  
    
      for(var i = 0; i < ea.length; i++){
        var elementor = document.createElement('div');
        elementor.className="myBar";
        var elementor2 = document.createElement('div');
        elementor2.textContent = `${ea[i].id}`;
        elementor2.style.color = "white";
        elem.appendChild(elementor2);
        elem.appendChild(elementor);
        
      var width = 0;
      setInterval(frame, 30,i,elementor);
      function frame(i,elementor) {
        if (width >= ea[i].mag*10) {
          
            } else {

                if(ea[i].mag < 2.5) {
                    elementor.style.backgroundColor="green";
                  }
                  else if(2.5<= ea[i].mag &&  ea[i].mag <5.4){
                    elementor.style.backgroundColor="#32cd32";
                  }
                  else if(5.4<= ea[i].mag &&  ea[i].mag <6.1){
                    elementor.style.backgroundColor="yellow";
                  } 
                  else if(6.1<= ea[i].magh &&  ea[i].mag <7.0){
                    elementor.style.backgroundColor="gold";
                  } 
                  else if(7.0<= ea[i].mag &&  ea[i].mag <8.0){
                    elementor.style.backgroundColor="orange";
                  }
                  else if(ea[i].mag >= 8.0 ){
                    elementor.style.backgroundColor="red";
                  }
            width++; 
            elementor.style.width = width.toString()+"%" ; 
            elementor.innerHTML = width * 1;
            } 
        
        }
      
    }
  })();