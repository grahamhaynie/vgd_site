/* GameObject - 
 * this is an object to hold the 
 * state of the game - or the data 
 * for this specific instance of the game
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
        this.menuOffset = new createVector(-50, -50);
        this.menuDirection = new createVector(0.2, 0.3);
    };

    // ---------------------------------------------
    // ---------------------------------------------
    this.draw = function(){

        // draw floor background
        image(images[1], this.menuOffset.x, this.menuOffset.y, 700, 700);

        // draw menu
        if(this.state === 0){
            this.menu.draw();
        }

        // draw gameplay 
        else if(this.state === 1){
            // only draw walls that are in current frame
            for(var i = 0; i < this.walls.length; i++){
                if(this.walls[i].x >= this.centerX - width/2 - this.walls[i].size &&
                    this.walls[i].x <= this.centerX + width/2 + this.walls[i].size&&
                    this.walls[i].y >= this.centerY - width/2 - this.walls[i].size&& 
                    this.walls[i].y <= this.centerY + width/2 + this.walls[i].size){
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
    this.update = function(){
        if(this.state === 0){
            // update menu offset
            this.menuOffset.add(this.menuDirection);
            if(this.menuOffset.x > 0 || this.menuOffset.x < -100){
                this.menuDirection.x *= -1;
                this.menuOffset.add(this.menuDirection);
            }
            if(this.menuOffset.y > 0 || this.menuOffset.y < -100){
                this.menuDirection.y *= -1;
                this.menuOffset.add(this.menuDirection);
            }

        }
        // update game state, but only if menu is not in paused during game state
        if(this.state === 1 && this.menu.state === 4){
            // enforce that center of scren is player's x,y coordinates
            this.player.update();
            this.centerX = this.player.position.x;
            this.centerY = this.player.position.y;
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
            for(var x = 0; x < this.level.tilemap[y].length; x++){
                // if encounter a wall, add to walls list
                if(this.level.tilemap[y][x] == "w"){
                    this.walls.push(new wall(x*30 + 15, y*30 + 15));
                }   
                else if(this.level.tilemap[y][x] == "p"){
                    this.player = new player(x*30 + 15, y*30 + 15);
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