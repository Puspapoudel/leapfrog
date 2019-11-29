
; (function () {
    function Box(parentElement) {
      this.x = 10;
      this.y = 10;
      this.dx = 1;
      this.dy= 1;
      this.width = 20;
      this.height = 20;
      this.element = null;
      this.parentElement = parentElement;
      var that = this;
  
      this.init = function (id) {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        box.setAttribute('id', id);
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
      console.log(this);
      this.boxClicked = function () {
      console.log('boxClicked', this.width);
      
       }
      //  setTimeout(removeAnd.bind(this), 2000)

      this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
      
      this.move = function() {
        if(this.x < 0 || this.x>483){
          this.dx=-this.dx;
        }
        if(this.y< 0 || this.y>483){
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
      var interval;
      this.boxes = [];
      var MAX_WIDTH = 500;
      var MAX_HEIGHT = 500;
      this.parentElement = parentElement;
      this.boxCount = boxCount || 15;
  
      this.startGame = function() {
        for(var i=0; i < this.boxCount; i++) {
          var box = new Box(parentElement).init(i);
          box.setPostion(
            getRandomArbitrary(0, MAX_WIDTH),
            getRandomArbitrary(0, MAX_HEIGHT)
          )
          box.draw();
          this.boxes.push(box);
        }
  
        this.moveBoxes();
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
        for(var i=0; i< this.boxes.length; i++) {
          clearInterval(interval);
          this.boxes[i].move();
          // boxes[i].checkCollision(boxes)
          for(var j=0; j< this.boxes.length; j++) {
            if(i==j){
              continue;
            }
            if(this.checkcollision(this.boxes[i], this.boxes[j])){
              this.boxes[i].dx=-this.boxes[i].dx;
              this.boxes[j].dx=-this.boxes[j].dx;
              this.boxes[i].dy=-this.boxes[i].dy;
              this.boxes[j].dy=-this.boxes[j].dy;
            }

          }
        }
        interval = setInterval(this.moveBoxes.bind(this), 1000/60)
      }
    }
  
    var parentElement = document.getElementById('app');
    var game = new Game(parentElement, 5);
game.startGame();
console.log(game);      

var ants = parentElement.getElementsByTagName('div');
for (var i = 0; i < ants.length; i++) {
  ants[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = e.target.parentNode.getAttribute('id');
  
    game.boxes.splice(id,1);
    this.remove(e.target.parentNode);

  })
}
})();


 