// Initialize Quill editor 
var quill = new Quill('#editor', {
modules: {
	toolbar: [
	[{ header: [1, 2, false] }],
	['bold', 'italic', 'underline'],
	['image', 'code-block']
	]
	},
	placeholder: 'Compose an epic...',
	theme: 'snow'  // or 'bubble'
});

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


// Toggle hamburger to toolbar in mobile version / William

var noteList = document.getElementById("noteList");
var iconimages = document.querySelector(".iconimages");
document.getElementById("hamburgerIcon").addEventListener("click",function(){
    if(iconimages.style.display === 'none'){
        iconimages.style.display = 'flex'
       } else {
		iconimages.style.display = 'none'
	   }});

// Toggle Notelist overwiew in mobile version / William	   

document.getElementById("folder").addEventListener("click",function(){
if(noteList.style.display === 'none'){
	noteList.style.display = 'block'
	} else {
	noteList.style.display = 'none'
	}});

// adjust elements between phone and computer displey / William
	   
window.addEventListener("resize", function() {
	if (window.matchMedia("(min-width: 768px)").matches) {
		iconimages.style.display = 'flex';
		noteList.style.display = 'block';
	
	} else {
		iconimages.style.display = 'none';
		noteList.style.display = 'none';
	}
});


