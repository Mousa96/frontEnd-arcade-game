//Declaring Game Constants
const rightEdge = 500;
const yIncrement = 90;
const leftEdge = 0;
const rightEdgePlayer = 400;
const xIncrement = 100;
const startingEnemyX = -50;
const startingX = 200;
const startingY = 400;
const widthHeight = 50;


// Enemies our player must avoid
var Enemy = function(x, y) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.speed = (Math.floor(Math.random() * 100) + 50) + getRandomInt(100); // Max Speed ≈ 250

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    var randomY = getRandomInt(3);
    if (this.x > rightEdge) { //When an enemy moves off the canvas, randomly generate new Y value for that enemy + reset its X location
        switch (randomY) {
            case 0:
                this.y = 50;
                this.x = startingEnemyX;
                break;
            case 1:
                this.y = 50 + yIncrement;
                this.x = startingEnemyX;
                break;
            case 2:
                this.y = 50 + (2 * yIncrement);
                this.x = startingEnemyX;
                break;
            default:
                this.y = 50;
                this.x = startingEnemyX;

        }
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomInt(max) { // returns an integer ranging from 0 inclusive up to but not including (max)
    return Math.floor(Math.random() * Math.floor(max));
} //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = startingX;
    this.y = startingY;

};

Player.prototype.update = function() { // Update the player's location but first check for potential collision
    this.checkCollisions();
};

Player.prototype.checkCollisions = function() { // Collision detection method, in case a collision was detected, call the reset method
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + widthHeight &&
            this.x + widthHeight > allEnemies[i].x &&
            this.y < allEnemies[i].y + widthHeight &&
            this.y + widthHeight > allEnemies[i].y) {
            this.reset();
        }
    }
}; //ref: https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection


Player.prototype.reset = function() // reset player's X and Y location to default values
{
    this.x = startingX;
    this.y = startingY;
};

Player.prototype.render = function() { // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e) { // based on user-input, update the player's location but first check for the canvas boundaries to ensure the player's doesn't move off the canvas.

    switch (e) {
        case 'left':
            if (this.x == leftEdge) {} else {
                this.x -= xIncrement;
            }
            break;
        case 'up':
            if (this.y < yIncrement) {
                this.reset();
                alert("Awesome!");
            } else {
                this.y -= yIncrement;
            }
            break;
        case 'right':
            if (this.x == rightEdgePlayer) {} else {
                this.x += xIncrement;
            }
            break;
        case 'down':
            if (this.y == startingY) {} else {
                this.y += yIncrement;
            }
            break;
        default:
            this.x = this.x;
            this.y = this.y;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(startingEnemyX, 50), new Enemy(startingEnemyX, 50 + yIncrement), new Enemy(startingEnemyX, 50 + (2 * yIncrement))];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
