//#region Initialize

// Canvas
const gridSize = 15;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const Expression = algebra.Expression;
const Equation = algebra.Equation;
let xAxis, yAxis;

// Wait for grid image to load, and start animation loop
const grid = new Image();
grid.src = './grid.svg';
grid.onload = () => {
    draw();
};

//#endregion

//#region Functions

// Draw the axes
function drawAxes(){

    yAxis = Math.round(canvas.height / 2);
    xAxis = Math.round(canvas.width / 2);
    
    while(yAxis % 15 != 0){
        yAxis--;
    }
    while(xAxis % 15 != 0){
        xAxis--;
    }

    // Axes line properties
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvas.height);
    ctx.stroke();
    ctx.closePath();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvas.width, yAxis);
    ctx.stroke();
    ctx.closePath();

    // Revert axes line properties
    ctx.lineWidth = 1;
}

// Animation loop
async function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height); // Clear canvas
    ctx.drawImage(grid, 0, 0); // Draw grid
    drawAxes(); // Draw axes
    graph('-x + 4');
    requestAnimationFrame(draw); // Loop
}

// Graph a function
function graph(f){

    let x, y;

    // Canvas
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#55f';
    ctx.beginPath();

    // left-most point
    x = -1000;
    y = algebra.parse(f).eval({x: x});
    ctx.moveTo(xAxis + (x * gridSize), yAxis - (y * gridSize));

    // right-most point
    x = 1000;
    y = algebra.parse(f).eval({x: x});
    ctx.lineTo(xAxis + (x * gridSize), yAxis - (y * gridSize));
    ctx.stroke();
    ctx.closePath();

    // Y-intersect
    y = algebra.parse(f).eval({x: 0});
    point(0, y);

    // X-intersect
    let equation = new Equation(algebra.parse(f), 0);
    x = equation.solveFor("x");
    point(x, 0);

    // Revert canvas
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
}

// Draw a specific point on the graph
function point(x,y){
    ctx.beginPath();
    ctx.arc(xAxis + (x * gridSize), yAxis - (y * gridSize), 5,0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
}

//#endregion
