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

function getChildArray(parentObject) {
    const tempArray = [];
    timetableArray.forEach((element, index) => {
        if (element.parent === parentObject) {
            tempArray.push(index);
        }
    });
    return tempArray;
}

function save() {
    const data = saveData();  // Assuming this function returns your array or object
    const filename = 'data.json';  // Set a default filename, you can also let the user choose it

    // Convert data to JSON string
    const dataStr = JSON.stringify(data, null, 4);

    // Create a Blob with the data
    const blob = new Blob([dataStr], {type: 'application/json'});

    // Create an anchor element and use it for triggering download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function saveAs() {
    const data = JSON.stringify(saveData()); // Assume savedUserData is your JSON object
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

function loadFile() {
    const fileInput = document.getElementById('fileInput');

    fileInput.onchange = function() {
        const reader = new FileReader();
        reader.onload = function(event) {
            clearUserSlots();
            const savedUserData = JSON.parse(event.target.result);
            loadUserSlots(savedUserData);
            console.log('File loaded and parsed:', savedUserData);
        };

        reader.readAsText(this.files[0]);
    };
    fileInput.click();
}