var dog, happyDog, database, foodS, foodStock;
var dogSprite;

function preload() {
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(225, 225, 50, 50);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);  
  drawSprites();

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  fill("red");
  stroke("blue");
  textSize(20);
  text("Note: press up arrow key to feed the dog milk", 10, 490);
  text("Food remaining: " + foodS, 140, 110);
  console.log(foodS);
  //add styles here

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  } else {
    x = x-1;  
  }

  database.ref('/').update({
    Food: x
  })

  console.log(x);
}



