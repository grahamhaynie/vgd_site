/* Wall -
* a wall has an x, y (center) that does not chance
* a wall is drawn as a 20x20 box.
*/
var wall = function(x, y){
    this.x = x;
    this.y = y;
    this.size = 30;

    // ---------------------------------------------
    // ---------------------------------------------
    // draw according to centerx, centery
    this.draw = function(cx, cy){
        push();
        var centerX = width/2 - cx;
        var centerY = width/2 - cy;
        translate(centerX, centerY);
        stroke(0, 0, 0);
        fill(82, 74, 63);
        rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        pop();
    };

    // check collision of something with an x, y with wall
    // return true if the otherX, otherY collide with this wall,
    // otherwise return false
    this.collidesWith = function(otherX, otherY){
        if(abs(otherX - this.x) < this.size && abs(otherY - this.y) < this.size){
            return true;
        }else {
            return false;
        }
    };

};
