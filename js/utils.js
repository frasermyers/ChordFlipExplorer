// Function to initialize drag-and-drop for cardslots
function initializeCardslotDragAndDrop(cardslot) {
    cardslot.addEventListener("dragover", dragOver);
    cardslot.addEventListener("drop", dragDrop);
    cardslot.addEventListener("dragend", dragEnd);
    cardslot.addEventListener("dragstart", dragStartOther);
    cardslot.setAttribute("draggable", false);
    cardslot.setAttribute("unselectable", true);
}

function getChord(key, imgName) {
    // Extract the label (e.g., "1 Diatonic", "2 Diatonic") from imgName
    const baseName = imgName;
    if (chordsByKey[key] && chordsByKey[key][baseName]) {
        console.log("Image name for getChord:", imgName);
        return chordsByKey[key][baseName];
    } else {
        console.warn("Chord not found for key:", key, "and imgName:", baseName);
        return null; // Return null if not found

    }
}

// Function to map image names to chord symbols using the chordsByKey table
function getChord(key, imgName) {
    if (chordsByKey[key] && chordsByKey[key][imgName]) {
        console.log("Image name for getChord:", imgName);
        return chordsByKey[key][imgName];
    } else {
        console.warn("Chord not found for key:", key, "and imgName:", imgName);
        return ""; // Return empty string if not found
    }
}



function getTransposedChord(key, imgName) {
    var chordInKeyOfC = getChord("C", imgName);
    var transposedChord = transposeChord(key, chordInKeyOfC);
    return transposedChord;
}


function keyclick(e) {
    // Update the current key based on the clicked button
    key = e.target.id.split("-")[0];

    // Update each chord display in the beat slots
    chorddisplays.forEach(chorddisplay => {
        const displayId = chorddisplay.id.match(/\d+/g); // Get beat slot identifier
        const targetbox = document.querySelector(`#chordboard${displayId}`);
        const imgElement = targetbox ? targetbox.querySelector(".imagesize") : null;
        const imgName = imgElement ? imgElement.id : null;

        if (imgName) {
            const rootChord = getChord(key, imgName); // Get the root chord for the selected key

            // Retrieve the inversion index for this card, defaulting to root position (0) if not set
            const card = targetbox.querySelector(".playingcard");
            const inversionIndex = card ? parseInt(card.dataset.inversionIndex) || 0 : 0;

            // Get the correct inversion based on the inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex] || rootChord;

            // Update the chord display in the beat slot with the inversion chord
            chorddisplay.innerHTML = inversionChord;
            console.log(`Updated chord display for beat slot ${displayId} with chord: ${inversionChord}`);
        }
    });

    // Update each chord option label in the chord start deck
    for (let i = 0; i < 7; i++) {
        const optionsymbol = document.querySelector(`#chordoptiondisplay${i + 1}`);
        const chordsquareid = document.querySelector(`#chordsquare${i + 1}`);
        const imageElement = chordsquareid ? chordsquareid.querySelector(".imagesize") : null;
        const imgName = imageElement ? imageElement.id : null;

        if (imgName) {
            const rootChord = getChord(key, imgName); // Get the root chord for the selected key

            // Retrieve the inversion index for this card, defaulting to root position (0) if not set
            const card = chordsquareid.querySelector(".playingcard");
            const inversionIndex = card ? parseInt(card.dataset.inversionIndex) || 0 : 0;

            // Get the correct inversion based on the inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex] || rootChord;

            // Update the chord option display with the inversion chord
            optionsymbol.innerHTML = inversionChord;
            console.log(`Updated chord option display for option ${i + 1} with chord: ${inversionChord}`);
        }
    }
    refreshSymbols();
}


function clearCards() {
    const cardSlots = document.querySelectorAll(".chordsquare");
    cardSlots.forEach(slot => {
        slot.innerHTML = ""; // Clear all cards within each chordsquare
    });
}
function addEventListeners() {

    sunbutton.addEventListener("click", sunclick);
    moonbutton.addEventListener("click", moonclick);

    document.querySelector("#sunbutton").classList.toggle('pressed');

    keybuttons.forEach(keybutton => {
            keybutton.addEventListener("mouseover", hoverhighlighter)
            keybutton.addEventListener("click", function (e) {
                keybuttons.forEach(btn => btn.classList.remove('pressed'));
                keyclick(e);
                keybutton.classList.toggle('pressed')
            })
            keybutton.addEventListener("mouseleave", hoverleave)
            keybutton.addEventListener("dragstart", dragStartOther)
        }
    )


    sunmoonbuttons.forEach(sunmoonbutton => {
            sunmoonbutton.addEventListener("mouseover", hoverhighlighter)
            sunmoonbutton.addEventListener("click", function (e) {
                sunmoonbuttons.forEach(btn => btn.classList.remove('pressed'));
                sunmoonbutton.classList.toggle('pressed')
            })
            sunmoonbutton.addEventListener("mouseleave", hoverleave)
            sunmoonbutton.addEventListener("dragstart", dragStartOther);
        }
    )

    squares.forEach(cardslot => {
            cardslot.addEventListener("dragover", dragOver)
            //square.addEventListener("dragleave", dragLeave)
            cardslot.addEventListener("drop", dragDrop)
            cardslot.addEventListener("dragend", dragEnd);
            cardslot.addEventListener("dragstart", dragStartOther);
            cardslot.setAttribute("draggable", false);
            cardslot.setAttribute("unselectable", true);
            cardslot.draggable = false;

        }
    )

    chordsquares.forEach(chordsquare => {
            chordsquare.addEventListener("drop", dragDrop);
            chordsquare.setAttribute("draggable", false);
            chordsquare.setAttribute("unselectable", true);
            chordsquare.addEventListener("dragstart", dragStartOther);
        }
    )
    // Event listeners for the popup images to replace the card when clicked
    popupDiatonicImage.addEventListener("click", () => replaceCardInSlot(popupDiatonicImage.src));
    popupReversedImage.addEventListener("click", () => replaceCardInSlot(popupReversedImage.src));
    popupSus2Image.addEventListener("click", () => replaceCardInSlot(popupSus2Image.src));
    popupSus4Image.addEventListener("click", () => replaceCardInSlot(popupSus4Image.src));

    // Event listener for each cardslot to open the popup with the right-click on the card
    document.querySelectorAll(".cardslot").forEach(cardslot => {
        cardslot.addEventListener("contextmenu", function(event) {
            event.preventDefault(); // Prevent the default right-click context menu
            const playingCard = cardslot.querySelector(".playingcard");
            if (playingCard) {
                showPopup(playingCard); // Show the popup for the right-clicked card
            }
        });
    });

    cardSlots.forEach(slot => {
        slot.addEventListener('drop', (event) => {
            const card = event.target.querySelector('.playingcard'); // Get the dropped card

            if (card) {
                // Temporarily disable the hover effect by adding a no-hover class
                card.classList.add('shake', 'no-hover');

                // Remove the shake and no-hover classes after the animation ends
                card.addEventListener('animationend', () => {
                    card.classList.remove('shake', 'no-hover');
                }, { once: true });
            }
        });
    });

}


function initializeCardslotDragAndDrop(cardslot) {
    cardslot.addEventListener("dragover", dragOver);
    cardslot.addEventListener("drop", dragDrop);
    cardslot.addEventListener("dragend", dragEnd);
    cardslot.addEventListener("dragstart", dragStartOther);
    cardslot.setAttribute("draggable", false);
    cardslot.setAttribute("unselectable", true);
}

// Toggle Sun/Moon button selected state


function initializeCardFaces(card) {
    const faces = ["diatonic", "reversed", "sus2", "sus4"];
    faces.forEach((faceClass, index) => {
        const faceElement = card.querySelector(`.cardinner${faceClass}`);
        if (faceElement) {
            faceElement.style.display = index === 0 ? "block" : "none"; // Show only the diatonic face initially
        }
    });

    // Set the initial visible face as "diatonic"
    card.setAttribute("data-current-face", "diatonic");
}


function refreshSymbols() {
    console.log("Starting refreshSymbols");

    const boardCardslots = document.querySelectorAll(".cardslot");

    boardCardslots.forEach(cardslot => {
        const card = cardslot.querySelector(".playingcard");
        const beatContainer = cardslot.closest(".beat");

        if (!beatContainer) {
            console.warn(`No .beat container found for cardslot: ${cardslot.id}`);
            return;
        }

        const symbolDisplay = beatContainer.querySelector(".symbol");

        if (symbolDisplay && card) {
            // Get the current face type in lowercase
            const currentFace = card.getAttribute("data-current-face").toLowerCase();
            const targetFace = card.querySelector(`.cardinner${currentFace} img`); // Find the correct img based on face type

            if (targetFace) {
                const imgName = targetFace.id; // Use the id of the image as the imgName
                console.log("IMAGE BABY: ",imgName);
                console.log("Image name for symbol update:", imgName);

                // Update symbol based on imgName
                //russell:
                const chordSymbol = getTransposedChord(key, imgName);
                //const chordSymbol = getChord(key, imgName);
                symbolDisplay.innerHTML = chordSymbol;
                console.log(`Updated symbol for ${cardslot.id}: ${chordSymbol}`);
            } else {
                symbolDisplay.innerHTML = ""; // Clear symbol if no valid image found
                console.log(`No valid image found in ${cardslot.id}, cleared symbol.`);
            }
        } else if (symbolDisplay) {
            // Clear the symbol if no card is present in the cardslot
            symbolDisplay.innerHTML = "";
            console.log(`Cleared symbol for empty cardslot: ${cardslot.id}`);
        }
    });

    console.log("Completed refreshSymbols");
}


function flatKeyMajor(key) {
    if (key.length == 1) {
        if ((key == "F") || (key == "C"))  {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return (key[1] == "b");
    }
}


function flatKeyMinor(key) {
  const minorflatkeys = ["D", "G", "C", "F", "Bb", "Eb", "Ab"];
  return minorflatkeys.includes(key);

}

function flatKey(key) {
  if (sunmoon == "sun") {
       return flatKeyMajor(key);
  }
  else if (sunmoon == "moon") {
      return flatKeyMinor(key);
  }
  else {
     throw new Error(`Unsupported sunmoon: ${sunmoon}`);
  }

}


function transposeChord(key, chord) {
    var notesSharp = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var notesFlat = ["C", "Db", "D", "Eb","E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    var chromaticScale;
    if  (flatKey(key)) {
        chromaticScale = notesFlat;
    }
    else {
        chromaticScale = notesSharp;
    }

    var numSemisFromC = chromaticScale.indexOf(key);
    // var numSemisFromC = notesFlat.indexOf(key);
    // if (numSemisFromC == -1) {
    //     numSemisFromC = notesSharp.indexOf(key);
    // }

    var chordFlavour;
    var chordRaw = chord[0];
    if ((chord.length > 1) && ((chord[1] == 'b') || (chord[1] == '#'))) {
        chordRaw += chord[1];
        chordFlavour = chord.slice(2);
    }
    else {
        chordFlavour = chord.slice(1);
    }

    // Now transpose:



    var curInd = notesFlat.indexOf(chordRaw);
    // if (curInd == -1) {
    //     curInd = notesSharp.indexOf(chordRaw);
    // }
    for (var ii = 0; ii < numSemisFromC;++ii) {
        curInd +=1;
        if (curInd >=  chromaticScale.length) {
            curInd = 0;
        }
    }
    return chromaticScale[curInd] + chordFlavour;



}





