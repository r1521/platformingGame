var score=0;
var death=0;
var lives = 3;
var gameState='play';

function preload() {
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

    zombie1 = loadAnimation('images/zombie1.png', 'images/zombie2.png', 'images/zombie3.png', 'images/zombie4.png', 'images/zombie5.png');
    sword1 = loadAnimation('images/sword1.png', 'images/sword2.png', 'images/sword3.png', 'images/sword4.png');
    fruit1 = loadImage('images/fruit1.png');
    fruit2 = loadImage('images/fruit2.png');
    fruit3 = loadImage('images/fruit3.png');
    fruit4 = loadImage('images/fruit4.png');
    fireBall = loadAnimation('images/fireball.png', 'images/fireball2.png', 'images/fireball3.png');
}


function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    ninja = createSprite(200, windowHeight - 100);
    ninja.addAnimation('running', runningAnimation);
    ninja.addAnimation('jumping', jumpingAnimation);
    ninja.scale = 2;
    fruitGroup = new Group();
    zombieGroup = new Group();
    swordGroup = new Group();
    fireGroup = new Group();
}


function draw() {
    background(gameBackground);
console.log(gameState);
if(gameState==='play'){
    if (keyDown('SPACE')) {
        ninja.velocityY = -10;
        ninja.changeAnimation('jumping', jumpingAnimation);
        jumpSound.play();
    }
    if(keyDown('s')){
        spawnSword();
    }
    function zombieHit(sword,zombie){
        zombie.remove();
        sword.remove();
        death=death+1;
    }
    function zombieHit1(zombie){
        zombie.remove();
       lives=lives-1;
        //death=death+1;
    }
    if(keyDown("RIGHT_ARROW")){
        ninja.x=ninja.x+3;
    }
    if(keyDown("LEFT_ARROW")){
        ninja.x=ninja.x-3;
    }
    if(ninja.isTouching(zombieGroup)&&lives>0){
        //lives=lives-1;
    }else if(lives<=0){
        gameState='end';
    }
    ninja.velocityY += 0.5;
    ninja.changeAnimation('running', runningAnimation);
    createEdgeSprites();
    edges = createEdgeSprites();

    if(ninja.isTouching(fruitGroup)){
        //score=score+1;
        //fruitGroup.destroyEach();
    }
    function fruitHit(ninja,fruit){
        //fruitGroup.shift();
        fruit.remove();
        score=score+1;
    }
    function fireHit(fire){
        fire.remove();
        lives=lives-1;
    }
    swordGroup.bounce(zombieGroup,zombieHit);
    ninja.bounceOff(fruitGroup,fruitHit);
    zombieGroup.bounce(ninja,zombieHit1);
    fireGroup.bounce(ninja,fireHit);
   
    spawnFruits();
    spawnZombie();
    spawnFire();
}else{
    swordGroup.setVelocityXEach(0);
    fireGroup.setVelocityXEach(0);
    fireGroup.setVelocityYEach(0);
    zombieGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-1);
}
    ninja.collide(edges);
    drawSprites();
    text('fruits:'+score,windowWidth/2,20);
    text('deaths:'+death,windowWidth/2+200,20);
    text('lives:'+lives,windowWidth/2+400,20);
}



function spawnFruits() {
    if (frameCount % 150 === 0) {
        fruit = createSprite(windowWidth, random(50, windowHeight / 2));

        myRandom = Math.round(random(1, 4));
fruit.velocityX=-4;
fruit.scale=0.2;
fruit.lifetime = windowWidth;
        switch (myRandom) {
            case 1: fruit.addImage(fruit1);

                break;

            case 2: fruit.addImage(fruit2);

                break;
            case 3: fruit.addImage(fruit3);

                break;
            case 4: fruit.addImage(fruit4);

                break;
            default:
                break;
        }
        fruitGroup.add(fruit);
    }
}

function spawnZombie(){
    myRandom = Math.round(random(1,5));

    switch (myRandom) {
        case 1:frameNumber = 100
            
            break;
            case 2:frameNumber = 120
            
            break;
            case 3:frameNumber = 150
            
            break;
            case 4:frameNumber = 80
            
            break;
            case 5:frameNumber = 60
            
            break;
    
        default:
            break;
    }

    if(frameCount%frameNumber===0){
        zombie = createSprite(random(ninja.x+300,ninja.x+800),windowHeight-100);
        zombie.addAnimation('zombie',zombie1);
        
        zombie.scale=0.5;
        zombieGroup.add(zombie);
        myRand = Math.round(random(1,2));
        if(myRand===1){
            zombie.velocityX=-1;
        }
    }
}

function spawnSword(){
    sword = createSprite(ninja.x,ninja.y);
    sword.addAnimation('sword',sword1);
    sword.velocityX=random(2,4);
    sword.scale=0.5;
    swordGroup.add(sword);
}

function spawnFire(){
    myRandom = Math.round(random(1,5));

    switch (myRandom) {
        case 1:frameNumber = 100
            
            break;
            case 2:frameNumber = 120
            
            break;
            case 3:frameNumber = 150
            
            break;
            case 4:frameNumber = 80
            
            break;
            case 5:frameNumber = 60
            
            break;
    
        default:
            break;
    }
    if(frameCount%frameNumber===0){
        fire = createSprite(random(ninja.x+100,windowWidth),0);
        fire.addAnimation('fireball',fireBall);
        fire.velocityY=random(4,8);
        fire.velocityX=random(-3,2);
        fire.scale=0.1;
        fireGroup.add(fire);
    }
}