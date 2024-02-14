var quiz = [
    {
        question: "Comment réagiriez-vous si quelqu'un vous donnait des ordres ?",
        reponses: ["Je suivrais les ordres sans poser de questions.", "Je questionnerais les ordres et déciderais ensuite de les suivre ou non.", "Je refuserais catégoriquement de suivre les ordres."]
    },
    {
        question: "Comment gérez-vous vos émotions lorsque vous êtes contrarié(e) ?",
        reponses: ["Je cache mes émotions et les garde pour moi.", "J'essaie de comprendre pourquoi je suis contrarié(e) et de trouver une solution.", "Je montre ouvertement mes émotions, que ce soit en pleurant ou en m'énervant."]
    },
    {
        question: "Comment réagiriez-vous si quelqu'un vous complimentait ?",
        reponses: ["Je prendrais le compliment avec plaisir.", "Je remercierais la personne tout en restant modeste.", "Je minimiserais le compliment ou le rejetterais."]
    },
    {
        question: "Dans une situation de conflit, quelle est votre approche typique ?",
        reponses: ["Je cherche à imposer ma volonté et à avoir le dernier mot.", "Je cherche à comprendre les points de vue des autres et à trouver un compromis.", "Je me montre rebelle ou émotionnel(le) sans chercher de solution."]
    },
    {
        question: "Comment prenez-vous les décisions importantes dans votre vie ?",
        reponses: ["Je prends des décisions basées sur mon expérience et ce que les autres disent.", "Je pèse les pour et les contre et je choisis la meilleure option.", "Je prends des décisions impulsives basées sur mes émotions du moment."]
    },
    {
        question: "Comment réagiriez-vous face à une situation nouvelle et inconnue ?",
        reponses: ["Je suivrais les règles et les conseils de quelqu'un en qui j'ai confiance.", "J'analyserais la situation de manière objective et prendrais des décisions basées sur les faits.", "Je réagirais de manière instinctive ou émotionnelle."]
    },
    {
        question: "Dans une discussion de groupe, comment réagiriez-vous si quelqu'un propose une idée différente de la vôtre ?",
        reponses: ["Je défendrais mon point de vue et argumenterais fermement.", "J'écouterais l'idée de l'autre et envisagerais de la prendre en compte.", "Je réagirais négativement ou de manière irrationnelle."]
    },
    {
        question: "Comment traitez-vous les règles et les normes sociales ?",
        reponses: ["Je les respecte généralement sans les remettre en question.", "Je les respecte mais je peux les remettre en question si elles semblent injustes.", "Je les enfreins souvent et je les défie."]
    },
    {
        question: "Comment réagiriez-vous si vous commettiez une erreur importante ?",
        reponses: ["Je me sentirais coupable et chercherais à me faire pardonner.", "Je reconnaîtrais l'erreur et chercherais à la corriger.", "Je minimiserais l'erreur ou chercherais à rejeter la faute sur quelqu'un d'autre."]
    },
    {
        question: "Dans une situation de stress intense, comment réagiriez-vous généralement ?",
        reponses: ["Je deviendrais anxieux(se) et chercherais du réconfort ou de l'aide.", "Je resterais calme et essaierais de gérer la situation de manière rationnelle.", "Je perdrais mon sang-froid et réagirais de manière émotionnelle."]
    }
];

var currentQuestion = 0; // Variable pour suivre la question actuelle
var userResponses = []; // Tableau pour stocker les réponses de l'utilisateur
var results = {
    Parent: 0,
    Adulte: 0,
    Enfant: 0
}; // Variable pour stocker les résultats

// Fonction pour calculer le résultat final
function calculerResultat() {
    for (var i = 0; i < userResponses.length; i++) {
        var response = userResponses[i].toLowerCase();
        
        // Analyse des réponses de l'utilisateur pour déterminer l'état du moi correspondant
        if (response.includes("ordre") || response.includes("imposer") || response.includes("dernier mot")) {
            results.Parent++;
        } else if (response.includes("comprendre") || response.includes("objectif") || response.includes("analyser")) {
            results.Adulte++;
        } else if (response.includes("émotion") || response.includes("pleurer") || response.includes("énervant")) {
            results.Enfant++;
        }
    }
}

// Fonction pour afficher les résultats
function afficherResultats() {
    var questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = '<h2 style="color: white;">Résultats :</h2>';


    for (var etatMoi in results) {
        var resultItem = document.createElement("p");
        resultItem.style.color = "#fff";
        var pourcentage = (results[etatMoi] / userResponses.length) * 100;
        resultItem.textContent = etatMoi + ": " + pourcentage.toFixed(2) + "%";
        questionContainer.appendChild(resultItem);
    }
}

// Fonction pour afficher la question actuelle
function afficherQuestion() {
    var questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    afficherTitre(questionContainer);
    afficherOptions(questionContainer);
    afficherBoutonSuivant(questionContainer);
}

// Fonction pour afficher le titre de la question
function afficherTitre(container) {
    var question = document.createElement("h2");
    question.style.color = "#fff";
    question.textContent = quiz[currentQuestion].question;
    container.appendChild(question);
}

// Fonction pour afficher les options de réponse avec une boîte de fond bleu
function afficherOptions(container) {
    var reponses = quiz[currentQuestion].reponses;
    for (var i = 0; i < reponses.length; i++) {
        var divReponse = document.createElement("div");
        divReponse.style.backgroundColor = "#0056b3"; // Définir la couleur de fond en bleu
        divReponse.style.borderRadius = "5px";
        divReponse.style.padding = "10px"; // Ajouter un espacement intérieur

        var label = document.createElement("label");
        label.style.display = "inline-block"; // Afficher les éléments en ligne
        label.style.marginRight = "10px"; // Ajouter de la marge à droite pour l'espacement

        var input = document.createElement("input");
        input.type = "radio";
        input.name = "reponse";
        input.value = reponses[i];

        label.appendChild(input);
        label.appendChild(document.createTextNode(reponses[i])); // Texte de la réponse

        divReponse.appendChild(label);

        container.appendChild(divReponse); // Ajouter la div au conteneur
        container.appendChild(document.createElement("br"));
    }
}



// Fonction pour afficher le bouton Suivant et gérer la logique
function afficherBoutonSuivant(container) {
    var suivantButton = document.createElement("button");
    suivantButton.textContent = "Suivant";
    suivantButton.onclick = function() {
        var selectedAnswer = document.querySelector('input[name="reponse"]:checked');
        if (selectedAnswer) {
            userResponses.push(selectedAnswer.value);
        }
        afficherQuestionSuivante();
    };
    container.appendChild(suivantButton);
}

// Fonction pour gérer la fin du quiz
function afficherQuestionSuivante() {
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        afficherQuestion();
    } else {
        calculerResultat();
        afficherResultats();
    }
}

// Initialiser le quiz en affichant la première question
window.onload = function() {
    afficherQuestion();
};