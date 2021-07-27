var towerImg;
var ghostImg;
var climberImg;
var doorImg;
var gameState = "play"
var door,climber,ib,doorGroup,climberGroup,ibGroup;


function preload(){
  towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  climberImg=loadImage("climber.png");
  doorImg=loadImage("door.png");
  
}

function setup(){
 createCanvas(600,600);
 tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY= 1
 ghost = createSprite(200,200);
 ghost.addImage(ghostImg); 
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
}

function draw(){
background(100);
  
 if (gameState==="play"){
     if (tower.y >400){
      tower.y =300;
    }
   if(keyDown("space")) {
        ghost.velocityY = -7;
        
    }
    
    //add gravity
    ghost.velocityY = ghost .velocityY + 0.5     
   if(keyDown("left")) {
        ghost.velocityX = -3;
        
    }
   
   
     if(keyDown("right")) {
        ghost.velocityX = 3;
        
    }  
   
      spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
