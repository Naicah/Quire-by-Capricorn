// ON LOAD
window.onload = function () {
    showTutuorial(); // Show tutorial on first visit
    displayNoteList(); // Display list of saved notes

    if (localStorage.length > 1) { // If there are any stored notes
        displayFirstNote(); // Display content of first note of note list in editor
    } else { // If storage is empty
        newPage(); // Create new object in note list
    }
    setNextNoteID(-1);

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

    // // WHEN CLICK ON DROPDOWN FOR THEMES
    // document.getElementById("").addEventListener("click", function () {
    //     let theme = ""; //Based on which option is saved
    //     let cssFile;
    //     switch (theme) {
    //         case "water":
    //         cssFile = "../css/water.css";
    //             break;
    //         case "forrest":  
    //         cssFile = "../css/forrest.css";
    //             break;
    //     }
    //     changTheme(cssFile);
    // });

    // WHEN CLICK IN NOTE LIST
    document.getElementById("clickNoteList").addEventListener("click", function () {
        checkIfSaved(getCurrentNoteID(), getNoteIDFromNoteList()); // Check if there are any unsaved changes in displayed note
    });

    // WHEN CLICK ON SAVE IN POP UP
    document.getElementById("popUpSave").addEventListener("click", function () {
        popUpSave(getCurrentNoteID(), getNextNoteID()); // Save changes and display next note
        document.getElementById("popUp").classList.toggle('none'); // Hide warning pop up
    });

    // WHEN CLICK ON IGNORE IN POP UP 
    document.getElementById("popUpIgnore").addEventListener("click", function () {
        popUpIgnore(getNextNoteID()); // Ignore changes and display next note
        document.getElementById("popUp").classList.toggle('none'); // Hide warning pop up
    });


}

function changTheme(cssFile) {
    oldlink = document.getElementsByTagName("link").item(3);
    oldlink.setAttribute("href", cssFile);
}