/* tutorial level
 * meant to get player familiar with game
 */
var tutorial = function(){
    this.name = "Tutorial";
    this.difficulty = 1;
    
    this.tilemap = [
        "wwwwwwwwwwwwwww",
        "w             w",
        "w p           w",
        "w             w",
        "w             w",
        "w   t  b  t   w",
        "w             w",
        "w             w",
        "w             w",
        "w             w",
        "w   t  b  t   w",
        "w             w",
        "w             w",
        "w             w",
        "wwwwwwwwwwwwwww"
    ];
    
    // waves for the game
    this.waves = [];
    this.waveIndex = 0;
    this.waves.push(new wave('Wave 1', 2));
    this.waves.push(new wave('Wave 2', 4));
    this.waves.push(new wave('Wave 3', 6));

    // tooltips to give the player information
    this.helpTexts = [];
    this.helpTextIndex = 0;
    this.helpTexts.push('Get used to moving around with the arrow keys\nand using space to shoot.');
    this.helpTexts.push('To pick up a block, stand facing it, press shift,\n and shift again to put it down.');
    this.helpTexts.push('Your goal is to defend the bases, the blocks with the\ngreen health bars. If they are destroyed, you lose.');
    this.helpTexts.push('Enemies will come from outside the walls, so place\nthe spinning turret blocks strategically!');
    this.helpTexts.push('Nice job! Here comes another two waves, get ready!');
    this.helpTexts.push('Excellent! Now you are ready for the harder levels.');

    // a list of actions to take, where
    // w = wave
    // t = text
    this.actions = ['t', 't', 't', 't', 'w', 't', 'w', 'w', 't'];
    this.actionIndex = 0;

    // state of displaying help text
    // 0 = coming down from top
    // 1 = writing text
    // 2 = displaying text
    // 3 = going back up
    this.helpTextState = 0;
    // timer to time between help states
    this.helpTextTimer = 60;

    // state of tutorial
    // 0 = launching wave
    // 1 = waiting for wave to end
    // 2 = waiting between waves
    // 3 = displaying help text
    // 4 = game over
    this.state = 0;
    
    // track when to count adversaries to signal game end again
    this.countTimer = 0;

    // track when to draw wave name
    this.waveNameTimer = 0;

    // a timer to track transition between states
    this.stateTransitionTimer = 60;

    // starting state depend on actions
    if(this.actions[0] === 't'){
        this.state = 3;
    }

    // ---------------------------------------------
    // ---------------------------------------------
    // call the reload function to reset the state of the level
    this.reload = function(){
        this.state = 3;
        this.helpTextState = 0;
        this.helpTextIndex = 0;
        this.helpTextTimer = 60;
        this.countTimer = 0;
        this.waveNameTimer = 0;
        this.waveIndex = 0;
        this.stateTransitionTimer = 60;
        this.actionIndex = 0;
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // draw the name of the wave announcing, with transparency 
    // according to timer
    this.drawWaveName = function(){
        push();
        translate(width/2, height/4);
        textFont(qfont);
        textSize(30);
        textAlign(CENTER);
        fill(255, 255, 255, (this.waveNameTimer/150)*255);
        stroke(0, 0, 0, (this.waveNameTimer/150)*255);
        text(this.waves[this.waveIndex].name, 0, 0);
        pop();
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // draw some text to display to player
    this.drawHelpText = function(){
        textFont(tfont);
        textSize(25);
        textAlign(LEFT);
        fill(0, 0, 0, 200);
        stroke(255, 255, 255);
        if(this.helpTextState === 0){
            rect(0, height, width, -height/6 + (this.helpTextTimer/60)*height/6);
        }else if(this.helpTextState === 1 || this.helpTextState === 2){
            rect(0, height, width, -height/6);
            fill(20, 201, 35, 200);
            stroke(0, 0, 0, 200);
            text(this.shownText, 20, 5*(height/6) + 30);
        
        }else if(this.helpTextState === 3){
            rect(0, height, width, -(this.helpTextTimer/60)*height/6);
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // determine next state depending on the next action
    this.nextAction = function(){
        this.actionIndex++;
        // determine next action
        if(this.actionIndex < this.actions.length){
            if(this.actions[this.actionIndex] === 'w'){
                // done so go back to waves
                this.state = 0;
            }else if(this.actions[this.actionIndex] === 't'){
                this.state = 3;
                this.helpTextState = 0;
                this.helpTextTimer = 60;
            }
        }else{
            this.state = 4;
        }
    };

    // ---------------------------------------------
    // ---------------------------------------------
    // manage this level's state using timers 
    this.play = function(){
        // give buffer before starting
        if(this.stateTransitionTimer > 0){
            this.stateTransitionTimer--;
        }else{

            // launching
            if(this.state === 0){
                game.adversaries = [];
                for(var i = 0; i < this.waves[this.waveIndex].numAdversaries; i++){
                    game.adversaries.push(new adversary());
                    game.adversaries[i].getNearestBase();
                }
                this.state = 1;
                this.countTimer = 30;
                this.waveNameTimer = 200;
            }
            // waiting for wave to end
            else if(this.state === 1){

                // decrement timer
                if(this.waveNameTimer > 0){
                    this.waveNameTimer--;
                }

                // count number of adversaries that are defeated, but only count every
                // 30 frames so not to waste computation
                if(this.countTimer > 0 && this.waveNameTimer === 0){
                    this.countTimer--;
                    if(this.countTimer === 0){
                        // count number of adversaries
                        var numDefeated = 0;
                        for(var i = 0; i < game.adversaries.length; i++){
                            if(game.adversaries[i].health <= 0){
                                numDefeated++;
                            }
                        }
                        if(numDefeated == game.adversaries.length){
                            this.state = 2;
                            this.transitionTimer = 60;
                        }else{
                            this.countTimer = 30;
                        }
                    }
                }
            }
            // time waiting between waves
            else if(this.state === 2){
                if(this.transitionTimer > 0){
                    this.transitionTimer--;
                    if(this.transitionTimer === 0){
                        this.waveIndex++;
                        if(this.waveIndex == this.waves.length){
                            this.state = 4;
                        }
                        this.nextAction();
                    }
                }
            }
            // displaying help text
            else if(this.state === 3){
                // update timer and state of help text
                if(this.helpTextTimer > 0){
                    this.drawHelpText();
                    this.helpTextTimer--;
                    if(this.helpTextTimer === 0){
                        if(this.helpTextState === 0){
                            this.helpTextTimer = 3;
                            this.helpTextState = 1;

                            // want to display characters one at a time
                            this.charsDisplayed = 0;
                            this.shownText = "";
                        }
                        else if(this.helpTextState === 1){
                            // only move to next state if drawn all of characters
                            if(this.charsDisplayed == this.helpTexts[this.helpTextIndex].length){
                                this.helpTextTimer = this.helpTexts[this.helpTextIndex].length*4;
                                this.helpTextState = 2;
                            }else{
                                this.shownText += this.helpTexts[this.helpTextIndex][this.charsDisplayed];
                                this.charsDisplayed++;
                                this.helpTextTimer = 1;
                            }
                        }else if(this.helpTextState === 2){
                            this.helpTextTimer = 60;
                            this.helpTextState = 3;
                        
                        }else if(this.helpTextState === 3){
                            this.stateTransitionTimer = this.helpTexts[this.helpTextIndex].length*4/2;
                            this.helpTextIndex++;
                            this.nextAction();
                            
                        }
                    }
                }
                
            }
        }
    }
};