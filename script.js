var currentHabit = "Wake Up"

var currentStreak = 0;
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];



window.addEventListener("load", () => {
    const element = document.getElementById("first-name");
    console.log("my first name is", element);
    var currentHabitHeader = document.getElementById("current-habit");
    
    if(localStorage.getItem("currentHabit") != null){
        currentHabit = localStorage.getItem("currentHabit");
    }
    currentHabitHeader.innerHTML = currentHabit;
    




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
    currentStreak += 1;
    var currentCounter = document.getElementById("counter");
    currentCounter.innerText = currentStreak;


    var d = new Date();
    var month = d.getMonth();

    localStorage.setItem("currentStreak" , currentStreak);

    var currentCompetion = document.getElementById("completion-display");
    currentCompetion.innerHTML = `${currentStreak} / ${days[month]} 
                (${Math.ceil((currentStreak/days[month]) * 100)}%)`;

    
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds(); 
    var daysThisMonth = days[month];

    console.log(hours , minutes, seconds);
    console.log(daysThisMonth);

}

function handleResize(){
    this.style.width = this.value.length + 1 + "ch";
}