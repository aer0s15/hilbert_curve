let order = 5;
let n = Math.pow(2, order);
let total = n * n;
let path = new Array(total);

function setup() {
  createCanvas(512, 512);
  background(0);
  colorMode(HSB);
  
  for (let i=0; i < total ; i++){
    path[i] = hilbert(i);
    let len =  width / n;
    // console.log(path[i].x,path[i].y);
    path[i].mult(len);
    path[i].add(len/2,len/2);
  }
  
}

let counter = 0;
function draw() {
  background(0);
  
  
  // let c=map(counter,0,path.length,0,360);
  stroke(255);
  strokeWeight(2);
  noFill();
  // beginShape();
  for(let i=1; i < counter; i++){
    let c=map(i,0,path.length,0,360);
    stroke(c,255,255);
    line(path[i].x,path[i].y,path[i-1].x,path[i-1].y);
  }
  // endShape();
  
  counter++;
  
  if(counter == path.length){
    counter = 0;
    // order++;
  }
  // strokeWeight(1);
  // for(let i=0; i < path.length; i++){
  //   point(path[i].x,path[i].y);
  //   text(i,path[i].x+10,path[i].y);
  // }
}

function hilbert(i) {
  let points = new Array(
    new createVector(0,0),
    new createVector(0,1),
    new createVector(1,1),
    new createVector(1,0)
  );
  
  
  let index = i & 3;
  let v = points[index];
  
  for (let j = 1; j < order; j++){
  i = i >>> 2;
  index = i & 3 ;
  let lens = pow(2,j);
  
  if(index == 0){
  let temp = v.x;
    v.x = v.y;
    v.y = temp;
  }
  else if (index == 1){
  v.y+=lens;
  }
  else if (index == 2){
  v.x+=lens;
    v.y+=lens;
  }
  else if (index == 3){
    let temp = lens - 1 - v.x;
    v.x = lens - 1 - v.y;
    v.y = temp;
  v.x+=lens;
  }
  }
  return v;
}