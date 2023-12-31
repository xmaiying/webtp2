window.onload = function () {
    var isValide = false;

    var select = document.getElementById("age");
    for (var i = 16; i <= 100; i++) {
        var option = document.createElement("OPTION"),
            txt;

        if (i == 16) {
            txt = document.createTextNode(i + " ans et moins");
        } else if (i >= 100) {
            txt = document.createTextNode(i + " ans et plus");
        } else {
            txt = document.createTextNode(i + " ans");
        }

        option.appendChild(txt);
        option.setAttribute("value", i);
        select.insertBefore(option, select.lastChild);
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


    document.getElementById('btnsoum').addEventListener('click', calculerMontant);



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

    // MODIFICAITON DE LA TAILLE DU FORMULAIRE

    if (nombreReclamations > 4) {
        errorElement.style.marginBottom = '20px';
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client (PLUS DE 4 RÉCLAMATIONS)";
        return false;

    } if (nombreReclamations <= 4) {
        errorElement.innerHTML = "";

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


            input.onchange = handleMontantChange; 

            var p = document.createElement('p');
            p.className = 'erreurmsgmontant'; // setting the class
            p.id = 'erreurmsgmontant' + i; // setting an unique id for each paragraph
        

            var errorElement = document.createElement('div');
            errorElement.id = 'erreurmsgreclamations' + i;

            detailsDesReclamationsDiv.appendChild(p);
            detailsDesReclamationsDiv.appendChild(document.createElement('br'));
            detailsDesReclamationsDiv.appendChild(label);
            detailsDesReclamationsDiv.appendChild(input);
            detailsDesReclamationsDiv.appendChild(document.createElement('br'));





        }
    }

}

function handleMontantChange(event) {
    var montant = event.target.value;
    var errorElementId = 'erreurmsgmontant' + event.target.id.replace('montantReclamation', '');
    var errorElement = document.getElementById(errorElementId);
    
    if (montant > 35000) {
        errorElement.innerHTML = " La réclammation est plus de 35 000$ ce qui n'est pas accepté)";
        
    } else {
        errorElement.innerHTML = "";
    
    }
}






function checkAgeAndGender() {
    var age = document.getElementById('age').value;
    var gender = document.getElementById('genre').value;
    var messageElement = document.getElementById('erreurmsgagegenre');



    // a separer les validations ...
    if (gender === "femme" && age == 16) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour une femme de 16 ans.";
    }
    else if (age == 100) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour une personne de 100 ans.";

    }
    else if ((gender === "homme" || gender === "non-binaire") && age < 18) {
        messageElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour un homme ou une personne non binaire de moins de 18 ans.";
    }
    else {

        messageElement.innerHTML = "";
    }
}

function checkCarValue() {
    var carValue = document.getElementById('valeurv').value;
    var errorElement = document.getElementById('erreurmsgvaleur');


    if (carValue === "" || carValue == null) {
        errorElement.innerHTML = "S'il vous plaît, entrez une valeur pour la voiture. Le champ ne peut pas être vide.";
    } else if (isNaN(carValue)) {
        errorElement.innerHTML = "La valeur entrée pour la voiture n'est pas un nombre. Veuillez entrer une valeur numérique.";
    } else if (carValue > 100000) {
        errorElement.innerHTML = "La valeur de la voiture ne peut pas dépasser 100 000. Veuillez entrer une valeur inférieure.";
    } else if (carValue < 0) {
        errorElement.innerHTML = "La valeur de la voiture ne peut pas être négative. Veuillez entrer une valeur supérieure à 0.";
    } else {
        errorElement.innerHTML = "";
    }
}


function checkCarAnnee() {
    var anneeCar = document.getElementById('anneev').value;
    var errorElement = document.getElementById('erreurmsgannee');


    var currentYear = new Date().getFullYear(); // obtenir l'année courante

    // vérifier si le champ est vide
    if (anneeCar === "" || anneeCar == null || isNaN(anneeCar)) {
        errorElement.innerHTML = "S'il vous plaît, entrez une année pour le véhicule";
        // vérifier si l'année est plus ancienne de 25 ans
    } else if (currentYear - anneeCar > 25) {
        errorElement.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour un véhicule de plus de 25 ans.";
        // vérifier si l'utilisateur a entré une année future
    } else if (anneeCar > currentYear) {
        errorElement.innerHTML = "Désolé, vous ne pouvez pas entrer une année future.";
    } else {
        errorElement.innerHTML = "";
        return true;
    }
}





function calculerMontant(event) {
    event.preventDefault();

    var lannee = document.getElementById('anneev').value;

    // Validation check for car year
    if (lannee < 1998) {
        document.getElementById('affichermontant').innerHTML = "Désolé, nous n'avons aucun produit ";
        return;
    }

    var assuranceAnnuelle;
    var montantTemporaire;
    var lage = document.getElementById('age').value;
    var legenre = document.getElementById('genre').value;
    var lavaleurcar = document.getElementById('valeurv').value;
    var afficherMontant = document.getElementById('affichermontant');
    var nbrReclamations = document.getElementById('nombreReclamations').value;
    var montantBase;

    if ((legenre === "homme" || legenre === "non-binaire") && (lage < 25)) {
        montantBase = 0.05 * lavaleurcar;
    } else if (lage >= 75) {
        montantBase = 0.04 * lavaleurcar;
    } else {
        montantBase = 0.02 * lavaleurcar;
    }

    if (montantBase) {
        montantTemporaire = nbrReclamations * 350;
        assuranceAnnuelle = montantBase + montantTemporaire;

        if (lavaleurcar > 25000) {
            assuranceAnnuelle = assuranceAnnuelle + 500;
        }

        var montantMensuel = assuranceAnnuelle / 12;
        afficherMontant.innerHTML = "Le montant annuel est " + assuranceAnnuelle.toFixed(2) + " et le montant mensuel est " + montantMensuel.toFixed(2);
    } else {
        afficherMontant.innerHTML = "Désolé, nous n'avons aucun produit à offrir pour ce profil de client.";
    }
}