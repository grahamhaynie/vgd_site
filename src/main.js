/* main.js
 * define top level functions here, such as user input and 
 * overall state controlling functions (draw, update)
 */

// instantiate global game object
var game = new gameObject();

// instantiate font
var qfont;

// global images list so can re-use for drawing on 
// menu and gameplay
var images = [];

// ---------------------------------------------
// ---------------------------------------------
// need to load images before program runs
function preload(){
    images.push(loadImage('resources/ass.png'));
    images.push(loadImage('resources/floor.png'));
    qfont = loadFont('resources/Quantum.otf');
}

// ---------------------------------------------
// ---------------------------------------------
// setup initial state
function setup() {
    // position canvas in center of screen
    var canvas = createCanvas(600, 600);
    game.setup();
};

//---------------------------------------------------
//---------------------------------------------------
/* handle key presses
 * each time key is pressed, record it
 * and each time a key is released, un-record it
 */
function keyPressed() {
    game.keyArray[keyCode] = 1;
};
function keyReleased() {
    game.keyArray[keyCode] = 0;
}; 

//---------------------------------------------------
//---------------------------------------------------
/* handle mouse clicks
 *
 */
mouseReleased = function(){
    // if on menu or in game and click, call menu's update
    if(game.state === 0 || game.state === 1){
        game.menu.updateClick();
    }
}  

// ---------------------------------------------
// ---------------------------------------------
function draw() {
    background(200, 200, 200);
    game.draw();
    game.update();
};