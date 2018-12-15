// SHOW OR HIDE MENU WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT
function toggleMenu() {
	var menuContainer = document.querySelector("#menuContainer");
	var hamburger = document.querySelector("#hamburgerIcon");
	hamburger.classList.toggle("merge");
	menuContainer.classList.toggle('none');
}
function toggleNoteList() {
	document.getElementById("notes").classList.toggle('none');
}
window.onscroll = () => {
	setToolbarPositionState();
}

//STICKY NAV MOBILE
function setToolbarPositionState(){
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
