// ==UserScript==
// @name     flag hider
// @version  2
// @grant    none
// @author       (You)
// @match        *://boards.4channel.org/mlp*
// @run-at       document-start
// ==/UserScript==

var bad_flag_classes =
    [
     	 "bfl-eqs",
     	 "bfl-eqt",
         "bfl-son",
         "bfl-ada",
         "bfl-eqa",
         "bfl-eqf",
         "bfl-eqp",
         "bfl-eqr",
         "bfl-eqi",
         "bfl-era"
    ];

function checkAndDeleteAll() {
    bad_flag_classes.map(evil => document.getElementsByClassName(evil)).forEach(function(els) {while (els.length>0) {els[0].remove()};});
}
function checkAndDeleteSingle(n) {
    if (bad_flag_classes.some(function(evil) {return n.classList.contains(evil);})) {
        n.remove();
    }
}

function installMutationObserver(root) {
    if (!("MutationObserver" in window)) {
        window.MutationObserver = window.WebKitMutationObserver || window.MozMutationObserver;
    }
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function(m) {
            m.addedNodes.forEach(function(n){
                if(n.tagName == "SPAN") {
                    checkAndDeleteSingle(n);
                }
            });
        });
    });
    observer.observe(root, {childList: true, subtree: true, attributes: true});
}

checkAndDeleteAll();
installMutationObserver(document);
