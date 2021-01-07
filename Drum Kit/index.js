//DISPLAY BUTTON PRESSED
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) //length of the drum buttons using query selector
{
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {

        var buttonInnerHTML = this.innerHTML; //this is the button which triggered the event listener

        makeSound(buttonInnerHTML);

        buttonAnimaton(buttonInnerHTML);

    }); //get new number between the length the of the drum buttons
}
// "this" : basically returns identity of the button that triggered the event listener

//KEYBOARD KEY PRESSED
document.addEventListener("keypress", function(event) {

    makeSound(event.key); //"event" is the button that triggered the keydown event and ".key" gives the key name that is pressed on keyboard

    buttonAnimaton(event.key);
});


function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case "l":
            var kick_bass = new Audio("sounds/kick-bass.mp3");
            kick_bass.play();
            break;

        default:
            console.log(key);
            break;
    }
}

function buttonAnimaton(currentKey) {

    var activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function() { activeButton.classList.remove("pressed"); }, 100);
}






//EXTRA ABOUT CREATING CONSTRUCTOR AND FUNCTION IN THAT CONSTRUCTOR OBJECT

//below function is a constructor function as it has capital letter at the start and every next word has capital letter at start and it also has parameters
//function HouseKeeper(yearsOfExperience, name, cleaning){
//    this.yearsOfExperience = yearsOfExperience; 
//    this.name = name; //"this"object.name = "name" that was given as an input to when we created this object
//    this.cleaning = cleaning;    
//    this.clean = function(){
//     alert("This room needs to be cleaned.");}
//}

//var housekeeper2 = new HouseKeeper(12, "Jammy", ["bathroom", "washroom"]); //new housekeeper2 object has created
// housekeeper2.clean(); //the "clean" function in the constructor will be executed