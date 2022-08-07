//player
var playerAnim;
var player;
var playerAnimJump;

//enemies
var slimeAnim, flyAnim;
var opponents;

//bg
var bg;

//ground
var ground;

function setup(){
    createCanvas(windowWidth,250);
    frameRate(60);

    //1. param - sur. x, 2. sur. y, 3. param width, 4. height
    ground = createSprite(width/2,height-35, width, 70);
    //shade between black and white
    ground.shapeColor = 75;

    player = createSprite(width/5, 150);
    player.addAnimation('walk',playerAnim);
    player.addAnimation('jump',playerAnimJump);
    player.jump = false;
    player.debug = true;
    player.setCollider('circle',0,0,40);

    //opponents
    opponents = new Group();
    createOpponent();
    // createOpponent();
}

function draw(){
    background(200);
    image(bg, 0, 0, width, height-70)

    //jump
    if (keyDown(KEY.SPACE) && !player.jump){
        //speed 5, positin -90 -> top
        player.setSpeed(5, -90);
        player.jump = true;
        //add jump anim
        player.changeAnimation('jump')
    }

    //gravity to ground with speed 0.3
    player.addSpeed(0.3, 90);

    //collide with ground
    if (player.collide(ground)){
        player.changeAnimation('walk')
        player.jump = false;
    }

    if (frameCount % 50 === 0){
        createOpponent()
    }

    //collision
    player.overlap(opponents, heroDie);

    drawSprites();
}


function createOpponent(){
    var type =  Math.floor(random(2));

    if (type){
        o = chooseOpponentAnim(170,slimeAnim);
        o.setCollider('circle',-2,5,20);
    }
    else{
        o = chooseOpponentAnim(70,flyAnim);
        o.setCollider('circle',0,5,20);
    }
    o.debug = true;
    o.setSpeed(5,180);
    o.addToGroup(opponents);
}


function chooseOpponentAnim(height,anim){
    o = createSprite(width, height);
    o.addAnimation('run', anim);
    return o;
}


function heroDie(player, opponent){
    noLoop();
}


function preload(){
    playerAnim = loadAnimation('../assets/img/alien/p1_walk01.png',
                                '../assets/img/alien/p1_walk02.png',
                                '../assets/img/alien/p1_walk03.png',
                                '../assets/img/alien/p1_walk04.png',
                                '../assets/img/alien/p1_walk05.png',
                                '../assets/img/alien/p1_walk06.png',
                                '../assets/img/alien/p1_walk07.png',
                                '../assets/img/alien/p1_walk08.png',
                                '../assets/img/alien/p1_walk08.png',
                                '../assets/img/alien/p1_walk09.png',
                                '../assets/img/alien/p1_walk10.png',
                                '../assets/img/alien/p1_walk11.png');

    playerAnimJump = loadAnimation('../assets/img/alien/p1_jump.png')

    slimeAnim = loadAnimation('../assets/img/enemies/slimeWalk1.png',
                                '../assets/img/enemies/slimeWalk2.png')
    flyAnim = loadAnimation('../assets/img/enemies/flyFly1.png',
                            '../assets/img/enemies/flyFly2.png')

    bg = loadImage('../assets/img/background/bg_castle.png');
}