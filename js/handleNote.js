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

/*Creating new note*/
function createNote(title, message){
 	return obj = {
 		title: title,
		//For the record i hate Date objs.
 		dateTime: new Date().getHours() + ":" + new Date().getMinutes() + " " + new Date().getDate() + "/" + (new Date().getMonth()+1) + " " + new Date().getFullYear(),
 		message: message
 	}
}

/*User has written down title & message and hitting save.
Get info from document*/
function newNote(title, message){
	let note = createNote(title, message);
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

// Get all text in editor
var text;

document.getElementById("click").addEventListener("click", function () {
	console.log("klick");
	c();
})

function c () {
	text = quill.getText(0, );
	document.getElementById("note1").innerHTML = text;

}
