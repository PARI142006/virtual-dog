//Create variables here

var database ,dog,dog1,dog2
var position
var feed;
var add;
var foodobject
var Feedtime
var Lastfeed


function preload()
{
  //loading  images 
  dogimg1 = loadImage("Images/Dog.png")
  dogimg2 = loadImage("Images/happy dog.png")
	
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
  
 

  var doggy = database.ref('Food');
  doggy.on("value", readPosition, showError);
feed = createButton("FEED OREO 🐶")
feed.position(800,175)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(600,175)
add.mousePressed(AddFood)

} 



function draw(){
 { background(0, 153, 51);
 foodobject.display()
 
 }
 drawSprites();
  
  fill(255,255,255);
 textSize(15);

   text("hey its time to feed oreo 🐶 ! ",130,10,300,20);
 
  //add styles here
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error ");
}

function writePosition(number){
  if(number>0){
    number=number-1
  }
  else{
    number=0
  }
  database.ref('/').set({
    'Food': number
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
