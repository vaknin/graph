//#region Initialize

// Canvas
const gridSize = 15;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const Expression = algebra.Expression;
const Equation = algebra.Equation;
let yAxisX, xAxisY;
let zoom = 1;

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

    xAxisY = Math.round(canvas.height / 2);
    yAxisX = Math.round(canvas.width / 2);
    
    // Make the axes sit exactly on grid's vertical&horizontal lines
    while(xAxisY % 15 != 0){
        xAxisY--;
    }
    while(yAxisX % 15 != 0){
        yAxisX--;
    }

    // Axes line properties
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(yAxisX, 0);
    ctx.lineTo(yAxisX, canvas.height);
    ctx.stroke();
    ctx.closePath();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, xAxisY);
    ctx.lineTo(canvas.width, xAxisY);
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
    graph('5 + x');
    requestAnimationFrame(draw); // Loop
}

// Graph a function
function graph(f){

    let x, y;

    // Canvas
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#55f';
    ctx.beginPath();

    x = -1000;
    y = algebra.parse(f).eval({x: x});
    // left-most point
    x = (yAxisX + (x * gridSize * zoom));
    y = (xAxisY - (y * gridSize * zoom));
    ctx.moveTo(x, y);

    x = 1000;
    y = algebra.parse(f).eval({x: x});
    x = (yAxisX + (x * gridSize * zoom));
    y = (xAxisY - (y * gridSize * zoom));
    // right-most point
    ctx.lineTo(x, y);
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
    y = (xAxisY - (y * gridSize * zoom));
    x = (yAxisX + (x * gridSize * zoom));
    ctx.arc(x, y, 5,0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
}

//#endregion

//#region Event Listeners

document.addEventListener('wheel', e => {
    Math.sign(e.deltaY) == -1 ? zoom += 0.3 : zoom-= 0.3;
    if (zoom <= 0.3) zoom = 0.3;
});

//#endregion
