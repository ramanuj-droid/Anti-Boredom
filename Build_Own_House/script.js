const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const roofStyle = document.getElementById('roofStyle');
const windowType = document.getElementById('windowType');
const resetBtn = document.getElementById('resetBtn');

let draggedElementType = null;

// Drag start
document.querySelectorAll('.element').forEach(el => {
  el.addEventListener('dragstart', e => {
    draggedElementType = e.target.dataset.type;
  });
});

// Canvas drop
canvas.addEventListener('dragover', e => e.preventDefault());
canvas.addEventListener('drop', e => {
  const x = e.offsetX;
  const y = e.offsetY;
  createElement(draggedElementType, x, y);
});

// Create element
function createElement(type, x, y) {
  const el = document.createElement('div');
  el.classList.add('draggable-item');
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.backgroundColor = colorPicker.value;

  switch(type) {
    case 'wall':
      el.style.width = '100px';
      el.style.height = '20px';
      break;
    case 'door':
      el.style.width = '40px';
      el.style.height = '80px';
      el.textContent = 'Door';
      break;
    case 'window':
      el.style.width = '50px';
      el.style.height = '50px';
      el.textContent = windowType.value;
      break;
    case 'roof':
      el.style.width = '120px';
      el.style.height = '60px';
      el.textContent = roofStyle.value;
      break;
  }

  // Make element draggable inside canvas
  el.onmousedown = function(event) {
    dragElement(el, event);
  };

  canvas.appendChild(el);
}

// Drag inside canvas
function dragElement(el, e) {
  let offsetX = e.clientX - el.offsetLeft;
  let offsetY = e.clientY - el.offsetTop;

  function move(e) {
    el.style.left = e.clientX - offsetX + 'px';
    el.style.top = e.clientY - offsetY + 'px';
  }

  function up() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  }

  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
}

// Reset canvas
resetBtn.addEventListener('click', () => {
  canvas.innerHTML = '';
});
