// Function to print the entire timetable (for testing/debugging)
function printTimetable() {
    timetable.forEach((slot, index) => {
        console.log(`Slot ${index + 1}: ${slot.label}, ${slot.room}, ${slot.colour}`);
    });
}

// Function to print all user slots
function printUserSlots() {
    userSlots.forEach((slot, index) => {
        console.log(`User Slot ${index + 1}: ${slot.label}, ${slot.room}, ${slot.colour}`);
    });
}