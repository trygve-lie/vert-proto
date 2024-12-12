export const init = () => {
    console.log('hello from index script');
};

// Makes the script run only when its loaded 
// by the initial document load
document.addEventListener('DOMContentLoaded', init);