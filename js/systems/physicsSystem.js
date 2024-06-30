function physicsSystem(entities, canvas, deltaTime) {
    const shipFriction = 0.99; // Friction factor for the ship to gradually reduce the velocity
    function isOffScreen(position) {
        return (
            position.x < -300 ||
            position.x > canvas.width + 300 ||
            position.y < -300 ||
            position.y > canvas.height + 300
        );
    }

    for (let entity of entities) {
        if (entity.components.position && entity.components.velocity) {
            // Apply friction only to the ship
            if (entity.components.appearance.value.type === 'ship') {
                entity.components.velocity.value.x *= Math.pow(shipFriction, deltaTime * 60);
                entity.components.velocity.value.y *= Math.pow(shipFriction, deltaTime * 60);

                // Apply acceleration in the direction of the current rotation for the ship
                if (entity.components.acceleration && entity.components.rotation) {
                    let angleInRadians = entity.components.rotation.value.angle * Math.PI / 180;
                    let acceleration = entity.components.acceleration.value;

                    if (!isNaN(acceleration) && !isNaN(angleInRadians)) {
                        entity.components.velocity.value.x += Math.sin(angleInRadians) * acceleration * deltaTime * 100;
                        entity.components.velocity.value.y += -Math.cos(angleInRadians) * acceleration * deltaTime * 100;
                    }
                }

                // Wrap around the screen for the ship
                if (entity.components.position.value.x > canvas.width) entity.components.position.value.x = 0;
                if (entity.components.position.value.x < 0) entity.components.position.value.x = canvas.width;
                if (entity.components.position.value.y > canvas.height) entity.components.position.value.y = 0;
                if (entity.components.position.value.y < 0) entity.components.position.value.y = canvas.height;
            }

            // Update position based on velocity for all entities
            if (!isNaN(entity.components.velocity.value.x) && !isNaN(entity.components.velocity.value.y)) {
                entity.components.position.value.x += entity.components.velocity.value.x * deltaTime * 60;
                entity.components.position.value.y += entity.components.velocity.value.y * deltaTime * 60;
            }

            // Remove entities that are off-screen (except the ship)
            if (entity.components.appearance.value.type !== 'ship' && isOffScreen(entity.components.position.value)) {
                entities = entities.filter(e => e !== entity);
            }
        }
    }
    return entities;
}
