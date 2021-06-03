var surfer1, surferImg, octopus, octopusImg;
var water, waterImg, fort, fortImg, fortImg1, island, islandImg;
var rock, rockImg, coin, coinImg, b1, b1img;
var rockGroup, islandGroup, coinGroup, octopusGroup, fortGroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY

var score = 0;
var soundJump, bottle1Img, bottle1;

function preload() {
  surferImg = loadImage("girlAngleOnly.png");
  waterImg = loadImage("water.jpg");
  octopusImg = loadAnimation("octopus1.png", "octopus2.png");
  fortImg = loadAnimation("castle1.png", "castle1(1).png");
  fortImg1 = loadAnimation("fort1.png", "fort2.png");
  fortImg1.scale = 0.1;
  islandImg = loadImage("island.png")
  rockImg = loadImage("rock.png");
  coinImg = loadImage("coin.png");
  b1img = loadImage("water.jpg");
  soundJump = loadSound("jumpInTheWater.wav")
  rockGroup = new Group();
  islandGroup = new Group();
  coinGroup = new Group();
  octopusGroup = new Group();
  fortGroup = new Group();

}

function setup() {
  createCanvas(1300,600);

  //Background
  b1 = createSprite(300, 350);
  b1.addImage(b1img);
  b1.velocityY = -(1 * b1.y / 100)
  b1.scale = 3;

  //Surfer
  surfer1 = createSprite(150, 60, 200, 200);
  surfer1.addImage(surferImg);
  surfer1.scale = 0.05;
 // surfer1.velocityY = 1;
 
  surfer1.setCollider("rectangle", 100, 100, 200, 200)

}

function draw() {

  background(255);
  if (b1.y < 80) {
    b1.y = height / 2;
  }

  //gameState set to PLAY
  if (gameState === PLAY) {
    
    if (keyDown(RIGHT_ARROW)) {
      surfer1.x += 5
    }
    if (keyDown(LEFT_ARROW)) {
      surfer1.x += -5
    }

    if (islandGroup.isTouching(surfer1)) {
      surfer1.velocityY = 0
      soundJump.play();
      gameState = END
    }
    if (octopusGroup.isTouching(surfer1)) {
      surfer1.velocityY = 0
      soundJump.play();
      gameState = END
    }
    if (fortGroup.isTouching(surfer1)) {
      surfer1.velocityY = 0
      soundJump.play();
      gameState = END
    }
    if (rockGroup.isTouching(surfer1)) {
      surfer1.velocityY = 0
      soundJump.play();
      gameState = END
    }
    if (coinGroup.isTouching(surfer1)) {
      //surfer1.velocityY += 0.5
      score++

      coinGroup[0].destroy();
    };

    spawnrock();
    spawnfort();
    spawncoin();
    spawnoctopus();
    spawnisland();
  }
  //gameState set to END
  else if (gameState === END) {

    b1.velocityY = 0
    surfer1.velocityY = 0
    surfer1.velocityX = 0;

    rockGroup.setLifetimeEach(-1);
    islandGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    octopusGroup.setLifetimeEach(-1);
    fortGroup.setLifetimeEach(-1);

    rockGroup.setVelocityYEach(0);
    islandGroup.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
    octopusGroup.setVelocityYEach(0);
    fortGroup.setVelocityYEach(0);

  }

  drawSprites();

  strokeWeight(2)
  stroke("black")
  textSize(30)
  text("Score : " + score, windowWidth / 2 + 350, windowHeight / 2 - 250);
}
function spawnrock() {
  if (frameCount % -(Math.round(random(70, 100))) === 0) {
    rock = createSprite(90, 780, 20, 20);
    rock.addImage(rockImg);
    rock.x = Math.round(random(1, 1400))
    rock.scale = 0.1;
    rock.velocityY = -5
    rock.lifetime = 300
    rock.depth = surfer1.depth;
    surfer1.depth += 1

    //Add rock in the group
    rockGroup.add(rock)
  }
}
function spawnfort() {
  if (frameCount % -300 === 0) {
    fort = createSprite(300, 780, 20, 20);
    fort.scale = 1.5;
    fort.depth = surfer1.depth;
    surfer1.depth += 1
    fort.x = Math.round(random(1, 1400))
    fort.velocityY = -5
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: fort.addAnimation("fortBig", fortImg);
        break;
      case 2: fort.addAnimation("fortSmall", fortImg1);
        break;
      default: break;
    }

    //Add fort in the group
    fortGroup.add(fort)

  }
}
function spawncoin() {
  if (frameCount % -(Math.round(random(10, 40))) === 0) {
    coin = createSprite(Math.round(random(400, 1000)), 750, 20, 20);
    coin.addImage(coinImg);
    coin.depth = surfer1.depth;
    surfer1.depth += 1
    coin.scale = 0.05;
    coin.velocityY = -5
    coin.x = Math.round(random(300, 1200))

    //Add coin in the Group
    coinGroup.add(coin)
  }
}
function spawnoctopus() {
  if (frameCount % -100 === 0) {
    octopus = createSprite(500, 780, 20, 20);
    octopus.addAnimation("octopus1", octopusImg);
    octopus.depth = surfer1.depth;
    surfer1.depth += 1
    octopus.scale = 0.5;
    octopus.velocityY = -5;
    octopus.x = Math.round(random(1, 1400));

    //Add octopus in the group
    octopusGroup.add(octopus)
  }
}
function spawnisland() {
  if (frameCount % -(Math.round(random(350, 400))) === 0) {
    island = createSprite(350, 780, 20, 20);
    island.addImage(islandImg);
    island.depth = surfer1.depth;
    surfer1.depth += 1
    island.scale = 0.2;
    island.velocityY = -5;
    island.x = Math.round(random(1, 1400));

    //Add island in the group
    islandGroup.add(island)
  }
}
