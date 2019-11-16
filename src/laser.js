/* Laser - 
 * A laser is shot from a source, which is stored internally.
 * A laser travels in the direction fired until it hits a wall
 * or an adversary. If it hits a wall, and is shot by a player, 
 * it is simply destroyed. Non-player lasers can go through walls. 
 * In neither case will lasers cause walls damage.
 * If it hits an adversary, it causes the adversary damage. A 
 * laser starts with an origin x, y and a direction
 */
var laser = function(x, y, angle, playerShot){
    this.position = new createVector(x, y);
    this.angle = angle;

    // track if laser is shot by player. if so, laser can 
    // not penetrate walls, otherwise a laser can go through
    // walls without causing them damage.
    this.playerShot = playerShot;

    // ---------------------------------------------
    // ---------------------------------------------
    // draw the laser, with respect ot center x, y of canvas
    this.draw = function(cx, cy){
        push();
        translate(width/2 - cx + this.position.x, width/2 - cy + this.position.y);
        rotate(this.angle);
        stroke(20, 201, 35);
        strokeWeight(4);
        line(0, 0, 0, -20);
        strokeWeight(1);
        pop();
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update the laser's state
    this.update = function(){
        // add velocity 
        var velocity = createVector(cos(this.angle - HALF_PI)*20, sin(this.angle - HALF_PI)*20);
        this.position.add(velocity);
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // check if laser has hit a wall
    this.hitWall = function(){
        if(this.playerShot){
            for(var i = 0; i < game.walls.length; i++){
                if(game.walls[i].health > 0 && abs(game.walls[i].x - this.position.x) < game.walls[i].size/2 && 
                abs(game.walls[i].y - this.position.y) < game.walls[i].size/2){
                    return true;
                }
            }
        }
        return false;
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // check if laser is out of screen
    this.outOfScreen = function(){
        if(this.position.x < -width/2 || this.position.y < -height/2 || 
            this.position.x > game.maxX + width/2 || this.position.y > game.maxY + height/2){
            return true;
        }else{
            return false;
        }
    };
};
