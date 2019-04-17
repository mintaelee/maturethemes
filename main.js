window.onload = init;

function init(){
    document.querySelector(".toggle-theme")
        .addEventListener('click', toggleTheme);

    document.querySelector(".days-left").innerText = countdown();
        
}

function toggleTheme(){
    event.preventDefault();

    const away = document.querySelector('.away');
    const home = document.querySelector('.home');
    const awayName = document.querySelector('.away-name');
    const homeName = document.querySelector('.home-name');
    const awayLogo = document.querySelector('.away-logo');
    const homeLogo = document.querySelector('.home-logo');
    const stadium = document.querySelector('.stadium');
    const city = document.querySelector('.city');
    const button = document.querySelector('.toggle-theme');

    away.classList.toggle('warriors');
    home.classList.toggle('bucks');

    
    if (button.innerText === `Switch to Warriors Home Game`) {
        button.innerText = `Switch to Bucks Home Game`;
        awayName.innerText = `Milwaukee Bucks`;
        homeName.innerText = `Golden State Warriors`;
        awayLogo.src = './assets/buckslogo.png'
        homeLogo.src = './assets/warriorslogo.png'
        stadium.innerText = 'Oracle Arena'
        city.innerText = 'Oakland, CA'
    } else {
        button.innerText = `Switch to Warriors Home Game`;
        awayName.innerText = `Golden State Warriors`;
        homeName.innerText = `Milwaukee Bucks`;
        awayLogo.src = './assets/warriorslogo.png'
        homeLogo.src = './assets/buckslogo.png'
        stadium.innerText = 'Fiserv Forum'
        city.innerText = 'Milwaukee, WI'
    }
}

function countdown(){
    let currentdate =new Date();

    document.querySelector(".date").innerText = dateText(currentdate);
    let gameday = new Date("May 30, 2019");
    let timeleft = gameday - currentdate;
    let msPerDay = 24 * 60 * 60 * 1000;

    let daysLeft = Math.floor(timeleft/msPerDay);

    let text = daysLeft.toString() + ' days'

    return text;
}


function dateText(date){
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let month = monthList[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`


}