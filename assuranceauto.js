window.onload = function() {

    var select = document.getElementById("age");
    for(var i = 16; i <= 100; i++) {
        var option = document.createElement("OPTION"),
            txt;

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

    // mettre lage par defaut de 18 ans
    select.selectedIndex = 2;

// mettre par defautles formulaires desactives A REPETER POUR LES AUTRES CHAMPS
//   document.getElementById('valeurv').disabled = true;

    // appeler les fonctions lors des changements
    document.getElementById('age').onchange = checkAgeAndGender;
    document.getElementById('genre').onchange = checkAgeAndGender;
    document.getElementById('valeurv').onchange = checkCarValue;
}

function checkAgeAndGender() {
    var age = document.getElementById('age').value;
    var gender = document.getElementById('genre').value;
    var messageElement = document.getElementById('erreurmsgagegenre');

    messageElement.style.color = "red";
    messageElement.style.backgroundColor = "white";
    
    if ((gender === "femme" && age == 16) || (age == 100) || 
        ((gender === "homme" || gender === "non-binaire") && age < 18)) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (AGE ET GENRE)";

        // desactiver les autres champs si jamais on reviens  A REPETER POUR LES AUTRES CHAMPS
        document.getElementById('valeurv').disabled = true;

        // rendre les choses disables icitteeee  A REPETER POUR LES AUTRES CHAMPS
    } else {
        document.getElementById('valeurv').disabled = false;
        messageElement.innerHTML = "";
    }
}

function checkCarValue() {
    var carValue = document.getElementById('valeurv').value;
    var errorElement = document.getElementById('erreurmsgvaleur');

    errorElement.style.color = "red";
    errorElement.style.backgroundColor = "white";

    // le vide ne marche pas
    if (carValue === "" || carValue == null || isNaN(carValue) ) {
        errorElement.innerHTML = "S'il vous plaît, entrez une valeur pour la voiture";
    } else if ( carValue > 100000 || carValue < 0) {
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (VALEUR DE LACHAT INVALIDE)";
    } else {
        errorElement.innerHTML = "";
    }
}
