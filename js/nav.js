// SHOW OR HIDE MENU WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT - William
function toggleMenu() {
	var collapse = document.querySelector(".collapse-mobile");
	var hamburger = document.querySelector("#hamburgerIcon");
	hamburger.classList.toggle("merge");
	collapse.classList.toggle('none');
}
function toggleNoteList() {
	document.getElementById("notes").classList.toggle('none');
}



//STICKY NAV MOBILE
/* function setToolbarPositionStatus(){
	let state = true;
	let noteList = document.querySelector("#noteList");
	let topNav = document.querySelector("#topNav");
	let toolbar = document.querySelector(".ql-toolbar");
	let distanceToBottomTopNav = topNav.getBoundingClientRect().bottom;
	let distanceToBottomNoteList = noteList.getBoundingClientRect().bottom;
	let distanceToTop = toolbar.getBoundingClientRect().top;
	if(distanceToBottomTopNav >= 0 || distanceToBottomNoteList >= 1){
		state = false;
		toolbar.classList.remove("ql-toolbar-fixed")
	}
	if(distanceToTop <= 0  && state == true){
		toolbar.classList.add("ql-toolbar-fixed")
	}
}
*/

var prevScrollpos = window.pageYOffset;
var qltoolbar = document.getElementsByClassName('ql-toolbar')[0];

qltoolbar.classList.add("ql-toolbar-fixed");
	window.onscroll = function() {
	if(window.matchMedia("(max-width: 740px)").matches){
		var currentScrollPos = window.pageYOffset;
	  if (prevScrollpos > currentScrollPos) {
			document.getElementById('nav').style.top = "0";
			qltoolbar.style.top = "7.7em";
	  } else {
			document.getElementById('nav').style.top = "-7.7em";
			qltoolbar.style.top = "0";
	  }
	  prevScrollpos = currentScrollPos;
	}
}

window.onresize = () => {
	if(window.matchMedia("(min-width: 764px)").matches){
			qltoolbar.style.top = "0";
	}
}



// var prevToolbarScrollpos = window.pageYOffset;
// window.onscroll = function() {
// var currentToolbarScrollPos = window.pageYOffset;
//   if (prevToolbarScrollpos > currentToolbarScrollPos) {
//     document.getElementsByClassName('.ql-toolbar').style.top = "5em";
//   } else {
//     document.getElementsByClassName('.ql-toolbar').style.top = "-8em";
//   }
//   prevToolbarScrollpos = currentToolbarScrollPos;
// }
