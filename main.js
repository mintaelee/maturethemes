window.onload = init;

function init(){
    document.querySelector("#toggle-theme")
        .addEventListener('click', toggleTheme);

    document.querySelector("#days-left")
        
}

function toggleTheme(){
    event.preventDefault();

    const app = document.querySelector('.app');
    const button = event.target;

    app.classList.toggle('flat-theme');
    
    button.innerText = button.innerText === `Switch to regular theme`
        ? `Switch to flat theme`
        : `Switch to regular theme`;
}



