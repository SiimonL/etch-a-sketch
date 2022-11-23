

const canvas = document.querySelector('#canvas');
const canvasSize = canvas.clientWidth;

const modeButtons = document.querySelectorAll('#mode');

const modeDisplay = document.querySelector('#current-mode');

// color, grayscale, black, additive, ereaser
let mode = 'black';

let hold = false;


function draw(drawMode, element) {
    let color = '';
    
    switch (drawMode) {
        case 'color':
            color = 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
            break;
        case 'grayscale':
            const value = Math.floor(Math.random()*256);
            color = 'rgb('+value+','+value+','+value+')';
            break;
        case 'additive':
            const origColor = element.style.backgroundColor;
            
            if (origColor === '') {
                color = 'rgb(240, 240, 240)';
            } else {
                const value = Math.max(parseInt(origColor.split(/[(|,]/)[1])-20, 0);
                color = 'rgb('+value+','+value+','+value+')';
            }
            break;
        case 'black':
            color = 'rgb(0, 0, 0)';
            break;
        case 'ereaser':
            color = 'rgb(255, 255, 255)';
            break;
        default:
            throw new Error('Invalid draw mode.');
    }

    element.style.backgroundColor = color;
}


function createBoard(size) {
    const percentage = 100/size;

    let newCells = [];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
        
            cell.addEventListener('mouseover', e => {
                if (!hold) {
                    draw(mode, e.target)
                } else if (e.buttons == 1 || e.buttons == 3) {
                    draw(mode, e.target)
                }
            });

            cell.style.minWidth = percentage+'%';
            cell.style.minHeight = percentage+'%';

            newCells.push(cell);
        }
    }

    canvas.replaceChildren(...newCells);
}

// For changing the drawing mode
modeButtons.forEach(button => {
    button.addEventListener('click', e => {
        mode = e.target.value;

        modeButtons.forEach(button => {
            button.classList.remove('selected')
        });

        e.target.classList.add('selected');
        modeDisplay.textContent = mode[0].toUpperCase()+mode.substring(1);
    });
});

document.querySelector('#size').defaultValue = 16

// For updating the label
document.querySelector('#size').addEventListener('input', e => {
    const newSize = e.target.value;
    document.querySelector('#size-label').textContent = `${newSize}x${newSize}`;
});

// For updating the canvas
document.querySelector('#size').addEventListener('change', e => {
    createBoard(e.target.value);
});

document.querySelector('#clear').addEventListener('click', () => createBoard(parseInt(document.querySelector('#size').value)));

// Button for toggling between hold to draw and regular draw
document.querySelector('#hold').addEventListener('click', () => {
    hold = !hold;
    document.querySelector('#hold').classList.toggle('selected');
});

createBoard(16);
