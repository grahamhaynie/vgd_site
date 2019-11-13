/* GameObject - 
 * this is an object to hold the 
 * state of the game for this specific instance of the game
 */
var gameObject = function(){

    // ---------------------------------------------
    // ---------------------------------------------
    // create a setup that can be called to initialized game
    this.setup = function(){
        
        // keep track of game's state
        // 0 = menu
        // 1 = game
        this.state = 0;

        // menu item, menu has a state
        this.menu = new menuObject();

        // list to contain the walls
        this.walls = [];

        // keep track of keys currently pressed
        this.keyArray = [];

        // keep track of levels
        this.levels = [];

        // load levels
        this.levels.push(new tutorial());
        this.levels.push(new level1());

        // need an offset to draw menu 
        this.backgroundOffset = new createVector(-50, -50);
        this.menuDirection = new createVector(0.2, 0.3);

    };

    // ---------------------------------------------
    // ---------------------------------------------
    // draw the game in its current state
    this.draw = function(){

        // menu
        if(this.state === 0){
            // draw mars floor background
            image(images[0], this.backgroundOffset.x, this.backgroundOffset.y, 700, 700);
            this.menu.draw();
        }

        // gameplay
        else if(this.state === 1){
            // draw mars floor by stiching together images
            for(var x = 0; x < this.maxX + images[0].width; x+= images[0].width){
                for(var y = 0; y < this.maxY + images[0].height; y+= images[0].height){
                    image(images[0], this.backgroundOffset.x + x, this.backgroundOffset.y + y, 700, 700);
                }
            }

            // only draw walls that are in current frame and not picked up
            for(var i = 0; i < this.walls.length; i++){
                if(this.walls[i].x >= this.centerX - width/2 - this.walls[i].size &&
                    this.walls[i].x <= this.centerX + width/2 + this.walls[i].size &&
                    this.walls[i].y >= this.centerY - width/2 - this.walls[i].size && 
                    this.walls[i].y <= this.centerY + width/2 + this.walls[i].size &&
                    !this.walls[i].pickedUp){
                    this.walls[i].draw(this.centerX, this.centerY);
                }
            }

            this.player.draw();

            // draw menu box or menu during gameplay
            this.menu.draw();
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update game's state
    this.update = function(){
        if(this.state === 0){
            // update menu offset
            this.backgroundOffset.add(this.menuDirection);
            if(this.backgroundOffset.x > 0 || this.backgroundOffset.x < -100){
                this.menuDirection.x *= -1;
                this.backgroundOffset.add(this.menuDirection);
            }
            if(this.backgroundOffset.y > 0 || this.backgroundOffset.y < -100){
                this.menuDirection.y *= -1;
                this.backgroundOffset.add(this.menuDirection);
            }

        }
        // update game state, but only if menu is not in paused during game state
        if(this.state === 1 && this.menu.state === 4){
            // enforce that center of scren is player's x,y coordinates
            this.player.update();
            this.centerX = this.player.position.x;
            this.centerY = this.player.position.y;

            // update walls 
            for(var i = 0; i < this.walls.length; i++){
                this.walls[i].update();
            }

            // update offset for drawing background
            this.backgroundOffset.x = -(this.centerX % images[0].width);
            this.backgroundOffset.y = -(this.centerY % images[0].height);
        }

        // always want to update hover of menu
        this.menu.updateHover();
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // convert tilemap into objects for game object
    this.readTileMap = function(){
        // x and y are flipped for this loop because when
        // iterating, each line of the tilemap is the y
        // and each character of that line is the x
        for(var y = 0; y < this.level.tilemap.length; y++){
            // store maximum y value
            this.maxY = (this.level.tilemap.length-1)*40 + 20;

            for(var x = 0; x < this.level.tilemap[y].length; x++){
                // store maximum x value
                this.maxX = (this.level.tilemap[y].length-1)*40 + 20;

                // if encounter a wall, add to walls list
                if(this.level.tilemap[y][x] == "w"){
                    this.walls.push(new wall(x*40 + 20, y*40 + 20));
                }   
                else if(this.level.tilemap[y][x] == "p"){
                    this.player = new player(x*40 + 20, y*40 + 20);
                    this.centerX = this.player.position.x;
                    this.centerY = this.player.position.y;
                }                           
            }
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // load level at given index
    this.loadLevel = function(index){
        // check if in menu
        if(this.state === 0){
            this.level = this.levels[index];
            this.readTileMap();
            this.state = 1;
        }
    };

};