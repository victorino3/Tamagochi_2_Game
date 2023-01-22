let bgImg;
let centerImg;
let cornerImg;
let newCenterImg;
let centerImg1;
let centerImg2;
let rightImage; 
let shower;
let happy;
let showOverlay = false;
let pathImage = "image/";
let foodAlert = 10
let availableMoney = 100;
let medicine;
let myArray=[]
let stats;
let score;
let idea; 
let sleep;
let sleepy;
let timeouts;
let messageTimeout;
let message = "Não disponível"
let lastClickTime = 0;
let foods = ["banana 10$", "apple 10$", "orange 10$", "grapes 10$"];
let username;
let password;


function preload() {
  bgImg = loadImage(pathImage+"bg.png");
  sleep = loadImage(pathImage+"sleep.png");
  centerImg1 = loadImage(pathImage+"tama.png");
  cornerImg = loadImage(pathImage+"feed.png");
  newCenterImg = loadImage(pathImage+"dirty.png");
  rightImage = loadImage(pathImage+"coin.png");
  centerImg2 =loadImage(pathImage+"tama.png");
  shower = loadImage(pathImage+"bathroom.png");
  medicine = loadImage(pathImage+"medicine.png");
  happy= loadImage(pathImage+"happy.png");
  stats = loadImage(pathImage+"stats.png");
  score  = loadImage(pathImage+"score.png");
  idea = loadImage(pathImage+"idea.png");
  sleepy = loadImage(pathImage+"sleepy.png");
  
  
  
}


function setup() {
  createCanvas(1000, 1000);
  background(153,217,234);


  // create input field for username
  let usernameInput = createInput();
  usernameInput.position(width/2 - usernameInput.width/2, height/2 - 100);
  usernameInput.attribute("placeholder", "Email");

  // create input field for password
  let passwordInput = createInput();
  passwordInput.position(width/2 - passwordInput.width/2, height/2 - 50);
  passwordInput.attribute("placeholder", "Password");
  passwordInput.attribute("type", "Senha");

  // create submit button
  let submitBtn = createButton("Entrar");
  submitBtn.position(width/2 - submitBtn.width/2 - 50, height/2);
  submitBtn.mousePressed(showNote);

  // create info button
  let infoBtn = createButton("Registrar");
  infoBtn.position(width/2 - submitBtn.width/2 + 50, height/2);
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

function showNote() {
  removeElements()
  background(bgImg);
  image(centerImg1, width/5 , height/3.5, centerImg1.width , centerImg1.height/2);
  image(cornerImg, 0, 0);

  image(rightImage, width - (rightImage.width + 50),rightImage.height - 90);
  pop()
  text("You have " + availableMoney + " $ ", width - (rightImage.width + 50), rightImage.height+30);
  text("You have " + foodAlert + " % of food", width -  (rightImage.width + 50), rightImage.height+50);
  push()

  fill("#d8f69b");
  image(shower, cornerImg.width + 30, 0);
  image(medicine, shower.width * 2.5, 0);
  
  image(sleep, 5, height - sleep.height);

  image(score, sleep.width + 50, height - sleep.height);

  image(idea, score.width * 2.5, height - idea.height);

 
}

function mousePressed() { 
  let currentTime = millis();
  if (mouseX > 0 && mouseX < cornerImg.width && mouseY > 0 && mouseY < cornerImg.height) {
    if(foodAlert > 0){   
      centerImg1 = newCenterImg;
      console.log(centerImg1)
      eatScore()
      showNote();
    }else{
      showOverlay = true
    }
    clearTimeout(timeouts);
    
  }
  else if (mouseX > cornerImg.width + 30 && mouseX < cornerImg.width + shower.width + 30 && mouseY > 0 && mouseY < shower.height) {
    let ramdomScore = [0,1]
    let imagedb = Math.floor(Math.random() * ramdomScore.length);
    if(imagedb == 1){
      centerImg1 = happy;
      showNoteForTama(centerImg1)
    }else{
      centerImg1 = centerImg2;
      showNoteForTama(centerImg1)
    }
 
  }else  if (mouseX > shower.width * 2.5 && mouseX < shower.width * 2.5 + medicine.width && mouseY > 0 && mouseY < medicine.height) {
    centerImg1 = happy;
    showNoteForTama(centerImg1)
  
  }
  else if (mouseX > 5 && mouseX < 5 + sleep.width && mouseY > height - sleep.height && mouseY < height) {
    centerImg1 = sleepy;
    showNoteForSleep(centerImg1)
  }
  else if (mouseX > sleep.width + 50 && mouseX < sleep.width + 50 + score.width && mouseY > height - score.height && mouseY < height) {
    showNoteForAwake(centerImg2)
    clearTimeout(timeouts);
    timeouts = setTimeout(resetCenterImage, 10000);
  }
  else if (mouseX > score.width * 2.5 && mouseX < score.width * 2.5 + idea.width && mouseY > height - idea.height && mouseY < height) {
    if (currentTime - lastClickTime > 10000) {
      if(availableMoney < 10 && foodAlert > 0){
        foodAlert-=3;
        availableMoney+= 8;
        updateUserValues(username, password,availableMoney,foodAlert)
      }else  if(availableMoney < 100 ) {
        availableMoney++;
        updateUserValues(username, password,availableMoney,foodAlert)
      }
      
      lastClickTime = currentTime;
    } else {
      textAlign(CENTER);
      textSize(20);
      text(message, width/2, height/2);
      clearTimeout(messageTimeout);
      messageTimeout = setTimeout(removeMessage, 1000);
    }
  }
}

function removeMessage() {
  clear();
  showNote()
}

function resetCenterImage() {
  centerImg1 = sleepy;
  showNoteForSleep(centerImg1)
}


function eatScore() {
  foodAlert -= 10
  updateUserValues(username, password,availableMoney,foodAlert)
}
function buy() {
  if (availableMoney > 9) {
    availableMoney -= 10
    foodAlert += 10
    updateUserValues(username, password,availableMoney,foodAlert)
  } 
}
function removeOverlay() {
  showOverlay = false
  console.log("Back "+showOverlay)
  centerImg1 = centerImg2;
  showNoteForTama(centerImg1)
}

function showNoteForAwake(centerImg1){
  removeElements()
  background(bgImg);
  image(centerImg1, width/5 , height/3.5, centerImg1.width , centerImg1.height/2);
  
  image(cornerImg, 0, 0);

  image(rightImage, width - (rightImage.width + 50),rightImage.height - 90);
  pop()
  fill("black");
  text("You have " + availableMoney + " $ ", width - (rightImage.width + 50), rightImage.height+30);
  text("You have " + foodAlert + " % of food", width -  (rightImage.width + 50), rightImage.height+50);
  push()


  image(shower, cornerImg.width + 30, 0);
  image(medicine, shower.width * 2.5, 0);

    
  image(sleep, 5, height - sleep.height);

  image(score, sleep.width + 50, height - sleep.height);

  image(idea, score.width * 2.5, height - idea.height);

}

function showNoteForSleep(centerImg1){
  removeElements()
  background(bgImg);
  image(centerImg1, width/5 , height/3.5, centerImg1.width , centerImg1.height/2);
  
  image(cornerImg, 0, 0);

  image(rightImage, width - (rightImage.width + 50),rightImage.height - 90);
  pop()
  fill("black");
  text("You have " + availableMoney + " $ ", width - (rightImage.width + 50), rightImage.height+30);
  text("You have " + foodAlert + " % of food", width -  (rightImage.width + 50), rightImage.height+50);
  push()


  image(shower, cornerImg.width + 30, 0);
  image(medicine, shower.width * 2.5, 0);

    
  image(sleep, 5, height - sleep.height);

  image(score, sleep.width + 50, height - sleep.height);

  image(idea, score.width * 2.5, height - idea.height);

}


function showNoteForTama(centerImg1){
  removeElements()
  background(bgImg);
  image(centerImg1, width/5 , height/3.5, centerImg1.width , centerImg1.height/2);
  image(cornerImg, 0, 0);

  image(rightImage, width - (rightImage.width + 50),rightImage.height - 90);
  push()
  fill("black");
  text("You have " + availableMoney + " $ ", width - (rightImage.width + 50), rightImage.height+30);
  text("You have " + foodAlert + " % of food", width -  (rightImage.width + 50), rightImage.height+50);
  pop()


  image(shower, cornerImg.width + 30, 0);
  image(medicine, shower.width * 2.5, 0);

    
  image(sleep, 5, height - sleep.height);

  image(score, sleep.width + 50, height - sleep.height);

  image(idea, score.width * 2.5, height - idea.height);

}

function Register() {
  let username = inputun.value();
  let password = inputpass.value();
  if(!username || !password) {
    alert("Username and Passowrd is required")
  }else{
    checkUsernameTOregister(username,password,imagem)
  }
}

function login() {
  let username = usernameInput.value();
  let password = passwordInput.value();
  removeElements();
  if(!username || !password) {
    alert("Email e Senha são obrigatório")
  }else {
    checkUsername(username, password,availableMoney,foodAlert)
  }
}

function checkUsername(username, password,availableMoney,foodAlert){
  let data = {
    username,
    password,
    availableMoney,
    foodAlert
    }
    httpPost("/login","json",data,(response)=>{
      console.log("From response Login"+response)
      
       
    }) 
} 

function checkUsernameTOregister(username, password,availableMoney,foodAlert) {
  let data = {
  username,
  password,
  availableMoney,
  foodAlert
  }

  httpPost("/register","json",data,(response)=>{
    console.log("From response "+response)
  })  
}
function updateUserValues(username, password,availableMoney,foodAlert) {
  let data = {
  username,
  password,
  availableMoney,
  foodAlert
  }

  httpPost("/values/update","json",data,(response)=>{
    console.log("From response "+response)
  })  
}


