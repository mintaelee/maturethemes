window.onload = init;

function init(){

    // Set default page on load
    setDefault();

    // Catch user clicks
    document.querySelector(".toggle-home")
        .addEventListener('click', toggleHome);

    document.querySelector(".toggle-theme")
        .addEventListener('click', toggleTheme);

        
    document.querySelector(".bracket-select")
        .addEventListener('change', switchBracket);
        
    document.querySelector(".match-select")
        .addEventListener('change', switchMatch);
    
    // Create countdown for final game
    document.querySelector(".days-left").innerText = countdown();
        
}

// Function to set default page on load
function setDefault(){
    // Start page as flat theme
    toggleTheme();

    // Set default teams as warriors and bucks
    changeAway('golden state warriors');
    changeHome('milwaukee bucks');

}

// Function to switch drop down menu for match selection based on user selected 
// playoff bracket
function switchBracket(){
    event.preventDefault();

    let round = selectRound();
    
    const matchDropDown = document.querySelector('.match-select')
    

    // Clear drop down menu first
    clearDropDown();

    // Fill drop down menu
    for (let i = 0; i < round.length; i++){
        let matchup = document.createElement('option');
        matchup.text = matchup.value = round[i].match;
        matchDropDown.add(matchup, 0);
    }

}

// Function to switch to user selected match
function switchMatch(){
    event.preventDefault();

    // Grab what the user selected
    const matchSelected = document.querySelector('.match-select').value;
    
    // Grab match data
    let round = selectRound();

    let index = searchMatchIndex(matchSelected, round);

    // Change away and home teams
    changeAway(round[index].away);
    changeHome(round[index].home);

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
        if (teams[i].name.toLowerCase() === team.toLowerCase()){
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
    const bracketSelected = document.querySelector('.bracket-select').value;

    if(bracketSelected === 'first-round'){
        return firstRound;
    } else {
        return finalRound;
    }
    
}