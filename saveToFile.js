/*Creating new note*/
function createNote(title, message){
 	return obj = {
 		title: title,
 		dateTime: new Date().getDate() + "/" + (new Date().getMonth()+1),
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
