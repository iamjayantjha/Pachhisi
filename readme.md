# 3D Pachhisi Game

## Overview
This is a 3D Pachhisi game implemented using `three.js`. The game features two players: Player One (Red) and Player Two (Yellow). Each player can roll the dice and move their pieces on the board using specific keys.

## Controls
- **Player One (Red) Controls:**
    - `W`: Move piece up
    - `A`: Move piece left
    - `S`: Move piece down
    - `D`: Move piece right

- **Player Two (Yellow) Controls:**
    - `Arrow Up`: Move piece up
    - `Arrow Left`: Move piece left
    - `Arrow Down`: Move piece down
    - `Arrow Right`: Move piece right

## Mouse Event Logging
Mouse events are captured and logged in the game. The logged events can be saved to a file.

### Implementation
The code for capturing and logging mouse events is implemented from line 4 to line 27 in `main.js`.

```javascript
let mouseEvents = [];

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
```

## How to Run
1. Include the necessary libraries in your `index.html` file:
    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <script src="main.js"></script>
    ```

2. Ensure your `main.js` file contains the game logic and event handling as described above.

3. Open `index.html` in a web browser to start the game. Use the specified keys to control the pieces and the button to save mouse events.