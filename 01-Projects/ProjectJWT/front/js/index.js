const TIMEOUT_DURATION = 1 * 60 * 1000;
let timeout;

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.location.href = '../html/login.html';
    }, TIMEOUT_DURATION);
}

window.onload = resetTimeout;
document.onmousemove = resetTimeout;
document.onkeypress = resetTimeout;
document.onclick = resetTimeout;
document.onscroll = resetTimeout;

