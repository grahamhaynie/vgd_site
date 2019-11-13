/* menuPlayer
 * a dummy player that can be drawn on the menu, so that the player 
 * can test out the controls
 * a menuPlayer can be rotated with the arrow keys
 */ 
var menuPlayer = function(x, y){
    this.position = createVector(x, y);
    this.size = 60;

    // track direction pointing, start pointing up
    this.angle = 0;

    // ---------------------------------------------
    // ---------------------------------------------
    // draw at appropriate position and rotation using sprite
    this.draw = function(){
        push();
        // always draw player in center of screen
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        fill(255, 0, 0);
        stroke(0, 0, 0);
        image(images[0],-this.size/2, -this.size/2, this.size, this.size);
        pop();
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update player state
    this.update = function(){
        // just want to record direction looking in, so player
        // can just look in particular direction
        var xDir = 0;
        var yDir = 0;
        if (game.keyArray[LEFT_ARROW] === 1) {
            xDir = -1;
        }
        if (game.keyArray[RIGHT_ARROW] === 1) {
            xDir = 1;
        }
        if(game.keyArray[UP_ARROW] === 1){
            yDir = -1;
        }
        if(game.keyArray[DOWN_ARROW] === 1){
            yDir = 1;
        }
        if(!(xDir === 0 && yDir === 0)){
            this.direction = createVector(xDir, yDir);

            this.angle = this.direction.heading() + HALF_PI;
        }
    };
};