const slotArray = [];
const timetableArray = [];
const userSlotArray = [];
let savedUserSlots = [];
const week1 = document.querySelector('#week1');
const week2 = document.querySelector('#week2');
const blankSlot = new Slot("", "", "#ffffff");
slotArray.push(blankSlot);

for (let i = 1; i <= 35; i++) {
    const newSlot = new Slot();
    newSlot.parent = blankSlot;
    newSlot.element.addEventListener('dragover', (event) => event.preventDefault());
    newSlot.element.addEventListener('drop', (event) => newSlot.handleDrop(event));
    week1.appendChild(newSlot.element);
    slotArray.push(newSlot);
    timetableArray.push(newSlot);
}

for (let i = 1; i <= 35; i++) {
    const newSlot = new Slot();
    newSlot.parent = blankSlot;
    newSlot.element.addEventListener('dragover', (event) => event.preventDefault());
    newSlot.element.addEventListener('drop', (event) => newSlot.handleDrop(event));
    week2.appendChild(newSlot.element);
    slotArray.push(newSlot);
    timetableArray.push(newSlot);
}

function createUserSlot(label, room, colour) {
    const newSlot = new Slot(label, room, colour);
    slotArray.push(newSlot);
    userSlotArray.push(newSlot);
    newSlot.element.draggable = true;
    newSlot.element.addEventListener('dragstart', (event) => newSlot.handleDragStart(event));
    document.getElementById('sidebar').appendChild(newSlot.element);
    return newSlot;
}

const ub1 = createUserSlot("Class:", "Room:", "#9be0e6");
const ub2 = createUserSlot("Class:", "Room:", "#fffc79");
const ub3 = createUserSlot("Class:", "Room:", "#aa9bc6");
const ub4 = createUserSlot("Class:", "Room:", "#c4e7a0");

document.getElementById('addButton').addEventListener('mouseup', (event) => {
    const newSlot = createUserSlot();
    newSlot.parent = blankSlot;
    clickManager.setClickObject(newSlot);
    createPopup();
    console.log('Mouse button released on addButton');
});
