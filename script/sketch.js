//player
var playerAnim;
var player;

//bg
var bg;

function setup(){
    createCanvas(windowWidth,250);

    player = createSprite(150, 150);
    player.addAnimation('walk',playerAnim)
}

function draw(){
    background(200);
    image(bg, 0, 0, width, height-70)
    drawSprites();
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

    bg = loadImage('../assets/img/background/bg_castle.png');
}