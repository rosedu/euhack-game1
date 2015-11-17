var keyboard = {};
var x = 10;

function moveLeft() {
    x = x - 3;
}

function moveRight() {
    x = x + 3;
}

function inputs() {
    if(keyboard.A) {
        moveLeft();
    }
    if(keyboard.D) {
        moveRight();
    }
}

function draw() {
    var circle = document.querySelector('#ball');
    circle.setAttribute('cx', x);
}

function gameLoop() {
    inputs();
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', function() {
    window.addEventListener('keydown', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = true;
    });
    window.addEventListener('keyup', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = false;
    });
    gameLoop();
});
