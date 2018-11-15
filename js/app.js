// Enemies to avoid
var Enemy = function(i, j, speed) {       
    this.i = i;
    this.j = j;
    this.speed = speed;
    
    // The image/sprite for enemies, 
    this.sprite = 'images/enemy-bug.png';
};

// This updates the enemy's position
Enemy.prototype.update = function(dt) {
    this.i = this.i + this.speed * dt;
    if (this.i >= 505) {
        this.i = 0;
    }
    this.checkCollision();
};

// This draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
};

// This checks enemy's collision with player
Enemy.prototype.checkCollision = function() {
    if (player.j + 131 >= this.j + 90 &&
        player.j + 73 <= this.j + 135 &&
        player.i + 25 <= this.i + 88 &&
        player.i + 76 >= this.i + 11) {
        console.log('collision');
        gameReset();
    }
};

var Player = function(i, j, speed) {
    this.i = i;
    this.j = j;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

// This updates method for Player
Player.prototype.update = function() {};

// This renders the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
};


 //This handles input for the player
 
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.i = (this.i - this.speed + 505) % 505;
    } else if (key == 'right') {
        this.i = (this.i + this.speed) % 505;
    } else if (key == 'up') {
        this.j = (this.j - this.speed + 606) % 606;
        // going to water
        if (this.j <= (83 - 48)) { 
            gameOver();
            return;
        }
    } else {
        this.j = (this.j + this.speed) % 606;
        if (this.j > 400) { 
            this.j = 400;
        }
    }
    // x axis wrap
    if (this.i < 2.5) {
        this.i = 2.5;
    }
    if (this.i > 458) {
        this.i = 458;
    }
};

 //This resets the player to default position
 
Player.prototype.reset = function() {
    this.i = 202.5;
    this.j = 383;
};

var allEnemies = [];
var player = new Player(0, 0, 50);
var scoreDiv = document.createElement('div');
gameReset(); // setup defaults
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);

// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This increase enemies by score
var score = 0;

 //This resets the game in case of collision

function gameReset() {
    player.reset();
    score = 0;
    updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60)
    );
}

// game over successfully (reached water)

function gameOver() {
    player.reset();
    score += 1;
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

 //This updates the on screen score display

function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}
