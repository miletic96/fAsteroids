let startTime = performance.now();
let hitCount = 0;

function gameLogicSystem(entities, deltaTime) {
    const currentTime = performance.now();
    const timePlayed = (currentTime - startTime) / 1000; // Time played in seconds

    document.getElementById('timer').innerText = timePlayed.toFixed(2);
    document.getElementById('hits').innerText = hitCount;

    // Calculate score based on hits and delta time
    let score =  0;
    score =calculateScore(score, hitCount, deltaTime);
    document.getElementById('score').innerText = score.toFixed(2);

    return entities;
}

function incrementHitCount() {
    hitCount += 1;
}

function calculateScore(score, hits, deltaTime) {
    return  score + (hits * deltaTime * 200) ;
}
