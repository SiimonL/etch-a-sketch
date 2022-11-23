

const canvas = document.querySelector('#canvas');
const canvasSize = canvas.clientWidth;

const modeButtons = document.querySelectorAll('#mode');

// rgb, grayscale, black, additive, ereaser
let mode = 'rgb';


function draw(drawMode, element) {
    let color = '';
    
    switch (drawMode) {
        case 'rgb':
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
        
            cell.addEventListener('mouseover', e => draw(mode, e.target));

            cell.style.minWidth = percentage+'%';
            cell.style.minHeight = percentage+'%';

            newCells.push(cell);
        }
    }

    canvas.replaceChildren(...newCells);
}

// For changing the drawing mode
modeButtons.forEach(button => {
    button.addEventListener('click', e => mode = e.target.value);
});

// For updating the label
document.querySelector('#size').addEventListener('input', e => {
    const newSize = e.target.value;
    document.querySelector('#size-label').textContent = `${newSize}x${newSize}`;
});

// For updating the canvas
document.querySelector('#size').addEventListener('change', e => {
    createBoard(e.target.value);
});

document.querySelector('#size').defaultValue = 16

createBoard(16);
