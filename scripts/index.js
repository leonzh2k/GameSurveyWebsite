// <!--goal: use local storage to send form data to another page-->
// <!--reference: https://stackoverflow.com/questions/12183572/how-to-use-javascript-to-fill-a-form-on-another-page/12183659#12183659-->

//window onload only works for one script so other pages cannot use it.
window.onload=function(){
    //setClickedGoBack();
    try {
        checkSettings();
        checkNightMode();
        refillForm();
    }
    catch(err) {
        alert(err.message)
    }
    
}

window.onbeforeunload = function() {
    localStorage.setItem("reloaded", "true");
    sendFormData();
    return null;
}


function openSettings(animation) {
    //animation is not played if settings was already open on going to another page or same page
    if (localStorage.getItem(animation) === "false") {
        localStorage.setItem("settingsOpen", "true");

        document.querySelector(".settings").classList.remove("settings-transition");
        document.querySelector(".night-mode-toggle-slider").classList.remove("slider-transition");

        document.querySelector(".settings").style.width = "20vw";
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
        document.querySelector(".settings").style.width = "20vw";
        document.querySelector(".open-settings-button-area").style.visibility = "hidden";
    }
    
}
  
function closeSettings() {
    localStorage.setItem("settingsOpen", "false");
    document.querySelector(".settings").style.width = "0px";
    setTimeout(() => {  document.querySelector(".open-settings-button-area").style.visibility = "visible"; }, 300);
}

/*"front-end stuff"*/
//checks if settings was open at the time of switching to another page. if true, keeps settings open when transitioning to next page.
//animation should not be played again.
function checkSettings() {
    if (localStorage.getItem("settingsOpen") === "true") {
        //animation will not be played when going to another page, but will be played when opening/closing
        localStorage.setItem("settingsAnimation", "false");
        openSettings("settingsAnimation");
        localStorage.setItem("settingsAnimation", "true");
    }
}

//function that checks if night mode was active before switching to another page,
//if yes, then night mode is also enabled on next page
function checkNightMode() {
    //the default style is light mode, so don't need to waste time changing it if night mode was false
    if (localStorage.getItem("nightMode") === "true") {
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
        //changes to form elements
        inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.style.color = "rgb(223, 223, 223)";
            input.style.backgroundColor = "rgb(85, 85, 85)";
        }
        document.querySelector("select").style.color = "rgb(223, 223, 223)";
        document.querySelector("select").style.backgroundColor = "rgb(85, 85, 85)";
        textareas = document.querySelectorAll("textarea");
        for (let textarea of textareas) {
            textarea.style.color = "rgb(223, 223, 223)";
            textarea.style.backgroundColor = "rgb(85, 85, 85)";
        }
        //changes to toggle button
    }

}


function toggleNightMode() {
    /*turns night mode off*/
    if (document.querySelector(".form").style.backgroundColor === "black") {
        //slides toggle slider
        document.querySelector(".night-mode-toggle-slider").style.left = "130px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "gray";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "gray";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "hidden";
        document.querySelector("#img-sun").style.visibility = "visible";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "white";
        document.querySelector(".form").style.color = "black";
        
        //changes to form elements
        inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.style.color = "black";
            input.style.backgroundColor = "white";
        }
        document.querySelector("select").style.color = "black";
        document.querySelector("select").style.backgroundColor = "white";
        textareas = document.querySelectorAll("textarea");
        for (let textarea of textareas) {
            textarea.style.color = "black";
            textarea.style.backgroundColor = "white";
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
        //changes to form elements
        inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            input.style.color = "rgb(223, 223, 223)";
            input.style.backgroundColor = "rgb(85, 85, 85)";
        }
        document.querySelector("select").style.color = "rgb(223, 223, 223)";
        document.querySelector("select").style.backgroundColor = "rgb(85, 85, 85)";
        textareas = document.querySelectorAll("textarea");
        for (let textarea of textareas) {
            textarea.style.color = "rgb(223, 223, 223)";
            textarea.style.backgroundColor = "rgb(85, 85, 85)";
        }
        localStorage.setItem("nightMode", "true");
        // alert("night mode is on");
    }
}






/*"back-end stuff"*/

function setClickedGoBack() {
    try {
        localStorage.setItem("clickedGoBack", "false");
        alert("clickedGoBack has been set to false");
    }
    catch(err) {
        alert(err.message);
    }
    return;
}

function clearFormInput() {
    //remove actual values in form
    clearFormFields();
    //remove variables in storage
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
    window.location.replace("./index.html")
}

function clearLocalStorage() {
    //clear form inputs 
    clearFormFields();
    localStorage.clear();
    // localStorage.setItem("clearedStorage", "true");
    //reload page
    window.location.replace("./index.html")
}

// called when local storage is cleared. Without this, any existing form input will 
// still be saved on reload despite local storage being cleared.
function clearFormFields() {
    try {
        document.getElementById("surveyForm").reset();
    }
    catch(err) {
        alert(err.message)
    }
    
}

function sendFormData() {
    var debug = "";
    //question 1 
    //another way of checking if something is undefined
    if (checkRadio('input[name="f2p?"]') === void(0)) {
        var f2pAnswer = "N/A";
    }
    else {
        var f2pAnswer = checkRadio('input[name="f2p?"]').value;
    }
    debug = debug + "Question 1 answer is: " + f2pAnswer + "\n";
    //question 2
    var hoursAnswer = document.getElementById("hours").value;
    debug = debug + "Question 2 answer is: " + hoursAnswer + "\n";

    //question 3 
    var profAnswer = document.getElementById("proficiency").value;
    debug = debug + "Question 3 answer is: " + profAnswer + "\n";

    //question 4
    var classProfAnswer = checkCheckBox('input[name="profclasses"]');
    debug = debug + "Question 4 answer is: " + classProfAnswer + "\n";

    //question 5
    var favClassAnswer = document.getElementById("favclass").value;
    debug = debug + "Question 5 answer is: " + favClassAnswer + "\n";

    //question 6
    var whyFavClassAnswer = document.getElementById("whyfavclass").value;
    debug = debug + "Question 6 answer is: " + whyFavClassAnswer + "\n";

    //question 7
    var favMapAnswer = document.getElementById("favmap").value;
    debug = debug + "Question 7 answer is: " + favMapAnswer + "\n";

    //question 8
    var whyFavMapAnswer = document.getElementById("whyfavmap").value;
    debug = debug + "Question 8 answer is: " + whyFavMapAnswer + "\n";

    //question 9
    var favCosmetic = document.getElementById("favhat").value;
    debug = debug + "Question 9 answer is: " + favCosmetic + "\n";

    //question 10
    var whyFavCosmetic = document.getElementById("whyfavhat").value;
    debug = debug + "Question 10 answer is: " + whyFavCosmetic + "\n";

    localStorage.setItem("Question1", f2pAnswer);
    localStorage.setItem("Question2", hoursAnswer);
    localStorage.setItem("Question3", profAnswer);
    localStorage.setItem("Question4", classProfAnswer);
    localStorage.setItem("Question5", favClassAnswer);
    localStorage.setItem("Question6", whyFavClassAnswer);
    localStorage.setItem("Question7", favMapAnswer);
    localStorage.setItem("Question8", whyFavMapAnswer);
    localStorage.setItem("Question9", favCosmetic);
    localStorage.setItem("Question10", whyFavCosmetic);
    // alert(debug);
    return;
}

//checks which radio button was checked for question 1 and returns the element button that was checked.
function checkRadio(key) {
    const radioButtons = document.querySelectorAll(key);
    let checkedButton;
    for (let button of radioButtons) {
        if (button.checked) {
            checkedButton = button;
            //should return the element that was checked
            return checkedButton;
        }
    }
    return checkedButton;
}

/*
checks which checkboxes were checked for question 4 and returns a string 
containing all values of the checkboxes that were checked
*/
function checkCheckBox(key) {
    const checkboxes = document.querySelectorAll(key);
    let checkedValues = "";
    let firstIteration = true;
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            if (firstIteration) {
                checkedValues = checkbox.value;
                firstIteration = false;
            }
            else {
                checkedValues = checkedValues + ", " + checkbox.value;
            }
        }
    }
    if (checkedValues === "") {
        checkedValues = "None"
    }
    return checkedValues;
}

/* fills form with previous input if "Go Back" was pressed in confirm.html */
function refillForm() {
    if (localStorage.getItem("clickedGoBack") === "true" || localStorage.getItem("reloaded") === "true"){
        // alert("clickedGoBack === true");
        /*Question 1*/
        refillRadio('input[name="f2p?"]', "Question1");
        
        /*Question 2*/
        document.getElementById("hours").value = localStorage.getItem("Question2");

        /*Question 3*/
        document.getElementById("proficiency").value = localStorage.getItem("Question3");

        /*Question 4*/
        refillCheckBox('input[name="profclasses"]', "Question4");

        /*Question 5*/
        document.getElementById("favclass").value = localStorage.getItem("Question5");

        /*Question 6*/
        document.getElementById("whyfavclass").value = localStorage.getItem("Question6");

        /*Question 7*/
        document.getElementById("favmap").value = localStorage.getItem("Question7");

        /*Question 8*/
        document.getElementById("whyfavmap").value = localStorage.getItem("Question8");

        /*Question 9*/
        document.getElementById("favhat").value = localStorage.getItem("Question9");

        /*Question 10*/
        document.getElementById("whyfavhat").value = localStorage.getItem("Question10");
    }
    return;
}

//checks which radio button was checked for question 1 and rechecks the button that was previously checked.
function refillRadio(key, value) {
    const radioButtons = document.querySelectorAll(key);
    for (let button of radioButtons) {
        if (button.value === localStorage.getItem(value)) {
            button.checked = true;
        }
    }
    return;
}
//key is the selector you are looking for. the value is the value you wish to give the selector(s).
function refillCheckBox(key, value) {
    const checkboxes = document.querySelectorAll(key);
    //array which contains the values of all the checkboxes that were checked for question 4
    valueArray = localStorage.getItem(value).split(", ");
    for (let checkbox of checkboxes) {
        for (let i = 0; i < valueArray.length; i++) {
            if (checkbox.value === valueArray[i]) {
                checkbox.checked = true;
            }
        }
    }
    return;
}

