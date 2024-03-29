/* Adversary - 
 * Starts in a random position a predefined distance from the center of the map.
 * Adversaries move towards the nearest base, and upon reaching a base will cause
 * damage to it, and despawn.
 *
 */
var adversary = function(){
    // spawn a certain distance from center
    var spawnAngle = random(0, 2*PI);
    this.position = new createVector(cos(spawnAngle)*game.maxX + game.maxX/2 - 20, sin(spawnAngle)*game.maxY + game.maxY/2 - 20);
    this.size = 30;

    // start adversary with 100 health
    this.health = 100;

    // offset for drawing appropriate sprite
    this.spriteOffsetX = 0;
    this.spriteOffsetY = 0;
    
    // timer to animate running
    this.runTimer = 10;

    // every 30 frames, want to re-calculate nearest base in case becomes closer to another one
    this.nearestBaseTimer = 30;

    // ---------------------------------------------
    // ---------------------------------------------
    // get the nearest base, calculate velocity based on that
    this.getNearestBase = function(){
        // locate nearest base, attempt to move there
        this.nearestBase = -1;
        var nearestBaseDist = game.maxX*game.maxY;
        for(var i = 0; i < game.walls.length; i++){
            if(game.walls[i] instanceof base && game.walls[i].health > 0){
                var d = dist(game.walls[i].x, game.walls[i].y, this.position.x, this.position.y);
                if(d < nearestBaseDist){
                    nearestBaseDist = d;
                    this.nearestBase = i;
                }
            }
        }
        if(this.nearestBase !== -1){
            var dx = this.position.x - game.walls[this.nearestBase].x + 20;
            var dy = this.position.y - game.walls[this.nearestBase].y + 20;
            var distV = new createVector(-dx, -dy);
            
            this.velocity = new createVector(-dx, -dy);
            this.velocity.normalize();
            this.angle = this.velocity.heading() + HALF_PI;
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // check if adversary is hit by a laser, if so decrement health
    // and delete laser that hit adversary
    this.checkLaser = function(){
        for(var i = 0; i < game.lasers.length; i++){
            if(abs(game.lasers[i].position.x - this.position.x) < this.size/2 && 
               abs(game.lasers[i].position.y - this.position.y) < this.size/2){
                this.health-= 20;
                game.lasers.splice(i, 1);
            }
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // draw adversary according to center x, y
    this.draw = function(cx, cy){
        push();
        // adjust to where center of screen is
        translate(width/2 + this.position.x - cx, height/2 + this.position.y - cy);
        rotate(this.angle);
        // draw sprite
        image(images[2].get(this.spriteOffsetX*300, this.spriteOffsetY*300, 300, 300),-(this.size+10)/2, -(this.size+10)/2, this.size + 10, this.size + 10);
        pop();

        // update run animation
        if(this.runTimer > 0){
            this.runTimer--;
            if(this.runTimer === 0){
                this.runTimer = 10;
                if(this.spriteOffsetX === 0){
                    this.spriteOffsetX = 1;
                }else{
                    this.spriteOffsetX = 0;
                }
            }
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update adversary's state
    this.update = function(){

        // check collision with lasers
        this.checkLaser();

        // check for collision with walls
        for(var i = 0; i < game.walls.length; i++){
            // only check collisions with non-picked up blocks, and walls with health  > 0
            if(!game.walls[i].pickedUp && game.walls[i].health > 0 && (game.walls[i] instanceof wall || game.walls[i] instanceof turret)){

                if(game.walls[i].collidesWith(this.position.x + this.velocity.x, this.position.y + this.velocity.y, this.size)){
                    game.walls[i].health -= 20;
                    this.velocity.x = 0;
                    this.velocity.y = 0;

                    // figure out if x or y is farther
                    var dx = abs(game.walls[this.nearestBase].x - this.position.x);
                    var dy = abs(game.walls[this.nearestBase].y - this.position.y);
                }
            }
        }

        // finally add velocity
        this.position.add(this.velocity);

        // re-check where nearest base is
        if(this.nearestBaseTimer > 0){
            this.nearestBaseTimer--;

            if(this.nearestBaseTimer === 0){
                this.getNearestBase();
                this.nearestBaseTimer = 30;
            }
        }

    };

    // ---------------------------------------------
    // ---------------------------------------------
    // check if adversary has collided with base
    this.collideBase = function(){
        for(var i = 0; i < game.walls.length; i++){
            if(game.walls[i] instanceof base  && game.walls[i].health > 0 && game.walls[i].collidesWith(this.position.x, this.position.y, this.size)){
                // also damage the base 
                game.walls[i].health-= 10;
                // check that base is not defeated
                game.walls[i].update();
                return true;
            }
        }
        return false;
    };


    // TODO - function to check defeat, or success

    // ---------------------------------------------
    // ---------------------------------------------    
    // check collision of something with an x, y with adversary
    // return true if the otherX, otherY collide with this adversary,
    // otherwise return false
    this.collidesWith = function(otherX, otherY, otherSize){
        if(abs(otherX - this.position.x) < this.size/2 + otherSize/2 && abs(otherY - this.position.y) < this.size/2 + otherSize/2){
            return true;
        }else {
            return false;
        }
    };

};