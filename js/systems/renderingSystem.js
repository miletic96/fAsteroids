function renderingSystem(entities, ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let entity of entities) {
        if (entity.components.appearance && entity.components.position && entity.components.rotation) {
            let pos = entity.components.position.value;
            let angle = entity.components.rotation.value.angle;
            let type = entity.components.appearance.value.type;

            if (type === 'ship') {
                drawShip(ctx, pos, angle);
            } else if (type === 'asteroid') {
                if (entity.components.shape) {
                    let shape = entity.components.shape.value;
                    drawAsteroid(ctx, pos, angle, shape);
                }
            } else if (type === 'bullet') {
                drawBullet(ctx, pos, angle);
            }
        }
    }
    return entities;
}
