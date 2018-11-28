// SHOW OR HIDE MENU WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT - William
function toggleMenu() {
	var collapse = document.querySelector(".collapse-mobile");
	var hamburger = document.querySelector("#hamburgerIcon");
	hamburger.classList.toggle("merge");
	collapse.classList.toggle('none');
}
function toggleNoteList() {
	document.getElementById("noteList").classList.toggle('none');
}