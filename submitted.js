function openNav() {
    
    document.querySelector(".navbar").style.width = "300px";
    document.querySelector(".open-navbar-button-area").style.visibility = "hidden";
    // setTimeout(() => {  
    //     document.querySelector(".about-creator-description").style.display = "block";
    //     document.querySelector(".about-game-description").style.display = "block"; 
    // }, 400);
    
    
}
  
function closeNav() {
    // document.querySelector(".about-creator-description").style.display = "none";
    // document.querySelector(".about-game-description").style.display = "none";
    document.querySelector(".navbar").style.width = "0";
    setTimeout(() => {  document.querySelector(".open-navbar-button-area").style.visibility = "visible"; }, 300);
}