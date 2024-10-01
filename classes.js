class Slot {
    constructor(label = null, room = null, colour = null, parent = null) {
        
        this._label = label;
        this._room = room;
        this._colour = colour;
        this._parent = parent;
        this.id = getUniqueID();
        this.element = getNewElement();
        this.element.id = 'slot-' + this.id;
        this.labelElement = this.element.querySelector('.labelText');
        this.roomElement = this.element.querySelector('.roomText');
        this.element.addEventListener('contextmenu', (event) => this.handleRightClick(event));
        this.updateUI();
    }

    // If a custom properties are set, use them; otherwise, get the value from parent.
    get label() {
        return this._label !== null ? this._label : this.parent ? this.parent.label : "";
    }
    set label(newLabel) {
        this._label = newLabel;
        this.updateUI();
    }

    get room() {
        return this._room !== null ? this._room : this.parent ? this.parent.room : "";
    }
    set room(newRoom) {
        this._room = newRoom;
        this.updateUI();
    }

    get colour() {
        return this._colour !== null ? this._colour : this.parent ? this.parent.colour : "#ffffff";
    }
    set colour(newColour) {
        this._colour = newColour;
        this.updateUI();
    }

    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        if (circularReference(this, newParent)) {
            console.error("Invalid parent assignment: circular reference detected.");
            return;
        }
        this._parent = newParent;
        this.updateUI();
    }

    getPrivateValues() {
        return [this._label, this._room, this._colour];
    }

    setPrivateValues([label, room, colour]) {
        this._label = label;
        this._room = room;
        this._colour = colour;
        this.updateUI();
    }

    updateUI() {
        this.element.style.backgroundColor = this.colour;
        this.labelElement.textContent = this.label;
        this.roomElement.textContent = this.room;
        this.labelElement.style.color = getContrast(this.colour);
        this.roomElement.style.color = getContrast(this.colour);
    }

    clearCustoms() {
        this._label = null;
        this._room = null;
        this._colour = null;
        this.updateUI();
    }

    handleDragStart(event) {
        dragManager.setDragObject(this);
        console.log('Drag started');
    }

    handleDragEnd(event) {
        console.log('Drag ended');
    }

    handleDrop(event) {
        event.preventDefault();
        const dragObject = dragManager.getDragObject();
        this.clearCustoms();
        this.parent = dragObject;
        this.updateUI();
        console.log(dragObject.label + 'dropped on target');
    }

    handleRightClick(event) {
        event.preventDefault();
        clickManager.setClickObject(this);
        createPopup();
        console.log('Right-clicked');
    }
}