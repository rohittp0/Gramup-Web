if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('/sw.js', {scope: '/'}).then();

const inputs = document.querySelectorAll("body > section input");

function setInputState(state){
    inputs.forEach(i => i.disabled = state);
}

window.addEventListener('online', () => setInputState(true));
window.addEventListener('offline', () => setInputState(false));
