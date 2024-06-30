function drawShip(ctx, pos, angle) {
    //Replace ship with image of rocket?

    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -15); // ship nose
    ctx.lineTo(-10, 10); // Left corner
    ctx.lineTo(10, 10); // Right corner
    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
}
function drawAsteroid(ctx, pos, angle, shape) {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();

    for (let i = 0; i < shape.length; i++) {
        const { x, y } = shape[i];
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
}
function drawBullet(ctx, pos, angle) {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI); // Small circle for bullet
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
}


