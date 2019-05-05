const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const modeBtn = document.getElementById("js-mode");
const saveBtn = document.getElementById("js-save");

const DEFAULT_COLOR = "#2c2c2c";
const DEFAULT_WIDTH = 0.5;
const DEFAULT_CANVAS_HEIGHT = 700;
const DEFAULT_CANVAS_WIDTH = 700;
const MODE_FILL = "FILL";
const MODE_PAINT = "PAINT";

ctx.height = DEFAULT_CANVAS_HEIGHT;
ctx.width = DEFAULT_CANVAS_WIDTH;

// fill background white
ctx.fillStyle = "white";
ctx.fillRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);

// set default
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = DEFAULT_WIDTH;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (painting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleColorClick(event) {
    const strokeColor = event.target.style.backgroundColor
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
}

function changeMode() {
    if (filling) {
        modeBtn.innerText = MODE_FILL;
        filling = false;
    }
    else {
        modeBtn.innerText = MODE_PAINT;
        filling = true;
    }

    console.log("change mode: ", filling);

}

function handleSave() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PAINTJS[🖌]";
    link.click();
}

function handleCanvasClick() {
    console.log(filling);
    if (filling) {
        ctx.fillRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
    }
}

function handleCM(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
    modeBtn.addEventListener("click", changeMode);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSave);
}