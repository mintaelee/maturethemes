window.onload = init;

function init(){

    setDefault();

    document.querySelector(".toggle-home")
        .addEventListener('click', toggleHome);

    document.querySelector(".toggle-theme")
        .addEventListener('click', toggleTheme);

    document.querySelector(".days-left").innerText = countdown();

    document.querySelector(".bracket-select")
        .addEventListener('change', toggleMatch);

    document.querySelector(".match-select")
        .addEventListener('change', toggleTeams);

        
}

function setDefault(){
    toggleTheme();
    changeAway('golden state warriors');
    changeHome('milwaukee bucks');

}

function toggleMatch(){
    event.preventDefault();

    let round = finalRound;

    const bracketSelected = document.querySelector('.bracket-select').value;
    const matchDropDown = document.querySelector('.match-select')


    if(bracketSelected === 'first-round'){
        round = firstRound;
    } else {
        round = finalRound;
    }

    clearDropDown();
    for (let i = 0; i < round.length; i++){
        let matchup = document.createElement('option');
        matchup.text = matchup.value = round[i].match;
        matchDropDown.add(matchup, 0);
    }

}

function toggleTeams(){
    event.preventDefault();
    const matchSelected = document.querySelector('.match-select').value;
    const bracketSelected = document.querySelector('.bracket-select').value;

    if(bracketSelected === 'first-round'){
        round = firstRound;
    } else {
        round = finalRound;
    }

    let index = searchMatchIndex(matchSelected, round);

    changeAway(round[index].away);
    changeHome(round[index].home);


}

function toggleHome(){
    event.preventDefault();

    let currentAway = document.querySelector('.away-name').innerText;
    let currentHome = document.querySelector('.home-name').innerText;

    changeAway(currentHome);
    changeHome(currentAway);

    // const away = document.querySelector('.away');
    // const home = document.querySelector('.home');
    // const awayName = document.querySelector('.away-name');
    // const homeName = document.querySelector('.home-name');
    // const awayLogo = document.querySelector('.away-logo');
    // const homeLogo = document.querySelector('.home-logo');
    // const stadium = document.querySelector('.stadium');
    // const city = document.querySelector('.city');
    // const button = document.querySelector('.toggle-home');

    // away.classList.toggle('warriors');
    // home.classList.toggle('bucks');

    
    // if (button.innerText === `Switch to Warriors Home Game`) {
    //     button.innerText = `Switch to Bucks Home Game`;
    //     awayName.innerText = `Milwaukee Bucks`;
    //     homeName.innerText = `Golden State Warriors`;
    //     awayLogo.src = './assets/buckslogo.png'
    //     homeLogo.src = './assets/warriorslogo.png'
    //     stadium.innerText = 'Oracle Arena'
    //     city.innerText = 'Oakland, CA'
    // } else {
    //     button.innerText = `Switch to Warriors Home Game`;
    //     awayName.innerText = `Golden State Warriors`;
    //     homeName.innerText = `Milwaukee Bucks`;
    //     awayLogo.src = './assets/warriorslogo.png'
    //     homeLogo.src = './assets/buckslogo.png'
    //     stadium.innerText = 'Fiserv Forum'
    //     city.innerText = 'Milwaukee, WI'
    // }
}

function toggleTheme(){
    event.preventDefault();

    const darkThemes = document.querySelectorAll(".theme-toggle");
    const button = document.querySelector('.toggle-theme');

    for (let i = 0; i < darkThemes.length; i ++){
        darkThemes[i].classList.toggle('dark-theme');
    }

    button.innerText = button.innerText === `Switch to Dark Theme`
        ? `Switch to Flat Theme`
        : `Switch to Dark Theme`;

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

function clearDropDown() {
    const dropdown = document.querySelector('.match-select');

    while(dropdown.hasChildNodes()){
        dropdown.removeChild(dropdown.firstChild);
    }
    let defaultDrop = document.createElement('option');
    defaultDrop.text = defaultDrop.value = 'Select Match';
    dropdown.add(defaultDrop, 0);
    

    
}

function changeAway(team){
    const awayName = document.querySelector('.away-name');
    const awayLogo = document.querySelector('.away-logo');
    const awayDiv = document.querySelector('.away')
    const button = document.querySelector('.toggle-home');

    let index = searchTeamIndex(team);
    awayName.innerText = teams[index].name;
    awayLogo.src = `./assets/${teams[index].abName.toLowerCase()}logo.png`;
    awayDiv.style.backgroundColor = teams[index]['away-color'];
    button.innerText = `Switch to ${teams[index].abName} Home Game`;


}

function changeHome(team){
    const homeName = document.querySelector('.home-name');
    const homeLogo = document.querySelector('.home-logo');
    const homeDiv = document.querySelector('.home')

    const stadium = document.querySelector('.stadium');
    const city = document.querySelector('.city');

    let index = searchTeamIndex(team);
    homeName.innerText = teams[index].name;
    homeLogo.src = `./assets/${teams[index].abName.toLowerCase()}logo.png`;
    stadium.innerText = teams[index].stadium;
    city.innerText = teams[index].city;
    homeDiv.style.backgroundColor = teams[index]['home-color'];


}

function searchTeamIndex(team){
    for (let i = 0; i < teams.length; i++){
        if (teams[i].name.toLowerCase() === team.toLowerCase()){
            return i;
        }
    }
}

function searchMatchIndex(match,round){
    for (let i = 0; i < round.length; i++){
        if (round[i].match.toLowerCase() === match.toLowerCase()){
            return i;
        }
    }
}