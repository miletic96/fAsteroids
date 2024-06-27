function renderingSystem(entities, canvas) {
    return function (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let entity of entities) {
            if (entity.components.appearance) {
                let pos = entity.components.position.value;
                let type = entity.components.appearance.value.type;
                if (type === 'ship') {
                    ctx.beginPath();
                    ctx.moveTo(pos.x, pos.y);
                    ctx.lineTo(pos.x - 10, pos.y + 20);
                    ctx.lineTo(pos.x + 10, pos.y + 20);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
        return entities;
    }
}