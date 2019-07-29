// Canvas initialization
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Draw the grid on canvas
function drawGrid(){
    let img = new Image(500,500);
    img.src = './grid.svg';
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

// Draw the axes
function drawAxes(){

    // Axes line properties
    ctx.lineWidth = 2;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.closePath();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.closePath();

    // Revert axes line properties
    ctx.lineWidth = 1;
}

drawAxes();
drawGrid();