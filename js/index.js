window.onload = function () {
    key = "C"; // Set the default key
    populateCards(SUN_CARDS); // Populate playing cards
    sunmoon = "sun"; // Set the default value (e.g., "sun" or "moon")

    // Pre-select the appropriate button based on `sunmoon`
    if (sunmoon === "sun") {
        document.getElementById("sunbutton").classList.add("selected");
    } else if (sunmoon === "moon") {
        document.getElementById("moonbutton").classList.add("selected");
    }

    // Pre-select the appropriate key button
    const keyButton = document.getElementById(`${key}-Button`);
    if (keyButton) {
        keyButton.classList.add("selected");
    }

    window.getSelection().removeAllRanges();



    document.querySelectorAll('.sunmoonbutton').forEach(button => {
    button.addEventListener('click', () => {
        // Remove "selected" class from all Sun/Moon buttons
        document.querySelectorAll('.sunmoonbutton').forEach(btn => btn.classList.remove('selected'));

        // Add "selected" class to the clicked button
        button.classList.add('selected');
    });
    });

    // Toggle Key button selected state
    document.querySelectorAll('.keybutton').forEach(button => {
        button.addEventListener('click', () => {
            // Remove "selected" class from all Key buttons
            document.querySelectorAll('.keybutton').forEach(btn => btn.classList.remove('selected'));

            // Add "selected" class to the clicked button
            button.classList.add('selected');
        });
    });

    // Add a context menu event listener to all bars
    document.querySelectorAll('.bar').forEach(bar => {
        // Initialize a custom property to track the current color index
        bar.dataset.colorIndex = 0;

        bar.addEventListener('contextmenu', function (event) {
            event.preventDefault(); // Prevent the default context menu

            // Check if the click is directly on the bar and not inside a beat or its container
            if (!event.target.closest('.beat')) {
                // Increment the color index and wrap around using modulo
                let currentIndex = parseInt(bar.dataset.colorIndex, 10);
                currentIndex = (currentIndex + 1) % colors.length;

                // Update the bar's background color and store the new index
                bar.style.backgroundColor = colors[currentIndex];
                bar.dataset.colorIndex = currentIndex;
            }
        });
    });

            // Initialize the chordboard with bars and beats
    for (let bar = 1; bar <= totalBars; bar++) {
        if ((bar - 1) % barsPerRow === 0) {
            line = document.createElement("div");
            line.classList.add("line");
            line.id = `line${Math.ceil(bar / barsPerRow)}`;
            board.appendChild(line);
        }

        const barContainer = document.createElement("div");
        barContainer.classList.add("bar");
        barContainer.id = `bar${bar}`;

        // Create a container for beats
        const beatsContainer = document.createElement("div");
        beatsContainer.classList.add("beats-container");
        beatsContainer.id = `beats-container${bar}`;

        // Create initial beats
        for (let beat = 1; beat <= beatsperbar; beat++) {
            const beatDiv = createBeat(bar, beat);
            beatsContainer.appendChild(beatDiv);
        }

        // Add the beats container to the bar
        barContainer.appendChild(beatsContainer);

        // Add + / - buttons for adding and removing beats
        const controlsContainer = document.createElement("div");
        controlsContainer.classList.add("beat-controls-container");

        // Add "plus" button
        const addBeatButton = document.createElement("button");
        addBeatButton.classList.add("add-beat-button");
        addBeatButton.innerText = "+";
        addBeatButton.onclick = () => addBeat(bar);
        controlsContainer.appendChild(addBeatButton);

        // Add "minus" button
        const removeBeatButton = document.createElement("button");
        removeBeatButton.classList.add("remove-beat-button");
        removeBeatButton.innerText = "-";
        removeBeatButton.onclick = () => removeBeat(bar);
        controlsContainer.appendChild(removeBeatButton);

        // Add controls to the bar
        barContainer.appendChild(controlsContainer);

        // Append the bar to the current line
        line.appendChild(barContainer);

         addEventListeners();
    }



};

var tsts = ["C", "C#", "D", "Eb", "E", "F", "G", "Ab", "A", "Bb", "B"];
tsts.forEach(qqq => {
    //var ssq = semitonesFromC(qqq);
    var tt = transposeChord("G", qqq);
var xxq = 1;
});

var qqq = 1;






// function dragLeave(e){
//     console.log("leaving");
//     chordsquare = e.target.id;
//     chordsquarenum = Number(chordsquare.slice(-1));
//     chordlabel = document.querySelector(`#chorddisplay${chordsquarenum}`);
//     chordlabel.innerHTML="";
//     console.log(chordlabel);
//     //document.querySelector("#chorddisplay1").innerHTML=""
// }




// function toggleCardFace(card, faces) {
//     for (let i = 0; i < faces.length; i++) {
//         const faceClass = faces[i];
//         const faceElement = card.querySelector(`.cardinner${faceClass}`);
//
//         if (faceElement && faceElement.style.display !== "none") {
//             // Hide the current face
//             faceElement.style.display = "none";
//
//             // Show the next face in the list (wrap around to the first face if at the end)
//             const nextFace = faces[(i + 1) % faces.length];
//             card.querySelector(`.cardinner${nextFace}`).style.display = "block";
//
//             // Update the current face attribute
//             card.setAttribute("data-current-face", nextFace);
//             break;
//         }
//     }
//
//     // Refresh symbols to reflect the new face
//     refreshSymbols();
// }



// function updateSymbol(card) {
//     const isFlipped = card.querySelector(".cardinner").classList.contains("flipped");
//     const visibleImage = isFlipped
//         ? card.querySelector(".cardinnerback img")
//         : card.querySelector(".cardinnerfront img");
//
//     if (visibleImage) {
//         const imageName = visibleImage.id; // Use the ID of the image as the name
//         console.log("Image name for symbol update:", imageName); // For debugging
//
//         // Get the closest .beat container that contains both .cardslot and .symbol
//         const beatContainer = card.closest(".beat");
//         if (!beatContainer) {
//             console.warn("No .beat container found for this card.");
//             return;
//         }
//
//         // Now, look for the .symbol within this beat container
//         const symbolDisplay = beatContainer.querySelector(".symbol");
//         if (symbolDisplay) {
//             const symbol = getChordSymbol(imageName);
//             symbolDisplay.innerHTML = symbol; // Display the corresponding symbol
//
//             // Change the color based on whether the card is flipped
//            // if (isFlipped) {
//                 //symbolDisplay.style.color = "black"; // Set to blue (or any color) when flipped
//        //     } else {
//                // symbolDisplay.style.color = "rgb(120, 213, 216)"; // Set to black (or any color) when not flipped
//        //     }
//
//             console.log("Updated symbol display to:", symbol); // For debugging
//         } else {
//             console.warn("Symbol display element (.symbol) not found within the beat container for the card.");
//         }
//     } else {
//         console.warn("Visible image element not found for symbol update.");
//     }
// }





/*

// Add the click event to flip the card and update the symbol
document.querySelectorAll(".playingcard").forEach(card => {
    card.addEventListener("click", function() {
        flipCard(card); // Flip the card and update the symbol on click
    });
});

*/


// function reinitializeAllCardslots() {
//     const allCardslots = document.querySelectorAll(".cardslot");
//     allCardslots.forEach(initializeCardslotDragAndDrop);
// }

