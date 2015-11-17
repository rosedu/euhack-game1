var keyboard = {};
var x = 32;
var y = 64;

function moveLeft() {
    x = x - 2;
}

function moveRight() {
    x = x + 2;
}

function inputs() {
    if(keyboard.A) {
        moveLeft();
    }
    if(keyboard.D) {
        moveRight();
    }
}

function physics() {
    y += 3;
    var ball = {x: x, y: y, h: 20, w: 20};
    world.forEach(function(obj) {
        if(ball.y + ball.h > obj.y) {
            ball.y = obj.y - ball.h;
        }
    });
    y = ball.y;
}

function draw() {
    var circle = document.querySelector('#ball');
    circle.setAttribute('cx', x + 10);
    circle.setAttribute('cy', y + 10);
}

function gameLoop() {
    inputs();
    physics();
    draw();
    requestAnimationFrame(gameLoop);
}

var world;
window.addEventListener('load', function() {
    world = [];
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(n) {
        var obj = {id: 'block'+n, x: n*32, y: 128, w: 32, h :32};
        world.push(obj);
        node = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'ground.png');
        node.setAttribute('id', obj.id);
        node.setAttribute('x', obj.x);
        node.setAttribute('y', obj.y);
        node.setAttribute('width', obj.w);
        node.setAttribute('height', obj.h);
        document.querySelector('#game').appendChild(node);
    });

    window.addEventListener('keydown', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = true;
    });
    window.addEventListener('keyup', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = false;
    });
    gameLoop();
});
