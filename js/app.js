

// Enemies to avoid

var Enemy = function(i, j, speed) {   
    
    this.i = i;
    this.j = j;
    this.speed = speed;
   this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position
Enemy.prototype.update = function(bug) {
    this.i += this.speed * bug;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.i >= 505) {
        this.i = 0;
    }

    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

// Draws the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
};


// This class requires an update(), render() and
// a handleInput() method.
var Player = function(i, j, speed) {
    this.i = i;
    this.j = j;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    
}

// Draw the player on the screen
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.i -= player.speed;
    }
    if (keyPress == 'up') {
        player.j -= player.speed - 30;
    }
    if (keyPress == 'right') {
        player.i += player.speed;
    }
    if (keyPress == 'down') {
        player.j += player.speed - 30;
    }
   
};
// Function to display player's score
var displayScoreLevel = function(Scores, Levels) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + Scores
        + ' || ' + 'Stage: ' + Levels;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};


var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.j + 131 >= anEnemy.j + 90
        && player.i + 25 <= anEnemy.i + 88
        && player.j + 73 <= anEnemy.j + 135
        && player.i + 76 >= anEnemy.i + 11) {
        player.i = 202.5;
        player.j = 383;
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.j + 63 <= 0) {        
        player.i = 202.5;
        player.j = 383;
       

   

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);

    }

    if (player.j > 383 ) {
        player.y = 383;
    }
    if (player.i > 402.5) {
        player.i = 402.5;
    }
    if (player.i < 2.5) {
        player.i = 2.5;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        
        allEnemies.push(enemy);
    }
};


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(202.5, 383, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to the
// Player.handleInput() method. 
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    
});
