/* Todo: Modal for player selection and game rules */

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = this.speed = 100 + Math.floor(Math.random() * 512);
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x > 505) {
            this.x = -150;
            this.speed = 100 + Math.floor(Math.random() * 368);
        }
        // Check for collision and teleport the character back to the starting position (src: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            player.reset();
        };
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.sprite = 'images/char-boy.png';
        this.initialX = 200;
        this.initialY = 425;
        this.score = 0;
        this.lives = 3;
    }

    // Prevent character from going off canvas
    update() {
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 425) {
            this.y = 425;
        }
    };

    // Reset to starting location
    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
    };

    // Draw elements on canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    handleInput(keyPressed) {
        switch (keyPressed) {
            case 'left':
            case 'altLeft':
                this.x -= 100;
                break;
            case 'right':
            case 'altRight':
                this.x += 100;
                break;
            case 'up':
            case 'altUp':
                this.y -= 80;
                break;
            case 'down':
            case 'altDown':
                this.y += 80;
                break;
        }

        // When player reaches the water, restarts at the starting location
        if (this.y < 0) {
            /* Todo: update score function */
            this.score++;
            this.reset();
        };
    };
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemyLocation = [20, 60, 140, 220];
const randomLoc = 100 + Math.floor(Math.random() * 15);

enemyLocation.forEach(function(y) {
    const enemy = new Enemy(randomLoc, y, this.speed);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
const player = new Player(200, 425);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'altUp',
        65: 'altLeft',
        68: 'altRight',
        83: 'altDown'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});