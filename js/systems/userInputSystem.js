if (!window.keys) {
    window.keys = {}; // List of pressed keys
}
if (!window.lastShotTime) {
    window.lastShotTime = 0;
}
if (!window.shootingCooldown) {

    window.shootingCooldown = 500;
}
window.addEventListener('keydown', function (event) {
    window.keys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
    window.keys[event.key] = false;
});


function userInputSystem(entities) {
    const currentTime = performance.now();
    for (let entity of entities) {
        if (entity.components.control) { // Control component is unique to the player
            if (window.keys['ArrowUp']) {
                entity.components.acceleration.value = 0.1; 
            } else {
                entity.components.acceleration.value = 0; 
            }

            if (window.keys['ArrowLeft']) {
                if (typeof entity.components.rotation.value.angle === 'number') {
                    entity.components.rotation.value.angle -= 3; // Rotate left
                    if (entity.components.rotation.value.angle < 0) { // Keep Rotation between 0 and 360
                        entity.components.rotation.value.angle += 360;
                    }
                } else {
                    entity.components.rotation.value.angle = 0; // Initialize if NaN
                }
            }

            if (window.keys['ArrowRight']) {
                if (typeof entity.components.rotation.value.angle === 'number') {
                    entity.components.rotation.value.angle += 3; // Rotate right
                    if (entity.components.rotation.value.angle > 359) { // Keep Rotation between 0 and 360
                        entity.components.rotation.value.angle -= 360;
                    }
                } else {
                    entity.components.rotation.value.angle = 0; // Initialize if NaN
                }
            }

            // Shooting logic
            if (window.keys[' ']) { // Space key for shooting
                if (currentTime - lastShotTime > shootingCooldown) {
                    const position = entity.components.position.value;
                    const angle = entity.components.rotation.value.angle;
                    const velocity = {
                        x: Math.sin(angle * Math.PI / 180) * 5 ,
                        y: -Math.cos(angle * Math.PI / 180) *5
                    };

                    const bullet = createBullet(position, velocity, angle);
                    entities.push(bullet);

                    lastShotTime = currentTime;
                }
            }
        }
    }

    return entities;
}
