window.onload = function () {
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');
    let entities = [];
    let systems = [];

    // Initialize entities (player, asteroids, bullets)
    let player = new Entity()
        .addComponent(new Component('position', { x: 400, y: 300 }))
        .addComponent(new Component('velocity', { x: 0, y: 0 }))
        .addComponent(new Component('appearance', { type: 'ship' }))
        .addComponent(new Component('control', {}))
        .addComponent(new Component('collider', { radius: 20 }));

    entities.push(player);

    // Add systems to the systems array
    systems.push(userInputSystem);
    systems.push((entities) => physicsSystem(entities, canvas));
    systems.push((entities) => renderingSystem(entities, canvas)(ctx));
    systems.push(collisionSystem);
    systems.push(gameLogicSystem);

    // Game loop
    function gameLoop() {
        for (let system of systems) {
            entities = system(entities);
        }
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}