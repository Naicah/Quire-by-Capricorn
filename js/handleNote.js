// Initialize Quill editor
var quill = new Quill('#editor', {
modules: {
	toolbar: [
	[{ 'font': [] }, { header: [1, 2, false] }],
	['bold', 'italic', 'underline'],
	[{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }],
	[ { 'list': 'ordered'}, { 'list': 'bullet' }],
	['image', 'video'],
	['code-block'],
	['clean']
	]
	},
	placeholder: 'Compose an epic...',
	theme: 'snow'  // or 'bubble'
});

// GET LOWEST AVAILABLE ID - Nina H
function getAvailID() {

	let notes = loopNoteTitles(); //Get all notes
	let noteIDs = []; //Array of all Note IDs

	notes.forEach((n) => { //For each note
		noteIDs.push(n["id"]); 
    });

	noteIDs.sort(function(a, b) { return a-b; });   // Sort all IDs numeric 

	var lowest = -1;
	if (noteIDs.length == 0) { //If there aren't any notes
		lowest = 0; // ID = 0
	} else {
		for (i = 0;  i < noteIDs.length;  ++i) { //Start at 0 and increase by 1 until value does not exist in list of IDs
			if (noteIDs[i] != i) {
			lowest = i;
			break;
			}
		}
	if (lowest == -1) { //Failsafe source: https://stackoverflow.com/questions/30672861/find-the-lowest-unused-number-in-an-array-using-javascript
		  lowest = noteIDs[noteIDs.length - 1] + 1;
	 	}
	}
	  return lowest; //Return lowest available ID
}

/*Creating new note*/
function createNote(title, text){
	
 	return obj = {
		id: getAvailID(),
 		title: title,
		//For the record i hate Date objs.
 		dateTime: new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "/" + (new Date().getMonth()+1) + " " + new Date().getFullYear(),
 		text: text
 	}
}

/*User has written down title & message and hitting save.
Get info from document*/
function newNote(title, text){
	let note = createNote(title, text);
	addNote(note);
}

/* Add note to localStorage*/
function addNote(newNote){
	localStorage.setItem(newNote.title, JSON.stringify(newNote));
}

/*Click event Getting title on selected note?*/
/* or search specific note*/

/*Gets note*/
function getNote(title){
	return JSON.parse(localStorage.getItem(title))
}

document.getElementById("save").addEventListener("click", function () {
	let boolIS = false;
	let textObj = getText();
	// returnerar true om den  title finns.
	boolIS = checkForNote(textObj.title);
	if(textObj.text.length > 1){
		if(boolIS){
			// Finns redan hämta objekt och fortsätt.
			// Uppdatera enbart Title & text. inte dateTime eller id.
			// object.title = title; etc
			console.log("Already existing , please continue")
		}else{
			// Objekt fanns inte. skapa nytt objekt.
			save();
			savedStatus();
		}
	}else{
		// SPARA INTE TOM TEXT
		console.log("PLZ WRITE SOMETHING")
	}
})

// js for save function
function save(){
	let notis = newNote(title, text);
}

// Get all text in editor
function getText () {
	title = document.getElementById("editor").firstChild.firstChild.textContent;
	text = quill.getText(0, );
	let format = quill.getFormat();
	return textObj = {title: title, text: text};
}

// CHECK IF OBJECT ALREADY EXIST
	function checkForNote(title){
		return (localStorage.getItem(title) ?  true : false);
	}

/// LOOP OBJECTS TO NOTE LISTS  titlar.

function loopNoteTitles(){
	let noteArr = [];
	Object.keys(localStorage).forEach((key)=>{
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
}


function savedStatus(){
	document.getElementById("save").style.display = 'none';
	document.querySelector(".load-wrapp").style.display = 'block';
	setTimeout(function(){
		document.getElementById("save").style.display = 'block';
		document.querySelector(".load-wrapp").style.display = 'none';
	}, 1000);
};
