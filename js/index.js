// ON LOAD
window.onload = function () {
    showTutuorial(); // Show tutorial on first visit
    if (localStorage.length == 0) { // If there aren't any stored notes
        newPage(); // Create new object in note list
    }
    filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
    displayFirstNote(); // Display content of first note of note list in editor
    positionSaveButton(); //Move the save button to be within toolbar
    

    //----------------------------  POP-UPS ------------------------------ //
    // WHEN CLICK OUTSIDE A POP UP
    document.getElementById("popUpBg").addEventListener("click", () => {
        let popUp;
        let tutorial = document.getElementById("tutorial");
        let unsavedContent = document.getElementById("unsavedContent");
        let chooseTheme = document.getElementById("chooseTheme");
        if (!tutorial.classList.contains("none")) {
            popUp = tutorial;
        } else if (!unsavedContent.classList.contains("none")) {
            popUp = unsavedContent;
        } else if (!chooseTheme.classList.contains("none")){
            popUp = chooseTheme;
        }
        popUpToggle(popUp);
    });
    //---------------------  UNSAVED POP UP------------------- //
        // WHEN CLICK ON SAVE IN UNSAVED POP UP
    document.getElementById("unsavedContentSave").addEventListener("click", function () {
        unsavedContentSave(getCurrentNoteID(), getNextNoteID()); // Save changes and display next note
        popUpToggle(document.getElementById("unsavedContent")); // Hide warning pop up
    });

    // WHEN CLICK ON IGNORE IN UNSAVED POP UP
    document.getElementById("unsavedContentIgnore").addEventListener("click", function () {
        unsavedContentIgnore(getNextNoteID()); // Ignore changes and display next note
        popUpToggle(document.getElementById("unsavedContent")); // Hide warning pop up
    });

    // WHEN CLICK ON CANCEL IN UNSAVED POP UP
    document.getElementById("unsavedContentCancel").addEventListener("click", function () {
        popUpToggle(document.getElementById("unsavedContent")); // Hide warning pop up
    });
    // WHEN CLICK ON X IN UNSAVED POP UP
    document.getElementById('exitunsavedContent').addEventListener('click', function () {
        popUpToggle(document.getElementById("unsavedContent")); // Hide warning pop up
    });
    //---------------------  TUTORIAL POP UP------------------- //
    // WHEN CLICK ON X IN TUTORIAL POP UP
    document.getElementById('tutorial').addEventListener('click', function () {
        popUpToggle(document.getElementById("tutorial")); // Hide warning pop up
    });

    //---------------------  THEME POP UP------------------- //
    // WHEN CLICKING ON THEME ICON
    document.getElementById("themeIcon").addEventListener("click", function () {
        popUpToggle(document.getElementById("chooseTheme"));
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
     // WHEN CLICK ON SPACE THEME
     document.getElementById("space").addEventListener("click", function () {
        changeTheme("space"); // Change theme
    });
    // WHEN CLICK ON STANDARD THEME
    document.getElementById("standard").addEventListener("click", function () {
        changeTheme("standard"); // Change theme
    });

    // WHEN CLICK ON X IN CHOOSE THEME POP UP
     document.getElementById('chooseTheme').addEventListener('click', function () {
        popUpToggle(document.getElementById("chooseTheme")); // Hide warning pop up
    });

    //---------------------------- End pop-ups --------------------------- //

    // WHEN CLICK ON HAMBURGER ICON IN MOBILE LAYOUT
    document.getElementById("hamburgerIcon").addEventListener("click", function () {
        toggleMenu(); // Show or hide menu
        toggleNoteList(); // toggle note list
    });

    // WHEN CLICKING ON ICON FOR NEW PAGE
    document.getElementById("newPage").addEventListener("click", function () {
       let notes = getAllNotes();
        if (notes > 0) {
            updateNote(getCurrentNoteID(), getText()); // Save changes of displayed note
        }
        
        newPage(); // Create new object in note list
    });

    // WHEN CLICK ON SAVE ICON
    document.getElementById("save").addEventListener("click", function () {
        save(getCurrentNoteID()); // Save note
    });

    // WHEN CLICK ON TRASHCAN ICON
    document.getElementById("deleteAll").addEventListener("click", function () {
        deleteAll(); // Delete all notes
        newPage(); // Create new object in note list
        filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
    });

    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteIcon")) { // If click on delete icon (X) in note list
            deleteNote(getNoteIDFromNoteList(event));
        } else { // If click on something else in note list
            checkIfSaved(getCurrentNoteID(), getNoteIDFromNoteList(event)); // Check if there are any unsaved changes in displayed note
            filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
        }
    });

    // SHOW FAVORITES
    document.getElementById("favIcon").addEventListener("click", function () {

        let favIcon = document.getElementById("favIcon").firstElementChild;

        favIcon.classList.toggle("yellowStar");
        favIcon.classList.toggle("fas");

        filterNoteList(); // Filter and only show given type of notes in note list (ex favourites, tags, search)
        displayFirstNote(); // Display first note of note list in editor
    });

    // WHEN TYPING IN SEARCH FIELD
    document.getElementById("searchField").firstElementChild.addEventListener("keyup", function() {
        SearchFunction();
    });

    document.getElementById("print").addEventListener("click", function() {
        window.print();
    });
}