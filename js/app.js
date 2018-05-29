// Show modal when content is loaded
document.addEventListener('DOMContentLoaded', showModal);

const modal = document.querySelector('.md-modal');
const winningModal = document.querySelector('#winning-modal');

// Initial modal
function showModal() {
    modal.classList.add('md-show');
    heroSelection();
}

// Game over & restart game modal
function restartGame() {
    player.lives = 3;
    player.score = 0;
    winningModal.classList.remove('md-show');
    showModal();
}

// Clicking on the restart button shall reset the game
const restartBtn = document.querySelector('#restartBtn');
restartBtn.addEventListener('click', restartGame);

// Winning modal
function showWinningModal() {
    winningModal.classList.add('md-show');
}

// Allow hero selection
function heroSelection() {
    const heroBtn = document.querySelectorAll('.md-select');
    const btnLen = heroBtn.length;

    for (let i = 0; i < btnLen; i++) {
        heroBtn[i].addEventListener('click', function() {
            if (heroBtn[i].id === 'kitty') {
                player.sprite = 'images/char-cat-girl.png';
                modal.classList.remove('md-show');
            } else if (heroBtn[i].id === 'rose') {
                player.sprite = 'images/char-pink-girl.png';
                modal.classList.remove('md-show');
            } else if (heroBtn[i].id === 'lilith') {
                player.sprite = 'images/char-horn-girl.png';
                modal.classList.remove('md-show');
            } else {
                player.sprite = 'images/char-princess-girl.png';
                modal.classList.remove('md-show');
            }
        })
    }
}

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = 100 + Math.floor(Math.random() * 512);
        this.sprite = 'images/enemy-bug.png';
    }

    // Update enemy position
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
        this.checkCollision();
    };

    checkCollision() {
        if (player.x < this.x + 60 &&
            player.x + 60 > this.x &&
            player.y < this.y + 50 &&
            50 + player.y > this.y) {
            // Decrease lives left upon collision
            player.lives -= 1;
            player.reset();
        };
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class
class Player extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.sprite = 'images/char-boy.png';
        this.initialX = 200;
        this.initialY = 425;
        this.score = 0;
        this.lives = 3;
        this.won = false;
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
        this.gameOver();
        this.checkVictory();
    };

    // Increase the score when the player reaches the water
    increaseScore() {
        this.score += 10;
    }

    // Trigger the starting modal when ran out of lives
    gameOver() {
        if (this.lives === 0) {
            restartGame();
            showModal();
        }
    }

    // Display victory message when the player collects enough points
    checkVictory() {
        if (this.score === 100) {
            showWinningModal();
        }
    }

    // Reset to starting location
    reset() {
        this.x = this.initialX;
        this.y = this.initialY;
    };

    // Draw elements on canvas
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        // Draw score
        ctx.font = "italic 22px Open Sans";
        ctx.fillStyle = 'orange';
        ctx.fillText("Score: " + this.score + " /100", 5, 580);

        // Draw lives left
        ctx.font = "italic 22px Open Sans";
        ctx.fillStyle = 'red';
        ctx.fillText("Lives: " + this.lives, 410, 580);
    };

    // Added alternative keys
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
                this.y -= 100;
                break;
            case 'down':
            case 'altDown':
                this.y += 100;
                break;
        };

        // When the player reaches the water, restarts at the starting location
        if (this.y < 0) {
            this.increaseScore();
            this.reset();
        };
    };
}

// Create bonus objects class
/* class BonusObject extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.sprite = 'images/Gem Blue.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
} */

// Enemy instantiation
const allEnemies = [];
const enemyLocation = [20, 60, 140, 220];
const randomLoc = 100 + Math.floor(Math.random() * 15);

enemyLocation.forEach(function(y) {
    const enemy = new Enemy(randomLoc, y, this.speed);
    allEnemies.push(enemy);
});

// Player instantiation
const player = new Player(200, 425);

/* Todo: add bonus, collectible objects */



// Listen for keypress and allow character movement
document.addEventListener('keyup', function(e) {
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
