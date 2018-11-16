function showTutuorial() {
  var key_value = "beenhere = true; expires=Fri, 2 Aug 2022 20:47:11 UTC;";
  var cookie_key_value = "beenhere=true";
  var foundCookie = 0;

  // Get all the cookies from this site and store in an array
  var cookieArray = document.cookie.split(';');

  // Walk through the array
  for (var i = 0; i < cookieArray.length; i++) {
    var checkCookie = cookieArray[i];

    // Remove any leading spaces
    while (checkCookie.charAt(0) == ' ') {
      checkCookie = checkCookie.substring(1, checkCookie.length);
    }

    // Look for cookie set by key_value
    if (checkCookie.indexOf(cookie_key_value) == 0) {
      // The cookie was found so set the variable
      foundCookie = 1;
    }
  }
  // Check if a cookie has been found
  if (foundCookie == 0) {
    // The key_value cookie was not found so set it now
    document.cookie = key_value;
    document.getElementById("tutorial").style.display = "block"; 
    currentNoteID = 0;
  }
}

