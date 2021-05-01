// ==UserScript==
// @name     flag hider
// @version  1
// @grant    none
// @author       (You)
// @match        *://boards.4channel.org/mlp*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

var bad_flag_classes =
    [
     	 "bfl-eqs",
     	 "bfl-eqt",
         "bfl-son"
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
                if(n.tagName.toLowerCase() == "span") {
                    checkAndDeleteSingle(n);
                }
            });
        });
    });
    observer.observe(root, {childList: true, subtree: true, attributes: true});
}

window.document.originalCreateElement = function(e){return {};};
window.document.originalCreateDocumentFragment = function(){return {};};;
function evacuateCreators() {
    window.document.originalCreateElement = document.createElement;
    window.document.originalCreateDocumentFragment = document.createDocumentFragment;
}
function injectedCreateElement(tag) {
    var el = window.document.originalCreateElement(tag);
    if(tag.toLowerCase() == "span") {
        installMutationObserver(el)
    }
    return el;
}
function injectedCreateDocumentFragment() {
    var frag = window.document.originalCreateDocumentFragment();
    installMutationObserver(frag);
    return frag;
}

function injectNodeCreationFunctions() {
    evacuateCreators()
    document.createElement = function(tag) { return injectedCreateElement(tag); };
    document.createDocumentFragment = function() { return injectedCreateDocumentFragment(); };
}

var installer = function() {
    //this is for the DOM parser
    installMutationObserver(document);
    //this is for 4chan x and 4chan native extension (document.createElement and fragments)
    //injectNodeCreationFunctions();
    //4chan native extension thread updater and inline expansion (direct insertion of html text) is handled by ^.
};

//deleteInitial();
installer();
