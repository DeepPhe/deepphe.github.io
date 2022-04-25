var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

function openWindow() {
    var newTab = window.open("", "", "width=700,height=550");
    newTab.document.write("<b>Thank You For Downloading and Using DeepPhe! </b>");
    newTab.document.write("<b>Next Steps: </b>");
    newTab.document.write("<ul> <li>While downloading DeepPhe-XN for Windows, we hope that you can help us by filling out a short <a href='https://deepphe.github.io/survey/' target='_blank'>form</a> that will let us know who is using our project and what we can do to make it better for you. </li> </ul> ");
    newTab.document.write("<ul> <li>Check out our <a href='https://github.com/DeepPhe/DeepPhe-Release/wiki' target='_blank'>wikipage</a> which gives you step-by-step guides for installation and a quickstart tutorial to get you on the ground running.</li> </ul> ");
    newTab.document.write("<ul> <li>Unfortunately, Windows has a warning for our software when you first download it. To bypass the warning press the <b>more info</b> area, to lead you to the <b>Run anyway</b> button.</li> </ul>")
    newTab.document.write("<img src='images/windows_protected_PC_1.jpg' alt='Windows protected warning' width='300' height='300'></img>")
    newTab.document.write("<img src='images/windows_protected_PC_2.PNG' alt='Windows protected warning' width='300' height='300'></img>")

}

function openMac(){
var newTab = window.open("", "", "width=700,height=550");
    newTab.document.write("<b>Next Steps: </b>");
    newTab.document.write("<ul> <li>While downloading DeepPhe-XN for Mac, we hope that you can help us by filling out a short <a href='https://deepphe.github.io/survey/' target='_blank'>form</a> that will let us know who is using our project and what we can do to make it better for you. </li> </ul> ");
    newTab.document.write("<ul> <li>Check out our <a href='https://github.com/DeepPhe/DeepPhe-Release/wiki' target='_blank'>wikipage</a> which gives you step-by-step guides for installation and a quickstart tutorial to get you on the ground running.</li> </ul> ");

}