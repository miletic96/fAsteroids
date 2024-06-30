window.onload = function() {
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');
    let entities = [];
    let systems = [];
    let lastTime = performance.now();

    let player = new Entity()
        .addComponent(new Component('position', { x: 400, y: 300 }))
        .addComponent(new Component('velocity', { x: 0, y: 0 }))
        .addComponent(new Component('appearance', { type: 'ship' }))
        .addComponent(new Component('control', {})) // This uniquely identifies the player
        .addComponent(new Component('collider', { radius: 20 }))
        .addComponent(new Component('acceleration', { value: 0 }))
        .addComponent(new Component('rotation', { angle: 0 })); // Initially facing upwards

    entities.push(player);

    // Add systems to the systems array
    systems.push((entities, deltaTime) => asteroidSpawningSystem(entities, canvas, deltaTime));
    systems.push((entities, deltaTime) => physicsSystem(entities, canvas, deltaTime));
    systems.push((entities) => renderingSystem(entities, ctx));
    systems.push((entities) => collisionSystem(entities));
    systems.push((entities, deltaTime) => gameLogicSystem(entities, deltaTime));
    systems.push(userInputSystem); 
    // Game loop
    function gameLoop(currentTime) {
        let deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        for (let system of systems) {
            entities = system(entities, deltaTime);
        }
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop); // Initialize the first call
}
