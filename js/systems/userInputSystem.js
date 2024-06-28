if (!window.keys) {
    window.keys = {};
}
window.addEventListener('keydown', function (event) {
    keys[event.key] = true;
});

window.addEventListener('keyup', function (event) {
    keys[event.key] = false;
});
function userInputSystem(entities) {

    for (let entity of entities) {
        if (entity.components.control) { // Assuming control component is unique to the player
            console.log(entity);
            if (keys['ArrowUp']) {
                entity.components.acceleration.value = 0.1; // Apply acceleration
            } else {
                entity.components.acceleration.value = 0; // Stop acceleration when key is released
            }
            if (keys['ArrowLeft']) {
                if (typeof entity.components.rotation.value.angle === 'number') {
                    entity.components.rotation.value.angle -= 3; // Rotate left
                    if (entity.components.rotation.value.angle < 0) {
                        entity.components.rotation.value.angle += 360
                    }
                } else {
                    entity.components.rotation.value.angle = 0; // Initialize if NaN
                }
            }
            if (keys['ArrowRight']) {
                if (typeof entity.components.rotation.value.angle === 'number') {
                    entity.components.rotation.value.angle += 3; // Rotate right
                    if (entity.components.rotation.value.angle > 359) {
                        entity.components.rotation.value.angle -= 360
                    }
                } else {
                    entity.components.rotation.value.angle = 0; // Initialize if NaN
                }
            }
        }
    }

    return entities;
}
