let popup = null;
function createPopup() {
    if (popup) {
        // Remove the existing popup if it exists
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }
    const activeSlot = clickManager.getClickObject()
    popup = document.createElement('div');
    popup.className = 'popup';


    // Create the content container
    const content = document.createElement('div');
    content.className = 'popup-content';

    // Create and add the label field
    const labelField = document.createElement('input');
    labelField.type = 'text';
    labelField.placeholder = 'Label';
    labelField.className = 'popup-field';
    labelField.value = activeSlot.label;

    // Create and add the room field
    const roomField = document.createElement('input');
    roomField.type = 'text';
    roomField.placeholder = 'Room';
    roomField.className = 'popup-field';
    roomField.value = activeSlot.room;

    // Create and add the color field
    const colourField = document.createElement('input');
    colourField.type = 'color';
    colourField.className = 'popup-field';
    colourField.value = activeSlot.colour;

    // Create and add the accept button
    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.className = 'popup-button';
    acceptButton.addEventListener('click', () => {
        labelField.value !== activeSlot.label ? activeSlot.label = labelField.value : null;
        roomField.value !== activeSlot.room ? activeSlot.room = roomField.value : null;
        colourField.value !== activeSlot.colour ? activeSlot.colour = colourField.value : null;
        refreshTable()
        document.body.removeChild(popup);
    });

    // Create and add the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'popup-button';
    deleteButton.addEventListener('click', () => {
        activeSlot.clearCustoms();
        activeSlot.parent = blankSlot;
        let index = userSlotArray.indexOf(activeSlot);
        if (index !== -1) {
            activeSlot.element.remove();
            userSlotArray.splice(index, 1);
            console.log('activeSlot removed from userSlotArray');
        }
        refreshTable()
        console.log('Deleted');
        document.body.removeChild(popup);
    });

    // Create and add the close button (X)
    const closeButton = document.createElement('span');
    closeButton.textContent = 'x';
    closeButton.className = 'popup-close';
    closeButton.addEventListener('click', () => {
        // Handle close button click
        document.body.removeChild(popup);
    });

    // Append elements to content container
    content.appendChild(closeButton);
    content.appendChild(labelField);
    content.appendChild(roomField);
    content.appendChild(colourField);
    content.appendChild(acceptButton);
    content.appendChild(deleteButton);

    // Append content to popup
    popup.appendChild(content);

    // Append popup to body
    document.body.appendChild(popup);
}