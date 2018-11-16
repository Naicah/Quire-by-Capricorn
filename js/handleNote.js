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
	theme: 'snow'  // or 'bubble'
});

// FIND ALL SAVED NOTES IN STORAGE AND SAVE KEY IN STRING - Jonathan
function loopNoteObjects() {
	let noteArr = [];
	Object.keys(localStorage).forEach((key) => {
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
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
		newH.innerHTML = `${obj.title.substring(0, 35)} `;
		newP.innerHTML = `${obj.dateTime}`;
		container.appendChild(newDiv);
		newDiv.classList.add("noteDiv");
		newDiv.appendChild(newH);
		newDiv.appendChild(newP);
	})
}

// WHEN CLICK IN NOTE LIST: FIND WHICH NOTE AND DISPLAY TEXT IN EDITOR

function getTitleFromNoteList() {
	let titlestr;
	if (event.target.tagName === "H4" || event.target.tagName === "P") {
		let noteObj = event.target.parentElement;
		titlestr = noteObj.firstChild.textContent;
	} else {
		titlestr = event.target.firstChild.textContent;
	}
	textToEditor(getNoteFromStorage(titlestr.trim()))
}

// DISPLAY TEXT OF GIVEN NOTE IN EDITOR
function textToEditor(noteObj) {
	quill.root.innerHTML = "";
	quill.root.innerHTML = noteObj.text;
}

// GET OBJECT OF GIVEN NOTE FROM STORAGE
function getNoteFromStorage(title) {
	return JSON.parse(localStorage.getItem(title));
}

// WHEN CLICKING ON SAVE ICON
function saveIcon() {
	savingAnimation();
	let boolIS = false;
	let textObj = getText();
	// returnerar true om den title finns.
	boolIS = checkForNote(textObj.title);
	if (textObj.text.length > 1) {
		if (boolIS) {
			// Finns redan hämta objekt och fortsätt.
			// Uppdatera enbart Title ,text och dateTime inte id.
			// object.title = title; etc
			getNoteFromStorage(textObj.title).dateTime = getTime();
			console.log("Already existing , please continue")
		}
		save();
		displayNoteList();
	} else {
		// SPARA INTE TOM TEXT
		console.log("PLZ WRITE SOMETHING")
	}
}

// CHECK IF NOTE ALREADY EXIST
function checkForNote(title) {
	return (localStorage.getItem(title) ? true : false);
}

// GET ALL TEXT IN EDITOR
function getText() {
	title = document.getElementById("editor").firstChild.firstChild.textContent;
	text = quill.root.innerHTML;
	return textObj = { title: title, text: text };
}

// CREATE NEW NOTE
function newNote(title, text) {
	title = title.trim();
	let note = createNote(title, text);
	addToLocalStorage(note);
}

// CREATE NOTE OBJECT
function createNote(title, text) {
	return obj = {
		id: getAvailID(),
		title: title,
		dateTime: getTime(),
		text: text
	}
}

// ?
function save() {
	let notis = newNote(title, text);
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
function addToLocalStorage(newNote) {
	localStorage.setItem(newNote.title, JSON.stringify(newNote));
}

// CREATE NEW PAGE IN NOTE LIST
function newPage() {
	let newDiv = document.createElement("div");
	let newH = document.createElement("h4");
	document.getElementById("clickNoteList").appendChild(newDiv);
	newDiv.appendChild(newH);
	newH.innerHTML = 'NY ANTECKNING';
}

// DELETE ALL NOTES
function deleteAll() {
	localStorage.clear();
	quill.root.innerHTML = "";
	displayNoteList();
}

// function to filter out text feild from oopNoteObjects

function getFields(input, field) {
	    var output = [];
	    for (var i=0; i < input.length ; ++i)
	        output.push(input[i][field]);
	    return output;
	}
	
	
	// On click på NoteList. 
	
	function checkContent() {
	    let match = false; 
	    loopNoteObjects();
	    let loopObj = loopNoteObjects();
	    let getcontent = quill.root.innerHTML;
	
	    let textObj = getFields(loopObj, "text")
	    for (var i = 0; i < textObj.length; i++){
	        if(getcontent.match(textObj[i])){
	            // console.log('match found. stop searching')
	             
	            return match = true;
	
	        } else if(getcontent.length < 12) { 
	        // console.log('no content to save');
	        return match = true;
	        
	        } else {
	            // console.log('none match has been found');
	                }
	    }
	     return match = false;
	}   
	

// Make warnings popuo visible it content not saved
	
	    function contentNotSaved() {
	        let popUp = document.getElementById("popUp");
	        checkContent();
	        var isSaved = checkContent();
	        if(isSaved === true){
	        } else {
	            popUp.style.visibility = 'visible';
	        }   
	};
	
	
	
	// Run check if content saved when klicking on noteList div
	
	
	document.querySelector("#clickNoteList").addEventListener("click", function(){
	    contentNotSaved();
	    document.querySelector("#popUpIgnore").addEventListener("click", function(){
	        popUp.style.visibility = 'hidden';
	    })
	
	    document.querySelector("#popUpSave").addEventListener("click", function(){
	        save()
	    })
	})
	