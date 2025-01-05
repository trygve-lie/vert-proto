export const message = () => {
    const frame = document.querySelector('app-frame');
    const msg = frame.shadowRoot.querySelector('#newMsg');
    msg.addEventListener("newMessage", (e) => {
        msg.innerHTML = e.detail.id;
    });

    const buttons = document.querySelectorAll('messaging-button');    
    buttons.forEach((el) => {
        const button = el.shadowRoot.querySelector('#button');
        button.addEventListener("click", (e) => {
            e.preventDefault();
            msg.dispatchEvent(new CustomEvent("newMessage", {
                detail: {
                    id: Date.now().toString(),
                },
            }));
        });
    });
};

export const init = () => {
    const frame = document.querySelector('app-frame');
    const el = frame.shadowRoot.querySelector('#counter');
    let counter = parseInt(el.innerText, 10);

    setInterval(() => {
        counter++;
        el.innerText = counter.toString();
    }, 500);

    message();
};

// Makes the script run only when its loaded 
// by the initial document load
document.addEventListener('DOMContentLoaded', init);