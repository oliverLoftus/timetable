function getSaveObject() {
    return {
        userSlots: saveData(),
        customSlots: getTimetableValues()
    };
}

function saveData() {
    const saveArray = userSlotArray.map(slot => {
        const [label, room, colour] = Object.values(slot);
        const temp1 = [label, room, colour];
        const temp2 = getChildArray(slot);

        return {
            info: temp1,
            children: temp2
        };
    });

    return saveArray;  // Return the populated array
}

function getTimetableValues() {
    const newArray = [];
    timetableArray.forEach(slot => {
        const privateValues = slot.getPrivateValues();
        newArray.push(privateValues);
    });
    return newArray;
}

function getChildArray(parentObject) {
    const tempArray = [];
    timetableArray.forEach((element, index) => {
        if (element.parent === parentObject) {
            tempArray.push(index);
        }
    });
    return tempArray;
}

function saveAs() {
    const data = JSON.stringify(getSaveObject()); // Assume savedUserData is your JSON object
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Default filename
    a.click();

    URL.revokeObjectURL(url); // Clean up the object URL
}

// Load Save
function loadUserSlots(savedUserData) {
    savedUserData.forEach(element => {
        const newSlot = createUserSlot(...element.info);
        setChildren(element.children, newSlot);
    });
}

function setChildren(indices, parentSlot) {
    indices.forEach(index => {
        timetableArray[index].parent = parentSlot;
    });
}

function loadCustomSlots(customSlots) {
    customSlots.forEach((slotValues, index) => {
        if (timetableArray[index]) {
            timetableArray[index].setPrivateValues(slotValues);
        }
    });
}

function loadFile() {
    const fileInput = document.getElementById('fileInput');

    fileInput.onchange = function() {
        const reader = new FileReader();
        reader.onload = function(event) {
            clearUserSlots();
            const savedUserData = JSON.parse(event.target.result);
            loadUserSlots(savedUserData.userSlots);
            loadCustomSlots(savedUserData.customSlots);
            console.log('File loaded and parsed:', savedUserData);
        };

        reader.readAsText(this.files[0]);
    };
    fileInput.click();
}