let g, v, pause=true, square=true;

let slide, start, stop;
let size = 20;
let speed = 60;

function setup() {
   let c = createCanvas(480, 480);
   c.parent(select('.canvas'));
   background(0);
   
   slide = select('#myRange');
   startGame();
}

function startGame() {
    pause = false;
    g = new grid();
    g.init();
    size = slide.value();
    g = new grid(size);
    g.init();
}

function mouseDragged(event) {
   event.preventDefault();
   if (pause==false) { return ; }
   let x = mouseX;
   let y = mouseY;
   g.Set(x, y);
}

function clearGame() {
   pause = true; 
   background(0);
   g.Clear();
}

function stopGame() {
   pause = true;
}

function continueGame() {
   pause = false;
}

function changeShape(flag) {
   square = flag;
}

function draw() {
   frameRate(speed);
   select('#slideValue').html('Cell Size : '+slide.value());
   
   if (!pause) {
      background(0);
      g.show();
      g.nextGen();
   }
}
