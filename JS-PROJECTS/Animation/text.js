// var languages = [
//     'js','php','c','c++','python','java','ruby',
//     'js','php','c','c++','python','java','ruby',
//     'js','php','c','c++','python','java','ruby',
//     'js','php','c','c++','python','java','ruby'
// ]

// //Task 1
//  var uniqueArray = [];
//  for(language of languages){
//      if(!uniqueArray.includes(language) ){
//      uniqueArray.push(language)

//  }
// }
//  console.log(uniqueArray);
 

// //  Task 2
//  var count={};
//  for(language of languages){
//      if(!count.includes(language))
//  }





// Assignment 1
// function generateAstrik(num){
// for (var i=num; i>=1; i--){
//     var string="";
//     for (var j=1; j<=i; j++){
//         string+='*';
//     }
//     console.log(string);
// }
// }
// generateAstrik(5);





//Assignment 2
//  var details={
//      'name':'Puspa Poudel',
//      'address':'Kathmandu',
//      'emails':'puspapoudel2000@gmail.com',
//      'interests':'testing',
//      'education':[{'Name':'ABC', 'enrolled date':'2008'},{'Name':'BCD', 'enrolled date':'2009'}]
//  }
//  var education=details.education;
//  for(index in education){
//      console.log("Name:", education[index]['Name'], "date:", education[index]['enrolled date'])
//  }


//Assignment 3
 
// var fruits=[
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}

// ]

// function searchByName(fruits, name){
//     for(index in fruits){
//         var data=fruits[index];
//         if(data['name']===name)
//         {
//             console.log(data);
            
//         }

//     }

// }
// searchByName(fruits,'Banana');


//Assignment 4
// var fruits=[
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}

// ]
// function searchByKey(fruits, name, value){
//     for(index in fruits){
//         var data=fruits[index];
//         if(data[name]===value)
//         {
//             console.log(data);
//         }
//     }

// }
// searchByKey(fruits, 'name', 'Apple');


//Assignment 5 

// var numbers = [1, 2, 3, 4];
// var transformedNumber=[];
// var output = transform(numbers, function(num) {
//     return num * 2;
// });

// console.log(output);

// function transform(collection, transFuc){
//     for(index in collection){
//         transformedNumber.push(transFuc(collection[index]))
//     }
//     return transformedNumber;
// }



//Assigment 6

// var arr = [{
//     id: 1,
//     name: 'John',
// }, {
//     id: 2,
//     name: 'Mary',
// }, {
//     id: 3,
//     name: 'Andrew',
// }];

// var copyArray=Object.assign([], arr);

// function sortBy(array, key){
// array.sort(function(a,b){
//     if(a[key]< b[key]){
//         return -1;
//     }
//     else if(a[key]> b[key]){
//         return 1;
//     }
//     return 0;

// });
// console.log(array);

// }
// console.log(sortBy);




//Assignmwnt 7


// var input = {
//     '1': {
//       id: 1,
//       name: 'John',
//       children: [
//         { id: 2, name: 'Sally' },
//         { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
//       ]
//     },
//     '5': {
//       id: 5,
//       name: 'Mike',
//       children: [{ id: 6, name: 'Peter' }]
//     }
//   };
//   var output = Object.assign({}, input);

//   function normalize(value) {
//         var childrenArray =[];
//         if (!value.hasOwnProperty('children')) {
//             output[value.id] = { id: value.id, name: value.name };
//         } else {
//             value['children'].map(function (childValue, index) {
//                 childrenArray[index] = childValue['id'];
//                 output[value.id] = { id: value.id, name: value.name, children: childrenArray};
//                 normalize(childValue);
//         })
//         }
//     }
//     var outputArray = Object.values(output);
//     for(index in outputArray){
//         normalize(outputArray[index]);height
//     }
//     console.log(output);




//Assignment 8

// var canvas=document.getElementsByTagName("canvas")[0];
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


// canvas.addEventListener('resize', function(){
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
    
// })

// var context= canvas.getContext('2d');

//Plotting the cordinates

// var points = [
//     {x: 10, y: 20},
//     {x: 40, y: 40},
//     {x: 60, y: 60},
//     {x: 80, y: 80},
//     {x: 100, y: 100},
//     {x: 120, y: 120},
// ];


// for(index in points){
//     context.beginPath();
//     context.arc(points[index]['x'], points[index]['y'], 5 , 0, Math.PI*2, false );
//     context.fillStyle="blue";
//     context.fill();
// }


//Assignment 9

var canvas= document.getElementsByTagName("canvas")[0];
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

canvas.addEventListener('resize', function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
})

var context=canvas.getContext('2d');


//rendering the circle that moves vertically and bounces back into another direction

 var y = innerHeight/2;
 var RADIUS = 30;
 var SPEED = 4;



 function darw(){
     context.beginPath();
     context.arc(innerWidth/2, y, RADIUS, 0, Math.PI*2, false);
     context.fillStyle="blue";
     context.fill();
 }

 function bounce(){
     if(y+RADIUS>innerHeight || y-RADIUS<0){
        SPEED = -SPEED;
     }
     y += SPEED;
     darw();

 }



 function animate(){
     requestAnimationFrame(animate);
      context.clearRect(0, 0, innerWidth, innerHeight);
     bounce();
 }
 animate();
