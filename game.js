var game = document.querySelector('#game');
var n = 20;

function draw() {
    n = move(n);
    document.querySelector('#ball').setAttribute('cx', n);
}

function move(x) {
    return x + 1;
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', gameLoop);
