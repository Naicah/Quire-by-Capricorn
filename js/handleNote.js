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


window.onload = function(){
	if(localStorage.length > 0){
		viewNoteLists();
	}else{
		console.log("there is no documents")
	}
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
	savedStatus();
	let boolIS = false;
	let textObj = getText();
	// returnerar true om den  title finns.
	boolIS = checkForNote(textObj.title);
	if(textObj.text.length > 1){
		if(boolIS){
			// Finns redan hämta objekt och fortsätt.
			// Uppdatera enbart Title & text. inte dateTime eller id.
			// object.title = title; etc
			console.log(boolIS)
			console.log(textObj.text);
			console.log("Already existing , please continue")
		}else{
			// Objekt fanns inte. skapa nytt objekt.
			console.log(boolIS)
			save();
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
function loopNoteObjects(){
	let noteArr =[];
	Object.keys(localStorage).forEach((key)=>{
		noteArr.push(JSON.parse(localStorage.getItem(key)));
	})
	return noteArr;
}


// Show load symbol when saving

function savedStatus(){
	document.getElementById("save").style.display = 'none';
	document.querySelector(".load-wrapp").style.display = 'block';
	setTimeout(function(){
		document.getElementById("save").style.display = 'block';
		document.querySelector(".load-wrapp").style.display = 'none';

	}, 1000);

};


// VIEW NOTES IN NOTELIST

function viewNoteLists(){
	let noteArr = loopNoteObjects();
	let container = document.getElementById("noteList");
	container.innerHTML = "";
	noteArr.forEach((obj)=>{
		let newDiv = document.createElement("div");
		let newP = document.createElement("p");
		newP.innerHTML = `${obj.title} <br> ${obj.dateTime}`;
		console.log(newDiv);
		console.log(container)
		container.appendChild(newDiv);
		newDiv.appendChild(newP);
	})
}
