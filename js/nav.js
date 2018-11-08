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
