function physicsSystem(entities, canvas) {
    const friction = 0.99; // Friction factor to gradually reduce the velocity

    for (let entity of entities) {
        if (entity.components.position && entity.components.velocity) {
            // Apply friction
            entity.components.velocity.value.x *= friction;
            entity.components.velocity.value.y *= friction;

            // Apply acceleration in the direction of the current rotation
            if (entity.components.acceleration && entity.components.rotation) {
                let angleInRadians = entity.components.rotation.value.angle * Math.PI / 180;
                let acceleration = entity.components.acceleration.value;
                let angleTag = document.getElementById("angleTag");
                angleTag.innerHTML = entity.components.rotation.value.angle;
                if (!isNaN(acceleration) && !isNaN(angleInRadians)) {
                    entity.components.velocity.value.x += Math.sin(angleInRadians) * acceleration;
                    entity.components.velocity.value.y += -Math.cos(angleInRadians) * acceleration;
                }
            }

            // Update position based on velocity
            if (!isNaN(entity.components.velocity.value.x) && !isNaN(entity.components.velocity.value.y)) {
                entity.components.position.value.x += entity.components.velocity.value.x;
                entity.components.position.value.y += entity.components.velocity.value.y;
            }

            // Wrap around the screen
            if (entity.components.position.value.x > canvas.width) entity.components.position.value.x = 0;
            if (entity.components.position.value.x < 0) entity.components.position.value.x = canvas.width;
            if (entity.components.position.value.y > canvas.height) entity.components.position.value.y = 0;
            if (entity.components.position.value.y < 0) entity.components.position.value.y = canvas.height;
        }
    }
    return entities;
}
