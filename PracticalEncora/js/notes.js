var app = new function () {

    this.elCardDiv = document.getElementById('notesCard');
    this.elSave = document.getElementById('notesFormSubmit');


    this.notes = [{ 'id': 1, 'title': 'title1', 'body': 'sample notes1' },
    { 'id': 2, 'title': 'title2', 'body': 'sample notes2' }];
    this.noteId = this.notes.length + 1;

    /*
   * @purpose: Dynamic add all Notes in UI 
   * @created: July 2022
   * @params: null
   * @returns: All Notes to display in UI
   * @author: Amritesh
   */
    this.fetchAllNotes = function () {
        var data = '';
        if (Array.isArray(this.notes) && this.notes.length) {
            this.notes.forEach(element => {
                data += `<div class="card  mb-3 card` + element.id + `"><div class="card-header bd-blue">`
                    + element.title +
                    `<button class="float-end btn btn-outline-danger" onclick="app.deleteNotes(` + element.id + `)"><i class="bi bi-trash"></i></button>
                    <button class="float-end btn btn-outline-secondary" onclick="app.editNotes(`+ element.id + `)"><i class="bi bi-pen"></i></button>
                    </div>
                    <div class="card-body"><p class="card-text">`
                    + element.body +
                    `</p></div></div>`;
            });

        }
        return this.elCardDiv.innerHTML = data;
    };

    /*
      * @purpose: Save or update Notes as per condition in Notes array
      * @created: July 2022
      * @params: null
      * @author: Amritesh
      */

    this.saveOrUpdateNotes = function () {
        var elTitle = document.getElementById('titleField');
        var elBody = document.getElementById('bodyField');
        var itemId = parseInt(this.elSave.getAttribute('selectedId'));
        if ((elTitle && elBody) && (elTitle.value && elBody.value != "")) {
            if (itemId) {
                // edit the existing value
                this.notes.splice(this.notes.findIndex(element => { return element.id == itemId }), 1, {
                    'id': itemId, 'title': elTitle.value, 'body': elBody.value
                });
            }
            else {
                var notesObj = { 'id': this.noteId, 'title': elTitle.value, 'body': elBody.value };
                if (Array.isArray(this.notes)) {
                    // save the new value
                    this.notes.push(notesObj);
                    this.noteId = this.noteId + 1;
                }
            }
        } else {
            // error Alert
            alert("Please fill all the mandatory fields");
            return false;

        }

        // Dislay the new list
        this.fetchAllNotes();
        // Reset input value
        this.clearFormFields();

    };

    /*
   * @purpose: Reset form fields and change button text to save
   * @created: July 2022
   * @params: null
   * @author: Amritesh
   */
    this.clearFormFields = function () {
        document.getElementById('notesForm').reset();
        if (this.elSave)
            this.elSave.value = "Save";
        this.elSave.removeAttribute("selectedId");

    };

    /*
   * @purpose: Deletes Notes and Updates the Notes in UI
   * @created: July 2022
   * @params: itemId
   * @author: Amritesh
   */
    this.deleteNotes = function (itemId) {
        // Delete the current row
        if (confirm("Do you want to delete it?") == true) {
            this.notes.splice(this.notes.findIndex(element => { return element.id == itemId }), 1);
            // Display the new list
            this.fetchAllNotes();
        }
    };

    /*
* @purpose: Edits Notes and Updates the Notes in UI
* @created: July 2022
* @params: itemId
* @author: Amritesh
*/
    this.editNotes = function (itemId) {

        this.elSave.value = "Update";
        var selectedNotes = this.notes.filter(element => { return element.id == itemId });
        this.elSave.setAttribute('selectedId', selectedNotes[0].id);
        var elTitle = document.getElementById('titleField');
        elTitle.value = selectedNotes[0].title;
        var elBody = document.getElementById('bodyField');
        elBody.value = selectedNotes[0].body;
    };



    /*
* @purpose:Logout system by navigating to login page
* @created: July 2022
* @params: null
* @author: Amritesh
*/
    this.Logout = function () {
        window.location.replace("../html/login.html");
    };
}

/*
* @purpose:Execute the script after the webpage has completely loaded
* @created: July 2022
* @params: null
* @author: Amritesh
*/
window.onload = function () {
    app.fetchAllNotes();
}
