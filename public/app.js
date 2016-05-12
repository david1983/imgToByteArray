var elem = document.getElementById('canvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];
elem.width=16;
elem.height=16;

var resizeVarw = 200
var resizeVarh = 200 / (elem.width/elem.height)
elem.style.width=resizeVarw + 'px';

// Add event listener for `click` events.
var point = {x:0,y:0};
var mousedown = false
elem.addEventListener('mousemove', function(event) {
  point.x = parseInt((event.pageX - elemLeft )*elem.width/resizeVarw),
    point.y = parseInt((event.pageY - elemTop )*elem.height/resizeVarh);
  if(mousedown){
    context.fillRect(point.x,point.y,1,1)
    var img = context.getImageData(0,0,canvas.width,canvas.height)    
    }
}, false);

elem.addEventListener('mousedown', function(event){
  mousedown=true;
})

elem.addEventListener('mouseup', function(event){
  mousedown=false;
})



function changeColor(color){
  context.fillStyle = color
}

function reset(context){
  context.fillStyle = 'white'
  context.fillRect(0,0,elem.width,elem.height);
  context.fillStyle = 'black'
}

reset(context);

function set(){
  var w =  document.getElementById('w').value;
  var h =  document.getElementById('h').value;
  elem.width = w;
  elem.height = h;
  resizeVarw = 200
  resizeVarh = 200 / (elem.width/elem.height)
  console.log(w/h)
}

function loadImage(){
  var input = document.getElementById('imgfile');
  file = input.files[0];
  fr = new FileReader();
  fr.onload = createImage;
  fr.readAsDataURL(file);
}

function createImage() {
  img = new Image();
  img.onload = imageLoaded;
  img.src = fr.result;
}

function imageLoaded() {
  var canvas = document.getElementById("canvas")
//   canvas.width = img.width;
//   canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0, canvas.width, canvas.height);  
}


setInterval(function(){
  var threshold = document.getElementById('threshold').value;
  elem = document.getElementById('canvas')
  context = elem.getContext('2d')
  var img = context.getImageData(0,0,canvas.width,canvas.height)
  
  setCanvas2(img)
  var str = [];
  var count = 0;
  for(var i=0; i<img.data.length;i=i+4){    
    var avg = (img.data[i]+img.data[i+1] + img.data[i+2])/3
    if(avg>threshold) str.push(0)
    else str.push(1)
  }
  
  
  var s = 'static const unsigned char PROGMEM changeMe[] ={B';
  for(var i=0;i<str.length;i++){   
    if(i!=0 && i%8==0) s+=', B'
    s+=str[i]    
  }
  s+='};'
  
  document.getElementById('bytes').innerHTML = s;  
  
},1000)



function setCanvas2(img){
 var threshold = document.getElementById('threshold').value;
  for(var i=0; i<img.data.length;i=i+4){    
    var avg = (img.data[i]+img.data[i+1] + img.data[i+2])/3
    if(avg>threshold){
      img.data[i] = 255 
      img.data[i+1] = 255 
      img.data[i+2] = 255        
    }else{
      img.data[i] = 0 
      img.data[i+1] = 0
      img.data[i+2] = 0        
    }
  }
  var elem = document.getElementById("canvas2");
  elem.width=img.width;
  elem.height=img.height;
  var ctx = elem.getContext("2d");
  ctx.putImageData(img,0,0)  
}



