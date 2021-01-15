var dog, happyDog, database;
var foodS, foodStock;
var dogSprite;

function preload()
{
	dog=loadImage("Dog.png");
 happyDog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  
  dogSprite = createSprite(250,300,100,100)
  dogSprite.addImage(dog,"dog.png");
  dogSprite.scale=0.25;

foodStock=database.ref('food');
foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dogSprite.addImage(happyDog, "happyDog.png");
}

  drawSprites();
  //add styles here

  textSize(18);
  fill("red");
  stroke("white");
  text("Note: Press UP_ARROW key to feed Fletcher milk!", 50,40);

  textSize(20);
  fill("aqua");
  stroke("black");
  text("Remaining Food:20", 200,100);


}


function readStock(data) {
  foodS = data.val()
}

function writeStock(x){

database.ref('/').update({
  foodS:x


})


if(x<=0){
  x=0;
}else{
x=x-1;

}
}