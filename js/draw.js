function drawShip(ctx, pos, angle) {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -15); // Nose of the ship
    ctx.lineTo(-10, 10); // Left corner
    ctx.lineTo(10, 10); // Right corner
    ctx.closePath();
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
    ctx.stroke();
    ctx.restore();
}

