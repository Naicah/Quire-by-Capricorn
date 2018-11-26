// INITIALIZE QUILL EDITOR - Nina
var quill = new Quill('#editor', {
	modules: {
		toolbar: [
			{ header: [1, 2, false] },
			'bold', 'italic', 'underline',
			{ 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' },
			{ 'list': 'ordered' }, { 'list': 'bullet' },
			'image', 'video', 'code-block', 'clean',
		],
	},
	placeholder: 'Compose an epic...',
	theme: 'snow'
});

// SET ID OF CURRENTLY DISPLAYED NOTE - Nina
function setCurrentNoteID(id) {
	document.getElementById("main").firstChild.id = id; // Store ID in hidden Div in main
}

// GET ID OF CURRENTLY DISPLAYED NOTE - Nina
function getCurrentNoteID() {
	return document.getElementById("main").firstChild.id; // ID stored in hidden Div in main
}

// SET ID OF NEXT NOTE TO DISPLAY, AFTER CLICKING IN NOTE LIST - Nina
function setNextNoteID(id) {
	document.getElementById(getCurrentNoteID()).firstChild.id = id; // Store ID in hidden Div in main
}

// GET ID OF NEXT NOTE TO DISPLAY (NEXT = AFTER CLICKING IN NOTE LIST) - Nina
function getNextNoteID() {
	return document.getElementById(getCurrentNoteID()).firstChild.id; // ID stored in hidden Div in main
}

// FIND ALL SAVED NOTES IN STORAGE AND RETURN ARRAY WITH NOTE OBJECTS - Jonathan
function loopNoteObjects() {
	let noteArr = [];
	Object.keys(localStorage).forEach((key) => {
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
}

// DISPLAY CONTENT OF FIRST NOTE FROM THE NOTE LIST IN THE EDITOR - Nina
function displayFirstNote() {
	let notes = loopNoteObjects(); // Get all saved notes
	textToEditor(notes[0]); // Display the first note of the list in editor
	setCurrentNoteID(notes[0].id);
}

// DISPLAY NOTES IN NOTELIST
function displayNoteList() {
	let noteArr = loopNoteObjects(); // Get all saved notes
	noteArr.sort(sortTime); // sorting them by last edited
	let container = document.getElementById("clickNoteList");
	container.innerHTML = "";
	noteArr.forEach((obj) => { // Create Div with note info for each saved note
		let newDiv = document.createElement("div");
		let newH = document.createElement("h4");
		let newP = document.createElement("p");
		let title = obj.title;

		if (title.length > 20) {
			title = title.substring(0, 20) + "..."; // Only show first 20 characters of title in note list
		}
		if (title == "") { // If user hasn't written a title
			title = "NY ANTECKNING";
		}
		newH.innerHTML = title;
		newP.innerHTML = `${obj.dateTime}`;
		newDiv.id = `${obj.id}`;
		newDiv.appendChild(newH);
		newDiv.appendChild(newP);
		container.appendChild(newDiv);
	});
}

// WHEN CLICK IN NOTE LIST: RETURN ID OF CLICKED NOTE
function getNoteIDFromNoteList() {
	let note;
	let id = "";
	if (event.target.tagName === "H4" || event.target.tagName === "P") {
		note = event.target.parentElement;
	} else {
		note = event.target;
	}
	id = note.id;
	setNextNoteID(id);
	return id;
}

// CHECK IF THERE ARE ANY UNSAVED CHANGES, DISPLAY NEXT NOTE - NIna
function checkIfSaved(currentID, nextID) {
	let savedText = getNoteFromStorage(currentID).text; // Text in storage
	let currentText = getText().text; // Text in editor

		if (currentID != nextID) { // If click on currently displayed note in note list
		if (savedText != currentText && currentText !== "<p><br></p>") { // If text in editor is different from what is stored
			document.getElementById("popUp").classList.toggle('none'); // Show warning pop up
		} else { // No unsaved changes
			textToEditor(getNoteFromStorage(nextID)); // Display note that was clicked on
			setCurrentNoteID(nextID);
		}
	}
}

// SAVE CHANGES AND DISPLAY NEXT NOTE - Nina
function popUpSave(currentID, nextID) {
	updateNote(currentID, getText());// Save note
	displayNoteList(); // Update note list
	textToEditor(getNoteFromStorage(nextID)); // Display next note in editor
	setCurrentNoteID(nextID);
}

// DON'T SAVE CHANGES AND DISPLAY NEXT NOTE - Nina
function popUpIgnore(nextID) {
	textToEditor(getNoteFromStorage(nextID)); // Display next note in editor
	setCurrentNoteID(nextID);
}

// DISPLAY TEXT OF GIVEN NOTE IN EDITOR
function textToEditor(noteObj) {
	quill.root.innerHTML = "";
	quill.root.innerHTML = noteObj.text;
	setCurrentNoteID(noteObj.id);
}

// GET OBJECT OF GIVEN NOTE FROM STORAGE
function getNoteFromStorage(id) {
	return JSON.parse(localStorage.getItem(id));
}

// WHEN CLICKING ON SAVE ICON
function save(id) {
	savingAnimation(); // Animation lets user knows save is executed
	var text = getText(); //Gets all text in editor
	let noteExist = checkForNote(id); // True if note exist
	if (noteExist == true) { // Note exist
		updateNote(id, text); // Save updated note
	} else { // New note
		let note = newNote(text.title, text.text); // Create new note
		addToLocalStorage(note); // Store new note
		setCurrentNoteID(note.id);
	}
	displayNoteList(); // Update note list
}

// CHECK IF NOTE ALREADY EXIST
function checkForNote(id) {
	return (localStorage.getItem(id) ? true : false); // Returns true if a note with given ID exists in storage
}

// UPDATE CURRENT NOTE - Nina
function updateNote(id, text) {
	note = getNoteFromStorage(id); // Get stored note
	note.title = text.title; // Reset title to title from editor (given as argument)
	note.text = text.text; // Reset text to text from editor (given as argument)
	note.dateTime = getTimeString(); // Get current time = time that last save occured
	note.lastEdit = new Date().getTime(), // Get current time in number to be able to sort note list after time last saved
	localStorage.setItem(id, JSON.stringify(note)); // Save changes in storage
}

// GET ALL TEXT IN EDITOR
function getText() {
	title = document.getElementById("editor").firstChild.firstChild.textContent; // First row in editor
	text = quill.root.innerHTML; // All text in editor (title & formatting included)
	return obj = { title: title, text: text };
}

// CREATE NEW NOTE
function newNote(title, text) {
	title = title.trim();
	return {
		id: getAvailID(),
		title: title,
		dateTime: getTimeString(), // Current time = time that note was created (last saved)
		lastEdit: new Date().getTime(), // Current time in number to be able to sort note list after time last saved
		text: text
	};
}

// Get created time in millisecs to compare list priority. - jonathan
function sortTime(a,b){
	const timeA = a.lastEdit;
	const timeB = b.lastEdit;

	let comparison = 0;
	if(timeA > timeB){
		comparison = -1;
	}else{
		comparison = 1;
	}
	return comparison;
}

// GET LOWEST AVAILABLE ID - Nina
function getAvailID() {
	let notes = loopNoteObjects(); //Get all notes
	let noteIDs = []; //Array of all Note IDs

	notes.forEach((n) => { //For each note
		noteIDs.push(n["id"]); // Get ID and put it in the array of all IDs
	});

	noteIDs.sort(function (a, b) { return a - b; });   // Sort all IDs numeric

	if (noteIDs.length == 0) { //If there aren't any notes
		lowest = 0; // ID = 0
	} else { // 1 note or more
		for (i = 0; i <= noteIDs.length; ++i) { //Start at 0 and increase by 1 until value does not exist in list of IDs
			if (noteIDs[i] != i) {
				lowest = i;
				break; // Stops the loop when the lowest ID is found
			}
		}
	}
	return lowest; //Return lowest available ID
}

// GET CURRENT TIME AND DATE - Jonathan
function getTimeString() {
	return new Date().toLocaleString().substring(0,16); 
}

// SHOW LOAD SYMBOL WHEN SAVING - William
function savingAnimation() {
	let saveIcon = document.getElementById("saveIcon");
	let loadWrapp = document.getElementById("load-wrapp");

	saveIcon.classList.toggle('none');
	loadWrapp.classList.toggle('none');
	setTimeout(function () {
		saveIcon.classList.toggle('none');
		loadWrapp.classList.toggle('none');
	}, 1000);
};

// ADD NOTE TO LOCAL STORAGE
function addToLocalStorage(note) {
	localStorage.setItem(note.id, JSON.stringify(note));
}

// CREATE NEW PAGE IN NOTE LIST
function newPage() {
	let newDiv = document.createElement("div");
	let newH = document.createElement("h4");
	newDiv.appendChild(newH);
	document.getElementById("clickNoteList").appendChild(newDiv);
	let note = newNote("", "");
	quill.root.innerHTML = "";
	addToLocalStorage(note);
	setCurrentNoteID(note.id);
	textToEditor(note);
	displayNoteList();
}

// DELETE ALL NOTES
function deleteAll() {
	localStorage.clear();
	quill.root.innerHTML = "";
	displayNoteList();
}

// Toggle THEME SYMBOL
function themeToggle(){
	let themes = document.getElementById("theme2")
		document.getElementById("theme2").classList.toggle('theme2-display-flex');
}

// CHANGE THEME
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
			case "standard":
		cssFile = "";
			break;
	}
		oldlink = document.getElementsByTagName("link").item(3);
		oldlink.setAttribute("href", cssFile);
}
