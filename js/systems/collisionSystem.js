function isColliding(entity1, entity2) {
    const dx = entity1.components.position.value.x - entity2.components.position.value.x;
    const dy = entity1.components.position.value.y - entity2.components.position.value.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < entity1.components.collider.value.radius + entity2.components.collider.value.radius;
}

function handleCollision(entity1, entity2) {
    const pos1 = entity1.components.position.value;
    const pos2 = entity2.components.position.value;
    const vel1 = entity1.components.velocity.value;
    const vel2 = entity2.components.velocity.value;

    // Calculate the normal vector
    const nx = pos2.x - pos1.x;
    const ny = pos2.y - pos1.y;
    const distance = Math.sqrt(nx * nx + ny * ny);
    const normal = { x: nx / distance, y: ny / distance };

    // Calculate the relative velocity
    const relativeVelocity = { x: vel2.x - vel1.x, y: vel2.y - vel1.y };
    const relativeSpeed = relativeVelocity.x * normal.x + relativeVelocity.y * normal.y;

    // Only resolve if they are moving towards each other
    if (relativeSpeed > 0) return;

    // Calculate the minimum translation distance to push entities apart
    const overlap = entity1.components.collider.value.radius + entity2.components.collider.value.radius - distance;
    const correction = { x: normal.x * overlap / 2, y: normal.y * overlap / 2 };

    // Correct positions to prevent overlap
    entity1.components.position.value.x -= correction.x;
    entity1.components.position.value.y -= correction.y;
    entity2.components.position.value.x += correction.x;
    entity2.components.position.value.y += correction.y;

    // Calculate the reflection vector
    const reflection = { x: normal.x, y: normal.y };

    // Update velocities
    entity1.components.velocity.value.x -= reflection.x;
    entity1.components.velocity.value.y -= reflection.y;
    entity2.components.velocity.value.x += reflection.x;
    entity2.components.velocity.value.y += reflection.y;
}

function resetGame() {
    window.location.reload(); // Reload the page to reset the game
}

function handleAsteroidShot(entities, asteroid) {
    const sizes = {
        large: 'medium',
        medium: 'small',
        small: null
    };

    const size = asteroid.components.appearance.value.size;
    const newSize = sizes[size];

    if (!newSize) {
        // If the asteroid is small, just remove it
        return entities.filter(entity => entity !== asteroid);
    }

    // Calculate positions and velocities for the new smaller asteroids
    const position = asteroid.components.position.value;
    const angle = asteroid.components.rotation.value.angle;

    const velocity1 = {
        x: Math.cos((angle + 30) * Math.PI / 180) * 2,
        y: Math.sin((angle + 30) * Math.PI / 180) * 2
    };

    const velocity2 = {
        x: Math.cos((angle - 30) * Math.PI / 180) * 2,
        y: Math.sin((angle - 30) * Math.PI / 180) * 2
    };

    const newAsteroid1 = createAsteroid(newSize, { ...position }, velocity1, angle + 30);
    const newAsteroid2 = createAsteroid(newSize, { ...position }, velocity2, angle - 30);

    console.log('Creating new asteroids:', newAsteroid1, newAsteroid2);

    // Remove the original asteroid and add the new smaller asteroids
    return entities.filter(entity => entity !== asteroid).concat([newAsteroid1, newAsteroid2]);
}

function collisionSystem(entities) {
    let bulletsToRemove = [];
    let asteroidsToSplit = [];

    for (let i = entities.length - 1; i >= 0; i--) {
        let entity = entities[i];

        if (entity.components.appearance.value.type === 'bullet') {
            if (entity.components.inactive.value === true) continue; // Skip inactive bullets

            for (let j = entities.length - 1; j >= 0; j--) {
                let otherEntity = entities[j];

                if (otherEntity.components.appearance.value.type === 'asteroid') {
                    if (isColliding(entity, otherEntity)) {
                        entity.components.inactive.value = true;
                        bulletsToRemove.push(entity);
                        asteroidsToSplit.push(otherEntity);
                        incrementHitCount(); // Increment hit count when a bullet hits an asteroid
                        break;
                    }
                }
            }
        } else if (entity.components.appearance.value.type === 'asteroid') {
            for (let j = i - 1; j >= 0; j--) {
                let otherEntity = entities[j];

                if (otherEntity.components.appearance.value.type === 'asteroid') {
                    if (isColliding(entity, otherEntity)) {
                        handleCollision(entity, otherEntity); // Handle asteroid-asteroid collision
                    }
                } else if (otherEntity.components.appearance.value.type === 'ship') {
                    if (isColliding(entity, otherEntity)) {
                        alert("You have died!");
                        resetGame(); // Reset the game when the ship is hit
                    }
                }
            }
        }
    }

    // Remove inactive bullets
    entities = entities.filter(entity => !bulletsToRemove.includes(entity));

    // Handle asteroid splitting after all collisions are checked
    for (let asteroid of asteroidsToSplit) {
        entities = handleAsteroidShot(entities, asteroid);
    }

    return entities;
}


