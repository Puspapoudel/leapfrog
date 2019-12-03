  function CarGame(startGameButton, gameContainer, highestScore, scoreBoard) {
  this.startGameButton = startGameButton;
  this.scoreBoard = scoreBoard;
  this.highestScore = highestScore;
  this.gameContainer = gameContainer;
  this.opponent = null;
  this.playGame = null;
  this.highest = window.localStorage.getItem('highest') || 0;
  this.frames = 0;
  this.countTime = 4;
  this.car;
  this.canPlayGame = false;
  this.opponentPositionArray = [110, 260, 410];
  this.obstacleBackgroundArray = ['images/enemy.png', 'images/enemy2.png', 'images/enemy.png'];
  this.obstacleArray = [];
  this.playerCar = {
    xPosition: 260,//left
    yPosition: 530 //top
  };
  this.obstacleCar = {
    //position of obstacle car
    yPosition: -1 * (Math.floor(Math.random() * 100))
  };
  this.yPosition = [-100, -100, -100];
  this.animFrame;
  //this.delay;
  var setUpGameContainer;
  var that = this;
  

  this.startGameButton.onclick = function (e) {
    if (that.canPlayGame) {
      return;
    }
    that.canPlayGame = true;
    that.highestScore.innerHTML = that.highest;
    setUpGameContainer = new SetUpGameContainer(that.gameContainer);
    setUpGameContainer.animateBackground();
    that.startGame();
  }
  //creating  div the opponent car

  this.setupGameAssets = function () {
    var opponent = document.createElement('div');
    opponent.setAttribute('class', 'opponent');
    this.gameContainer.appendChild(opponent);
    return opponent;
  }
//position of opponent car on left and top
  this.drawGameAssets = function (i) {
    var yPosition = 0;
    var obstacle = this.setupGameAssets();
    obstacle.style.background = 'url("' + this.obstacleBackgroundArray[i] + '")';
    obstacle.style.left = this.opponentPositionArray[i] + 'px';
    obstacle.style.top = yPosition + 'px';
    this.obstacleArray.push(obstacle);
  }
  // if opponent pass the lane frame increases with 1 point 

  this.updateGameAssets = function (opponent, i) {
    if (this.yPosition[i] >= 640) {
      this.frames++;
      console.log(this.frames);
      // this.increaseDifficulty = true;(After multiple of 10 whether to increase or decrease the speed)
      var random = -1 * (Math.floor(Math.random() * 1000));
      // if(random - this.yPosition[i+1] <= 100){
      //  random = -1 * (Math.floor(Math.random() * 1000));
      // }
      this.yPosition[i] = random;
      this.scoreBoard.innerHTML = this.frames;
    }
    // increasing the speed of the car on the multiple of 10
    if (this.frames % 10 == 0 && this.increaseDifficulty) {
      this.countTime += 0.5;
      this.increaseDifficulty=false;
    }
    this.yPosition[i] += this.countTime;
    opponent.style.top = this.yPosition[i] + 'px';
  }

  this.animateGameAssets = function () {
    var random = Math.floor(Math.random() * 270) + 100;
    //opponent car ending point in animframe
    this.animFrame = requestAnimationFrame(this.animateGameAssets.bind(this));

    //delay the interval of opponent car
    if (this.animFrame % random == 0 && this.obstacleArray.length < 3 && Math.random() < 0.5) {
      console.log(this.frames % random);
      this.drawGameAssets(this.obstacleArray.length);
    }

    
    for (var i = 0; i < this.obstacleArray.length; i++) {
      this.obstacleCar.xPosition = this.opponentPositionArray[i];
      this.updateGameAssets(this.obstacleArray[i], i);
      if (this.checkCollision(i)) {
        if (this.frames > this.highest) {
          window.localStorage.setItem('highest', that.frames);
        }
        this.playGame.resetGame();
      }
    }
  }

  this.checkCollision = function (i) {
    if (this.playerCar.xPosition < this.obstacleCar.xPosition + 40 &&
      this.playerCar.xPosition + 40 > this.obstacleCar.xPosition &&
      this.playerCar.yPosition < this.yPosition[i] + 80 &&
      this.playerCar.yPosition + 80 > this.yPosition[i]) {
      return true;
    }
  }

  this.startGame = function () {
    if (this.canPlayGame) {
      this.animateGameAssets();
      this.car = setUpGameContainer.positionPlayerCar();
      this.playGame = new PlayGame(this.car, setUpGameContainer, this);
    }
  }
}

function PlayGame(player, setUpGameContainer, carGame) {
  this.player = player;
  this.setUpGameContainer = setUpGameContainer;
  this.carGame = carGame;
  //this.boostObject = null;
  this.isCrashed = false;
  this.bulletObject = null;
  this.bulletPosition = {
    yPosition: 520
  }
  // this.boostPosition = {
  //   xPosition: 0,
  //   yPosition: 0
  // }
  
  //this.boostYPos = [0,0,0];
  this.bulletArray = [];
  this.maximumAmmo = 20;
  this.bulletCount = this.maximumAmmo;
  this.aniFrame = null;
  var that = this;
  document.onkeydown = function (e) {
    if (!that.isCrashed) {
      switch (e.which) {
        case 65:
          that.carGame.playerCar.xPosition -= 150;
          break;
        case 68:
          that.carGame.playerCar.xPosition += 150;
          break;
          case 32:  // space bar for firing bullet gun 
          that.fireBullets();
          break;

          
      }
      that.isCrashed = that.movePlayer(that.carGame.playerCar.xPosition);
      if(that.isCrashed){
        that.isCrashed = false;
        if (that.carGame.playerCar.xPosition > 450) {
          that.carGame.playerCar.xPosition -= 150;
        }
        else {
          that.carGame.playerCar.xPosition += 150;
        }
      }
    }
  }
  
  this.loadBullets = function(){
  var bullet = document. createElement('div');
  console.log(bullet);
  bullet.setAttribute=('class', 'bullet');
  bullet.style.top = this.bulletPosition.yPosition + 'px';
  bullet.style.left = this.carGame.playerCar + 20 + 'px';
  this.setUpGameContainer.gameContainer.appendChild(bullet);
  return bullet;
  }

 

  this.fireBullets = function () {
    if (this.bulletCount !== 0) {
      this.bulletCount--;
      this.bulletPosition.yPosition = 503;
      var bulletObject = this.loadBullets();
      this.bulletObject = bulletObject;
      this.moveBullets();
    }
  }
  this.updateBulletPosition = function () {
    this.bulletPosition.yPosition -= 3;
    this.bulletObject.style.top = this.bulletPosition.yPosition + 'px';
  }
  this.moveBullets = function () {
    this.updateBulletPosition();
    this.aniFrame=requestAnimationFrame(this.moveBullets.bind(this));
    for (var i = 0; i < this.carGame.obstacleArray.length ; i++) {
      if (this.carGame.playerCar.xPosition === this.carGame.opponentPositionArray[i]) {
        if (this.checkBulletCollision(i, this.bulletPosition.yPosition)) {
          this.carGame.obstacleArray[i].display='none';
          this.carGame.yPosition[i] = -1*Math.floor(Math.random()*300+200);
          this.bulletObject.remove();
          cancelAnimationFrame(that.aniFrame);
          break;
        }
      }
    }
  }
  this.checkBulletCollision = function (i, y) {
    if (y <= this.carGame.yPosition[i]+100 && y+27 > this.carGame.yPosition[i]) {
      // console.log("collide");
      return true;
    }
  }

  this.resetGame = function () {
    cancelAnimationFrame(this.setUpGameContainer.animationFrame);
    cancelAnimationFrame(this.carGame.animFrame);
    alert("Game Over");
    this.player.remove();
    while (this.carGame.gameContainer.hasChildNodes()) {
      this.carGame.gameContainer.removeChild(this.carGame.gameContainer.lastChild);
    }
    this.carGame.scoreBoard.innerHTML = '0';
    this.carGame.highestScore.innerHTML = window.localStorage.getItem('highest');
    init();
  }

    // location.reload();
  

  this.movePlayer = function (position) {
    if (position < 0 || position > 500) {
      return true;
    }
    this.player.style.left = position + 'px';
    return false;
  }
}



function SetUpGameContainer(gameContainer) {
  this.gameContainer = gameContainer;
  this.animationFrame;
  var position = 0;

  this.animateBackground = function () {
    position += 2;
    this.gameContainer.style.backgroundPosition = '0 ' + position + 'px';// background (x position 0 and y vary accordingly)
    this.animationFrame = requestAnimationFrame(this.animateBackground.bind(this));
  }

  this.positionPlayerCar = function () {
    var car = document.createElement('div');
    car.setAttribute('class', 'player-car');
    this.gameContainer.appendChild(car);
    return car;
  }

}



function init() {
var startGameButton = document.getElementById('start-game');
var gameContainer = document.getElementById('game-container');
var scoreBoard = document.getElementById('score-board');
var highestScore = document.getElementsByTagName('span')[0];
new CarGame(startGameButton, gameContainer,highestScore,scoreBoard);

}
init();