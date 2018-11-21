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

    // WHEN CLICKING ON THEME ICON
    document.getElementById("themeIcon").addEventListener("click", function () {
        themeToggle();
    });

    document.getElementById("themeContent").addEventListener("click", function () {
        document.getElementById("theme2").classList.toggle('none');
    });

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




     // // WHEN CLICK ON FORREST THEME
     document.getElementById("forrest").addEventListener("click", function () {
        changeTheme("forrest");
    });
     // // WHEN CLICK ON FIRE THEMW
    document.getElementById("fire").addEventListener("click", function () {
        changeTheme("fire");
    });

     // // WHEN CLICK ON WATER THEME
     document.getElementById("water").addEventListener("click", function () {
        changeTheme("water");
    });



    function changeTheme(theme) {
        let cssFile;
        switch (theme) {
            case "water":
            cssFile = "../css/water.css";
                break;
            case "forrest":  
            cssFile = "../css/forrest.css";
                break;
            case "fire":  
            cssFile = "../css/fire.css";
                break;
        }
            oldlink = document.getElementsByTagName("link").item(3);
            oldlink.setAttribute("href", cssFile);
        }
    }