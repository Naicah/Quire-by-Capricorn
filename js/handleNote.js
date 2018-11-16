let currentNoteID = 0;

// INITIALIZE QUILL EDITOR - Nina
var quill = new Quill('#editor', {
	modules: {
		toolbar: [
			{ 'font': [] }, { header: [1, 2, false] },
			'bold', 'italic', 'underline',
			{ 'align': [] }, { 'indent': '-1' }, { 'indent': '+1' },
			{ 'list': 'ordered' }, { 'list': 'bullet' },
			'image', 'video', 'code-block', 'clean',
		],
	},
	placeholder: 'Compose an epic...',
	theme: 'snow' 
});

// FIND ALL SAVED NOTES IN STORAGE AND SAVE KEY IN STRING - Jonathan
function loopNoteObjects() {
	let noteArr = [];
	Object.keys(localStorage).forEach((key) => {
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
}

// DISPLAY CONTET OF FIRST NOTE FROM THE NOTE LIST IN THE EDITOR - Nina
function displayFirstNote() {
	let notes = loopNoteObjects();
	textToEditor(notes[0]);
}

// DISPLAY NOTES IN NOTELIST
function displayNoteList() {
	let noteArr = loopNoteObjects();
	let container = document.getElementById("clickNoteList");
	container.innerHTML = "";
	noteArr.forEach((obj) => {
		let newDiv = document.createElement("div");
		let newH = document.createElement("h4");
		let newP = document.createElement("p");
		let title = obj.title;
		if (title.length > 20) {
			title = title.substring(0, 20) + "...";
		}
		newH.innerHTML = title;
		newP.innerHTML = `${obj.dateTime}`;
		newDiv.id = `${obj.id}`;
		newDiv.appendChild(newH);
		newDiv.appendChild(newP);
		container.appendChild(newDiv);
	})
}

// WHEN CLICK IN NOTE LIST: FIND WHICH NOTE AND DISPLAY TEXT IN EDITOR
function getNoteFromNoteList() {
	let note;
	if (event.target.tagName === "H4" || event.target.tagName === "P") {
		note = event.target.parentElement;
	} else {
		note = event.target;
	}
	
	let id = note.id;

	if (id == "") { // If it is a new note (= no id)
		id = getAvailID();
		quill.root.innerHTML = "";
	} else {
		textToEditor(getNoteFromStorage(id));
	}
	currentNoteID = id; // Keep track of id of currently displayed note in editor
}

// DISPLAY TEXT OF GIVEN NOTE IN EDITOR
function textToEditor(noteObj) {
	quill.root.innerHTML = "";
	quill.root.innerHTML = noteObj.text;
}

// GET OBJECT OF GIVEN NOTE FROM STORAGE
function getNoteFromStorage(id) {
	return JSON.parse(localStorage.getItem(id));
}

// WHEN CLICKING ON SAVE ICON
function save() {
	savingAnimation(); // Animation lets user knows save is executed
	var text = getText(); //Gets all text in editor

	let noteExist = checkForNote(currentNoteID); // True if note exist
	if (noteExist == true) { // Note exist
		updateNote(currentNoteID, text);
	} else { // New note
		let note = newNote(text.title, text.text);
		addToLocalStorage(note);
		currentNoteID = note.id;
	}
	displayNoteList();
}

// UPDATE CURRENT NOTE
function updateNote(id, text) {
	note = getNoteFromStorage(id);
	note.title = text.title;	
	note.text = text.text;
	note.dateTime = getTime();
	localStorage.setItem(id, JSON.stringify(note));
}

// CHECK IF NOTE ALREADY EXIST
function checkForNote(id) {
	return (localStorage.getItem(id) ? true : false);
}

// GET ALL TEXT IN EDITOR
function getText() {
	title = document.getElementById("editor").firstChild.firstChild.textContent;
	text = quill.root.innerHTML;
	return obj = { title: title, text: text };
}

// CREATE NEW NOTE
function newNote(title, text) {
	title = title.trim();
	return {
		id: getAvailID(),
		title: title,
		dateTime: getTime(),
		text: text
	};
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
function getTime() {
	let date = new Date();
	return date.getHours() + ":" +
		date.getMinutes() + " " +
		date.getDate() + "-" +
		(date.getMonth() + 1) + "-" +
		date.getFullYear();
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
	newH.innerHTML = 'NY ANTECKNING';
	newDiv.appendChild(newH);
	document.getElementById("clickNoteList").appendChild(newDiv);
	newNote("", "");
}

// DELETE ALL NOTES
function deleteAll() {
	localStorage.clear();
	quill.root.innerHTML = "";
	displayNoteList();
}
