var x, y;











function moveRight() {
    x = x + 3;
}

function gravity() {
    y = y + 2;
}
































var keyboard = {};
function inputs() {
    if(keyboard.A) {
        moveLeft();
    }
    if(keyboard.D) {
        moveRight();
    }
    if(keyboard.W) {
        jump();
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
    var ball = {x: x, y: y, h: 32, w: 32};
    world.forEach(function(obj) {
        if(collides(ball, obj)) {
            ball.x = obj.x - ball.w;
            if (obj.finish !== undefined) {
                obj.finish();
            }
        }
    });
    x = ball.x;
}

function physicsY() {
    gravity();
    var ball = {x: x, y: y, h: 32, w: 32};
    world.forEach(function(obj) {
        if(collides(ball, obj)) {
            ball.y = obj.y - ball.h;
            if (obj.finish !== undefined) {
                obj.finish();
            }
        }
    });
    y = ball.y;
}

function draw() {
    var circle = document.querySelector('#ball');
    circle.setAttribute('x', x);
    circle.setAttribute('y', y);
}

function gameLoop() {
    if(x > 640 || y > 1000) {
        x = 32;
        y = 128+32*4;
    }
    inputs();
    moveRight();
    physicsX();
    physicsY();
    draw();
    requestAnimationFrame(gameLoop);
}

var world;
window.addEventListener('load', function() {
    world = [];
    var HEIGHT = 32, WIDTH = 32;
    x = 32; y = 128+32*4

    function createBlock(image, id, x, y, finish) {
        var obj = {id: id, x: x, y: y, w: 32, h :32, finish:finish};
        world.push(obj);
        node = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', image);
        node.setAttribute('id', obj.id);
        node.setAttribute('x', obj.x);
        node.setAttribute('y', obj.y);
        node.setAttribute('width', obj.w);
        node.setAttribute('height', obj.h);
        document.querySelector('#game').appendChild(node);
    }

    [0, 1, 2, 3, 4, 5, 6].forEach(function(n) {
        createBlock('ground.png', 'block0'+n, n * 32, 128+32*6);
    });

    [3, 4, 5, 6, 7, 8, 9].forEach(function(n) {
        createBlock('ground.png', 'block1'+n, 320 + n * 32, 224+32*7);
    });
    createBlock('ground.png', 'block20', 608, 192+32*7);
    createBlock('ground.png', 'block21', 608-32, 192+32*7);
    createBlock('tile.png', 'block21', 608-32*2, 192+32*7, function(){
        document.body.innerHTML = '<img src="win.png" style="max-width:100%; max-height:100%" />';

    });

    window.addEventListener('keydown', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = true;
    });
    window.addEventListener('keyup', function(e) {
        keyboard[String.fromCharCode(e.keyCode)] = false;
    });
    gameLoop();
});
