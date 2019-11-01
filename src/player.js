/* player
 * game's player
 */ 
var player = function(x, y){
    this.position = createVector(x, y);
    this.size = 30;

    // keep track of how long player has been empowered.
    this.empoweredTimer = 0;

    // track direction pointing, start pointing up
    this.angle = 0;
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.drag = 0.825;

    // ---------------------------------------------
    // ---------------------------------------------
    this.draw = function(){
        push();
        // always draw player in center of screen
        translate(width/2, height/2);
        rotate(this.angle);
        fill(255, 0, 0);
        stroke(0, 0, 0);
        //rect(-this.size/2, -this.size/2, this.size, this.size);
        image(images[0],-this.size/2, -this.size/2, this.size, this.size);
        pop();



        // TODO:
        // use radians?

    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update player state
    this.update = function(){
        // generate movement vector to add to player's current
        // but since doing every frame make sure to add
        // zero if no input is provided.
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

        // check collisions
        // TODO

        // update vectors
        this.acceleration = createVector(xDir, yDir);
        this.velocity.add(this.acceleration);
        this.velocity.mult(this.drag);
        this.position.add(this.velocity);

        this.angle = this.velocity.heading();
    };
};