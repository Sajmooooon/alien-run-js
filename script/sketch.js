//player
var playerAnim;
var player;
var playerAnimJump;

var score = 0;

//enemies
var slimeAnim, flyAnim;
var opponents;

//bg
var bg;
var side;

//ground
var ground;

function setup(){
    createCanvas(windowWidth,250);
    frameRate(60);

    //1. param - sur. x, 2. sur. y, 3. param width, 4. height
    ground = createSprite(width/2,height-30, width, 70);
    //shade between black and white
    ground.shapeColor = 75;
    //side
    side = createSprite(-5, height/2, 10, height);

    //opponents
    opponents = new Group();
    createOpponent();

    player = createSprite(width/5, 150);
    player.addAnimation('walk',playerAnim);
    player.addAnimation('jump',playerAnimJump);
    player.jump = false;
    // player.debug = true;
    player.setCollider('circle',0,0,40);

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
        player.jump = false;
        player.changeAnimation('walk');
    }

    if (frameCount % 50 === 0){
        createOpponent()
    }

    //collision

    side.overlap(opponents,opponentOut)

    drawSprites();
    player.overlap(opponents, heroDie);
    drawScore();
}


function createOpponent(){
    var type =  Math.floor(random(2));

    if (type){
        o = chooseOpponentAnim(180,slimeAnim);
        o.setCollider('circle',-2,5,20);
    }
    else{
        o = chooseOpponentAnim(70,flyAnim);
        o.setCollider('circle',0,5,20);
    }
    // o.debug = true;
    o.setSpeed(5,180);
    o.addToGroup(opponents);
}


function chooseOpponentAnim(height,anim){
    o = createSprite(width, height);
    o.addAnimation('run', anim);
    return o;
}


function heroDie(player, opponent){
    drawMessage('PRESS SPACE TO PLAY AGAIN')
    noLoop();
}


function opponentOut(side, opponent){
    opponent.remove();
    score += 10;
}


function drawScore(){
    fill('yellow');
    textSize(40);
    textAlign(RIGHT);
    text(score, width-20, 40);
}


function drawMessage(message){
    fill('yellow');
    textSize(40);
    textAlign(CENTER);
    text(message, width/2, height-25);
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