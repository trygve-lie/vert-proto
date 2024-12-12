export const init = () => {
    const el = document.querySelector('#counter');
    let counter = parseInt(el.innerText, 10);

    setInterval(() => {
        counter++;
        el.innerText = counter.toString();
    }, 500);
};

// Makes the script run only when its loaded 
// by the initial document load
document.addEventListener('DOMContentLoaded', init);