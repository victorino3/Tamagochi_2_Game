let bgImg;
let centerImg;
let cornerImg;
let rightImage;
let pathImage = "image/";
let food;
let shower;
let medicine;
let image3;
let stats;
let score;
let idea; 
let centerImg2;
let centerImg1;
let currentImg;
let dirtyImg1;
//
let foodAlert = 10
let availableMoney = 100;
let showOverlay = false;
let dirty=false
let foods = ["banana 10$", "apple 10$", "orange 10$", "grapes 10$"];

function preload() {
    bgImg = loadImage(pathImage+"bg.png");
    centerImg1 = loadImage(pathImage+"tama.png");
    cornerImg = loadImage(pathImage+"feed.png");
    shower = loadImage(pathImage+"bathroom.png");
    medicine = loadImage(pathImage+"medicine.png");
    stats = loadImage(pathImage+"stats.png");
    score  = loadImage(pathImage+"score.png");
    idea = loadImage(pathImage+"idea.png");
    centerImg2 = loadImage(pathImage+"happy.png");
    rightImage = loadImage(pathImage+"coin.png");
    dirtyImg1 =  loadImage(pathImage+"dirty.png");
    currentImg = centerImg1;
}

function setup() {
  createCanvas(1000, 1000);
  background(153,217,234);

  // create input field for username
  let usernameInput = createInput();
  usernameInput.position(width/2 - usernameInput.width/2, height/2 - 100);
  usernameInput.attribute("placeholder", "Username");

  // create input field for password
  let passwordInput = createInput();
  passwordInput.position(width/2 - passwordInput.width/2, height/2 - 50);
  passwordInput.attribute("placeholder", "Password");
  passwordInput.attribute("type", "password");

  // create submit button
  let logintBtn = createButton("Login");
  logintBtn.position(width/2 - logintBtn.width/2 - 50, height/2);
  logintBtn.mousePressed(showNote);

  // create info button
  let registerBtn = createButton("Register");
  registerBtn.position(width/2 - logintBtn.width/2 + 50, height/2);
}


function showNote() {
    removeElements() 
    background(bgImg);
    image(centerImg1, width/5 , height/3.5, centerImg1.width , centerImg1.height/2);
    image(rightImage, width - rightImage.width,rightImage.height - 90);
    text("You have " + availableMoney + " $ ", width - rightImage.width, rightImage.height+30);
    text("You have " + foodAlert + " % of food", width - rightImage.width, rightImage.height+50);
    
    // create an invisible rectangle on top of the corner image
    //Top
    fill("white");
    rect(5, 0, cornerImg.width, cornerImg.height);
    
    image(cornerImg, 5, 0);

    rect( cornerImg.width + 50 , 0, shower.width, shower.height);
    image(shower, cornerImg.width + 50 , 0);

    rect(shower.width * 2.5, 0, medicine.width, medicine.height);
    image(medicine, shower.width  * 2.5 , 0,medicine.height);
   
  //Bottom
    rect(5, height - stats.height, stats.width, stats.height);
    image(stats, 5, height - stats.height);

    rect(stats.width + 50, height - stats.height, stats.width, stats.height);
    image(score, stats.width + 50, height - stats.height);

    rect(score.width * 2.5, height - idea.height, idea.width, idea.height);
    image(idea, score.width * 2.5, height - idea.height);
    //play


   // noFill();
    document.getElementById('defaultCanvas0').addEventListener("mousedown", changeCenterImg);
  }
function showNoteTochange(centerImg12) {
  console.log("Entrou")
    removeElements() 
    push()
    background(bgImg);
    image(centerImg12, width/5 , height/3.5, centerImg12.width , centerImg12.height/2);
    pop()
    
    // create an invisible rectangle on top of the corner image
    //Top
    fill("white");
    rect(5, 0, cornerImg.width, cornerImg.height);
    image(cornerImg, 5, 0);
    image(rightImage, width - rightImage.width,rightImage.height -90);
  
    text("You have " + availableMoney + " $ ", width - rightImage.width,  rightImage.height+30);
    text("You have " + foodAlert + " % of food", width - rightImage.width, rightImage.height+50);
   
    fill("white");
    rect( cornerImg.width + 50 , 0, shower.width, shower.height);
    image(shower, cornerImg.width + 50 , 0);

    rect(shower.width * 2.5, 0, medicine.width, medicine.height);
    image(medicine, shower.width  * 2.5 , 0,medicine.height);
   
  //Bottom
    rect(5, height - stats.height, stats.width, stats.height);
    image(stats, 5, height - stats.height);

    rect(stats.width + 50, height - stats.height, stats.width, stats.height);
    image(score, stats.width + 50, height - stats.height);

    rect(score.width * 2.5, height - idea.height, idea.width, idea.height);
    image(idea, score.width * 2.5, height - idea.height);
  
    //play
    push()
    checkCornerClickFood()
    checkShowerClickShower()
    checkMedicineClickMedicine()
    checkBottomLeftClickStats()
    checkScoreClickScore()
    checkJogarClickJogar()
    pop()
    //noFill();
}

function draw() {
  if (showOverlay) {
    // fill background with yellow
    fill(255, 255, 0);
    rect(0, 0, width, height);

      // set the color for the text
    fill(0);
    textSize(20);
    textAlign(CENTER);

     // display available money text
    text("You have " + availableMoney + " $ available", width/2, height/2 - 80);

    // display list of foods
    for (let i = 0; i < foods.length; i++) {
      let yPos = height/2 - 60 + (i * 40);
      text(foods[i], width/2, yPos);
      button = createButton("Buy");
      button.position(width/2 + 100, yPos - 10);
      button.size(60,20);
      button.mousePressed(buy);
    }
    
    
    // create "Back" button
    let backButton = createButton("Back");
    backButton.position(width/2, height/2 + 75);
    backButton.size(60, 20);
    backButton.mousePressed(removeOverlay);
  }
  
}

function removeOverlay() {
  showOverlay = false
  changeCenterImgTama()
 
  
}
function buy() {
  if (availableMoney > 9) {
    availableMoney -= 10
    foodAlert += 10
  } 
}

function showMessage() {
  console.log("comi");
}

function changeCenterImg() {
  
  //checkShowerClickShower()
  //checkMedicineClickMedicine()
  //checkBottomLeftClickStats()
  //checkScoreClickScore()
 // checkJogarClickJogar()
  // change the current image

  if(dirty) {
    currentImg = dirtyImg1
  }
  /*if (currentImg === centerImg1) {
    currentImg = centerImg2;
  } else {
    currentImg = centerImg1;
  }*/
  //clear();
  image(currentImg, width/5 , height/3.5, currentImg.width , currentImg.height/2);
  showNoteTochange(currentImg)

}
function changeCenterImgTama() {
  checkCornerClickFood()
  checkShowerClickShower()
  checkMedicineClickMedicine()
  checkBottomLeftClickStats()
  checkScoreClickScore()
  checkJogarClickJogar()
  // change the current image

 
  currentImg = centerImg1;
  //clear();
  image(currentImg, width/5 , height/3.5, currentImg.width , currentImg.height/2);
  showNoteTochange(currentImg)
 
}
/*function changeCenterImgDirty() {
  checkShowerClickShower()
  //checkMedicineClickMedicine()
  //checkBottomLeftClickStats()
  //checkScoreClickScore()
 // checkJogarClickJogar()
  // change the current image
  pop()
 
  currentImg = dirtyImg1;
  //clear();
  image(currentImg, width/5 , height/3.5, currentImg.width , currentImg.height/2);
  showNoteTochange(currentImg)
  console.log("Hello")
  push()
}*/
function checkCornerClickFood() {
  // check if mouse click is within the rectangle of the corner image
  if (mouseX >= 0 && mouseX <= cornerImg.width && mouseY >= 0 && mouseY <= cornerImg.height) {
    // mouse click is within the rectangle
    if (foodAlert > 0) {
      dirty = true
      eatScore();
      
    } else {
      showOverlay = true;
    }
    
  }
}

function eatScore() {
  foodAlert -= 10
}

  






















































function checkCornerClickShower() {
  // check if mouse click is within the rectangle of the corner image
  if (mouseX >= 0 && mouseX <= cornerImg.width && mouseY >= 0 && mouseY <= cornerImg.height) {
    // mouse click is within the rectangle
    showMessage();
  }
}
function checkShowerClickShower() {
  // check if mouse click is within the rectangle of the shower image
  if (mouseX >= cornerImg.width + 50 && mouseX <= cornerImg.width + 50 + shower.width && mouseY >= 0 && mouseY <= shower.height) {
    // mouse click is within the rectangle
    showMessage();
  }
}
function checkMedicineClickMedicine() {
  // check if mouse click is within the rectangle of the medicine image
  if (mouseX >= shower.width * 2.5 && mouseX <= shower.width * 2.5 + medicine.width && mouseY >= 0 && mouseY <= medicine.height) {
    // mouse click is within the rectangle
    showMessage();
  }
}
function checkBottomLeftClickStats() {
  // check if mouse click is within the rectangle of the bottom-left image
  if (mouseX >= 5 && mouseX <= 5 + stats.width && mouseY >= height - stats.height && mouseY <= height) {
    // mouse click is within the rectangle
    showMessage();
  }
}
function checkScoreClickScore() {
  // check if mouse click is within the rectangle of the score image
  if (mouseX >= stats.width + 50 && mouseX <= stats.width + 50 + stats.width && mouseY >= height - stats.height && mouseY <= height) {
    // mouse click is within the rectangle
    showMessage();
  }
}
function checkJogarClickJogar() {
  // check if mouse click is within the rectangle of the jogar image
  if (mouseX >= score.width * 2.5 && mouseX <= score.width * 2.5 + idea.width && mouseY >= height - idea.height && mouseY <= height) {
    // mouse click is within the rectangle
    showMessage();
  }
}

