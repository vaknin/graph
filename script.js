// Canvas initialization
const gridSize = 15;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let xAxis, yAxis;

// Wait for grid image to load, and start animation loop
const grid = new Image();
grid.src = './grid.svg';
grid.onload = () => {
    draw();
};

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
    //graph('-9x');
    point(5,5);

    requestAnimationFrame(draw); // Loop
}

// Graph a function
function graph(f){

    // Extreact slope and y-intercept
    let slope = parseInt(f.substring(0, f.indexOf('x')));
    let intercept = parseInt(f.substring(f.indexOf('x') + 1));
    if (!intercept) intercept = 0;
    
    console.log(slope);
    

    // Draw on canvas
    ctx.beginPath();
    ctx.arc(xAxis, yAxis - (intercept * gridSize), 5,0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
}

// Draw a specific point on the graph
function point(x,y){
    ctx.beginPath();
    ctx.arc(xAxis + (x * gridSize), yAxis - (y * gridSize), 5,0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
}
