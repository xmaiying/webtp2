window.onload = function() {
    var isValide = false; 

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
    document.getElementById('anneev').onchange = checkCarAnnee;


    document.getElementById('oui').addEventListener('change', handleReclamationChange);
    document.getElementById('non').addEventListener('change', handleReclamationChange);
    document.getElementById('nombreReclamations').addEventListener('input', handleNombreReclamationsChange);
}







function handleReclamationChange() {
    var ouiChecked = document.getElementById('oui').checked;
    var detailsReclamationDiv = document.getElementById('details-reclamation');
    var errorElement = document.getElementById('erreurmsgreclamation');
    
    if (ouiChecked) {
        detailsReclamationDiv.style.display = "block";
    } else {
        
        detailsReclamationDiv.style.display = "none";
        errorElement.innerHTML = "";

    }
}








function handleNombreReclamationsChange() {
    var nombreReclamations = document.getElementById('nombreReclamations').value;
    var detailsDesReclamationsDiv = document.getElementById('details-des-reclamations');
    var errorElement = document.getElementById('erreurmsgreclamation');

    errorElement.style.color = "red";
    errorElement.style.backgroundColor = "white";

    // MODIFICAITON DE LA TAILLE DU FORMULAIRE
    var tailleFormulaire = document.getElementById('formeassurance');
    var hauteurMtn = tailleFormulaire.clientHeight;
    

    if (nombreReclamations > 4) {
        errorElement.style.marginBottom = '20px';
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (PLUS DE 4 RÉCLAMATIONS)";
        document.getElementById('btnsoum').disabled = true;
        
    } if (nombreReclamations <= 4){
        errorElement.innerHTML = "";
        document.getElementById('btnsoum').disabled = false;
    
        var nbrenleve = 0;
        while (detailsDesReclamationsDiv.firstChild) {

            detailsDesReclamationsDiv.removeChild(detailsDesReclamationsDiv.firstChild);
            
         
        }

    for (var i = 1; i <= nombreReclamations; i++) {
        

        var label = document.createElement('label');
        label.textContent = 'Pour la réclamation #' + i + ', quel montant avez-vous réclamé?';
        
        var input = document.createElement('input');
        input.type = 'number';
        input.name = 'montantReclamation' + i;
        input.id = 'montantReclamation' + i;
        input.min = '0';
        input.max = '35000'; // On définit une limite de 35 000$ pour le montant de la réclamation
        input.addEventListener('change', handleMontantChange);
        
        var hauteurnouv = hauteurMtn + 50;
        tailleFormulaire.style.height = hauteurnouv + 'px';
        detailsDesReclamationsDiv.appendChild(label);
        detailsDesReclamationsDiv.appendChild(input);
        detailsDesReclamationsDiv.appendChild(document.createElement('br'));

      
    }
}



}
// Cette fonction est appelée lorsque le montant d'une réclamation est modifié
function handleMontantChange(event) {
    var montant = event.target.value;
    var errorElement = document.getElementById('erreurmsgreclamations');

    errorElement.style.color = "red";
    errorElement.style.backgroundColor = "white";

    if (montant > 35000) {
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (PLUS DE 35 000$ DE RÉCLAMATION)";
        document.getElementById('btnsoum').disabled = true;
    } else {
        errorElement.innerHTML = "";
        document.getElementById('btnsoum').disabled = false;  
    }
}




function checkAgeAndGender() {
    var age = document.getElementById('age').value;
    var gender = document.getElementById('genre').value;
    var messageElement = document.getElementById('erreurmsgagegenre');

    messageElement.style.color = "red";
    messageElement.style.backgroundColor = "white";
    
    // a separer les validations ...
    if (gender === "femme" && age == 16) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour une femme de 16 ans.";
        document.getElementById('btnsoum').disabled = true;  
    }
    else if (age == 100) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour une personne de 100 ans.";
        document.getElementById('btnsoum').disabled = true;  

    }
    else if ((gender === "homme" || gender === "non-binaire") && age < 18) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour un homme ou une personne non binaire de moins de 18 ans.";
        document.getElementById('btnsoum').disabled = true;  
    }
     else {
        
        messageElement.innerHTML = "";
        document.getElementById('btnsoum').disabled = false;  
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
        document.getElementById('btnsoum').disabled = true;  
    } else if ( carValue > 100000 || carValue < 0) {
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (VALEUR DE LACHAT INVALIDE)";
        document.getElementById('btnsoum').disabled = true;  
    } else {
        errorElement.innerHTML = "";
        document.getElementById('btnsoum').disabled = false;  
    }
}

function checkCarAnnee() {
    var anneeCar = document.getElementById('anneev').value;
    var errorElement = document.getElementById('erreurmsgannee');

    errorElement.style.color = "red";
    errorElement.style.backgroundColor = "white";
    
    var currentYear = new Date().getFullYear(); // obtenir l'année courante

    // vérifier si le champ est vide
    if (anneeCar === "" || anneeCar == null || isNaN(anneeCar)) {
        errorElement.innerHTML = "S'il vous plaît, entrez une année pour le véhicule";
        document.getElementById('btnsoum').disabled = true;  
    // vérifier si l'année est plus ancienne de 25 ans
    } else if (currentYear - anneeCar > 25 ) {
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour un véhicule de plus de 25 ans.";
        document.getElementById('btnsoum').disabled = true;  
    // vérifier si l'utilisateur a entré une année future
    } else if (anneeCar > currentYear) {
        errorElement.innerHTML = "Désolé, vous ne pouvez pas entrer une année future.";
        document.getElementById('btnsoum').disabled = true;  
    } else {
        errorElement.innerHTML = "";
        document.getElementById('btnsoum').disabled = false;  
    }
}
