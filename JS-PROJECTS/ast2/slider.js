function Slider(carousel, imageWrapper, previous, next, carouselIndicator, transitionPeriod, timeoutInterval){
this.imageWidth = 800;
this.indicatorWidth = 10;
this.indicatorDistance = 10;
this.currentIndex = 0;
this.carousel = carousel;
this.imageWrapper = imageWrapper;
this.timeoutInterval = timeoutInterval;
this.previous = previous;
this.next = next;
this.carouselIndicator = carouselIndicator;
this.imageArray = Array.from(this.imageWrapper.children);
this.indicator = carouselIndicator.getElementsByTagName('ul')[0];

var that = this;
this.previous.onclick = function(){
    clearTimeout(that.timeout);
    that.backslide();
    that.timeout = setTimeout(that.autoslide, that.timeoutInterval)
}
this.next.onclick = function(){
    clearTimeout(that.timeout);
    that.autoSlide();
}

this.indicator.onclick = function(){
    that.clearAllAttributes ();
    clearTimeout(that.timeout);
    e.target.classList.add('active');
    var curr = e.target.getAttribute('id');
    that.imageWrapper.style.marginLeft = '-'+ (that.imageWidth * that.currentIndex) + 'px';
    that.imageArray[curr].style.display = "block";
    that.imageArray[curr].classList.add("active");
    that.timeout = setTimeout(that.autoSlide, that.timeoutInterval);

}


this.clearAllAttributes = function () {
    for (var i = 0; i < this.imageArray.length; i++) {
        if (that.imageArray[i].classList.contains('active')) {
            that.currentIndex = that.imageArray[i].getAttribute('id');
            that.imageArray[i].classList.remove("active");
            that.list[i].classList.remove("active");
        }
    }
}

this.addAttributes = function () {
    that.imageWrapper.style.marginLeft = '-' + (that.imageWidth * that.currentIndex) + 'px';
    that.imageArray[that.currentIndex].style.display = "block";
    that.imageArray[that.currentIndex].classList.add("active");
    that.list[that.currentIndex].classList.add("active");
}

this.autoSlide = function() {
    that.clearAllAttributes()
    

    that.currentIndex++;
    if (that.currentIndex >=that.imageArray.length) {
        that.currentIndex = 0;
    }
    that.addAttributes()
    that.timeout = setTimeout(that.autoSlide, that.timeoutInterval);
}

this.backSlide = function() {
    that.clearAllAttributes()
    that.currentIndex--;
    if (that.currentIndex < 0) {
        that.currentIndex = that.imageArray.length - 1;
    }
    that.addAttributes();
}
}
Slider.prototype.setStyle = function () {
    this.imageWrapper.style.width = (this.imageWidth * this.imageArray.length) + 'px';
    this.carouselIndicator.style.width = (this.indicatorWidth * this.imageArray.length) + (this.indicatorDistance * (this.imageArray.length - 1)) + 'px';
    this.indicator.style.width = this.carouselIndicator.style.width;
    this.imageWrapper.style.transition = 'margin-left ' + this.transitionPeriod + 's';

    for (index in this.imageArray) {
        this.imageArray[index].setAttribute('id', index);
        this.imageArray[index].style.left = (this.imageWidth * index) + 'px';

    }

}

Slider.prototype.setUpList = function () {
    for (index in imageArray) {
        this.indicatorList = document.createElement('li');
        this.indicatorList.setAttribute('id', index);
        this.indicator.appendChild(this.indicatorList);
    }
    this.indicator.children[0].classList.add('active');
    this.list = document.getElementsByTagName('li');
}

var carousel = document.getElementsByClassName('carousel-container')[0];
var imageWrapper = carousel.getElementsByTagName('div')[0];
var previous = document.getElementById('previous');
var next = document.getElementById('next');
var carouselIndicator = document.getElementsByClassName('carousel-indicator')[0];
var imageArray = Array.from(imageWrapper.children);



function createSlider(){
    var slider = new Slider(carousel, imageWrapper, previous, next, carouselIndicator, 1, 2000);
    console.log(slider);
    slider.setStyle();
    slider.setUpList();
    setTimeout(slider.autoSlide, slider.timeoutInterval);

 
}

createSlider();