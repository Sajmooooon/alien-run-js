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

    player = createSprite(150, 150);
    player.addAnimation('walk',playerAnim);
    player.addAnimation('jump',playerAnimJump);
    player.jump = false;

    //opponents
    opponents = new Group();
    createOpponent();
    createOpponent();
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


    drawSprites();
}


function createOpponent(){
    //width - end of screen, 170 height
    o = createSprite(width, 170);
    o.addAnimation('run', slimeAnim);
    //speed 5, direction 180
    o.setSpeed(5,180);
    o.addToGroup(opponents);
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