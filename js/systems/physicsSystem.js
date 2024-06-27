function physicsSystem(entities, canvas) {
    const friction = 0.98; // Friction factor to gradually reduce the velocity

    for (let entity of entities) {
        if (entity.components.position && entity.components.velocity) {
            entity.components.velocity.value.x *= friction;
            entity.components.velocity.value.y *= friction;

            entity.components.position.value.x += entity.components.velocity.value.x;
            entity.components.position.value.y += entity.components.velocity.value.y;

            // Wrap around the screen
            if (entity.components.position.value.x > canvas.width) entity.components.position.value.x = 0;
            if (entity.components.position.value.x < 0) entity.components.position.value.x = canvas.width;
            if (entity.components.position.value.y > canvas.height) entity.components.position.value.y = 0;
            if (entity.components.position.value.y < 0) entity.components.position.value.y = canvas.height;
        }
    }
    return entities;
}
