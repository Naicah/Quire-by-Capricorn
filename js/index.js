// ON LOAD
window.onload = function () {
    showTutuorial(); // Show tutorial on first visit
    displayNoteList(); // Display list of saved notes

    if (localStorage.length > 0) { // If there are any stored notes
        displayFirstNote(); // Display content of first note of note list in editor
    } else {
        newPage(); // Create new object in note list
        setCurrentNoteID("");
    }
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
        save(); 
    });

    // WHEN CLICKING ON TRASHCAN ICON
    document.getElementById("deleteAll").addEventListener("click", function () {
        deleteAll();
    });
    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function () {
        getNoteFromNoteList();
    });
}

