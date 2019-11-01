/* menuObject
 * a top level menu object to contain menu items
 */
var menuObject = function(){

    // give menu a state
    // 0 = main menu
    // 1 = selecting levels
    // 2 = Instructions
    // 3 = options
    // 4 = menu box during gameplay
    // 5 = menu if clicked during gameplay
    
    this.state = 0;

    // add a hover effect to menu items
    this.hover = '';

    // add lines to draw title animation
    this.zaplines = [];
    // add those lines
    //M
    this.zaplines.push(new zapline(3*(width/10), width/10, 3*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(3*(width/10), width/10, 3.5*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(4*(width/10), width/10, 3.5*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(4*(width/10), width/10, 4*(width/10), 2*(width/10)));
    //A
    this.zaplines.push(new zapline(4.8*(width/10), width/10, 5.1*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(4.8*(width/10), width/10, 4.5*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(4.6*(width/10), 1.5*(width/10), 5*(width/10), 1.5*(width/10)));
    //R
    this.zaplines.push(new zapline(5.5*(width/10), width/10, 5.5*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(5.5*(width/10), 1.5*(width/10), 6*(width/10), 2*(width/10)));
    this.zaplines.push(new zapline(5.5*(width/10), (width/10), 6*(width/10), 1.2*(width/10)));
    this.zaplines.push(new zapline(5.5*(width/10), 1.5*(width/10), 6*(width/10), 1.2*(width/10)));
    //S
    this.zaplines.push(new zapline(6.3*(width/10), 1.3*(width/10), 6.7*(width/10), (width/10)));
    this.zaplines.push(new zapline(6.3*(width/10), 1.3*(width/10), 6.7*(width/10), 1.6*(width/10)));
    this.zaplines.push(new zapline(6.3*(width/10), 2*(width/10), 6.7*(width/10), 1.6*(width/10)));
    
    //I
    this.zaplines.push(new zapline(1.5*(width/10), 2.5*(width/10), 1.5*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(1.2*(width/10), 2.5*(width/10), 1.8*(width/10), 2.5*(width/10)));
    this.zaplines.push(new zapline(1.2*(width/10), 3.5*(width/10), 1.8*(width/10), 3.5*(width/10)));
    //N
    this.zaplines.push(new zapline(2.2*(width/10), 2.5*(width/10), 2.2*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(2.2*(width/10), 2.5*(width/10), 2.8*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(2.8*(width/10), 2.5*(width/10), 2.8*(width/10), 3.5*(width/10)));
    //V 
    this.zaplines.push(new zapline(3.1*(width/10), 2.5*(width/10), 3.4*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(3.7*(width/10), 2.5*(width/10), 3.4*(width/10), 3.5*(width/10)));
    //A
    this.zaplines.push(new zapline(4.3*(width/10), 2.5*(width/10), 4.6*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(4*(width/10), 3.5*(width/10), 4.3*(width/10), 2.5*(width/10)));
    this.zaplines.push(new zapline(4.2*(width/10), 3*(width/10), 4.5*(width/10), 3*(width/10)));
    //S
    this.zaplines.push(new zapline(4.8*(width/10), 2.8*(width/10), 5.2*(width/10), 2.5*(width/10)));
    this.zaplines.push(new zapline(4.8*(width/10), 2.8*(width/10), 5.2*(width/10), 3.1*(width/10)));
    this.zaplines.push(new zapline(4.8*(width/10), 3.5*(width/10), 5.2*(width/10), 3.1*(width/10)));
    //I
    this.zaplines.push(new zapline(5.7*(width/10), 2.5*(width/10), 5.7*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(5.4*(width/10), 2.5*(width/10), 6*(width/10), 2.5*(width/10)));
    this.zaplines.push(new zapline(5.4*(width/10), 3.5*(width/10), 6*(width/10), 3.5*(width/10)));
    //O
    this.zaplines.push(new zapline(6.4*(width/10), 2.5*(width/10), 6.4*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(7*(width/10), 2.5*(width/10), 7*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(6.4*(width/10), 2.5*(width/10), 7*(width/10), 2.5*(width/10)));
    this.zaplines.push(new zapline(6.4*(width/10), 3.5*(width/10), 7*(width/10), 3.5*(width/10)));
    ///N
    this.zaplines.push(new zapline(7.5*(width/10), 2.5*(width/10), 7.5*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(7.5*(width/10), 2.5*(width/10), 8.1*(width/10), 3.5*(width/10)));
    this.zaplines.push(new zapline(8.1*(width/10), 2.5*(width/10), 8.1*(width/10), 3.5*(width/10)));

    // ---------------------------------------------
    // ---------------------------------------------
    // draw the game's title
    this.drawGameTitle = function(){
        for(var i = 0; i < this.zaplines.length; i++){
            this.zaplines[i].draw();
            this.zaplines[i].update();
        }
    }

    // ---------------------------------------------
    // ---------------------------------------------
    // draw a menu box with given dimensions and text, 
    // also draw differently if highlighted
    this.drawMenuBox = function(x, y, w, h, t, small){
        fill(214, 214, 214);
        stroke(0, 0, 0);
        strokeWeight(5);
        if(small){
            strokeWeight(3);
        }
        // draw stroke differently if highligted
        if(this.hover == t){
            stroke(64, 186, 45);
        }
        // draw box
        rect(x, y, w, h, 10);
        // draw text
        fill(0, 0, 0);
        noStroke();
        if(small){
            text(t, x + w/2, y + h*8/10);
        }else{
            text(t, x + w/2, y + h*2/3);
        }
        strokeWeight(1);
    }

    // ---------------------------------------------
    // ---------------------------------------------
    // draw text t at x, y
    this.drawTitle = function(t, x, y){
        fill(214, 214, 214);
        stroke(0, 0, 0);
        strokeWeight(3);
        textFont(qfont);
        textSize(30);
        textAlign(CENTER);
        text(t, x, y);
    }

    // ---------------------------------------------
    // ---------------------------------------------
    // draw menu
    this.draw = function(){
        // main menu
        if(this.state === 0){
            // draw title
            this.drawGameTitle();
            this.drawTitle("By Graham Haynie", width/2, 4.5*(width/10));

            // draw menu selection options
            this.drawMenuBox(width/6, 3*(width/6), 2*(width/3), width/8, 'Select Level', false);
            this.drawMenuBox(width/6, 4*(width/6), 2*(width/3), width/8, 'Instructions', false);
            this.drawMenuBox(width/6, 5*(width/6), 2*(width/3), width/8, 'Options', false);

        }
        // level selection
        else if(this.state === 1){
            fill(214, 214, 214);
            stroke(0, 0, 0);
            strokeWeight(3);
            textSize(30);
            textAlign(CENTER);
            text("Select level:", width/2, 40);

            // draw level selection boxes
            // show level name and level difficulty in box
            for(var x = 0; x < game.levels.length; x++){
                if(x < 3 ){
                    fill(214, 214, 214);
                    stroke(0, 0, 0);
                    if(this.hover === 'level' + str(x)){
                        stroke(20, 201, 35);
                    }
                    rect(x*(width/3) + width/24, width/4, width/4, width/6, 10);
                    //level name
                    noStroke();
                    fill(0, 0, 0);
                    text(game.levels[x].name, x*(width/3) + width/6, width/4 + width/12);
                    // difficuty 
                    fill(64, 186, 45);
                    for(var i = 0; i < game.levels[x].difficulty; i++){
                        ellipse(x*(width/3) + width/6 + i*25 - 50, width/4 + width/8, 15, 15);
                    }
                }
                else if(x >= 3 && x < 6){
                    fill(214, 214, 214);
                    stroke(0, 0, 0);
                    if(this.hover === 'level' + str(x)){
                        stroke(20, 201, 35);
                    }
                    rect((x-3)*(width/3) + width/24, width/2, width/4, width/6, 10);
                    //level name
                    noStroke();
                    fill(0, 0, 0);
                    text(game.levels[x].name, (x - 3)*(width/3) + width/6, width/2 + width/12);
                    // difficuty 
                    fill(64, 186, 45);
                    for(var i = 0; i < game.levels[x].difficulty; i++){
                        ellipse((x-3)*(width/3) + width/6 + i*25 - 50, width/2 + width/8, 15, 15);
                    }
                }
            }

            // back button
            this.drawMenuBox(3*(width/8), 5*(width/6), width/4, width/12, 'Back', false);
        }
        // Instructions menu
        else if(this.state === 2){
            this.drawTitle("Instructions:", width/2, 40);

            // back button
            this.drawMenuBox(3*(width/8), 5*(width/6), width/4, width/12, 'Back', false);
        }
        // options menu
        else if(this.state === 3){
            this.drawTitle("Options:", width/2, 40);

            // back button
            this.drawMenuBox(3*(width/8), 5*(width/6), width/4, width/12, 'Back', false);
        }
        // menu box during gameplay
        else if(this.state === 4){
            this.drawMenuBox(10, 10, 30, 30, 'X', true);
        }
        // menu that can select from during gameplay
        else if(this.state === 5){
            this.drawTitle("Paused", width/2, 40);

            // draw continue and back boxes
            this.drawMenuBox(width/6, width/8, width/4, width/12, 'Exit', false);
            this.drawMenuBox(3*(width/6), width/8, width/4, width/12, 'Continue', false);
        }

    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update state according to where mouse is clicked
    this.updateClick = function(){
        // main menu
        if(this.state === 0){
            // if click select level, then move to select level menu
            if(mouseY > width/2 && mouseY < width/2 + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.state = 1;
            }
            // if click instructions, move to instructions screen
            else if(mouseY > 4*(width/6) && mouseY < 4*(width/6) + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.state = 2;
            }
            // and if click options, move to options screen
            else if(mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.state = 3;
            }
        }

        // level selection - 
        // if player is in menu and selects a level, update game's level
        //attempt to load levels, first checking if levels are valid
        else if(this.state === 1){
            // first row of levels
            if(mouseY > width/4 && mouseY < width/4 + width/6){
                // first column
                if(mouseX > width/24 && mouseX < 7*(width/24)){
                    if(0 < game.levels.length){
                        game.loadLevel(0);
                        this.state = 4;
                    }
                }
                // second column
                else if(mouseX > 9*(width/24)  && mouseX < 15*(width/24)){
                    if(1 < game.levels.length){
                        game.loadLevel(1);
                        this.state = 4;
                    }
                }
                // third column
                else if(mouseX > 2*(width/3) + width/24 && mouseX < 2*(width/3) + width/24 + width/4){
                    print('2');
                }
            }
            // second row of levels
            else if(mouseY > width/2 && mouseY < width/2 + width/6){
                // first column
                if(mouseX > width/24 && mouseX < 7*(width/24)){
                    print('3');
                }
                // second column
                else if(mouseX > 9*(width/24)  && mouseX < 15*(width/24)){
                    print('4');
                }
                // third column
                else if(mouseX > 2*(width/3) + width/24 && mouseX < 2*(width/3) + width/24 + width/4){
                    print('5');
                }

            }
            // if click back button, go to main menu
            else if(mouseX > 3*(width/8) && mouseX < 3*(width/8) + width/4
                    && mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/12){
                this.state = 0;
            }
            
        }
        //options menu and instructions menu
        else if(this.state === 2 || this.state === 3){
            // if click back button, go to main menu
            if(mouseX > 3*(width/8) && mouseX < 3*(width/8) + width/4
                    && mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/12){
                this.state = 0;
            }
        }

        // menu button during game
        else if(this.state === 4){
            if(mouseX > 10 && mouseX < 40 && mouseY > 10 && mouseY < 40){
                this.state = 5;
            }
        }

        // in game menu active
        else if(this.state === 5){
            // click back so return to menu
            if(mouseX > width/6 && mouseX < width/6 + width/4 &&
                mouseY > width/8 && mouseY < width/8 + width/12){
                this.state = 0;
                game.state = 0;
                game.setup();
            }
            // click continue so return to gameplay
            else if(mouseX > 3*(width/6) && mouseX < 3*(width/6) + width/4 &&
                mouseY > width/8 && mouseY < width/8 + width/12){
                this.state = 4;
            }
        }
        



            // TODO: 
            // convert to constants
            // add transitions
    
    
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // update state according to where mouse is hovering
    this.updateHover = function(){
        // main menu
        if(this.state === 0){
            // hover select level
            if(mouseY > width/2 && mouseY < width/2 + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.hover = 'Select Level';
            }
            // instructions
            else if(mouseY > 4*(width/6) && mouseY < 4*(width/6) + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.hover = 'Instructions';
            }
            // options
            else if(mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/8
                && mouseX > width/6 && mouseX < width/6 + 2*(width/3)){
                this.hover = 'Options';
            }else{
                this.hover = '';
            }
        }
        // level selection
        else if(this.state === 1){
            // first row of levels
            if(mouseY > width/4 && mouseY < width/4 + width/6){
                // first column
                if(mouseX > width/24 && mouseX < 7*(width/24)){
                    this.hover = 'level0';
                }
                // second column
                else if(mouseX > 9*(width/24)  && mouseX < 15*(width/24)){
                    this.hover = 'level1';
                }
                // third column
                else if(mouseX > 2*(width/3) + width/24 && mouseX < 2*(width/3) + width/24 + width/4){
                    this.hover = 'level2';
                }else{
                    this.hover = '';
                }
            }
            // second row of levels
            else if(mouseY > width/2 && mouseY < width/2 + width/6){
                // first column
                if(mouseX > width/24 && mouseX < 7*(width/24)){
                    this.hover = 'level3';
                }
                // second column
                else if(mouseX > 9*(width/24)  && mouseX < 15*(width/24)){
                    this.hover = 'level4';
                }
                // third column
                else if(mouseX > 2*(width/3) + width/24 && mouseX < 2*(width/3) + width/24 + width/4){
                    this.hover = 'level5';
                }else{
                    this.hover = '';
                }

            }
            // back button
            else if(mouseX > 3*(width/8) && mouseX < 3*(width/8) + width/4
                    && mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/12){
                    this.hover = 'Back';
            }else{
                this.hover = '';
            }
        }
        //options menu and instructions menu
        else if(this.state === 2 || this.state === 3){
            if(mouseX > 3*(width/8) && mouseX < 3*(width/8) + width/4
                    && mouseY > 5*(width/6) && mouseY < 5*(width/6) + width/12){
                this.hover = 'Back';
            }else{
                this.hover = '';
            }
        }
        // menu button during game
        else if(this.state === 4){
            if(mouseX > 10 && mouseX < 40 && mouseY > 10 && mouseY < 40){
                this.hover = 'X';
            }else{
                this.hover = '';
            }
        }

        // in game menu active
        else if(this.state === 5){
            if(mouseX > width/6 && mouseX < width/6 + width/4 &&
                mouseY > width/8 && mouseY < width/8 + width/12){
                this.hover = 'Exit';
            }
            else if(mouseX > 3*(width/6) && mouseX < 3*(width/6) + width/4 &&
                mouseY > width/8 && mouseY < width/8 + width/12){
                this.hover = 'Continue'
            }else{
                this.hover = '';
            }
        }
        else{
            this.hover = '';
        }
    };

};