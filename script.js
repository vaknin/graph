//#region Global Variables

// Algebra
const Expression = algebra.Expression;
const Equation = algebra.Equation;

let yAxisX, xAxisY;
let mouseX, mouseY;
let zoom = 1;
let input;


//#endregion

//#region Initialize Canvas

// Canvas
const gridSize = 15;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

    // If user typed an equation, graph it
    if (input){
        try{
            algebra.parse(input);
            graph(input);
        }
        catch(e){}
    }
    
    requestAnimationFrame(draw); // Loop
}

// Graph a function
function graph(f){
    
    let x, y;

    // Canvas
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#55f';
    ctx.beginPath();

    // left-most point
    x = -1000;
    y = algebra.parse(f).eval({x: x});
    x = (yAxisX + (x * gridSize * zoom));
    y = (xAxisY - (y * gridSize * zoom));
    ctx.moveTo(x, y);

    // right-most point
    x = 1000;
    y = algebra.parse(f).eval({x: x});
    x = (yAxisX + (x * gridSize * zoom));
    y = (xAxisY - (y * gridSize * zoom));
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;

    // Y-intersect (X = 0)
    y = algebra.parse(f).eval({x: 0});
    console.log(y);
    point(0, y);

    // X-intersect (Y = 0)
    if (f.includes('x')){
        let equation = new Equation(algebra.parse(f), 0);
        x = equation.solveFor("x");
        point(x, 0);
    }
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

// Mouse wheel
document.addEventListener('wheel', e => {
    Math.sign(e.deltaY) == -1 ? zoom += 0.25 : zoom-= 0.25;
    if (zoom < 0.1) zoom = 0.1;
});

// Input change
const inputElement = document.getElementById('input');
inputElement.addEventListener('input', () => {
    input = inputElement.value;
});

//#endregion
