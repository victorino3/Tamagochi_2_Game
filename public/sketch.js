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
let passwordInput;
let usernameInput;
let moneyTodb=0
let foodTodb =0
let initialFood = 0
let initialMoney = 0
let foodAlert=100
let availableMoney=100
let verify = false


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
  usernameInput = createInput();
  usernameInput.position(width/2 - usernameInput.width/2, height/2 - 100);
  usernameInput.attribute("placeholder", "Email");

  // create input field for password
  passwordInput = createInput();
  passwordInput.position(width/2 - passwordInput.width/2, height/2 - 50);
  passwordInput.attribute("placeholder", "Password");
  passwordInput.attribute("type", "Senha");

  // create submit button
  let submitBtn = createButton("Entrar");
  submitBtn.position(width/2 - submitBtn.width/2 - 50, height/2);
  submitBtn.mousePressed(login);

  // create info button
  let infoBtn = createButton("Registrar");
  infoBtn.position(width/2 - submitBtn.width/2 + 50, height/2);
  infoBtn.mousePressed(Register);
  foodAlert = initialFood ? initialFood : 100
  availableMoney = initialMoney ? initialMoney : 100

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
      moneyTodb = availableMoney
      foodTodb = foodAlert
      updateUserValues(username, password,moneyTodb,foodTodb)
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
      moneyTodb = availableMoney
      foodTodb = foodAlert
      updateUserValues(username, password,moneyTodb,foodTodb)
    }else{
      centerImg1 = centerImg2;
      showNoteForTama(centerImg1)
    }
 
  }else  if (mouseX > shower.width * 2.5 && mouseX < shower.width * 2.5 + medicine.width && mouseY > 0 && mouseY < medicine.height) {
    centerImg1 = happy;
    showNoteForTama(centerImg1)
    moneyTodb = availableMoney
    foodTodb = foodAlert
    updateUserValues(username, password,moneyTodb,foodTodb)
  
  }
  else if (mouseX > 5 && mouseX < 5 + sleep.width && mouseY > height - sleep.height && mouseY < height) {
    centerImg1 = sleepy;
    showNoteForSleep(centerImg1)
    moneyTodb = availableMoney
    foodTodb = foodAlert
    updateUserValues(username, password,moneyTodb,foodTodb)
  }
  else if (mouseX > sleep.width + 50 && mouseX < sleep.width + 50 + score.width && mouseY > height - score.height && mouseY < height) {
    showNoteForAwake(centerImg2)
    clearTimeout(timeouts);
    timeouts = setTimeout(resetCenterImage, 10000);
    moneyTodb = availableMoney
    foodTodb = foodAlert
    updateUserValues(username, password,moneyTodb,foodTodb)
  }
  else if (mouseX > score.width * 2.5 && mouseX < score.width * 2.5 + idea.width && mouseY > height - idea.height && mouseY < height) {
    if (currentTime - lastClickTime > 10000) {
      if(availableMoney < 10){
        availableMoney+= 10;
        moneyTodb = availableMoney
        updateUserValues(username, password,moneyTodb,foodTodb)
      }
      else if (foodAlert > 10) {
        foodAlert -= 5
        foodTodb = foodAlert
        updateUserValues(username, password,moneyTodb,foodTodb)
      }else {
        availableMoney++;
        moneyTodb = availableMoney
        updateUserValues(username, password,moneyTodb,foodTodb)
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
  foodTodb = foodAlert;
  updateUserValues(username, password,moneyTodb,foodTodb)
}
function buy() {
  if (availableMoney > 9) {
    availableMoney -= 10
    moneyTodb = availableMoney
    foodAlert += 10
    foodTodb = foodAlert;
    updateUserValues(username, password,moneyTodb,foodTodb)
  } else{
    alert("Dinheiro insuficiente")
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
  let username = usernameInput.value();
  let password = passwordInput.value();
  if(!username || !password) {
    alert("Username and Passowrd is required")
  }else{
    try {
      moneyTodb = availableMoney
      foodTodb = foodAlert
      checkUsernameTOregister(username, password,moneyTodb,foodTodb)
      showNote()       
    } catch (error) {
      return error
    }
  
  }
}

function login() {
  let username = usernameInput.value();
  let password = passwordInput.value();
  if(!username || !password) {
    alert("Email e Senha são obrigatório")
  }else {
    
      checkUsername(username, password,moneyTodb,foodTodb) 
      
    }
  
}

function checkUsername(username, password,moneyTodb,foodTodb){
  let data = {
    username,
    password,
    moneyTodb,
    foodTodb
    }
    httpPost("/login","json",data,(response)=>{    
      console.log(response)
      if ( response.message == true ) {
        getdata()
        showNote()
      } else {
        alert("Utilizador não encontrado! Faça um novo registro")
      }   
       
    }) 
  
} 

function checkUsernameTOregister(username, password,moneyTodb,foodTodb) {
  let data = {
  username,
  password,
  moneyTodb,
  foodTodb
  }
  console.log(data)
  console.log("Entrei register aqui")
  httpPost("/register","json",data,(response)=>{
    
      return true   
     
  }) 
}
function updateUserValues(username, password,moneyTodb,foodTodb) {
  let data = {
  username,
  password,
  moneyTodb,
  foodTodb
  }
  console.log("sending ", data.toString())
  httpPost("/values/update","json",data,(response)=>{
    console.log("From response "+response)
  })  
}



function getdata() {
  loadJSON('/getdata',(response)=>{
    let result = response
    console.log("Data come from back "+JSON.stringify(response))

    initialFood = result.message.foodAlert	
    initialMoney = result.message.availableMoney
   
    })
}








