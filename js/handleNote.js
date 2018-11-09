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

let noteID = 0;
/*Creating new note*/
function createNote(title, text){
	noteID += 1;
 	return obj = {
		id: noteID,
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

function addNote(newNote){
	localStorage.setItem(newNote.title, JSON.stringify(newNote));
}

/*Click event Getting title on selected note?*/
/* or search specific note*/
function getNote(title){
	return JSON.parse(localStorage.getItem(title))
}

var text;
var title;
var boolIS = false;
document.getElementById("save").addEventListener("click", function () {
	getText();
	// returnerar true om den  title finns.
	boolIS = checkForNote(title);
	if(text.length > 1){
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
}

// CHECK IF OBJECT ALREADY EXIST
	function checkForNote(title){
		return (localStorage.getItem(title) ?  true : false);
	}

/// LOOP OBJECTS TO NOTE LISTS  titlar.

let noteArr = [];

function loopNoteTitles(){
	noteArr = [];
	Object.keys(localStorage).forEach((key)=>{
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
}


function savedStatus(){
	document.getElementById("save").style.display = 'none';
	document.querySelector(".load-wrapp").style.display = 'block';
	setTimeout(function(){
		document.getElementById("save").style.display = 'block';
		document.querySelector(".load-wrapp").style.display = 'none';

	}, 1000);

};
