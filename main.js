window.onload = init;

function init(){

    // Set default page on load
    setDefault();

    // Catch user clicks
    document.querySelector(".toggle-home")
        .addEventListener('click', toggleHome);

    document.querySelector(".toggle-theme")
        .addEventListener('click', toggleTheme);

        
    // document.querySelector(".bracket-select")
    //     .addEventListener('change', switchBracket);
        
    document.querySelector(".match-select")
        .addEventListener('change', switchMatch);

    document.querySelector('.left')
        .addEventListener('click', decreaseDate);
    
    document.querySelector('.right')
        .addEventListener('click', increaseDate);
    
    // Create countdown for final game
    document.querySelector(".days-left").innerText = countdown();
        
}

// Function to set default page on load
function setDefault(){
    // Start page as flat theme
    toggleTheme();

    // Set default teams as warriors and bucks
    let today = currentdate();

    showMatchList(today);
    changeAway('gsw');
    changeHome('mil');

    document.querySelector(".date-selected")
        .innerText = currentdate();

}



// Function to switch drop down menu for match selection based on user selected 
// playoff bracket
// function switchBracket(){
//     event.preventDefault();

//     let round = selectRound();
    
//     const matchDropDown = document.querySelector('.match-select')
    

//     // Clear drop down menu first
//     clearDropDown();

//     // Fill drop down menu
//     for (let i = 0; i < round.length; i++){
//         let matchup = document.createElement('option');
//         matchup.text = matchup.value = round[i].match;
//         matchDropDown.add(matchup, 0);
//     }

// }

// Function to switch to user selected match
function switchMatch(){
    event.preventDefault();

    // Grab what the user selected
    const matchSelected = document.querySelector('.match-select').value;
    let date = document.querySelector(".date-selected").innerText;

    
    // Grab match data
    // let round = selectRound();

    // let index = searchMatchIndex(matchSelected, round);
    let away = matchSelected.slice(0,3);
    let home = matchSelected.slice(7);

    // Change away and home teams
    changeAway(away);
    changeHome(home);

    updateScore(date);

}

// Function to toggle home team
function toggleHome(){
    event.preventDefault();

    let currentAway = document.querySelector('.away-name').innerText;
    let currentHome = document.querySelector('.home-name').innerText;

    changeAway(currentHome);
    changeHome(currentAway);
}

// Function to toggle theme
function toggleTheme(){
    event.preventDefault();

    // Grab all nodes that needs to be changed
    const darkThemes = document.querySelectorAll(".theme-toggle");
    const button = document.querySelector('.toggle-theme');

    // Toggle on/off dark-theme
    for (let i = 0; i < darkThemes.length; i ++){
        darkThemes[i].classList.toggle('dark-theme');
    }

    // Switch button text
    button.innerText = button.innerText === `Switch to Dark Theme`
        ? `Switch to Flat Theme`
        : `Switch to Dark Theme`;

}

// Function to create days remaining
function countdown(){
    // Get current date
    let currentdate =new Date();

    // Display current date
    document.querySelector(".date").innerText = dateText(currentdate);

    // Get game date and calculate days left  
    let gameday = new Date("May 30, 2019");
    let timeleft = gameday - currentdate;
    let msPerDay = 24 * 60 * 60 * 1000;

    let daysLeft = Math.floor(timeleft/msPerDay);

    let text = daysLeft.toString() + ' days'

    return text;
}

// Helper function to display date on more readable format
function dateText(date){
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let month = monthList[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    return `${month} ${day}, ${year}`


}

// Helper function to clear dropdown
function clearDropDown() {
    const dropdown = document.querySelector('.match-select');

    while(dropdown.hasChildNodes()){
        dropdown.removeChild(dropdown.firstChild);
    }
    let defaultDrop = document.createElement('option');
    defaultDrop.text = defaultDrop.value = 'Select Match';
    dropdown.add(defaultDrop, 0);
}

// Function to change HTML data that corresponds to selected away team
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

// Function to change HTML data that corresponds to selected home team
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

// Helper function to search index from the teams data
function searchTeamIndex(team){
    for (let i = 0; i < teams.length; i++){
        if (teams[i].abName.toLowerCase() === team.toLowerCase()){
            return i;
        }
    }
}

// Helper function to search index from the match data
function searchMatchIndex(match,round){
    for (let i = 0; i < round.length; i++){
        if (round[i].match.toLowerCase() === match.toLowerCase()){
            return i;
        }
    }
}
// Helper function to select correct data based on user selected bracket
function selectRound(){
    // const bracketSelected = document.querySelector('.bracket-select').value;

    if(bracketSelected === 'first-round'){
        return firstRound;
    } else {
        return finalRound;
    }
    
}

function currentdate(){
    let currentdate = new Date();

    let month = currentdate.getMonth()+1;
    let day = currentdate.getDate();
    let year = currentdate.getFullYear();


    return dateToText(year,month,day);;
}

function dateToText(year, month, day){
    if (month < 10){
        month = '0' + month;
    }

    if (day < 10){
        day = '0' + day;
    }

    let date = `${year}-${month}-${day}`;

    return date;
}

function decreaseDate() {
    let current = document.querySelector(".date-selected").innerText;

    let array = current.split('-');

    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2])-1;

    let newDate = dateToText(year, month, day);

    document.querySelector(".date-selected").innerText = newDate;

    showMatchList(newDate)

}

function increaseDate() {
    let current = document.querySelector(".date-selected").innerText;

    let array = current.split('-');

    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2])+1;

    let newDate = dateToText(year, month, day);

    document.querySelector(".date-selected").innerText = newDate;

    showMatchList(newDate)


}

function showMatchList(date){
    const xhr = new XMLHttpRequest();
    const url = `https://www.balldontlie.io/api/v1/games?dates[]='${date}'`;

    xhr.open('GET', url, true);

    xhr.onload = handleData;
    xhr.send();

}

function handleData(event){
    const matches = JSON.parse(event.target.responseText);

    const matchDropDown = document.querySelector('.match-select')

    // const {home_team, visitor_team} = matches.data[0];

    // console.log(home_team.abbreviation);
    // console.log(visitor_team);

    clearDropDown();

    for(let i = 0; i < matches.data.length; i++){
        let matchup = document.createElement('option');
        const {home_team, visitor_team} = matches.data[i];

        const matchText = `${visitor_team.abbreviation} vs ${home_team.abbreviation}`

        matchup.text = matchup.value = matchText;
        matchDropDown.add(matchup, 0);
    }
}

function updateScore(date){
    const xhr = new XMLHttpRequest();
    const url = `https://www.balldontlie.io/api/v1/games?dates[]='${date}'`;

    xhr.open('GET', url, true);

    xhr.onload = handleScore;
    xhr.send();
}

function handleScore(event){
    const matches = JSON.parse(event.target.responseText);

    const homeScore = document.querySelector('.home-score');
    const awayScore = document.querySelector('.away-score');

    const home = document.querySelector('.home-name').innerText;

    for(let i = 0; i < matches.data.length; i++){
        const {home_team, home_team_score, visitor_team_score} = matches.data[i];
        console.log(visitor_team_score);

        if(home_team.full_name === home){
            homeScore.innerText = home_team_score;
            awayScore.innerText = visitor_team_score;
        }

    }
}

