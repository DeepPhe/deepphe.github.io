var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

if (menuTrigger && menuContainer) {
    var menuLinks = Array.prototype.slice.call(menuContainer.querySelectorAll('a[href]'));

    // Tab order while the overlay is open: menu links, then the toggle (which
    // acts as the close control). Keeping focus within this set stops keyboard
    // users from reaching page content hidden behind the overlay.
    function trapTargets() {
        return menuLinks.concat([menuTrigger]);
    }

    function isOpen() {
        return menuContainer.classList.contains('open');
    }

    function openMenu() {
        menuContainer.classList.add('open');
        menuContainer.removeAttribute('inert');
        menuContainer.setAttribute('aria-hidden', 'false');
        menuTrigger.classList.add('is-active');
        body.classList.add('lock-scroll');
        menuTrigger.setAttribute('aria-expanded', 'true');
        menuTrigger.setAttribute('aria-label', 'Close menu');
        document.addEventListener('keydown', onMenuKeydown);
        if (menuLinks.length) {
            // Force a style flush so the now-visible overlay accepts focus,
            // then move focus to the first menu link.
            void menuContainer.offsetWidth;
            menuLinks[0].focus();
        }
    }

    function closeMenu(returnFocus) {
        menuContainer.classList.remove('open');
        menuContainer.setAttribute('inert', '');
        menuContainer.setAttribute('aria-hidden', 'true');
        menuTrigger.classList.remove('is-active');
        body.classList.remove('lock-scroll');
        menuTrigger.setAttribute('aria-expanded', 'false');
        menuTrigger.setAttribute('aria-label', 'Open menu');
        document.removeEventListener('keydown', onMenuKeydown);
        if (returnFocus) {
            menuTrigger.focus();
        }
    }

    function onMenuKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            closeMenu(true);
            return;
        }
        if (event.key !== 'Tab') {
            return;
        }
        var targets = trapTargets();
        if (!targets.length) {
            return;
        }
        var index = targets.indexOf(document.activeElement);
        if (index === -1) {
            index = 0;
        }
        event.preventDefault();
        var nextIndex = event.shiftKey
            ? (index - 1 + targets.length) % targets.length
            : (index + 1) % targets.length;
        targets[nextIndex].focus();
    }

    menuTrigger.addEventListener('click', function () {
        if (isOpen()) {
            closeMenu(true);
        } else {
            openMenu();
        }
    });
}

function openWindow() {
    var newTab = window.open("", "", "width=700,height=550");
    newTab.document.write("<b>Thank You For Downloading and Using DeepPhe! </b>");
    newTab.document.write("<b>Next Steps: </b>");
    newTab.document.write("<ul> <li>While downloading DeepPhe-XN for Windows, we hope that you can help us by filling out a short <a href='https://deepphe.github.io/survey/' target='_blank' rel='noopener noreferrer'>form</a> that will let us know who is using our project and what we can do to make it better for you. </li> </ul> ");
    newTab.document.write("<ul> <li>Check out our <a href='https://github.com/DeepPhe/DeepPhe-Release/wiki' target='_blank' rel='noopener noreferrer'>wiki</a> which gives you step-by-step guides for installation and a quickstart tutorial to get you on the ground running.</li> </ul> ");
    newTab.document.write("<ul> <li>Windows has a warning for our software when you first download it. To bypass the warning press the <b>more info</b> area, to lead you to the <b>Run anyway</b> button.</li> </ul>")
    newTab.document.write("<img src='/images/windows_protected_PC_1.png' alt='Windows protected warning' width='300' height='300'></img>")
    newTab.document.write("<img src='/images/windows_protected_PC_2.png' alt='Windows protected warning' width='300' height='300'></img>")

}

function openMac(){
var newTab = window.open("", "", "width=700,height=550");
    newTab.document.write("<b>Next Steps: </b>");
    newTab.document.write("<ul> <li>While downloading DeepPhe-XN for Mac, we hope that you can help us by filling out a short <a href='https://deepphe.github.io/survey/' target='_blank' rel='noopener noreferrer'>form</a> that will let us know who is using our project and what we can do to make it better for you. </li> </ul> ");
    newTab.document.write("<ul> <li>Check out our <a href='https://github.com/DeepPhe/DeepPhe-Release/wiki' target='_blank' rel='noopener noreferrer'>wiki</a> which gives you step-by-step guides for installation and a quickstart tutorial to get you on the ground running.</li> </ul> ");

}
