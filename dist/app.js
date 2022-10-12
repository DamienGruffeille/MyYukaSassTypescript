"use strict";
class Produit {
    constructor(value) {
        this.nom = value.product.product_name;
        this.codeEan13 = value.code;
        this.photo = value.product.image_front_small_url;
        this.nutriscoreGrade = value.product.nutriscore_grade;
        this.ecoScoreGrade = value.product.ecoscore_grade;
        this.novaGroup = value.product.nova_group;
        this.ingredients = value.product.ingredients_text;
        this.allergenes = value.product.allergens;
        this.nutrientLevelFat = traduireNiveauNutritionnel(value.product.nutrient_levels["fat"]);
        this.nutrientLevelSaturatedFat = traduireNiveauNutritionnel(value.product.nutrient_levels["saturated-fat"]);
        this.nutrientLevelSalt = traduireNiveauNutritionnel(value.product.nutrient_levels["salt"]);
        this.nutrientLevelSugar = traduireNiveauNutritionnel(value.product.nutrient_levels["sugar"]);
    }
}
// Bouton Afficher options
document
    .getElementById("btnAfficherOptions")
    .addEventListener("click", showOptions);
function showOptions() {
    let options = document.getElementById("choixOptions");
    let bouton = document.getElementById("btnAfficherOptions");
    if (options.style.display === "grid") {
        options.style.display = "none";
        bouton.innerHTML = "Afficher options";
    }
    else {
        options.style.display = "grid";
        bouton.innerHTML = "Cacher options";
    }
}
// Connexion et récupération des infos de l'API openfoodfacts
const searchButton = document.getElementById("btnSearch");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", getResults);
const api = "https://fr.openfoodfacts.org/api/2/product/";
function getResults() {
    const codeBarreRecherche = (document.getElementById("codeBarre")).value;
    const fullApi = api + codeBarreRecherche;
    // const fullApi = api + codeBarreRecherche + ".json";
    fetch(fullApi)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();
    })
        .catch(function (error) {
        console.log("Oh no it didn't work");
    })
        .then((value) => {
        if (value.status === 0) {
            showProductNotFoundErrorMessage();
        }
        else {
            const produit = new Produit(value);
            hideProductNotFoundErrorMessage();
            showContainers();
            printResults(produit);
            showPhotoVerdict(produit);
        }
    })
        .catch((error) => {
        console.log(error);
    });
}
// Gestion de l'affichage du message d'erreur "Product Not Found"
function showProductNotFoundErrorMessage() {
    let messageErreur = document.getElementById("error");
    messageErreur.style.display = "flex";
}
function hideProductNotFoundErrorMessage() {
    let messageErreur = document.getElementById("error");
    messageErreur.style.display = "none";
}
// Gestion de l'affichage des containers où sont retournées les infos produit
function showContainers() {
    let resultat = document.getElementById("resultat");
    let titre = document.getElementById("titre");
    let verdict = document.getElementById("verdict");
    let btnVerdict = document.getElementById("btnVerdict");
    titre.style.display = "block";
    resultat.style.display = "flex";
    verdict.style.display = "flex";
    btnVerdict.style.display = "flex";
}
// Intégration des informations produit dans les containers
function printResults(produit) {
    document.getElementById("nomProduit").innerHTML =
        "<span class='label'>Nom : </span>" + produit.nom;
    document.getElementById("codeBarres").innerHTML =
        "<span class='label'>Code EAN13 : </span>" + produit.codeEan13;
    /* Affichage la photo du produit*/
    showPhoto(produit.photo);
    /* Appel de la fonction pour définir l'image nutriScore à afficher */
    addNutriScore(produit.nutriscoreGrade);
    addNovaScore(produit.novaGroup);
    addEcoScore(produit.ecoScoreGrade);
    addListeIngredients(produit.ingredients);
    addListeAllergenes(produit.allergenes);
    addTableauNutritionnel(produit);
}
// Affichage de l'image du produit retournée par l'API
function showPhoto(url) {
    let photo = document.getElementById("imgProduit");
    photo.setAttribute("src", url);
    photo.style.display = "grid";
}
// Affichage de l'image nutriscore correspondante au score du produit
function addNutriScore(nutriScore) {
    let img = document.getElementById("imgNutriScore");
    switch (nutriScore) {
        case "a":
            img.setAttribute("src", "img/nutriscoreA1.jpg");
            break;
        case "b":
            img.setAttribute("src", "img/nutriscoreB.jpg");
            break;
        case "c":
            img.setAttribute("src", "img/nutriscoreC.jpg");
            break;
        case "d":
            img.setAttribute("src", "img/nutriscoreD.jpg");
            break;
        case "e":
            img.setAttribute("src", "img/nutriscoreE.jpg");
            break;
        default:
            img.setAttribute("src", "img/nutriscoreVierge.jpg");
    }
}
// Affichage de l'image NovaScore correspondante au score du produit
function addNovaScore(novaScore) {
    let img = document.getElementById("imgNova");
    switch (novaScore) {
        case 1:
            img.setAttribute("src", "img/nova1.jpg");
            break;
        case 2:
            img.setAttribute("src", "img/nova2.jpg");
            break;
        case 3:
            img.setAttribute("src", "img/nova3.jpg");
            break;
        case 4:
            img.setAttribute("src", "img/nova4.jpg");
            break;
        default:
            img.setAttribute("src", "img/novaNeutre.jpg");
    }
}
// Affichage de l'image EcoScore correspondante au score du produit
function addEcoScore(ecoScore) {
    let img = document.getElementById("imgEcoScore");
    switch (ecoScore) {
        case "a":
            img.setAttribute("src", "img/ecoScoreA.jpg");
            break;
        case "b":
            img.setAttribute("src", "img/ecoScoreB.jpg");
            break;
        case "c":
            img.setAttribute("src", "img/ecoScoreC.jpg");
            break;
        case "d":
            img.setAttribute("src", "img/ecoScoreD.jpg");
            break;
        case "e":
            img.setAttribute("src", "img/ecoScoreE.jpg");
            break;
        default:
            img.setAttribute("src", "img/ecoScoreNeutre.png");
    }
}
// Menu collapsible
let coll = document.querySelectorAll(".collapsible__button");
for (const element of coll) {
    element.addEventListener("click", function () {
        element.classList.toggle("active");
        let content = element.nextElementSibling;
        if (content.style.display === "flex") {
            content.style.display = "none";
        }
        else {
            content.style.display = "flex";
        }
    });
}
// Affichage de la liste des ingrédients retourné par l'API
function addListeIngredients(liste) {
    document.getElementById("listeIngredients").innerHTML = liste;
}
// Traduction des niveaux nutritionnels retournés par l'API de l'anglais vers le français
function traduireNiveauNutritionnel(termeATraduire) {
    switch (termeATraduire) {
        case "high":
            return "<span class='listeNutriments__high'>Elevé</span>";
        case "moderate":
            return "<span class='listeNutriments__moderate'>Modéré</span>";
        case "low":
            return "<span class='listeNutriments__low'>Bas</span>";
        default:
            return "<span class='listeNutriments__undefined'>Non défini</span>";
    }
}
// Affichage de la liste des allergènes retournée par l'API
function addListeAllergenes(liste) {
    document.getElementById("listeAllergenes").innerHTML = liste;
}
// Affichage des infos niveau nutritionnel retournées par l'API
function addTableauNutritionnel(produit) {
    let graisses = document.getElementById("fat");
    let saturatedFat = document.getElementById("saturatedFat");
    let sel = document.getElementById("salt");
    let sucres = document.getElementById("sugar");
    graisses.innerHTML = "Graisses : " + produit.nutrientLevelFat;
    saturatedFat.innerHTML =
        "Graisses saturées : " + produit.nutrientLevelSaturatedFat;
    sel.innerHTML = "Sel : " + produit.nutrientLevelSalt;
    sucres.innerHTML = "Sucres : " + produit.nutrientLevelSugar;
}
/* menu caroussel */
const items = document.querySelectorAll("img.carousel__container__slider-img, img.carousel__container__slider-img active");
const nbSlide = items.length;
let count = 0;
document.addEventListener("keydown", keyPress);
/* en fonction de la touche pressée, appelle la fonction correspondante */
function keyPress(e) {
    if (e.keyCode === 37) {
        slidePrecedente();
    }
    else if (e.keyCode === 39) {
        slideSuivante();
    }
}
/* actions pour bouton précédent / suivant */
const suivant = document.querySelector(".right");
const precedent = document.querySelector(".left");
precedent.addEventListener("click", slidePrecedente);
function slidePrecedente() {
    items[count].classList.remove("active");
    if (count > 0) {
        count--;
    }
    else {
        count = nbSlide - 1;
    }
    items[count].classList.add("active");
}
suivant.addEventListener("click", slideSuivante);
function slideSuivante() {
    items[count].classList.remove("active");
    if (count < nbSlide - 1) {
        count++;
    }
    else {
        count = 0;
    }
    items[count].classList.add("active");
}
/* Affichage du verdict final */
function calculScoreFinal(produit) {
    let scoreFinal = 0;
    switch (produit.nutriscoreGrade) {
        case "a":
            scoreFinal = -2;
            break;
        case "b":
            scoreFinal = -1;
            break;
        /* le case c n'est pas pris en compte car =0 */
        case "d":
            scoreFinal = 1;
            break;
        case "e":
            scoreFinal = 2;
            break;
    }
    switch (produit.novaGroup) {
        case 1:
            scoreFinal -= 2;
            break;
        case 2:
            scoreFinal -= 1;
            break;
        case 3:
            scoreFinal += 1;
            break;
        case 4:
            scoreFinal += 2;
            break;
    }
    switch (produit.ecoScoreGrade) {
        case "a":
            scoreFinal -= 2;
            break;
        case "b":
            scoreFinal -= 1;
            break;
        /* le case c n'est pas pris en compte car =0 */
        case "d":
            scoreFinal += 1;
            break;
        case "e":
            scoreFinal += 2;
            break;
    }
    return scoreFinal;
}
function afficheimg(chemin, titrepage, scrollbar) {
    document.getElementById("btnVerdict").addEventListener("click", function () {
        let titre = "verdict";
        let i1 = new Image();
        i1.src = chemin;
        let html = "<HTML><HEAD><TITLE>Images " +
            titre +
            " - " +
            titrepage +
            "</TITLE></HEAD>";
        html +=
            "<BODY LEFTMARGIN=0 MARGINWIDTH=0 TOPMARGIN=0 MARGINHEIGHT=0><CENTER>";
        html +=
            '<IMG SRC="' +
                chemin +
                '" BORDER=0 ALT="' +
                titrepage +
                '" NAME=imageTest ';
        html +=
            'onLoad="window.resizeTo(document.imageTest.width+14, document.imageTest.height+32)">';
        html += "</CENTER></BODY></HTML>";
        let popupImage = window.open("", "mysupimg", "toolbar=0, location=0, directories=0, menuBar=0, scrollbars=" +
            scrollbar +
            ", resizable=1");
        popupImage.document.open();
        popupImage.document.write(html);
        popupImage.document.close();
    });
}
function showPhotoVerdict(produit) {
    let scoreFinal = calculScoreFinal(produit);
    let chemin = "";
    if (scoreFinal === 0) {
        chemin = "img/neutre.jpg";
    }
    else if (scoreFinal < 0) {
        chemin = "img/OK.jpg";
    }
    else {
        chemin = "img/caca.jpg";
    }
    afficheimg(chemin, "Verdict Final", 0);
}
