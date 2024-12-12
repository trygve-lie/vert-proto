export const init = () => {
    console.log('hello from vertical a script');
  
    const content = document.querySelector('#content');
    const form = document.querySelector('#selector');
    
    const css = Array.from(form.querySelectorAll('input[type="radio"]')).map((el) => {
      return el.value;
    });
    
    form.addEventListener('change', (ev) => {
      content.classList.remove(...css);
      content.classList.add(ev.target.value);
    });
  };
  
  // Makes the script run only when its loaded 
  // by the initial document load
  document.addEventListener('DOMContentLoaded', init);