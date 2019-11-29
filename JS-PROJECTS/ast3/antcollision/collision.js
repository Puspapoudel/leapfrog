
; (function () {
    function Box(parentElement) {
      this.x = 10;
      this.y = 10;
      this.dx = 3;
      this.dy= 3;
      this.width = 20;
      this.height = 20;
      this.element = null;
      this.parentElement = parentElement;
      var that = this;
  
      this.init = function () {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
  
        return this;
      }
  
      this.setPostion = function(x, y) {
        this.x = x;
        this.y = y;
      }
  
      this.boxClicked = function () {
       function removeAnt(){
             this.parentNode.removechild(this);
       }
       setTimeout(removeAnd.bind(this), 2000)

        // console.log('boxClicked', this.width);
      }
  
      this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
      
      this.move = function() {
        if(this.x < 0 || this.x>480){
          this.dx=-this.dx;
        }
        if(this.y< 0 || this.y>480){
          this.dy=-this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
  
      
    }
    
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function Game(parentElement, boxCount) {
      var boxes = [];
      var MAX_WIDTH = 500;
      var MAX_HEIGHT = 500;
      this.parentElement = parentElement;
      this.boxCount = boxCount || 15;
  
      this.startGame = function() {
        for(var i=0; i < this.boxCount; i++) {
          var box = new Box(parentElement).init();
          box.setPostion(
            getRandomArbitrary(0, MAX_WIDTH),
            getRandomArbitrary(0, MAX_HEIGHT)
          )
          box.draw();
          boxes.push(box);
        }
  
        setInterval(this.moveBoxes.bind(this), 1000/60)
      }

      this.checkcollision = function(rect1,rect2) {
        if (rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y) {
            return true;
       }
       
        
      }
  
      this.moveBoxes = function() {
        for(var i=0; i< this.boxCount; i++) {
          boxes[i].move();
          // boxes[i].checkCollision(boxes)
          for(var j=0; j< this.boxCount; j++) {
            if(i==j){
              continue;
            }
            if(this.checkcollision(boxes[i], boxes[j])){
              boxes[i].dx=-boxes[i].dx;
              boxes[j].dx=-boxes[j].dx;
              boxes[i].dy=-boxes[i].dy;
              boxes[j].dy=-boxes[j].dy;
            }

          }
        }
      }
    }
  
    var parentElement = document.getElementById('app');
  
    new Game(parentElement).startGame();
  })();