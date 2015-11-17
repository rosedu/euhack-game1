var game = document.querySelector('#game');
var world = {
    ball: {x: 0, y: 0},
    mouse: {x: 0, y: 0}
};
var speed = 2;

function moveBall(ball, mouse) {
    var dx = mouse.x - ball.x;
    var dy = mouse.y - ball.y;
    var distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < 1) {
        return ball;
    }
    var f = speed / distance;
    return {x: ball.x + dx * f, y: ball.y + dy * f};
}

function draw() {
    world.ball = moveBall(world.ball, world.mouse);
    var circle = document.querySelector('#ball');
    circle.setAttribute('cx', world.ball.x);
    circle.setAttribute('cy', world.ball.y);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', function() {
    game.addEventListener('mousemove', function(e) {
        world.mouse = {x: e.x, y: e.y};
    });
    gameLoop();
});
