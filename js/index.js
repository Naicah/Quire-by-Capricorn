// ON LOAD
window.onload = function () {
    showTutuorial(); // Show tutorial on first visit
    if (localStorage.length == 0) { // If there are any stored notes
        newPage(); // Create new object in note list
    }
    filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
    displayFirstNote(); // Display content of first note of note list in editor
    positionSaveButton(); //Move the save button to be within toolbar

    // WHEN CLICK IN TUTORIAL POP UP
    document.getElementById("tutorial").addEventListener("click", () => {
        document.getElementById("tutorial").style.display = "none"; // Hide tutorial
    });

    // WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT
    document.getElementById("hamburgerIcon").addEventListener("click", function () {
        toggleMenu(); // Show or hide menu
        toggleNoteList(); // toggle note list
    });

    // WHEN CLICKING ON ICON FOR NEW PAGE
    document.getElementById("newPage").addEventListener("click", function () {
        updateNote(getCurrentNoteID(), getText()); // Save changes of displayed note
        newPage(); // Create new object in note list
    });

    // WHEN CLICK ON SAVE ICON
    document.getElementById("save").addEventListener("click", function () {
        save(getCurrentNoteID()); // Save note
    });

    // WHEN CLICKING ON TRASHCAN ICON
    document.getElementById("deleteAll").addEventListener("click", function () {
        deleteAll(); // Delete all notes
        newPage(); // Create new object in note list
        filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
    });

    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function () {
        checkIfSaved(getCurrentNoteID(), getNoteIDFromNoteList()); // Check if there are any unsaved changes in displayed note
        filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
    });

    // WHEN CLICK ON SAVE IN POP UP
    document.getElementById("unsavedContentSave").addEventListener("click", function () {
        unsavedContentSave(getCurrentNoteID(), getNextNoteID()); // Save changes and display next note
        document.getElementById("unsavedContent").classList.toggle('none'); // Hide warning pop up
    });

    // WHEN CLICK ON IGNORE IN POP UP
    document.getElementById("unsavedContentIgnore").addEventListener("click", function () {
        unsavedContentIgnore(getNextNoteID()); // Ignore changes and display next note
        document.getElementById("unsavedContent").classList.toggle('none'); // Hide warning pop up
    });

    // WHEN CLICK ON IGNORE IN POP UP
     document.getElementById("unsavedContentCancel").addEventListener("click", function () {
        document.getElementById("unsavedContent").classList.toggle('none'); // Hide warning pop up
    });

    // WHEN CLICKING ON THEME ICON
    document.getElementById("themeIcon").addEventListener("click", function () {
        themeToggle(); // Show pop up to choose theme
    });

    // WHEN CLICKING OUTSIDE POP UP TO CHOOSE THEME
    document.getElementById("chooseTheme").addEventListener("click", function () {
        themeToggle(); // Hide pop up to choose theme
    });

    // WHEN CLICK ON FORREST THEME
    document.getElementById("forrest").addEventListener("click", function () {
        changeTheme("forrest"); // Change theme
    });
    // WHEN CLICK ON FIRE THEMW
    document.getElementById("fire").addEventListener("click", function () {
        changeTheme("fire"); // Change theme
    });

    // WHEN CLICK ON WATER THEME
    document.getElementById("water").addEventListener("click", function () {
        changeTheme("water"); // Change theme
    });
    // WHEN CLICK ON STANDARD THEME
    document.getElementById("standard").addEventListener("click", function () {
        changeTheme("standard"); // Change theme
    });

    // SHOW FAVORITES
    document.getElementById("favIcon").addEventListener("click", function () {
        
        let favIcon = document.getElementById("favIcon").firstElementChild;

        favIcon.classList.toggle("yellowStar");
        favIcon.classList.toggle("fas");
        
        filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
        displayFirstNote(); // Display first note of note list in editor
    });

}





// // FIRINGSTATE OF TOOLBOX POSITION INHERIT/FIXED
// window.onscroll = function(){
//   setToolbarPositionStatus();
// }


    



