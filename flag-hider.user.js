// ==UserScript==
// @name     flag hider
// @version  1
// @grant    none
// @author       (You)
// @match        *://boards.4channel.org/mlp*
// ==/UserScript==

var bad_flag_classes =
    [
     	 "bfl-eqs",
     	 "bfl-eqt",
         "bfl-son"
    ];

bad_flag_classes.map(evil => document.getElementsByClassName(evil)).forEach(function(els) {while (els.length>0) {els[0].remove()};});