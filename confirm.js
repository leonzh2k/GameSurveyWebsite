
window.addEventListener('load', 
function() { 
    checkSettings();
    checkNightMode();
    getDefaultFormHeight();
    //calling adjustFooter without timeout results in the default height value output, not what we want
    //we want the height value after everything has loaded properly
    setTimeout(() => { adjustFooter(); }, 100);
}, false);



function openSettings(animation) {
    //animation is not played if settings was already open on going to another page or same page
    if (localStorage.getItem(animation) === "false") {
        localStorage.setItem("settingsOpen", "true");

        document.querySelector(".settings").classList.remove("settings-transition");
        document.querySelector(".night-mode-toggle-slider").classList.remove("slider-transition");

        document.querySelector(".settings").style.width = "300px";
        document.querySelector(".open-settings-button-area").style.visibility = "hidden";
        //adding the slide-in-transition class too early actually applies it to the setting element even
        //when openSettings was called before it!!!
        setTimeout(() => { 
            document.querySelector(".settings").classList.add("settings-transition");
            document.querySelector(".night-mode-toggle-slider").classList.add("slider-transition"); 
        }, 100);
    }
    else {
        localStorage.setItem("settingsOpen", "true");
        document.querySelector(".settings").style.width = "300px";
        document.querySelector(".open-settings-button-area").style.visibility = "hidden";
    }
    
}
  
function closeSettings(animation) {
    localStorage.setItem("settingsOpen", "false");
    document.querySelector(".settings").style.width = "0px";
    setTimeout(() => {  document.querySelector(".open-settings-button-area").style.visibility = "visible"; }, 300);
}

function checkSettings() {
    if (localStorage.getItem("settingsOpen") === "true") {
        //animation will not be played when going to another page, but will be played when opening/closing
        localStorage.setItem("settingsAnimation", "false");
        openSettings("settingsAnimation");
        localStorage.setItem("settingsAnimation", "true");
    }
}


function getDefaultFormHeight() {
    let form = document.querySelector('.form');
    let formHeight = window.getComputedStyle(form, null).getPropertyValue("height");
    localStorage.setItem("defaultFormHeight", formHeight);
}
//adjusts size of gray footer based on form size
//get default form height and current form height, and their difference is the footer height
function adjustFooter() {
    try {
        let form = document.querySelector('.form');
        let currentFormHeight = window.getComputedStyle(form, null).getPropertyValue("height");
        // alert(currentFormHeight);
        let defaultFormHeight = Number(localStorage.getItem("defaultFormHeight").replace('px', ""));
        currentFormHeight = Number(currentFormHeight.replace('px', ""))
        let footerHeight = String(currentFormHeight - defaultFormHeight) + "px";
        document.querySelector('.gray-footer').style.height = footerHeight;
    }
    catch(err) {
        alert(err.message);
    }
    
}
//function that checks if night mode was active before switching to another page,
//if yes, then night mode is also enabled on current page
function checkNightMode() {
    //alert("checking night mode preferencer");
    //the default style is light mode, so don't need to waste time changing it if night mode was false
    if (localStorage.getItem("nightMode") === "true") {
        //alert("night mode is on");
        //change toggle button
        document.querySelector(".night-mode-toggle-slider").style.left = "150px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "rgb(0, 119, 255)";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "rgb(0, 119, 255)";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "visible";
        document.querySelector("#img-sun").style.visibility = "hidden";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "black";
        document.querySelector(".form").style.color = "rgb(219, 174, 76)";
        try {
            let answers1 = document.querySelectorAll(".answer-short");
            for (var i = 0; i < answers1.length; i++) {
                answers1[i].style.color = 'rgb(0, 248, 0)';
            }
            let answers2 = document.querySelectorAll(".answer-long");
            for (var i = 0; i < answers2.length; i++) {
                answers2[i].style.color = 'rgb(0, 248, 0)';
            }
        }
        catch(err) {
            alert(err.message)
        }
    }
}


function toggleNightMode() {
    /*turns night mode off*/
    if (localStorage.getItem("nightMode") === "true") {
        document.querySelector(".night-mode-toggle-slider").style.left = "130px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "gray";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "gray";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "hidden";
        document.querySelector("#img-sun").style.visibility = "visible";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "white";
        document.querySelector(".form").style.color = "black";
        try {
            let answers1 = document.querySelectorAll(".answer-short");
            for (var i = 0; i < answers1.length; i++) {
                answers1[i].style.color = 'blue';
            }
            let answers2 = document.querySelectorAll(".answer-long");
            for (var i = 0; i < answers2.length; i++) {
                answers2[i].style.color = 'blue';
            }
        }
        catch(err) {
            alert(err.message)
        }
        localStorage.setItem("nightMode", "false");
    }
    /*turns night mode on*/
    else {
        //slides toggle slider
        document.querySelector(".night-mode-toggle-slider").style.left = "150px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "rgb(0, 119, 255)";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "rgb(0, 119, 255)";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "visible";
        document.querySelector("#img-sun").style.visibility = "hidden";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "black";
        document.querySelector(".form").style.color = "rgb(219, 174, 76)";
        try {
            let answers1 = document.querySelectorAll(".answer-short");
            for (var i = 0; i < answers1.length; i++) {
                answers1[i].style.color = 'rgb(0, 248, 0)';
            }
            let answers2 = document.querySelectorAll(".answer-long");
            for (var i = 0; i < answers2.length; i++) {
                answers2[i].style.color = 'rgb(0, 248, 0)';
            }
        }
        catch(err) {
            alert(err.message)
        }
        localStorage.setItem("nightMode", "true");
        // alert("night mode is on");
    }
}

function clearFormInput() {
    //remove items
    localStorage.removeItem("Question1");
    localStorage.removeItem("Question2");
    localStorage.removeItem("Question3");
    localStorage.removeItem("Question4");
    localStorage.removeItem("Question5");
    localStorage.removeItem("Question6");
    localStorage.removeItem("Question7");
    localStorage.removeItem("Question8");
    localStorage.removeItem("Question9");
    localStorage.removeItem("Question10");
    //reload page
    window.location.replace("confirm.html")
}

function clearLocalStorage() {
    //question 1
    localStorage.clear();
    //reload page
    window.location.replace("confirm.html")
}


function getFormData() {
    try {
        document.getElementById("answer1").innerHTML = localStorage.getItem("Question1");
        document.getElementById("answer2").innerHTML = localStorage.getItem("Question2");
        document.getElementById("answer3").innerHTML = localStorage.getItem("Question3");
        document.getElementById("answer4").innerHTML = localStorage.getItem("Question4");
        document.getElementById("answer5").innerHTML = localStorage.getItem("Question5");
        document.getElementById("answer6").innerHTML = localStorage.getItem("Question6");
        document.getElementById("answer7").innerHTML = localStorage.getItem("Question7");
        document.getElementById("answer8").innerHTML = localStorage.getItem("Question8");
        document.getElementById("answer9").innerHTML = localStorage.getItem("Question9");
        document.getElementById("answer10").innerHTML = localStorage.getItem("Question10");
    }
    catch(err) {
        return;
    }
}

function returnFormData() {
    localStorage.setItem("clickedGoBack", "true");
}