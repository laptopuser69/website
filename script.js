document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note");
    const wordCountDisplay = document.getElementById("wordCount");
    const limitMessage = document.getElementById("limitMessage");
    const saveButton = document.getElementById("saveBtn");
    const notesList = document.getElementById("notesList");

    // Function to count words
    function countWords(text) {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    // Update word count and check the limit
    noteInput.addEventListener("input", () => {
        const words = countWords(noteInput.value);
        wordCountDisplay.textContent = `Words: ${words}`;

        if (words > 500) {
            limitMessage.textContent = "Word limit exceeded!";
            limitMessage.style.color = "red";
        } else {
            limitMessage.textContent = "";
        }
    });

    // Save the note
    saveButton.addEventListener("click", () => {
        const noteContent = noteInput.value.trim();
        const words = countWords(noteContent);

        if (words > 500) {
            alert("You cannot save more than 500 words.");
            return;
        }

        if (noteContent) {
            const listItem = document.createElement("li");
            listItem.textContent = noteContent;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "deleteBtn";
            deleteButton.onclick = () => {
                notesList.removeChild(listItem);
            };

            listItem.appendChild(deleteButton);
            notesList.appendChild(listItem);
            noteInput.value = ""; // Clear the textarea
            wordCountDisplay.textContent = "Words: 0"; // Reset word count
            limitMessage.textContent = ""; // Clear limit message
        }
    });

    // Automatically discard notes after a certain time
    let noteTimeout;
    noteInput.addEventListener("input", () => {
        clearTimeout(noteTimeout);
        noteTimeout = setTimeout(() => {
            noteInput.value = "";
            wordCountDisplay.textContent = "Words: 0";
            limitMessage.textContent = "";
        }, 30000); // 30 seconds
    });
});
