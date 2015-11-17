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

function collides(a, b) {
    if(a.x >= b.x + b.w) return false;
    if(b.x >= a.x + a.w) return false;
    if(a.y >= b.y + b.h) return false;
    if(b.y >= a.y + a.h) return false;
    return true;
}

function physicsX() {
    var ball = {x: x, y: y, h: 20, w: 20};
    world.forEach(function(obj) {
        if(collides(ball, obj)) {
            ball.x = obj.x - ball.w;
        }
    });
    x = ball.x;
}

function physicsY() {
    y += 3;
    var ball = {x: x, y: y, h: 20, w: 20};
    world.forEach(function(obj) {
        if(collides(ball, obj)) {
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
    physicsX();
    physicsY();
    draw();
    requestAnimationFrame(gameLoop);
}

var world;
window.addEventListener('load', function() {
    world = [];

    function createGroundBlock(id, x, y) {
        var obj = {id: id, x: x, y: y, w: 32, h :32};
        world.push(obj);
        node = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'ground.png');
        node.setAttribute('id', obj.id);
        node.setAttribute('x', obj.x);
        node.setAttribute('y', obj.y);
        node.setAttribute('width', obj.w);
        node.setAttribute('height', obj.h);
        document.querySelector('#game').appendChild(node);
    }

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(n) {
        createGroundBlock('block'+n, n * 32, 128);
    });
    createGroundBlock('block10', 128, 96);

    window.addEventListener('keydown', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = true;
    });
    window.addEventListener('keyup', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = false;
    });
    gameLoop();
});
