// ---------------------------------- SETUP ---------------------------------- //

// INITIALIZE QUILL EDITOR
var quill = new Quill('#editor', {
	modules: {
		toolbar: [
			{ header: [1, 2, false] },
			'bold', 'italic', 'underline',
			{ 'align': [] },
			{ 'list': 'ordered' }, { 'list': 'bullet' },
			'image',
		],
	},
	placeholder: 'Compose an epic...',
	theme: 'snow'
});

// POSITION SAVE BUTTON
function positionSaveButton() {
	document.querySelector(".ql-formats").appendChild(document.getElementById("save"));
}

// ------------------ CURRENT AND NEXT NOTE ID ------------------------------- //

// SET ID OF CURRENTLY DISPLAYED NOTE
function setCurrentNoteID(id) {
	document.getElementById("main").firstChild.id = id; // Store ID in hidden Div in main
}

// GET ID OF CURRENTLY DISPLAYED NOTE
function getCurrentNoteID() {
	return document.getElementById("main").firstChild.id; // ID stored in hidden Div in main
}

// SET ID OF NEXT NOTE TO DISPLAY, AFTER CLICKING IN NOTE LIST
function setNextNoteID(id) {
	let mainDiv = document.getElementById("main");
	mainDiv.getElementsByTagName('div')[1].id = id; // Store ID in hidden Div in main
}

// GET ID OF NEXT NOTE TO DISPLAY (NEXT = AFTER CLICKING IN NOTE LIST)
function getNextNoteID() {
	let mainDiv = document.getElementById("main");
	return mainDiv.getElementsByTagName('div')[1].id; // ID stored in hidden Div in main
}

// ------------------------------  POP UPS ---------------------------------- //

// HIDE OR SHOW GIVEN POP UP
function popUpToggle (popUp) {
	document.getElementById("popUpBg").classList.toggle('none'); //Pop up background
	popUp.classList.toggle('none');
}

// SAVE CHANGES AND DISPLAY NEXT NOTE
function unsavedContentSave(currentID, nextID) {
	updateNote(currentID, getText());// Save note
	textToEditor(getNoteFromStorage(nextID)); // Display next note in editor
	
	// setting next note as current.
	let note = getNoteFromStorage(nextID);
	note.current = true;
	filterNoteList();
	setCurrentNoteID(nextID);
}

// DON'T SAVE CHANGES AND DISPLAY NEXT NOTE
function unsavedContentIgnore(nextID) {
	textToEditor(getNoteFromStorage(nextID)); // Display next note in editor
	setCurrentNoteID(nextID);
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
		case "space":
			cssFile = "../css/space.css";
			break;
		case "standard":
			cssFile = "";
			break;
	}
	oldlink = document.getElementsByTagName("link").item(4);
	oldlink.setAttribute("href", cssFile);
}

// ----------------------------- NOTE LIST --------------------------------- //

// CREATE NEW PAGE IN NOTE LIST
function newPage() {
	let newArticle = document.createElement("article");
	let newH = document.createElement("h4");
	newArticle.appendChild(newH);
	document.getElementById("clickNoteList").appendChild(newArticle);
	let note = newNote("", "");
	quill.root.innerHTML = "";
	addToLocalStorage(note);
	setCurrentNoteID(note.id);
	textToEditor(note);
	filterNoteList();
}

// DISPLAY CONTENT OF FIRST NOTE FROM THE NOTE LIST IN THE EDITOR
function displayFirstNote() {
	let id = -1;
	if (document.getElementById("clickNoteList").innerHTML == "") {
		quill.root.innerHTML = "";
	} else {
		id = document.getElementById("clickNoteList").firstChild.id;
		textToEditor(getNoteFromStorage(id)); // Display the first note of the list in editor
		filterNoteList();
	}
	setCurrentNoteID(id);
}

// DISPLAY NOTES IN NOTELIST
<<<<<<< HEAD
function displayNoteList(func = () => true) {
	let noteArr = getAllNotes();
	noteArr.sort(compareTime); // sorting them by last edited
	let container = document.getElementById("clickNoteList");
	container.innerHTML = "";

	// displayNoteList((n)=> n.fav==true); Till favorite click icon.
	noteArr.filter((n) => func(n)).forEach((obj) => { // Create Div with note info for each saved note
=======
function displayNoteList(func = () => true) { // Pass argument or else true
	let allNotes = getAllNotes();
	allNotes.sort(compareTime); // sorting them by last edited
	let container = document.getElementById("clickNoteList");
	container.innerHTML = "";

	// Create content for each saved note
	allNotes.filter((n) => func(n)).forEach((obj) => { 
>>>>>>> bfe4eb54d66a5ec917f65fe149f2c3b4b37be823
		let newArticle = document.createElement("article");
		let title = document.createElement("h4");
		let date = document.createElement("p");
		let iconDiv = document.createElement("div");
		let favIcon = document.createElement("i");
		let deleteIcon = document.createElement("i");
		
		iconDiv.classList.add("noteListIconDiv");
		favIcon.classList.add("far");
		favIcon.classList.add("fa-star");
		deleteIcon.classList.add("deleteIcon");

		if (obj.fav){
			favIcon.classList.add("fas");
		}
		// Checking for current obj in list to display focused
		if(obj.current){
			newArticle.classList.add("current-style");
		}else{
			newArticle.classList.remove("current-style");
		}
		let noteTitle = obj.title;

		if (noteTitle.length > 20) {
			noteTitle = title.substring(0, 20) + "..."; // Only show first 20 characters of title in note list
		}
		if (noteTitle == "") { // If user hasn't written a title
			noteTitle = "NY ANTECKNING";
			obj.title = "NY ANTECKNING";
		}

		deleteIcon.innerHTML = "&#x2718";
		title.innerHTML = noteTitle;
		date.innerHTML = `${obj.dateTime}`;
		newArticle.id = `${obj.id}`;
		iconDiv.appendChild(deleteIcon);
		iconDiv.appendChild(favIcon);
		newArticle.appendChild(iconDiv);
		newArticle.appendChild(title);
		newArticle.appendChild(date);
		container.appendChild(newArticle);
	});
}

// WHEN CLICK IN NOTE LIST: RETURN ID OF CLICKED NOTE
function getNoteIDFromNoteList(event) {
	let id = "";

	if (event.target.tagName === "ARTICLE"){
		id = (event.target).id;
	} else if (event.target.tagName === "H4" || event.target.tagName === "P" ){
		id = (event.target.parentElement).id;
	} else {
		id = (event.target.parentElement.parentElement).id;
		
		if (event.target.classList.contains("fa-star")){
			let star = event.target;
			star.classList.toggle("fas");
			setFavState(isFavTrue(star),id);
		}
	}
	setNextNoteID(id);
	return id;
}

// ------------------ FILTER ------------------------ //

// FILTER WHICH NOTES SHOULD BE DISPLAYED IN NOTE LIST
function filterNoteList(){ // Separate function to be able to add more filter options, such as search or tags
	filterFav();
}

// TOGGLE SHOWING FAV NOTES
function filterFav() {
	let favIcon = document.getElementById("favIcon").firstElementChild;
	
	if (favIcon.classList.contains("yellowStar")) {
		displayNoteList((n)=> n.fav==true);
	} else {
		displayNoteList();
	}
}

// SEARCH IN NOTES
 function search(){
	var search = document.getElementById("searchInput").value.toLocaleLowerCase();
    displayNoteList((n)=> n.text.toLocaleLowerCase().includes(search));
}

// ------------------- STATES --------------------- //

// SET CURRENT STATE
function setCurrentState(obj){
	// getting current obj from textToEditor,
	let arr = getAllNotes();
	// gathering all objets
	arr.forEach((n)=>{
		//ForEach obj checking if id is same as targeted in textToditor, if true set current to true else false.
		(n.id === obj.id) ? n.current = true : n.current = false;
		// save down all objects
		addToLocalStorage(n);
	})
}

// CHECK IF FAVSTAR IS FILLED OR NOT
function isFavTrue (star){
	return  star.classList.contains("fas") ? true : false;
}

// MAKE A NOTE AS FAVORITE
function setFavState(state,id){
	let note = getNoteFromStorage(id);
	note.fav = state;
	addToLocalStorage(note);
	filterNoteList();
}

// -------------------------------- STORAGE ------------------------------- //

// CREATE NEW NOTE
function newNote(title, text) {
	if(document.getElementById("favIcon").firstElementChild.classList.contains("fas")){
		document.getElementById("favIcon").firstElementChild.classList.toggle("fas");
		document.getElementById("favIcon").firstElementChild.classList.toggle("yellowStar");
	}
	title = title.trim();
	return {
		id: getAvailID(),
		title: title,
		text: text,
		dateTime: getTimeString(), // Current time = time that note was created/last saved
		lastEdit: new Date().getTime(), // Current time in number to be able to sort note list after time last saved
		current: false,
		fav: false,
	};
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
	filterNoteList();
}

// ADD NOTE TO LOCAL STORAGE
function addToLocalStorage(note) {
	localStorage.setItem(note.id, JSON.stringify(note));
}

// GET GIVEN NOTE FROM LOCAL STORAGE
function getNoteFromStorage(id) {
	return JSON.parse(localStorage.getItem(id));
}

// GET ALL SAVED NOTES
function getAllNotes() {
	let noteArr = [];
	Object.keys(localStorage).forEach((key) => {
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})

	return noteArr;
}

// CHECK IF NOTE EXISTS
function checkForNote(id) {
	return (localStorage.getItem(id) ? true : false); // Returns true if a note with given ID exists in storage
}

// CHECK IF THERE ARE ANY UNSAVED CHANGES, DISPLAY NEXT NOTE
function checkIfSaved(currentID, nextID) {
	let savedText = getNoteFromStorage(currentID).text; // Text in storage
	let currentText = getText().text; // Text in editor

		if (currentID != nextID) { // If click on currently displayed note in note list
		if (savedText != currentText && currentText !== "<p><br></p>") { // If text in editor is different from what is stored
			popUpToggle(document.getElementById("unsavedContent")); // Show warning pop up
		} else { // No unsaved changes
			textToEditor(getNoteFromStorage(nextID)); // Display note that was clicked on
			setCurrentNoteID(nextID);
		}
	}
}

// UPDATE GIVEN NOTE
function updateNote(id, text) {
	note = getNoteFromStorage(id); // Get stored note
	note.title = text.title; // Reset title to title from editor (given as argument)
	note.text = text.text; // Reset text to text from editor (given as argument)
	note.dateTime = getTimeString(); // Get current time = time that last save occured
	note.lastEdit = new Date().getTime(), // Get current time in number to be able to sort note list after time last saved
	addToLocalStorage(note); // Save changes in storage
}

// DELETE GIVEN NOTE
function deleteNote(id) {
	id.toString();
	localStorage.removeItem(id);
	filterNoteList();
	displayFirstNote();
}

// DELETE ALL NOTES
function deleteAll() {
	localStorage.clear();
	quill.root.innerHTML = "";
	filterNoteList();
}

// ------------------------------ DATA ------------------------------------- //

// GET LOWEST AVAILABLE ID
function getAvailID() {
	let notes = getAllNotes(); //Get all notes
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

// GET CURRENT TIME AND DATE
function getTimeString() {
	// gets the current date and only sets year, hour and minut
	return new Date().toLocaleTimeString([], {day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute:'2-digit'});
}

// COMPARE TIME, RETURN IF BEFORE OR AFTER
function compareTime(a,b){
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

// ------------------------------ EDITOR ------------------------------------ //

// GET ALL TEXT IN EDITOR
function getText() {
	title = document.getElementById("editor").firstChild.firstChild.textContent; // First row in editor
	text = quill.root.innerHTML; // All text in editor (title & formatting included)
	return obj = { title: title, text: text };
}

// DISPLAY TEXT OF GIVEN NOTE IN EDITOR
function textToEditor(noteObj) {
	quill.root.innerHTML = "";
	quill.root.innerHTML = noteObj.text;
	setCurrentState(noteObj);
	setCurrentNoteID(noteObj.id);
	filterNoteList();
}

// SHOW LOAD SYMBOL WHEN SAVING
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

<<<<<<< HEAD
// ADD NOTE TO LOCAL STORAGE
function addToLocalStorage(note) {
	localStorage.setItem(note.id, JSON.stringify(note));
}

// CREATE NEW PAGE IN NOTE LIST
function newPage() {
	let newArticle = document.createElement("article");
	let newH = document.createElement("h4");
	newArticle.appendChild(newH);
	document.getElementById("clickNoteList").appendChild(newArticle);
	let note = newNote("", "");
	quill.root.innerHTML = "";
	addToLocalStorage(note);
	setCurrentNoteID(note.id);
	textToEditor(note);
	filterNoteList();
}

// DELETE ALL NOTES
function deleteAll() {
	localStorage.clear();
	quill.root.innerHTML = "";
	filterNoteList();
}

// HIDE OR SHOW GIVEN POP UP
function popUpToggle (popUp) {
	document.getElementById("popUpBg").classList.toggle('none'); //Pop up background
	popUp.classList.toggle('none');
}

// CHANGE THEME
function changeTheme(theme) {
	let cssFile;
	switch (theme) {
		case "water":
			cssFile = "../css/water.css";
			break;
		case "space":
			cssFile = "../css/space.css";
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
	oldlink = document.getElementsByTagName("link").item(4);
	oldlink.setAttribute("href", cssFile);
}

// FILTER WHICH NOTES SHOULD BE DISPLAYED IN NOTE LIST
function filterNoteList(){
	filterFav();
}

// Highlight function adding focus to target that's displayed - jonathan
function highlight(obj){
		// getting current obj from textToEditor,
	let arr = getAllNotes();
	// gathering all objets
	arr.forEach((n)=>{
		//ForEach obj checking if id is same as targeted in textToditor, if true set active to true else false.
		(n.id === obj.id) ? n.active = true : n.active = false;
		// save down all objects
		addToLocalStorage(n);
	})
}

// TOGGLE SHOWING FAV NOTES
function filterFav() {
	let favIcon = document.getElementById("favIcon").firstElementChild;
	
	if (favIcon.classList.contains("yellowStar")) {
		displayNoteList((n)=> n.fav==true);
	} else {
		displayNoteList();
	}
}

// SEARCH FUNCTION - William
 function SearchFunction(){
	var search = document.getElementById("searchInput").value.toLocaleLowerCase();
    displayNoteList((n)=> n.text.toLocaleLowerCase().includes(search));
    }
=======
>>>>>>> bfe4eb54d66a5ec917f65fe149f2c3b4b37be823
