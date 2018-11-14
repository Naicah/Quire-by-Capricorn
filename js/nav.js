// Toggle hamburger to toolbar in mobile version / William

var noteList = document.getElementById("noteList");
var menu = document.getElementById("menu");
document.getElementById("hamburgerIcon").addEventListener("click",function(){
    if(menu.style.display === 'none'){
		menu.style.display = 'flex';
        noteList.style.display = 'block';
       } else {
		menu.style.display = 'none';
		noteList.style.display = 'none';
	   }});

// Toggle Notelist overwiew in mobile version / William

// document.getElementById("folder").addEventListener("click",function(){
// if(noteList.style.display === 'none'){
// 	noteList.style.display = 'block'
// 	} else {
// 	noteList.style.display = 'none'
// 	}});

// adjust elements between phone and computer displey onload / William

window.addEventListener("load",  function() {
	    if (window.matchMedia("(min-width: 768px)").matches) {
	        menu.style.display = 'flex';
	        noteList.style.display = 'block';
	
	    } else {
	        menu.style.display = 'none';
	        noteList.style.display = 'none';
	    }
	    
	});
	
	    // adjust elements between phone and computer displey resize/ William
	
	window.addEventListener("resize",  function() {
	    if (window.matchMedia("(min-width: 768px)").matches) {
	        menu.style.display = 'flex';
	        noteList.style.display = 'block';
	
	    } else {
	        menu.style.display = 'none';
	        noteList.style.display = 'none';
	    }
	    
	});
