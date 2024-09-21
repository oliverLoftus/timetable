//immediatly invoked closures
const getUniqueID = (function() {
    let count = 0;
    return function() { 
        return ++count; 
    };
})();

const dragManager = (function() {
    let dragObject;
    return {
        getDragObject: function() {
            return dragObject;
        },
        setDragObject: function(slot) {
            dragObject = slot;
        }
    };
})();

const clickManager = (function() {
    let clickObject;
    return {
        getClickObject: function() {
            return clickObject;
        },
        setClickObject: function(slot) {
            clickObject = slot;
        }
    };
})();

//other functions
function getNewElement() {
    const newDiv = document.createElement('div');
    const labelText = document.createElement('span');
    labelText.className = 'labelText';
    const roomText = document.createElement('span');
    roomText.className = 'roomText';
    
    newDiv.className = 'slot';
    newDiv.appendChild(labelText);
    newDiv.appendChild(document.createElement('br'));
    newDiv.appendChild(roomText);
    //document.body.appendChild(newDiv);
    return newDiv;
}

function circularReference(obj, ancestor) {
    return obj === ancestor ? true :
           !ancestor.parent ? false :
           circularReference(obj, ancestor.parent);
}

function getContrast(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = 0.4*r + 0.4*g + 0.01*b;
    return brightness > 75 ? '#000000' : '#ffffff';
}

function refreshTable() {
    timetableArray.forEach(slot => slot.updateUI());
}

function clearTable() {
    timetableArray.forEach(slot => {
        slot.parent = blankSlot;
        slot.clearCustoms();
        slot.updateUI();
    });
}

function clearUserSlots() {
    userSlotArray.forEach(slot => {
        slot.parent = blankSlot;
        slot.clearCustoms();
        slot.element.remove();
    });

    userSlotArray.length = 0;
    clearTable();
}