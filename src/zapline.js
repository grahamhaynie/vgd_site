/* zapline
 * a line spanning from x1, y1 to x2, y2
 * that is drawn as a line with lightning effects
 */
var zapline = function(x1, y1, x2, y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    // count frames
    this.frameCount = 0;

    // points to draw lightning between 
    this.points = [];
    // add some points

    // ---------------------------------------------
    // ---------------------------------------------
    this.draw = function(){
        stroke(0, 0, 0, 100);
        strokeWeight(4);
        //line(this.x1, this.y1, this.x2, this.y2);

        // draw points
        stroke(20, 201, 35);
        for(var i = 1; i < this.points.length; i++){
            line(this.points[i].x, this.points[i].y, this.points[i-1].x, this.points[i-1].y);
        }
    };
    // ---------------------------------------------
    // ---------------------------------------------
    // update zap line
    this.update = function(){
        this.frameCount++;
        if(this.frameCount % 5 === 0){
            this.points = [];
            var x = this.x1;
            var y = this.y1;
            var i = 0;
            var d = dist(this.x1, this.y1, this.x2, this.y2);
            while(i <= d){
                this.points.push(new createVector(x + random(0, 5), y + random(0, 5)));
                x += (this.x2 - this.x1)/10;
                y += (this.y2 - this.y1)/10;
                i += d/10;
            }
            this.points[this.points.length - 1] = new createVector(this.x2, this.y2);
        }
    };
    
};