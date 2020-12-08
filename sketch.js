var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var survivalTime = 0;
var gameState;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);
  
  gameState = "PLAY";
  
  monkey = createSprite(100,281, 10, 10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(200, 315, 600, 10);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
 background("skyBlue");
  
  monkey.collide(ground);
  
  monkey.velocityY =monkey.velocityY+1;
  
   textSize("20");
  fill("black");
  text("Score: "+ score ,350,50);
  
  stroke("black");
  textSize("20");
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survial Time: " + survivalTime, 100, 50);
  
  if(gameState == "PLAY"){
    SpawnObstacles();
  SpawnBananas();
  
  if(keyDown("space") && monkey.y > 278){
    monkey.velocityY = monkey.velocityY-15;
  }
  
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
    }
 
   if(obstacleGroup.isTouching(monkey)){
        gameState = "END";
    }
    
    if(gameState == "END"){
      obstacleGroup.setVelocityXEach(0);
       FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach (-1);
     FoodGroup.setLifetimeEach (-1);
    }
  }
  
  
  
  drawSprites();
}

function SpawnObstacles() {
  
  if(frameCount % 150 == 0){
   obstacle = createSprite(600, 288, 10, 10);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.12;
   obstacle.velocityX = -10; 
   obstacle.lifetime = 70; 
    
   obstacleGroup.add(obstacle);
    
    
  }
}

function SpawnBananas(){
  
 if(frameCount % 80 == 0){
   banana = createSprite(600, Math.round(random(210,170)), 10, 10);
   banana.addImage(bananaImage);
   banana.scale = 0.12;
   banana.velocityX = -10; 
   banana.lifetime = 70;
   
   FoodGroup.add(banana);
   
   
  }
  
}


