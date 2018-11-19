// ON LOAD
window.onload = function () {
    showTutuorial(); // Show tutorial on first visit
    displayNoteList(); // Display list of saved notes
    

    if (localStorage.length > 1) { // If there are any stored notes
        displayFirstNote(); // Display content of first note of note list in editor
    } else {
        newPage(); // Create new object in note list
    }
    setNextNoteID(-1);
    console.log("onload current: " + getCurrentNoteID());
    console.log("onload next: " + getNextNoteID());
    // WHEN CLICK IN TUTORIAL POP UP
    document.getElementById("tutorial").addEventListener("click", () => {
        document.getElementById("tutorial").style.display = "none"; // Hide tutorial
    });

    // WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT
    document.getElementById("hamburgerIcon").addEventListener("click", function () {
        toggleMenu(); // Show or hide menu
        toggleNoteList(); // Show or hide note list
    });

    // WHEN CLICKING ON ICON FOR NEW PAGE
    document.getElementById("newPage").addEventListener("click", function () {
        newPage(); // Create new object in note list
    });

    // WHEN CLICK ON SAVE ICON
    document.getElementById("save").addEventListener("click", function () {
        save(getCurrentNoteID()); 
    });

    // WHEN CLICKING ON TRASHCAN ICON
    document.getElementById("deleteAll").addEventListener("click", function () {
        deleteAll();
    });
    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function () {
        // contentNotSaved(); // Check if changes were made and not saved
        // Display note that was clicked on
        console.log("clickNoteList current: " + getCurrentNoteID());
        console.log("clickNoteList next: " + getNoteFromNoteList());
        checkIfSaved(getCurrentNoteID(), getNoteFromNoteList());
       
    });
    // WHEN CLICK ON BUTTON POP UP SAVE
    document.getElementById("popUpSave").addEventListener("click", function () {
        popUpSave(getCurrentNoteID(), getNextNoteID());
        console.log("popUpSave current: " + getCurrentNoteID());
        console.log("popUpSave next: " + getNextNoteID());
        document.getElementById("popUp").classList.toggle('none'); // Hide warning pop up
    });

    // WHEN CLICK ON BUTTON POP UP IGNORE
    document.getElementById("popUpIgnore").addEventListener("click", function () {
        // getNoteFromNoteList(); // Display note that was clicked on
        popUpIgnore(getNextNoteID());
        document.getElementById("popUp").classList.toggle('none'); // Hide warning pop up
    });
}