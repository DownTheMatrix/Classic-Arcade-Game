# Classic Arcade Game Clone "Frogger"

## Overview
This is a project for my Udacity/Google FEND Scholarship Nanodegree Program. The arts and assets were provided by Udacity. 
The student task was to work on the app.js file and use OOP concepts and features to initialize the game.

![Game Screen](https://github.com/DownTheMatrix/Classic-Arcade-Game/blob/master/Screenshot.png?raw=true)

### How To Run The Game
+ Clone the repository to your local machine or download the project as a .zip file
+ Don't alter the folder/files disposition
+ Click on the index.html file to open the app in your browser

In case you run into some issues, and cannot display the game correctly, try running the app in a local server. To launch a local server, try with the following methods: 

+ Launch a local server with Python (open the console and type):

  `python -m http.server` (for Python 3x);
  
  `python -m SimpleHTTPServer` (for Python 2x);

Then move to the default address `http://localhost:8000`.

+ Launch a local server with Node (open the node.js console and type):

  `http-server`

As above, the default address is `http://localhost:8000`.

Alternatively, you can try it out here: [Live Demo](https://downthematrix.github.io/Classic-Arcade-Game/)

### Game Rules
The user can select one hero, and must lead him/her to the water area without colliding with the enemies which are randomly generated and run across the screen. The player starts with 3 lives. If the player hits the enemies, the hero will lose 1 life and will be transported back to the starting point. The player wins when collects 100 points.
When the hero runs out of lives, the game is lost and the initial screen will pop up. Here, the user can select another hero and try again.

If the player reaches the water safely, 10 points will be added to the total score. 
Once the hero collects 100 points, the game is won and another screen will appear where the user can decide to restart the game. 

#### Keyboard Commands
In order to move the character around the screen, you can use the arrow keys (UP LEFT DOWN RIGHT), or, alternatively, the combination of W A S D. 

#### Code Dependencies
The project is realized using Vanilla JS (no frameworks). 

##### Todo
I plan to add a few features in the future to make the game more visually appealing and enjoyable: 

+ Add collectible items which contribute to accumulate points
+ Add heart objects which add 1 life available for the player
+ Add extra selectable heroes
+ Add different playable levels

