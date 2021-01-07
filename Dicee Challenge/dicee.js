var randomNumbers1 = (Math.floor(Math.random() * 6) + 1);
var randomDice1 = ("dice" + randomNumbers1);
var i = 0;
while (i < 1) {
    document.querySelector(".img1").setAttribute("src", "images/" + randomDice1 + ".png");
    i++;
}


var randomNumbers2 = (Math.floor(Math.random() * 6) + 1);
var randomDice2 = ("dice" + randomNumbers2);
var i = 0;
while (i < 1) {
    document.querySelector(".img2").setAttribute("src", "images/" + randomDice2 + ".png");
    i++;
}


if (randomNumbers1 > randomNumbers2) {
    document.querySelector("h1").textContent = "🚩Player 1 Wins";
} else if (randomNumbers1 < randomNumbers2) {
    document.querySelector("h1").textContent = "Player 2 Wins🚩";
} else if (randomNumbers1 == randomNumbers2) {
    document.querySelector("h1").textContent = "Draw";
} else {
    document.querySelector("h1").textContent = "Error in code !";
}