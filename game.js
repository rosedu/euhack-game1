var game = document.querySelector('#game');

var n = 20;
move(n);
requestAnimationFrame(draw);

function draw() {
    n = move(n);
    if(n <= 100) {
        requestAnimationFrame(draw);
    }
    document.querySelector('#ball').setAttribute('cx', n);
}

function move(x) {
    return x + 1;
}
