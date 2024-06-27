function userInputSystem(entities) {
    window.addEventListener('keydown', function (event) {
        for (let entity of entities) {
            if (entity.components.control) { // Assuming control component is unique to the player
                switch (event.key) {
                    case 'ArrowUp':
                        entity.components.velocity.value.y -= 0.001;
                        break;
                    case 'ArrowDown':
                        entity.components.velocity.value.y += 0.001;
                        break;
                    case 'ArrowLeft':
                        entity.components.velocity.value.x -= 0.001;
                        break;
                    case 'ArrowRight':
                        entity.components.velocity.value.x += 0.001;
                        break;
                }
            }
        }
    });

    return entities;
}
