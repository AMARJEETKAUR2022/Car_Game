// Get references to game elements
var blueCar = document.getElementById("bluecar");
var raceCar = document.getElementById("racecar");
var result = document.getElementById("result");
var score = document.getElementById("score");
var game = document.getElementById("game");
var jumpsound = document.getElementById("jumpsound");

// Initialize a counter to keep score
var counter = 0;
var bgPosition = 0; // Initial background position
var bgSpeed = 2;   // Adjust the value as needed for the desired speed


// Function to start the game
function startGame() {
    var startScreen = document.getElementById("start-screen");
    var game = document.getElementById("game");

    // Hide the start screen and show the game
    startScreen.style.display = "none";
    game.style.display = "block";
    moveBackground();
    // Start the game loop or perform any initialization here
}
// Move the blue car when its animation loops
blueCar.addEventListener("animationiteration", function () {
    // Randomly position the blue car within the game area
    var random = (Math.floor(Math.random() * 3)) * 130;
    blueCar.style.left = random + "px";
    counter++; // Increment the score
});

function moveBackground() {
    // Update the background position
    bgPosition += bgSpeed; // Adjust the value as needed for the desired speed
    // Apply the updated background position vertically
    game.style.backgroundPosition = `0 ${bgPosition}px`;
    // Continue moving the background by calling this function with a delay
    requestAnimationFrame(moveBackground);
}
// Move the race car when arrow keys are pressed
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left"));
        if (raceCarLeft < 260) {
            raceCar.style.left = (raceCarLeft + 130) + "px";
        }
        // Play the jump sound when moving right
        jumpsound.play();
    }

    if (e.key === "ArrowLeft") {
        var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left"));
        if (raceCarLeft > 0) {
            raceCar.style.left = (raceCarLeft - 130) + "px";
        }
        // Play the jump sound when moving left
        jumpsound.play();
    }
});

// Check for game over conditions
setInterval(function Gameover() {
    var blueCarTop = parseInt(getComputedStyle(blueCar).getPropertyValue("top"));
    var blueCarLeft = parseInt(getComputedStyle(blueCar).getPropertyValue("left"));
    var raceCarLeft = parseInt(getComputedStyle(raceCar).getPropertyValue("left"));

    if (blueCarLeft === raceCarLeft && blueCarTop > 450 && blueCarTop < 650) {
        crashsound.play()
        // Display the game over result and hide the game
        result.style.display = "block";
        game.style.display = "none";
        score.innerHTML = `Highest Score: ${counter}`; // Show the final score

        // Reset the score for a new game
        counter = 0;
    }
}, 10);
