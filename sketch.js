//GameState
PLAY = 1;
END = 0;
gameState = 1;

var monkey , monkey_running;
var ground,backGround,backGroundImage;
var banana ,bananaImage,FoodGroup;
var obstacle, obstacleImage,obstacleGroup;
var score,gameOver,gameOverImg;

function preload(){
  
  backGroundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleImage = loadImage("stone.png");

  gameOverImg = loadImage("gameOver.png");
  
}


function setup() {
  createCanvas(800, 400);
  
  backGround=createSprite(0,0,800,400);
  backGround.addImage(backGroundImage);
  backGround.scale=1.5;
  backGround.x=backGround.width/2;
  backGround.velocityX=-4;

  
  ground = createSprite(400,380,800,10);
  ground.visible = false;
  
  monkey = createSprite(200,380,600,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  gameOver = createSprite(400,220,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  FoodGroup = new Group(); 
  obstacleGroup = new Group();
  
  score =0;
  
}

function draw() {
  background(220);
  
  if(gameState === PLAY){
    food();
    obstacles();
  
    monkey.collide(ground);
         
    if (backGround.x < 300) {
      backGround.x = backGround.width / 2;
    }
    //For moving the background fastly after a certain point
    backGround.velocityX = -(4 + 3* score/6)
    
     //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    
    
    //Press space to jump
   if(keyDown("space")){
    monkey.velocityY = -12; 
   }
      //Score
    if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score+2;
      
     switch(score){
       case 10: monkey.scale = 0.12;
            break;
            
       case 20: monkey.scale = 0.14;
            break;
            
       case 30: monkey.scale = 0.16;
            break;
            
       case 40: monkey.scale = 0.18;
            break;
            
      default: break;    
     } 
    }
    
    //setting lifetime
    obstacleGroup.setLifetime = (-1);
    FoodGroup.setLifetime = (-1);
  
    //Reseting the monkey if touches obstacle  
  
  if(monkey.isTouching(obstacleGroup)){
      gameState = END;
     }
     
    }else if(gameState === END){
      backGround.velocityX = 0;
      monkey.visible = false;

      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      
      gameOver.visible = true;
    }
  
  
  drawSprites();
  
  //Displaying score
  textSize(20);
  stroke("black");
  fill("black");
  text("Score:"+ score,600,80);

 
}

function food(){
  if(frameCount % 80 === 0){
  banana = createSprite(550,350,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.07;
  banana.y = Math.round(random(120,200)); 
  banana.velocityX = -4; 
  banana.lifetime = 150;
  
  FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 150 === 0){
    obstacle = createSprite(600,350,600,10); 
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 160; 
    
    obstacleGroup.add(obstacle);
    
  }
}