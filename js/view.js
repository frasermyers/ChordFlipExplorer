const optiondisplays = document.querySelectorAll(".chord-option-display");


// cardslot in Chord Placement Area
const squares = document.querySelectorAll(".cardslot");

// Chords in Chord Start Deck Area
const chordsquares = document.querySelectorAll(".chordsquare")


const keybuttons = document.querySelectorAll(".keybutton")
    const Cbutton = document.querySelector("#Cbutton")
    const Gbutton = document.querySelector("#Gbutton")

// SCALE BUTTONS
const sunmoonbuttons  = document.querySelectorAll(".sunmoonbutton")
    // Major Scale Button
    const sunbutton = document.querySelector("#sunbutton")
    // Minor Scale Button
    const moonbutton = document.querySelector("#moonbutton")

const chorddisplays = document.querySelectorAll(".symbol");

// Select the modal, images, and popup container elements
const cardPopup = document.getElementById("cardPopup");
const popupDiatonicImage = document.getElementById("popupDiatonicImage");
const popupReversedImage = document.getElementById("popupReversedImage");
const popupSus2Image = document.getElementById("popupSus2Image");
const popupSus4Image = document.getElementById("popupSus4Image");


const cardSlots = document.querySelectorAll('.cardslot');

    function populateCards(cardSet) {
        const {
            diatonic_imagenames = [],
            reversed_imagenames = [],
            sus2_imagenames = [],
            sus4_imagenames = []
        } = cardSet;

        const isSun = cardSet === SUN_CARDS;

        for (let i = 0; i < 7; i++) {
            // Create card container
            let card = document.createElement('div');
            card.classList.add("playingcard");
            card.id = "playingcard-" + (i + 1);
            card.setAttribute("unselectable", true);

            // Check if this card should be transparent and uninteractable
            const isTransparentCard = (isSun && i === 6) || (!isSun && i === 1);

            if (!isTransparentCard) {
                card.setAttribute("draggable", true);
                card.addEventListener("drag", dragging);
                card.addEventListener("dragstart", dragStart);
            } else {
                card.style.opacity = "0.08";
                card.style.pointerEvents = "none";
            }

            // Create inner card structure
            let cardinner = document.createElement('div');
            cardinner.classList.add("cardinner");

            const faces = ["diatonic", "reversed", "sus2", "sus4"];
            const imageSources = [diatonic_imagenames, reversed_imagenames, sus2_imagenames, sus4_imagenames];

            faces.forEach((face, index) => {
                let cardFace = document.createElement('div');
                cardFace.classList.add(`cardinner${face}`, "cardface");

                let img = document.createElement('img');
                img.classList.add("imagesize");
                img.setAttribute("unselectable", true);
                img.setAttribute("draggable", false);

                // Set image source if available
                if (imageSources[index][i]) {
                    img.src = "img/cards2/" + imageSources[index][i];
                    img.setAttribute("id", imageSources[index][i].split(".png")[0]);
                } else {
                    img.src = "placeholder.png"; // Optional: use a placeholder if image is missing
                }

                cardFace.appendChild(img);
                cardinner.appendChild(cardFace);
            });

            card.appendChild(cardinner);

            // Initialize the card faces so only diatonic face is visible
            initializeCardFaces(card);

            let mydiv = document.querySelector("#chordsquare" + (i + 1));
            mydiv.appendChild(card);

            let cardChildren = card.getElementsByTagName("*");
            for (let ii = 0; ii < cardChildren.length; ++ii) {
                cardChildren[ii].draggable = false;
                cardChildren[ii].unselectable = true;
            }

            let optionsymbol = document.querySelector("#chordoptiondisplay" + (i + 1));
            let imgElement = card.querySelector(".imagesize");
            let imgName = imgElement ? imgElement.id : null;
            optionsymbol.innerHTML = getChord(key, imgName);
        }
    }



// Function to create a beat element
function createBeat(bar, beat) {
    const beatDiv = document.createElement("div");
    beatDiv.classList.add("beat");
    beatDiv.id = `bar${bar}beat${beat}`;

    const chordDisplay = document.createElement("div");
    chordDisplay.classList.add("symbol");
    chordDisplay.id = `chorddisplay${bar}${beat}`;

    const cardslot = document.createElement("div");
    cardslot.classList.add("cardslot");
    cardslot.id = `chordboard${bar}${beat}`;
    cardslot.dataset.box = `bar${bar}beat${beat}`;

    // Initialize drag-and-drop functionality for the cardslot
    initializeCardslotDragAndDrop(cardslot);

    beatDiv.appendChild(chordDisplay);
    beatDiv.appendChild(cardslot);

    return beatDiv;
}

function addBeat(barId) {
    const beatsContainer = document.getElementById(`beats-container${barId}`);
    const currentBeats = beatsContainer.children.length;

    // Prevent adding more than 8 beats
    if (currentBeats < 2) {
        const newBeat = createBeat(barId, currentBeats + 1);
        beatsContainer.appendChild(newBeat);

        // Enable the "-" button if it was disabled
        const removeButton = document.querySelector(`#bar${barId} .remove-beat-button`);
        if (removeButton) {
            removeButton.disabled = false;
        }

        // Disable the "+" button if max beats are reached
        if (currentBeats + 1 === 2) {
            const addButton = document.querySelector(`#bar${barId} .add-beat-button`);
            if (addButton) {
                addButton.disabled = true;
            }
        }
    } else {
        alert("2 beats max!");
    }
}

function removeBeat(barId) {
    const beatsContainer = document.getElementById(`beats-container${barId}`);
    const currentBeats = beatsContainer.children.length;

    // Prevent removing the last beat
    if (currentBeats > 1) {
        beatsContainer.removeChild(beatsContainer.lastChild);

        // Enable the "+" button if it was disabled
        const addButton = document.querySelector(`#bar${barId} .add-beat-button`);
        if (addButton) {
            addButton.disabled = false;
        }

        // Disable the "-" button if only one beat remains
        if (currentBeats - 1 === 1) {
            const removeButton = document.querySelector(`#bar${barId} .remove-beat-button`);
            if (removeButton) {
                removeButton.disabled = true;
            }
        }
    } else {
        alert("You must have at least one beat in the bar!");
    }
}


// Function to show the popup with the images of the clicked card
function showPopup(card) {
    // Store the triggering cardslot where the card was clicked
    triggeringSlot = card.closest(".cardslot");

    // Get the images from the different faces of the card
    const diatonicImage = card.querySelector(".cardinnerdiatonic img");
    const reversedImage = card.querySelector(".cardinnerreversed img");
    const sus2Image = card.querySelector(".cardinnersus2 img");
    const sus4Image = card.querySelector(".cardinnersus4 img");

    // Set the source for each popup image
    popupDiatonicImage.src = diatonicImage ? diatonicImage.src : "";
    popupReversedImage.src = reversedImage ? reversedImage.src : "";
    popupSus2Image.src = sus2Image ? sus2Image.src : "";
    popupSus4Image.src = sus4Image ? sus4Image.src : "";

    // Display the popup
    cardPopup.classList.remove("hidden");
    cardPopup.classList.add("visible");
}

// Function to hide the popup
function hidePopup() {
    cardPopup.classList.remove("visible");
    cardPopup.classList.add("hidden");
    triggeringSlot = null; // Clear the triggering slot after hiding
}

function replaceCardInSlot(newImageSrc) {
    if (triggeringSlot) {
        const card = triggeringSlot.querySelector(".playingcard");
        const cardInner = card.querySelector(".cardinner");

        // Hide all card faces within cardInner
        const cardFaces = cardInner.querySelectorAll(".cardface");
        cardFaces.forEach(face => {
            face.style.display = "none";
        });

        // Extract face type from newImageSrc
        const faceType = newImageSrc.match(/(Reversed|Diatonic|Sus2|Sus4)/)?.[0].toLowerCase();

        // Display the matched face and update its image
        let targetFace = null;
        cardFaces.forEach(face => {
            if (face.classList.contains(`cardinner${faceType}`)) {
                targetFace = face;
            }
        });

        if (targetFace) {
            const imgElement = targetFace.querySelector("img");
            imgElement.src = newImageSrc; // Update the image source
            targetFace.style.display = "block"; // Make the selected face visible
            card.setAttribute("data-current-face", faceType); // Update current face attribute
        }

        // Find the corresponding .symbol and animate it
        const boxId = triggeringSlot.dataset.box;
        const [bar, beat] = boxId.match(/\d+/g);
        const symbolDisplay = document.getElementById(`chorddisplay${bar}${beat}`);

        if (symbolDisplay) {
            // Check if newImageSrc contains "Reversed" specifically
            if (newImageSrc.includes("Reversed")) {
                // Add a border to the cardslot and change symbol text color only for Reversed faces
                triggeringSlot.classList.add("highlight-border");
                symbolDisplay.classList.add("highlight-border");

                // Apply symbol animation only if it is Reversed
                symbolDisplay.classList.remove('symbol-highlight');
                void symbolDisplay.offsetWidth; // Trigger reflow to restart the animation
                symbolDisplay.classList.add('symbol-highlight');

                // Apply different strength of highlight based on key presence
                const highlightClass = key ? 'symbol-highlight-strong' : 'symbol-highlight-soft';
                symbolDisplay.classList.add(highlightClass);

                // Remove highlight class after animation
                setTimeout(() => {
                    symbolDisplay.classList.remove(highlightClass);
                }, 500); // Match duration to CSS animation
            } else {
                // Remove the border and set symbol text color to default if not "Reversed"
                triggeringSlot.classList.remove("highlight-border");
                symbolDisplay.classList.remove("highlight-border"); // Resets to default CSS color
            }
        }

        hidePopup(); // Close the popup after replacing the image
        refreshSymbols(); // Update symbols based on the new visible image in the cardslot
    }
}





