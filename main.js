const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var wordObj="";
var wordLenght=0;
var wordString ="";
var wordHidden="";
var rnd=0;
var nbCoups = -1;
var nom = prompt("Saisir votre nom : ");

//Listeneur lorsqu'on clique sur un btn qui renvoi vers la fonction lettersControl
const button = document.querySelectorAll(".btn")
button.forEach(function(btn){
    btn.addEventListener('click', lettersControl)
})

//Listeneur lorsqu'on appuie sur une touche qui renvoi vers la fonction lettersControl avec un target(e)
document.querySelector('body').addEventListener('keypress', function (e) {
      lettersControl(e)
      console.log("touche pressée : "+e.key.toUpperCase())
});

//Pour la resize de la page
window.addEventListener("resize", setContainerHeight)
function setContainerHeight() {
    document.body.style.setProperty("--cHeight", window.innerHeight + "px");
}
setContainerHeight();

//Cacher le bloc infoPkmn, il n'apparaitra qu'en fin de partie quel que soit le resultat
document.getElementById("infoPkmn").style.display="none";

function init(){
    wordObj="";
    wordLenght=0;
    wordString ="";
    wordHidden="";
    rnd=0;
    nbCoups = -1;

    document.getElementById("infoPkmn").style.display="none";
    document.getElementById("state").style.display="flex";
    document.getElementById("word").style.color="black";
    document.getElementById("image").style.display="none";
    document.getElementById("imgPendu").remove();

    //document.getElementById("")



    document.querySelectorAll('button.btn').forEach(elem => {
        elem.disabled = false;
    });

    //document.getElementById("word").innerText="";

    jsonAcces()
    setTimeout(() => {
        constructPendu()
    }, 1000);

}

//Finction JsonAcess
function jsonAcces(){

    //Acces a mon fichier Json
    //génaration d'un id random par apport au nombre d'id dans mon Json
    //creation d'un objet avec le rnd généré
        fetch("./pkmn(3G).json").then(res1 => res1.json())
        .then(compter => {  wordLenght = (compter.length);
                            rnd = Math.floor(Math.random() * wordLenght) 
                            console.log("rnd = " + rnd)

                            wordObj = compter.find(item => item.id == rnd);

                            wordObj !== null ? console.log(wordObj) :
                            console.log("Introuvable")})
                            //console.log(wordObj)
        .catch(document.querySelector('.state').innerText = "Connexion avec le dictionnaire Pokémon")

        //Direction setTimeOut
                   
 }
 
//construction du mot
 function constructPendu(){
    //attribution de la variable wordstring avec le champ de l'objet qui nous interesse (le nom français)
    console.log(wordObj.name.french)
    wordString = wordObj.name.french;

    //variable pour connaitre la largeur de l'écran
    var screenSize = screen.width;
    //console.log(screenSize)
    screenSize <= 405 ? alert("Largueur < à 405 pixel,\nle contenu de la page peut\n être chamboulé") : null;

    //Remplacement des lettres par des tirets
    for(var i=0; i<wordString.length;i++){
        wordHidden+="-"
    }
    //console.log("HIDDEN : " + wordHidden)

    //Affichage sur la page HTML des tirets
    document.getElementById("word").innerText=wordHidden;

    //console.log("Nombres de pkmn : " + wordLenght)

    //remplissage de state
    if (wordLenght > 0){
        document.querySelector('.state').innerText += " : Succès\nLe nom du pokémon généré comporte " + wordString.length + 
        " lettres.\nVous jouez avec un dictionnaire de " + wordLenght + " pokémons (3G)\nRésolution de l'appareil : " 
        + screenSize + " px";
    
        //controle des caractères accentués
        var controlMot =""
        var controlMot2="";
        for (i=0; i<wordString.length;i++){
            controlMot = wordString[i]     .replace("é", "e")
                                            .replace("è", "e")
                                            .replace("ê", "e")
                                            .replace("ë", "e")
                                            .replace("î", "i")
                                            .replace("ï", "i")
                                            .replace('ô', "o")
                                            .replace("û", "u")
                                            .replace("ù", "u")
                                            .replace("ç", "c")
                                            .replace("à", "a");     
            
            //console.log("Essai " + i + controlMot);
            controlMot2 += controlMot;
            //console.log(controlMot2)
        }
        //reconstruction du mot et transforamtion en majuscule
        //console.log("Hors boucle "  + controlMot2);
        
        wordString = controlMot2.toUpperCase();
        //console.log(wordString);
        incrementPhoto()
        

        // si erreur affciher un message dans state
    }else{
        document.querySelector('.state').innerText += " : Erreur \nImpossible de contacter le dictionnaire"
        
    }
 }

 function lettersControl(e){
    
    //Controle de la lettre tapé au clavier, si c'est différent de undifine c'est que l'encodagz n'a été fait au clavier physique
    if ( e.key != undefined){
        var lettreClavier =  e.key.toUpperCase();
        console.log("lettre transmise : " + lettreClavier)
    }

    
    //Convertion de la lettre choisie a l'ecran en string Majuscule
    if (lettreClavier != null){
        var lettre = lettreClavier} 
        else{
            var lettre = this.innerText;  
    }
    //dans le cas d'un keypress
    console.log("LETTRE : " + lettre)

    //console.log(mot.toUpperCase());  

    //Desactivation de la lettre choisie a l'écran
    const but = $$('.btn');
    //console.log(but);
    for(var i=0; i<but.length; i++){
        if (but[i].innerHTML == lettre){
            but[i].disabled = true;
        }
        
    }
    //desactier la touche où on a cliqué a l'écran
    this.disabled = true;
    
    //console.log(lettre);

    //declaration d'un compteur a 0
    var cpt=0;

    for (var i=0; i<wordString.length; i++){

        //Si la letttre choisie existe direction replaceLetter et on incremente compteur
        if (wordString[i].toUpperCase() == lettre){
            cpt++; 
            return replaceLetters(lettre);
        }   
    }

    //Si la lettre choisie n'existe pas, cpt n'aura pas été incrementé et direction IncrementPhoto
    if (cpt == 0){
        //console.log("la lettre '"+lettre+"' n'existe pas dans ce mot")
        incrementPhoto();
    }

}

function replaceLetters(letter){

    //Boucle vérifiant si le Xème caractere est similaire a celui choisi
    //Si la lettre choisi existe, je regarde sa position et je remplace le tiret par cette derniere
    for (var i=0; i<wordString.trim().length; i++){

        if (wordString[i] == letter){
            //wordHidden(de 0 jusque la position de la bonne lettre[i]) + la lettre + le reste des tirets ou du mot
            wordHidden = wordHidden.substring(0, i) + letter + wordHidden.substring(i + 1);
            console.log("Etat " + wordHidden + " " + i);  
            }}

        //réécriture du mot avec les lettres trouvées
        document.getElementById("word").innerText=wordHidden

        //Si wordString = wordHidden alors c'est gagné (trim par sécurité)
        if (wordString.trim() == wordHidden){
                    
            alert("Bien ouej " + nom + "\nTu as gagné !")
            document.getElementById('imgPendu').src="images/9.gif";
            definition();
            document.querySelectorAll('button.btn').forEach(elem => {
            elem.disabled = true;
            });
        }
}

 function incrementPhoto(){
    //console.log("incrementphoto : " + nbCoups)
    document.getElementById("image").style.display="flex";
    //Incremente le nombre de coup de 1
    nbCoups++;
    //console.log("incrementphoto2 : " + nbCoups)

    var img = document.createElement("img");
    // document.getElementById("image").src = "hackanm.gif"; 

    //Si le nombre de coup est a 0 (debut partie) générer image de debut
    if (nbCoups ==0){
        //var img = document.createElement("img");
        img.src = "images/0.png";
        img.id="imgPendu";
        var src = document.getElementById("image");
        src.appendChild(img);

    }else{

        //sinon, MAJ de l'image deja créé

        var image = document.querySelector(".image img");
  
        image.src = "images/"+nbCoups+".png";
        image.style.backgroundSize="cover"
        //console.log(image);
        //console.log(nbCoups);

        //Quand le nombre de coup arrive a 7, cela signifique un GAME OVER,
        //Verrouillage de toutes les autres lettres
        if (nbCoups==7){
            alert("Game Over "+nom +"\nTu es un(e) noob\nLe mot était: "+ wordString)
            definition()
            document.querySelectorAll('button.btn').forEach(elem => {
                elem.disabled = true;
            });
            document.getElementById("word").innerText = wordString;
            document.getElementById("word").style.color="maroon";
        }
    }
}

function definition(){
    let pokedex ="";
    //générer photo pkmn
    var imgPokemon = document.getElementById('imgPokedex');
    var descPokemon = document.getElementById('statsPokedex')


    //retravailler le numéro de pokedex sur 3 chiffres
    wordObj.id < 100 ? pokedex = "0"+ wordObj.id.toString() : null
    wordObj.id < 10 ? pokedex = "00"+ wordObj.id.toString() : null
    wordObj.id >= 100 ? pokedex = wordObj.id.toString() : null

    document.getElementById("infoPkmn").style.display= "flex";
    //console.log(pokedex)
    imgPokemon.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+pokedex+".png";
    //imgPokemon.style.float="left"
    var src = document.getElementById("infoPkmn");
    src.appendChild(imgPokemon);

    //infoPoké
    descPokemon.innerText = "N° Pokédex : " + wordObj.id + "\nType : " + wordObj.type 
    + "\nStats de base : " + "Att. " + wordObj.base.Attack + " Def. " + wordObj.base.Defense
    + " Vit. "+ wordObj.base.Speed ;
    src.appendChild(descPokemon);

    //button rejouer
    var btn = document.getElementById("btnReplay");   // Create a <button> element
    btn.innerHTML = "REJOUER";    
    btn.className="btnReplay"          // Insert text
    src.appendChild(btn);   

    //supprimer la div state
    //document.getElementById("state").remove("state")
    document.getElementById("state").style.display="none";

    document.querySelector(".btnReplay").addEventListener('click', replay);
  
}
//relancer la page
function replay(){
    console.log("REPLAY")
    init();
    //document.location.reload();
}


jsonAcces()
setTimeout(() => {
    constructPendu()

}, 1000);

