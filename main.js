window.onload = init;

function init(){
    document.querySelector("#toggle-theme")
        .addEventListener('click', toggleTheme);

    document.querySelector("#days-left").innerText = countdown();
        
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

function countdown(){
    let currentdate =new Date();

    let gameday = new Date("May 30, 2019");
    let timeleft = gameday - currentdate;
    let msPerDay = 24 * 60 * 60 * 1000;

    let daysLeft = Math.floor(timeleft/msPerDay);

    let text = daysLeft.toString() + ' days'

    return text;
}

