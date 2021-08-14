function preload(){
    jumpingAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump07.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump08.png',     
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump09.png'    
      );
      runningAnimation = loadAnimation(
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run00.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run01.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run02.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run03.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run04.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run05.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run06.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run07.png', 
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run08.png',     
        'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run09.png'    

        
      );

      gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png');
gameFont = loadFont('https://la-wit.github.io/build-an-infinite-runner/build/fonts/ARCADE_R.TTF');
gameMusic = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/generic-game-loop-4.mp3');
gameOverMusic = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/over.mp3');
jumpSound = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/jump07.mp3');

zombie = loadAnimation('images/zombie1.png','images/zombie2.png','images/zombie3.png','images/zombie4.png','images/zombie5.png');
sword = loadAnimation('images/sword1.gif','images/sword2.gif','images/sword3.gif','images/sword4.gif');
fruit1 = loadImage('images/fruit1.png');
fruit2 = loadImage('images/fruit2.png');
fruit3 = loadImage('images/fruit3.png');
fruit4 = loadImage('images/fruit4.png');
fireBall = loadAnimation('images/fireball.png','images/fireball2.png','images/fireball3.png');
}


function setup(){
    createCanvas(windowWidth-20,windowHeight-20);
    ninja = createSprite(200,windowHeight-100);
    ninja.addAnimation('running',runningAnimation);
    ninja.addAnimation('jumping',jumpingAnimation);
    ninja.scale=2;
}


function draw(){
    background(gameBackground);

    if(keyDown('SPACE')){
        ninja.velocityY=-10;
        ninja.changeAnimation('jumping',jumpingAnimation);
        jumpSound.play();
    }
ninja.velocityY+=0.5;
ninja.changeAnimation('running',runningAnimation);
createEdgeSprites();
edges=createEdgeSprites();

ninja.collide(edges);

    drawSprites();
}