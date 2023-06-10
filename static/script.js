const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const textarea = document.getElementById('text');
const fontStyleSelect = document.getElementById('font-style');
const textColorInput = document.getElementById('text-color');
const paragraphStyleSelect = document.getElementById('paragraph-style');
const previewDiv = document.getElementById('preview');

startButton.addEventListener('click', () => {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    recognition.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
});

recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
    textarea.value = transcript;
    applyStyles();
});

function applyStyles() {
    const fontStyle = fontStyleSelect.value;
    const textColor = textColorInput.value;
    const paragraphStyle = paragraphStyleSelect.value;
    textarea.style.fontStyle = fontStyle;
    textarea.style.color = textColor;
    textarea.style.textAlign = paragraphStyle;
    previewDiv.innerHTML = `<p style="font-style: ${fontStyle}; color: ${textColor}; text-align: ${paragraphStyle}">${textarea.value}</p>`;
}

fontStyleSelect.addEventListener('change', applyStyles);
textColorInput.addEventListener('input', applyStyles);
paragraphStyleSelect.addEventListener('change', applyStyles);
