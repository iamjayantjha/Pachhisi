let scene, camera, renderer, controls;
let mouseEvents = [];
//Question 3 - Log mouse events
function logMouseEvent(event) {
    const eventData = {
        type: event.type,
        x: event.clientX,
        y: event.clientY,
        time: new Date().toISOString()
    };
    mouseEvents.push(eventData);
    console.log(eventData);
}

document.addEventListener('click', logMouseEvent);
document.addEventListener('mousemove', logMouseEvent);
document.addEventListener('mousedown', logMouseEvent);
document.addEventListener('mouseup', logMouseEvent);

function saveMouseEventsToFile() {
    const blob = new Blob([JSON.stringify(mouseEvents, null, 2)], { type: 'application/json' });
    saveAs(blob, 'mouseEvents.json');
}
const saveButton = document.createElement('button');
saveButton.textContent = 'Save Mouse Events';
saveButton.onclick = saveMouseEventsToFile;
document.body.appendChild(saveButton);

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 30, 30);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    createBoard();
    createPieces()
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.onload = init;

function createBoard() {
    const boardMaterial = new THREE.MeshStandardMaterial({ color: "#f66767" });
    const baseSize = 2;
    const armLength = 6;

    const centerSquareGeometry = new THREE.BoxGeometry(baseSize, 0.2, baseSize);
    const centerSquareMesh = new THREE.Mesh(centerSquareGeometry, boardMaterial);
    scene.add(centerSquareMesh);

    const gridHelper = new THREE.GridHelper(baseSize * armLength * 2, armLength * 2, "#000", "#000");
    gridHelper.position.y = 0.1;
    scene.add(gridHelper);

    function createPathSegment(startX, startZ, directionX, directionZ) {
        for (let i = 1; i <= armLength; i++) {
            const isSpecial = (i === 3);
            const squareMaterial = new THREE.MeshStandardMaterial({
                color: isSpecial ? "#f86700" : "#f66767"
            });

            const squareGeometry = new THREE.BoxGeometry(baseSize, 0.2, baseSize);
            const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
            squareMesh.position.set(startX + i * directionX * baseSize, 0, startZ + i * directionZ * baseSize);
            scene.add(squareMesh);
        }
    }
    createPathSegment(0, 0, 0, 1);
    createPathSegment(0, 0, 0, -1);
    createPathSegment(0, 0, -1, 0);
    createPathSegment(0, 0, 1, 0);
}

function createPlayerPiece(color, x, z) {
    const pieceGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const pieceMaterial = new THREE.MeshStandardMaterial({ color: color });
    const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);

    piece.position.set(x, 0.5, z);
    scene.add(piece);
    return piece;
}

function createPieces() {
    createPlayerPiece("#ff0000", -1, -1);
    createPlayerPiece("#ff0000", -1, 1);
    createPlayerPiece("#ff0000", 1, -1);
    createPlayerPiece("#ff0000", 1, 1);

    createPlayerPiece("#f8d600", 0, 1);
    createPlayerPiece("#f8d600", 0, -1);
    createPlayerPiece("#f8d600", -1, 0);
    createPlayerPiece("#f8d600", 1, 0);
}


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePieceInZAxis(piece, steps) {
    const moveDistance = steps * 1.5;
    piece.position.z -= moveDistance;

}

function movePieceInXAxis(piece, steps) {
    const moveDistance = steps * 1.5;
    piece.position.x -= moveDistance;

}

document.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        const diceResult = rollDice();
        alert('Dice Roll:'+ diceResult);
        const redPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xff0000);
        if (redPiece) movePieceInZAxis(redPiece, diceResult);
    } else if (event.key === 'a') {
        const diceResult = rollDice();
        alert('Dice Roll:'+ diceResult);
        const redPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xff0000);
        if (redPiece) movePieceInZAxis(redPiece, -diceResult);
    } else if (event.key === 'w') {
        const diceResult = rollDice();
        alert('Dice Roll:'+ diceResult);
        const redPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xff0000);
        if (redPiece) movePieceInXAxis(redPiece, diceResult);
    } else if (event.key === 's') {
        const diceResult = rollDice();
        alert('Dice Roll:'+ diceResult);
        const redPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xff0000);
        if (redPiece) movePieceInXAxis(redPiece, -diceResult);
    }
});

document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowUp" ) {
      const diceResult = rollDice();
      alert('Dice Roll:'+ diceResult);

      const yellowPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xf8d600);
      if (yellowPiece) movePieceInXAxis(yellowPiece, diceResult);
  } else if (event.key === "ArrowDown") {
      const diceResult = rollDice();
      alert('Dice Roll:'+ diceResult);
      const yellowPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xf8d600);
      if (yellowPiece) movePieceInZAxis(yellowPiece, -diceResult);
  } else if (event.key === "ArrowLeft") {
      const diceResult = rollDice();
      alert('Dice Roll:'+ diceResult);
      const yellowPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xf8d600);
      if (yellowPiece) movePieceInZAxis(yellowPiece, -diceResult);
  } else if (event.key === "ArrowRight") {
      const diceResult = rollDice();
      alert('Dice Roll:'+ diceResult);
      const yellowPiece = scene.children.find(obj => obj.material && obj.material.color.getHex() === 0xf8d600);
      if (yellowPiece) movePieceInXAxis(yellowPiece, -diceResult);
  }
})

