// Global Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawGrid(){
    let img = new Image(500,500);
    img.src = './grid.svg';
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

drawGrid();