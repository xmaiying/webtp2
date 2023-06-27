window.onload = function() {
    var select = document.getElementById("age");
    for(var i = 16; i <= 100; i++) {
      var option = document.createElement("OPTION"),
          txt;
  
      // ajouter des commentaires dans les options
      if (i == 16) {
        txt = document.createTextNode(i + " ans et moins");
      } else if (i >= 100) {
        txt = document.createTextNode(i + " ans et plus");
      }  else {
        txt = document.createTextNode(i + " ans");
      }
  
      option.appendChild(txt);
      option.setAttribute("value",i);
      select.insertBefore(option,select.lastChild);
    }
    
    document.getElementById('age').onchange = checkAgeAndGender;
    document.getElementById('genre').onchange = checkAgeAndGender;
  }
  
  function checkAgeAndGender() {
    var age = document.getElementById('age').value;
    var gender = document.getElementById('genre').value;
    var messageElement = document.getElementById('message');
  
    messageElement.style.color = "red";
    messageElement.style.backgroundColor = "white";
    if ((gender === "femme" && age == 16) || (age == 100)|| 
        ((gender === "homme" || gender === "non-binaire") && age < 18)) {
      messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client";
    } else {
      messageElement.innerHTML = ""; // supprimer le message d'erreur
    }
  }
  