
function makeWYSIWYG(editor) {
  //If the DOM element we want to edit exists
  if (editor) {
    //We create the buttons container
    var buttons_container = document.getElementById('makeWYSIWYG_buttons_container');

    editor.isEditable = true; //By default, the element is not editable
    editor.setAttribute('contenteditable', true);

    //Get the format buttons
    var buttons = buttons_container.querySelectorAll('button[data-tag]');

    //For each of them...
    for (var i = 0, l = buttons.length; i < l; i++) {
      //We bind the click event
      buttons[i].addEventListener('click', function (e) {
        var tag = this.getAttribute('data-tag');
        switch (tag) {
          case 'createLink':
            var link = prompt('External link or Internal Page number', "Page 1");

			var pagchk = link.trim();
			//link.startsWith method 'equivalent' below
			if( pagchk.indexOf("Page") === 0 ) link = "#("+pagchk.split("Page")[1]+")";
			else if ( pagchk.indexOf("page") === 0 ) link = "#("+pagchk.split("page")[1]+")";
	
            if (link) {
              document.execCommand('createLink', false, link);
            }
            break;

          case 'insertImage':
            var src = prompt('Please specify the link of the image.');
            if (src) {
              document.execCommand('insertImage', false, src);
            }
            break;

          case 'heading':
            try {
              document.execCommand(tag, false, this.getAttribute('data-value'));
            } catch (e) {
              //The browser doesn't support "heading" command, we use an alternative
              document.execCommand('formatBlock', false, '<' + this.getAttribute('data-value') + '>');
            }
            break;

          default:
            document.execCommand(tag, false, this.getAttribute('data-value'));
        }
        e.preventDefault();
      });
    }
  }
  return editor;
};
