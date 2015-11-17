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

var world;
window.addEventListener('load', function() {
    world = [];
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(function(n) {
        var obj = {id: 'block'+n, x: n*32, y: 48};
        world.push(obj);
        node = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'ground.png');
        node.setAttribute('id', obj.id);
        node.setAttribute('x', obj.x);
        node.setAttribute('y', obj.y);
        node.setAttribute('width', 32);
        node.setAttribute('height', 32);
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
