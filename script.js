var currentHabit = "Wake Up"

var currentStreak = 0;
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

var lastClick = 0;


window.addEventListener("load", () => {

    var currentHabitHeader = document.getElementById("current-habit");
    
    if(localStorage.getItem("currentHabit") != null){
        currentHabit = localStorage.getItem("currentHabit");
    }
    currentHabitHeader.innerHTML = currentHabit;
    
    if(localStorage.getItem("lastClick") != null){
        lastClick = new Date(localStorage.getItem("lastClick"));
    }

    var currentCounter = document.getElementById("counter");

    if(localStorage.getItem("currentStreak") != null){
        currentStreak = parseInt(localStorage.getItem("currentStreak"));
    }
    currentCounter.innerText = currentStreak;

    var currentCounter = document.getElementById("counter-off");
    currentCounter.innerText = currentStreak;


    var d = new Date();
    var month = d.getMonth();
    var currentMonth = document.getElementById("month-display");
    currentMonth.innerHTML = months[month] + " Completion: "
    var currentCompetion = document.getElementById("completion-display");
    currentCompetion.innerHTML = `${currentStreak} / ${days[month]} 
                (${Math.ceil((currentStreak/days[month]) * 100)}%)`;



});



function updateGreeting() {
    console.log("update time");
    const first = document.getElementById("first-name");
    const last = document.getElementById("last-name");
    const greeting = document.getElementById("greeting");
    greeting.innerText = `Hello ${first.value} ${last.value}`;
}
const clearAll = () => {
    const inputs = document.getElementsByTagName("input");
    inputs[0].value = "";
    inputs[1].value = "";
    const greeting = document.getElementById("greeting");
    greeting.innerText = "Hello";
};
const swapNames = () => {
    const inputs = document.querySelectorAll("#first-name, #last-name");
    const a = inputs[0].value;
    const b = inputs[1].value;
    inputs[0].value = b;
    inputs[1].value = a;
};
const createBtn = () => {
    button = document.createElement("button");
    button.id = "new-button";
    button.innerText = "Self Destruct";
    button.onclick = (event) => {
        console.log("the event is:", event);
        console.log("the target is:", event.target);
        event.target.remove();
    };
    const buttonGroup = document.getElementsByClassName("button-group")[0];
    buttonGroup.appendChild(button);
};

const editHabit = () => {
    newInput = document.createElement("input");
    newInput.id = "new-habit"

    var old_habit = document.getElementById("current-habit");
    newInput.value = currentHabit;

    const habitGroup = document.getElementsByClassName("habit-group")[0];
    console.log("test?");

    newInput.style.width = newInput.value.length + 1 + "ch";
    newInput.contenteditable = "true";
    newInput.addEventListener('input' , handleResize);

    habitGroup.insertBefore(newInput, habitGroup.firstChild);

    var editButton = document.getElementsByClassName("edit-button")[0];
    var saveButton = document.getElementsByClassName("save-button")[0];
    
    saveButton.style.display = "flex";

    editButton.style.display = "none";

    old_habit.style.display = "none"; 

}

const saveHabit = () => {
    updatedHabit = document.getElementById("new-habit");
    currentHabit = updatedHabit.value;

    localStorage.setItem("currentHabit", currentHabit);
    setHabit = true;

    var old_habit = document.getElementById("current-habit");
    old_habit.innerHTML = currentHabit;
    old_habit.style.display = "flex";

    var editButton = document.getElementsByClassName("edit-button")[0];
    var saveButton = document.getElementsByClassName("save-button")[0];
    
    saveButton.style.display = "none";
    editButton.style.display = "flex";

    updatedHabit.remove();
}

const updateCounter = () =>{
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds(); 
    console.log(d - lastClick);
    var allowed = d - lastClick > 86400000;
    if(allowed){
        currentStreak += 1;
        var currentCounter = document.getElementById("counter");
        currentCounter.innerText = currentStreak;

        localStorage.setItem("currentStreak" , currentStreak);

        var currentCompetion = document.getElementById("completion-display");
        currentCompetion.innerHTML = `${currentStreak} / ${days[month]} 
                    (${Math.ceil((currentStreak/days[month]) * 100)}%)`;

        daysThisMonth = days[month];


        lastClick = d;
        localStorage.setItem("lastClick", lastClick);
        //console.log(lastClick);
        //console.log(hours , minutes, seconds);
        //console.log(daysThisMonth);
    }
    var hoursLeft = Math.floor(24 - ((d - lastClick) / 3600000));
    startToast(allowed, hoursLeft);

}

const startToast = (allowed, hoursLeft) => {
    if(allowed){
        document.getElementById("habit-completed").className = "habit-completed slideUp";
        setTimeout( function() { 
            document.getElementById("habit-completed").className = "habit-completed";
        }, 1500);
    } else {
        var waiting = document.getElementById("please-wait");
        waiting.innerHTML = "Please wait " + hoursLeft + " hours.";
        waiting.className = "please-wait slideUp";
        setTimeout( function() { 
            waiting.className = "please-wait";
        }, 1500);
    }
}

function handleResize(){
    this.style.width = this.value.length + 1 + "ch";
}