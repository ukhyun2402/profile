const body = document.body;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const angle = Math.PI * 2;
let width, height;

document.addEventListener('click', createRipple);

function createRipple(e) {
    if(e.target === canvas) return;

    body.appendChild(canvas);

    width = canvas.width = body.scrollWidth;
    height = canvas.height = body.scrollHeight;

    let x = e.pageX;
    let y = e.pageY;

    let radius = maxDistance(x, y);

    const ripple = {
        alpha: 0,
        radius: 0,
        x: x,
        y: y,
    };

    let t1 = new TimelineMax({ 
        onUpdate: drawRipple.bind(ripple),
        onComplete: removeCanvas,
    })
        .to(ripple, 0,4, {alpha: 1, radius: radius})
        .to(ripple, 0.3, {alpha: 0}, 0.6);
}

function drawRipple() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(this.x, this,y, angle, false);
    ctx.fillStyle = 'rgba(0,0,255, ' + this.alpha + ')';
    ctx.fill();
}