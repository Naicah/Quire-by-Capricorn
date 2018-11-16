// ON LOAD
window.onload = function(){
    showTutuorial(); // Show tutorial on first visit


    // WHEN CLICK IN TUTORIAL POP UP
    document.getElementById("tutorial").addEventListener("click", ()=>{
        tutorial.style.display = "none"; // Hide tutorial
    });

    // WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT
    document.getElementById("hamburgerIcon").addEventListener("click",function(){
        toggleMenu(); // Show or hide menu
        toggleNoteList(); // Show or hide note list
    });

    // WHEN CLICKING ON ICON FOR NEW PAGE
    document.getElementById("newPage").addEventListener("click", function () {
        newPage();
    });


    // WHEN CLICK ON SAVE ICON
    document.getElementById("save").addEventListener("click", function () {
        saveIcon();
    });

    // WHEN CLICKING ON TRASHCAN ICON
    document.getElementById("deleteAll").addEventListener("click", function () {
        deleteAll();
    });
    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function () {
        getTitleFromNoteList();
    })

    // DISPLAY
	if (localStorage.length > 0){
		displayNoteList();
	} else {
		console.log("there is no documents")
	}
	getTitleFromNoteList();
}
