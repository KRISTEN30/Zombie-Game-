var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1Img, heart2Img, heart3Img;
var heart_1, heart_2, heart_3;
var zombieImg;
var zombie,zombieGroup;
var explosion, lose, win;
var bulletnumber = 5;
var gamestate = "fight";
var bulletGroup;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  zombieImg = loadImage("assets/zombie.png")
  explosion = loadSound("assets/explosion.mp3")
  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

  //creating the player sprite
  player = createSprite(displayWidth-1150,displayHeight-300,50,50)
  player.addImage(shooterImg)
  player.scale = 0.5
  //player.debug = true 
  player.setCollider("rectangle",0,0,250,500)

  heart_1 = createSprite(displayWidth-150,40,20,20)
  heart_1.addImage("heart1",heart1Img)
  heart_1.scale = 0.3
  heart_1.visible = false
  
  heart_2 = createSprite(displayWidth-50,40,20,20)
  heart_2.addImage("heart2",heart2Img)
  heart_2.scale = 0.3
  heart_2.visible = false

  heart_3 = createSprite(displayWidth-150,40,20,20)
  heart_3.addImage("heart3",heart3Img)
  heart_3.scale = 0.3

  zombieGroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  background(0); 

if(gamestate === "fight"){


//moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW") || touches.length > 0){
player.y = player.y - 20
}

if(keyDown("DOWN_ARROW") || touches.length > 0){
  player.y = player.y + 20
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  var bullet = createSprite(displayWidth-1150, player.y-30,20,20)
  bullet.velocityX = 20;
  bulletGroup.add(bullet);

  player.depth = bullet.depth
  player.depth = player.depth+2
  bulletnumber -= 1
  console.log(bulletnumber)
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bulletnumber == 0){
  gamestate = "bullet";
  }

if(zombieGroup.isTouching(player)){
for(var i = 0;i< zombieGroup.length;i++)
{
  if(zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy() 
  }
}
}

if(bulletGroup.isTouching(zombieGroup)){
for(var i = 0;i<zombieGroup.length;i++)
{
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
  }
}
}

createZombie();
}
drawSprites();

if(gamestate == "bullet"){
textSize(100)
fill("white")
text("You Ran Out Of Bullets",250,410)
bulletGroup.destroyEach()
zombieGroup.destroyEach()
player.destroy()
}

}
function createZombie(){
  // modulo operator - % - it gives the remainder value  Eg. 4/2 - R--0 
  if(frameCount % 50 === 0){
  zombie = createSprite(random(1300,1500),random(500,600),40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.3;
  zombie.velocityX = -5;
  zombie.lifetime = 260;
  //zombie.debug = true
  zombie.setCollider("rectangle",0,0,500,1000);
  zombieGroup.add(zombie);

  }
}
