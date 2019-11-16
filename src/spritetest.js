/* spritetest.js
 * used to test sprites
 */

// global images list 
var images = [];

var angle = 0;
var spriteSize = 100;

var rotateFlag = false;
var rotateCounter = 60;

var incrementFlag = true;
var incTimer = 30;
var curIndexX = 0;
var curIndexY = 0;

// ---------------------------------------------
// ---------------------------------------------
function preload(){
    images.push(loadImage('resources/floor.png'));
    images.push(loadImage('resources/wall_map.png'));
    images.push(loadImage('resources/turret_map.png'));
};

// ---------------------------------------------
// ---------------------------------------------
function setup() {
    // position canvas in center of screen
    var canvas = createCanvas(600, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);

};

// ---------------------------------------------
// ---------------------------------------------
function draw() {
    background(images[0]);

    angleMode(RADIANS);

    push();
    translate(width/2, height/2);
    rotate(angle);
    image(images[1].get(0,0, 300, 300), -spriteSize/2, -spriteSize/2, spriteSize, spriteSize);
    image(images[2].get(curIndexX*300, curIndexY*300, 300, 300), -spriteSize/2, -spriteSize/2, spriteSize, spriteSize);
    pop();
    
    if(rotateFlag){
        if(rotateCounter > 0){
            rotateCounter--;
        }
        if(rotateCounter === 0){
            this.angle += HALF_PI/2;
            rotateCounter = 70;
        }
    }

    if(incrementFlag){
        if(incTimer > 0){
            incTimer--;
        }
        if(incTimer === 0){
            if(curIndexX  === 1){
                curIndexX = 0;
            }else{
                curIndexX = 1;
            }
            incTimer = 30;
        }
    }
};