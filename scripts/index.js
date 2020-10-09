// <!--goal: use local storage to send form data to another page-->
// <!--reference: https://stackoverflow.com/questions/12183572/how-to-use-javascript-to-fill-a-form-on-another-page/12183659#12183659-->

//window onload only works for one script so other pages cannot use it.
window.onload=function(){
    //setClickedGoBack();
    try {
        checkSettings();
    }
    
    catch(err) {
        alert(err.message);
    }
    
    checkNightMode();
    
    
    
    checkTextAreaSize();
    checkDevice();
    refillForm();
    
    
}
//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
//resize textarea does not work on mobile, so detect if mobile and show resize placeholder text based on rsult
function checkDevice() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if (check) {
        let textareas = document.querySelectorAll("textarea");
        for (let textarea of textareas) {
            textarea.placeholder = "";
        }
    }
};

window.onbeforeunload = function() {
    localStorage.setItem("reloaded", "true");
    sendFormData();
    saveTextAreaSize();
    return null;
}



function openSettings(animation) {
    //animation is not played if settings was already open on going to another page or same page
    if (localStorage.getItem(animation) === "false") {
        localStorage.setItem("settingsOpen", "true");

        document.querySelector(".settings").classList.remove("settings-transition");
        document.querySelector(".night-mode-toggle-slider").classList.remove("slider-transition");

        document.querySelector(".settings").style.width = "300px";
        document.querySelector(".open-settings-button").style.visibility = "hidden";
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
        document.querySelector(".open-settings-button").style.visibility = "hidden";
    }
    
}
  
function closeSettings() {
    localStorage.setItem("settingsOpen", "false");
    document.querySelector(".settings").style.width = "0px";
    setTimeout(() => {  document.querySelector(".open-settings-button").style.visibility = "visible"; }, 300);
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
        document.querySelector(".night-mode-toggle-slider").style.left = "19px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "rgb(0, 119, 255)";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "rgb(0, 119, 255)";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "visible";
        document.querySelector("#img-sun").style.visibility = "hidden";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "rgb(34, 34, 34)";
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
    if (localStorage.getItem("nightMode") === "true") {
        //slides toggle slider
        document.querySelector(".night-mode-toggle-slider").style.left = "-1px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "gray";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "gray";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "hidden";
        document.querySelector("#img-sun").style.visibility = "visible";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "rgb(233, 233, 233)";
        document.querySelector(".form").style.color = "#444444";
        
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
        document.querySelector(".night-mode-toggle-slider").style.left = "19px";
        document.querySelector(".night-mode-toggle-slider-area").style.backgroundColor = "rgb(0, 119, 255)";
        document.querySelector(".night-mode-toggle-slider-area").style.border = "rgb(0, 119, 255)";
        //change sun/moon icons
        document.querySelector("#img-moon").style.visibility = "visible";
        document.querySelector("#img-sun").style.visibility = "hidden";
        //changes to form
        document.querySelector(".form").style.backgroundColor = "rgb(34, 34, 34)";
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

function saveTextAreaSize() {
    let textareas = document.querySelectorAll("textarea");
    localStorage.setItem("firstTextAreaWidth", textareas[0].style.width);
    localStorage.setItem("firstTextAreaHeight", textareas[0].style.height);
    localStorage.setItem("secondTextAreaWidth", textareas[1].style.width);
    localStorage.setItem("secondTextAreaHeight", textareas[1].style.height);
    localStorage.setItem("thirdTextAreaWidth", textareas[2].style.width);
    localStorage.setItem("thirdTextAreaHeight", textareas[2].style.height);
    return;
}

function checkTextAreaSize() {
    let textareas = document.querySelectorAll("textarea");
    textareas[0].style.width = localStorage.getItem("firstTextAreaWidth");
    textareas[0].style.height = localStorage.getItem("firstTextAreaHeight");
    textareas[1].style.width = localStorage.getItem("secondTextAreaWidth");
    textareas[1].style.height = localStorage.getItem("secondTextAreaHeight");
    textareas[2].style.width = localStorage.getItem("thirdTextAreaWidth");
    textareas[2].style.height = localStorage.getItem("thirdTextAreaHeight");

    return;
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
        //Resets form textarea width and height to defaults
        let textareas = document.querySelectorAll("textarea");
        textareas[0].style.width = "60%";
        textareas[0].style.height = "70px"; 
        textareas[1].style.width = "60%";
        textareas[1].style.height = "70px";
        textareas[2].style.width = "60%";
        textareas[2].style.height = "70px";
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

