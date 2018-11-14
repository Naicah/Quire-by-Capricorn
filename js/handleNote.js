// INITIALIZE QUILL EDITOR - Nina
var quill = new Quill('#editor', {
modules: {
	toolbar: [
	{ 'font': [] }, { header: [1, 2, false] }, 
	'bold', 'italic', 'underline', 
	{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }, 
	{ 'list': 'ordered'}, { 'list': 'bullet' }, 
	'image', 'video', 'code-block', 'clean',
	],
	},
	placeholder: 'Compose an epic...',
	theme: 'snow'  // or 'bubble'
});

// ON LOAD
window.onload = function(){
	
	if(localStorage.length > 0){
		displayNoteList();
	}else{
		console.log("there is no documents")
	}
	getTitleFromNoteList();
}

// GET LOWEST AVAILABLE ID - Nina 
function getAvailID() {

	let notes = loopNoteObjects(); //Get all notes
	let noteIDs = []; //Array of all Note IDs

	notes.forEach((n) => { //For each note
		noteIDs.push(n["id"]); // Get ID and put it in the array of all IDs
    });

	noteIDs.sort(function(a, b) { return a-b; });   // Sort all IDs numeric

	if (noteIDs.length == 0) { //If there aren't any notes
		lowest = 0; // ID = 0
	} else { // 1 note or more
		for (i = 0;  i <= noteIDs.length;  ++i) { //Start at 0 and increase by 1 until value does not exist in list of IDs
			if (noteIDs[i] != i) {
				lowest = i;
				break; // Stops the loop when the lowest ID is found
			}
		}
	}
	  return lowest; //Return lowest available ID
}

// GET TIME FOR DATE TIME WHEN CREATING NOTE -Jonathan
function getTime(){
	return new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "/" + (new Date().getMonth()+1) + " " + new Date().getFullYear();
}

// CREATE NEW NOTE
function createNote(title, text){

 	return obj = {
		id: getAvailID(),
 		title: title,
		//For the record i hate Date objs.
 		dateTime: getTime(),
 		text: text
 	}
}

/*User has written down title & message and hitting save.
Get info from document*/
function newNote(title, text){
	title = title.trim();
	let note = createNote(title, text);
	addToLocalStorage(note);
}

// ADD NOTE TO LOCAL STORAGE
function addToLocalStorage(newNote){
	localStorage.setItem(newNote.title, JSON.stringify(newNote));
}

/*Click event Getting title on selected note?*/
/* or search specific note*/

// GET NOTE
function getNote(title){
	return JSON.parse(localStorage.getItem(title))
}

// WHEN CLICK ON SAVE ICON
document.getElementById("save").addEventListener("click", function () {
	savedStatus();
	let boolIS = false;
	let textObj = getText();
	// returnerar true om den  title finns.
	boolIS = checkForNote(textObj.title);
	if(textObj.text.length > 1){
		if(boolIS){

			// Finns redan hämta objekt och fortsätt.
			// Uppdatera enbart Title ,text och dateTime inte id.
			// object.title = title; etc
			let updatedNote = getNoteFromStorage(textObj.title)
			updatedNote.dateTime = getTime();
			save();
			displayNoteList()
			console.log("Already existing , please continue")
		}else{
			// Objekt fanns inte. skapa nytt objekt.
			save();
			displayNoteList()
		}
	}else{
		// SPARA INTE TOM TEXT
		console.log("PLZ WRITE SOMETHING")
	}
})

// SAVE NOTE
function save(){
	let notis = newNote(title, text);
}

// GET ATT TEXT IN EDITOR
function getText () {
	title = document.getElementById("editor").firstChild.firstChild.textContent;
	text = quill.root.innerHTML;
	return textObj = {title: title, text: text};
}

// CHECK IF NOTE ALREADY EXIST
function checkForNote(title){
	return (localStorage.getItem(title) ?  true : false);
}

// LOOP OBJECTS TO NOTE LISTS  titlar. - Jonathan
function loopNoteObjects(){
	let noteArr =[];
	Object.keys(localStorage).forEach((key)=>{
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
}

// SHOW LOAD SYMBOL WHEN SAVING - William
function savedStatus(){
	document.getElementById("saveIcon").style.display = 'none';
	document.getElementById("load-wrapp").style.display = 'block';
	setTimeout(function(){
		document.getElementById("saveIcon").style.display = 'block';
		document.getElementById("load-wrapp").style.display = 'none';

	}, 1000);
};

// DISPLAY NOTES IN NOTELIST
function displayNoteList(){
	let noteArr = loopNoteObjects();
	let container = document.getElementById("clicklist");
	container.innerHTML = "";
	noteArr.forEach((obj)=>{
		let newDiv = document.createElement("div");
		let newH = document.createElement("h4");
		let newP = document.createElement("p");
		newH.innerHTML = `${obj.title.substring(0, 35)} `;
		newP.innerHTML = `${obj.dateTime}`;
		container.appendChild(newDiv);
		newDiv.appendChild(newH);
		newDiv.appendChild(newP);
	})
}

// WHEN CLICKING ON CON FOR NEW PAGE
document.getElementById("newPage").addEventListener("click", function () {
	let container = document.getElementById("clicklist");
	let newDiv = document.createElement("div");
	let newH = document.createElement("h4");
	container.appendChild(newDiv);
	newDiv.appendChild(newH);
	newH.innerHTML = 'NY ANTECKNING';
});

// GET TITLE FROM NOTE LIST
function getTitleFromNoteList(){
 let noteList = document.getElementById("clicklist");
 	clicklist.addEventListener("click", function(event){
		if(event.target.tagName === "H4" || event.target.tagName === "P"){
			let noteObj = event.target.parentElement;
			let titlestr = noteObj.firstChild.textContent;
			textToEditor(getNoteFromStorage(titlestr.trim()))
		}else{
			let titlestr = event.target.firstChild.textContent;
			textToEditor(getNoteFromStorage(titlestr.trim()))
		}
	})
}

// Hämtar objekt från localStorage med hjälp av titeln.
function getNoteFromStorage(title){
	return JSON.parse(localStorage.getItem(title));
}


// inbyggt i quill för att kunna adDera html-document i editorn
function textToEditor(noteObj){
	let editor = document.querySelector(".ql-editor");
 	quill.root.innerHTML = "";
	quill.root.innerHTML = noteObj.text;
}
// WHEN CLICKING ON TRASHCAN ICON 
let trashcan = document.getElementById("deleteAll");
	trashcan.addEventListener("click", ()=>{
		deleteAll();
})

// DELETE ALL NOTES
function deleteAll(){
	localStorage.clear();
	quill.root.innerHTML = "";
	displayNoteList();
}
