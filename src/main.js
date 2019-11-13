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

// debug flag set for rapid developement of levels
var debug = false;

// ---------------------------------------------
// ---------------------------------------------
// need to load images before program runs
function preload(){
    // background
    images.push(loadImage('resources/floor.png'));
    // character sprite map
    images.push(loadImage('resources/character_map.png'));
    qfont = loadFont('resources/spaceranger.ttf');
}

// ---------------------------------------------
// ---------------------------------------------
// setup initial state
function setup() {
    // position canvas in center of screen
    var canvas = createCanvas(600, 600);
    //var x = (windowWidth - width) / 2;
    //var y = (windowHeight - height) / 2;
    //canvas.position(x, y);
    canvas.parent('sketch-holder');

    game.setup();

    if(debug){
        game.menu.state = 4;
        game.loadLevel(0);
        game.state = 1;
    }
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
// draw function for processing, use as wrapper
// for drawing game and updating it.
function draw() {
    angleMode(RADIANS);
    background(200, 200, 200);
    game.draw();
    game.update();
};