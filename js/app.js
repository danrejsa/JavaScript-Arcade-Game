// Enemies to must avoid

var Enemy = function(i, j, speed) {         
    this.i = i;
    this.j = j;
    this.speed = speed;
 
    this.sprite = 'images/enemy-bug.png';
};

// This updates the enemy's position

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.i += this.speed * dt;

    // when off canvas, this resets position of enemy to move across again
    
    if (this.i > 550) {
        this.i = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // This checks for collision between player and enemies
    
    if (player.i < this.i + 60 &&
        player.i + 37 > this.i &&
        player.j < this.j + 25 &&
        30 + player.j > this.j) {
        player.i = 200;
        player.j = 380;
    }
};

// This draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
};

var Player = function(i, j, speed) {
    this.i = i;
    this.j = j;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {
    //This prevents player from moving beyond canvas wall boundaries
    if (this.j > 380) {
        this.j = 380;
    }

    if (this.i > 400) {
        this.i = 400;
    }

    if (this.i < 0) {
        this.i = 0;
    }

    // This checks for player reaching top of canvas and winning the game
    if (this.j < 0) {
        this.i = 200;
        this.j = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.i, this.j);
};

Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.i -= this.speed + 50;
            break;
        case 'up':
            this.j -= this.speed + 30;
            break;
        case 'right':
            this.i += this.speed + 50;
            break;
        case 'down':
            this.j += this.speed + 30;
            break;
    }
};

var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
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
