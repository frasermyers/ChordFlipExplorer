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
};





document.onmousedown = function() {
    console.log("onmousedown");
    window.getSelection().removeAllRanges();
}


// LOADING SECTION 2: THE CHORDBOARD ------------------------------------------------------------------------------

const board = document.getElementById("board"); // Define chordboard, where you drop cards
const numberofrows = 1; // Number of rows you want in the chordboard
const barsPerRow = 4; // Number of bars you want per row
const beatsperbar = 1; // Default number of beats in a bar
const totalBars = barsPerRow * numberofrows; // Total number of bars in the chordboard

let line;

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






// Function to initialize drag-and-drop for cardslots
function initializeCardslotDragAndDrop(cardslot) {
    cardslot.addEventListener("dragover", dragOver);
    cardslot.addEventListener("drop", dragDrop);
    cardslot.addEventListener("dragend", dragEnd);
    cardslot.addEventListener("dragstart", dragStartOther);
    cardslot.setAttribute("draggable", false);
    cardslot.setAttribute("unselectable", true);
}






// POPULATOR --------------------------------------------------------------------

const SUN_CARDS = {
    reversed_imagenames: [
        "Sun1Reversed.png", "Sun2Reversed.png", "Sun3Reversed.png",
        "Sun4Reversed.png", "Sun5Reversed.png", "Sun6Reversed.png", "Sun7Reversed.png"
    ],
    diatonic_imagenames: [
        "Sun1Diatonic.png", "Sun2Diatonic.png", "Sun3Diatonic.png",
        "Sun4Diatonic.png", "Sun5Diatonic.png", "Sun6Diatonic.png", "Sun7Diatonic.png"
    ],
    sus2_imagenames: [
        "Sun1Sus2.png", "Sun2Sus2.png", "Sun3Sus2.png",
        "Sun4Sus2.png", "Sun5Sus2.png", "Sun6Sus2.png", "Sun7Sus2.png"
    ],
    sus4_imagenames: [
        "Sun1Sus4.png", "Sun2Sus4.png", "Sun3Sus4.png",
        "Sun4Sus4.png", "Sun5Sus4.png", "Sun6Sus4.png", "Sun7Sus4.png"
    ]
};

    
    const MOON_CARDS = {
        diatonic_imagenames: [
            "Moon1Diatonic.png", "Moon2Diatonic.png", "Moonb3Diatonic.png",
            "Moon4Diatonic.png", "Moon5Diatonic.png", "Moonb6Diatonic.png", "Moonb7Diatonic.png"
        ],
        reversed_imagenames: [
            "Moon1Reversed.png", "Moon2Reversed.png", "Moonb3Reversed.png",
            "Moon4Reversed.png", "Moon5Reversed.png", "Moonb6Reversed.png", "Moonb7Reversed.png"
        ],
        sus2_imagenames: [
            "Moon1Sus2.png", "Moon2Sus2.png", "Moonb3Sus2.png",
            "Moon4Sus2.png", "Moon5Sus2.png", "Moonb6Sus2.png", "Moonb7Sus2.png"
        ],
        sus4_imagenames: [
            "Moon1Sus4.png", "Moon2Sus4.png", "Moonb3Sus4.png",
            "Moon4Sus4.png", "Moon5Sus4.png", "Moonb6Sus4.png", "Moonb7Sus4.png"
        ]
    };

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
                    img.src = "cards2/" + imageSources[index][i];
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
    
    
    

    
    
    
    
     

// CONSTS --------------------------------------------------------------------------

var key = "";

var chordsByKey = 

{
    "C": {
        // Sun Scale Normal
        "Sun1Diatonic": "C",
        "Sun2Diatonic": "Dm",
        "Sun3Diatonic": "Em",
        "Sun4Diatonic": "F",
        "Sun5Diatonic": "G",
        "Sun6Diatonic": "Am",
        "Sun7Diatonic": "",

        // Sun Scale Inverse
        "Sun1Reversed": "Cm",
        "Sun2Reversed": "D",
        "Sun3Reversed": "E",
        "Sun4Reversed": "Fm",
        "Sun5Reversed": "Gm",
        "Sun6Reversed": "A",
        "Sun7Reversed": "B",

        // Sun Scale Sus2
        "Sun1Sus2": "Csus2",
        "Sun2Sus2": "Dsus2",
        "Sun3Sus2": "Esus2",
        "Sun4Sus2": "Fsus2",
        "Sun5Sus2": "Gsus2",
        "Sun6Sus2": "Asus2",

        // Sun Scale Sus4
        "Sun1Sus4": "Csus4",
        "Sun2Sus4": "Dsus4",
        "Sun3Sus4": "Esus4",
        "Sun4Sus4": "Fsus4",
        "Sun5Sus4": "Gsus4",
        "Sun6Sus4": "Asus4",

        // Moon Scale Normal
        "Moon1Diatonic": "Cm",
        "Moon2Diatonic": "",
        "Moonb3Diatonic": "Eb",
        "Moon4Diatonic": "Fm",
        "Moon5Diatonic": "Gm",
        "Moonb6Diatonic": "Ab",
        "Moonb7Diatonic": "Bb",

        // Moon Scale Inverse
        "Moon1Maj": "C",
        "Moon2Maj": "D",
        "Moonb3Min": "Ebm",
        "Moon4Maj": "F",
        "Moon5Maj": "G",
        "Moonb6Min": "Abm",
        "Moonb7Min": "Bbm",

        // Moon Scale Sus2
        "Moon1Sus2": "Csus2",
        "Moon2Sus2": "Dsus2",
        "Moonb3Sus2": "Ebsus2",
        "Moon4Sus2": "Fsus2",
        "Moon5Sus2": "Gsus2",
        "Moonb6Sus2": "Absus2",
        "Moonb7Sus2": "Bbsus2",

        // Moon Scale Sus4
        "Moon1Sus4": "Csus4",
        "Moon2Sus4": "Dsus4",
        "Moonb3Sus4": "Ebsus4",
        "Moon4Sus4": "Fsus4",
        "Moon5Sus4": "Gsus4",
        "Moonb6Sus4": "Absus4",
        "Moonb7Sus4": "Bbsus4"
    }
}

const chordInversions = {
    "C": ["C", "C/E", "C/G"],
    "Dm": ["Dm", "Dm/F", "Dm/A"],
    "Em": ["Em", "Em/G", "Em/B"],
    "F": ["F", "F/A", "F/C"],
    "G": ["G", "G/B", "G/D"],
    "Am": ["Am", "Am/C", "Am/E"],
    "Bo": ["Bo", "Bo/D", "Bo/F"],

    "Cm": ["Cm", "Cm/Eb", "Cm/G"],
    "Do": ["Do", "Do/F", "Do/Ab"],
    "Eb": ["Eb", "Eb/G", "Eb/Bb"],
    "Fm": ["Fm", "Fm/Ab", "Fm/C"],
    "Gm": ["Gm", "Gm/Bb", "Gm/D"],
    "Ab": ["Ab", "Ab/C", "Ab/Eb"],
    "Bb": ["Bb", "Bb/D", "Bb/F"],

    "C#": ["C#", "C#/F", "C#/G#"],
    "D#m": ["D#m", "D#m/F#", "D#m/A#"],
    "E#m": ["E#m", "E#m/G#", "E#m/B"],
    "F#": ["F#", "F#/A#", "F#/C#"],
    "G#": ["G#", "G#/C", "G#/D#"],
    "A#m": ["A#m", "A#m/C#", "A#m/F"],
    "B#o": ["B#o", "B#o/D#", "B#o/G#"],

    "C#m": ["C#m", "C#m/E", "C#m/G#"],
    "D#o": ["D#o", "D#o/F#", "D#o/A"],
    "E": ["E", "E/G#", "E/B"],
    "F#m": ["F#m", "F#m/A", "F#m/C#"],
    "G#m": ["G#m", "G#m/B", "G#m/D#"],
    "A": ["A", "A/C#", "A/E"],
    "B": ["B", "B/D#", "B/F#"],

    "D": ["D", "D/F#", "D/A"],
    "Bm": ["Bm", "Bm/D", "Bm/F#"],
    "C#o": ["C#o", "C#o/E", "C#o/G"],

    "Eo": ["Eo", "Eo/G", "Eo/Bb"],
    "Gb": ["Gb", "Gb/Bb", "Gb/Db"],
    "Bbm": ["Bbm", "Bbm/Db", "Bbm/F"],
    "Cb": ["Cb", "Cb/Eb", "Cb/Gb"],
    "Db": ["Db", "Db/F", "Db/Ab"],

    "E": ["E", "E/G#", "E/B"],
    "F#o": ["F#o", "F#o/A", "F#o/C"],
    "Ao": ["Ao", "Ao/C", "Ao/E"],

    "F#": ["F#", "F#/A#", "F#/C#"],
    "G#m": ["G#m", "G#m/B", "G#m/D#"],
    "E#o": ["E#o", "E#o/G#", "E#o/B"],

    "G": ["G", "G/B", "G/D"],
    "Am": ["Am", "Am/C", "Am/E"],
    "F#o": ["F#o", "F#o/A", "F#o/C"],

    "Abm": ["Abm", "Abm/Cb", "Abm/Eb"],
    "Bbo": ["Bbo", "Bbo/Db", "Bbo/F"],

    "A": ["A", "A/C#", "A/E"],
    "Bm": ["Bm", "Bm/D", "Bm/F#"],
    "G#o": ["G#o", "G#o/B", "G#o/D"],
    "Bo": ["Bo", "Bo/D", "Bo/F"],
    "Dbm": ["Dbm", "Dbm/Fb", "Dbm/Ab"],
    
    "Ab": ["Ab", "Ab/C", "Ab/Eb"],
    "B": ["B", "B/D#", "B/F#"],
    "C#m": ["C#m", "C#m/E", "C#m/G#"],
    "A#o": ["A#o", "A#o/C#", "A#o/E"],
    "C#o": ["C#o", "C#o/E", "C#o/G"],
};






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

// EVENT LISTENERS ---------------------------------------------------------------



sunbutton.addEventListener("click", sunclick);
moonbutton.addEventListener("click", moonclick);

document.querySelector("#sunbutton").classList.toggle('pressed');

keybuttons.forEach(keybutton => {
    keybutton.addEventListener("mouseover",hoverhighlighter)
    keybutton.addEventListener("click", function(e) {
        keybuttons.forEach(btn => btn.classList.remove('pressed'));
        keyclick(e);
        keybutton.classList.toggle('pressed')})
    keybutton.addEventListener("mouseleave",hoverleave)
    keybutton.addEventListener("dragstart", dragStartOther)
}

)


sunmoonbuttons.forEach(sunmoonbutton => {
    sunmoonbutton.addEventListener("mouseover",hoverhighlighter)
    sunmoonbutton.addEventListener("click", function(e) {
        sunmoonbuttons.forEach(btn => btn.classList.remove('pressed'));
        sunmoonbutton.classList.toggle('pressed')})
    sunmoonbutton.addEventListener("mouseleave",hoverleave)
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



// ACTIONS -----------------------------------------------------------------------

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


function dragLeave(e){
    console.log("leaving");
    chordsquare = e.target.id;
    chordsquarenum = Number(chordsquare.slice(-1));
    chordlabel = document.querySelector(`#chorddisplay${chordsquarenum}`);
    chordlabel.innerHTML="";
    console.log(chordlabel);
    //document.querySelector("#chorddisplay1").innerHTML=""
}

function clearCards() {
    const cardSlots = document.querySelectorAll(".chordsquare");
    cardSlots.forEach(slot => {
        slot.innerHTML = ""; // Clear all cards within each chordsquare
    });
}

function sunclick() {
    clearCards();          // Clear existing cards
    sunmoon = "sun";
    populateCards(SUN_CARDS); // Load Sun cards
}

function moonclick() {
    clearCards();          // Clear existing cards
    sunmoon = "moon";
    console.log(sunmoon);
    populateCards(MOON_CARDS); // Load Moon cards
}



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

function toggleCardFace(card, faces) {
    for (let i = 0; i < faces.length; i++) {
        const faceClass = faces[i];
        const faceElement = card.querySelector(`.cardinner${faceClass}`);
        
        if (faceElement && faceElement.style.display !== "none") {
            // Hide the current face
            faceElement.style.display = "none";

            // Show the next face in the list (wrap around to the first face if at the end)
            const nextFace = faces[(i + 1) % faces.length];
            card.querySelector(`.cardinner${nextFace}`).style.display = "block";

            // Update the current face attribute
            card.setAttribute("data-current-face", nextFace);
            break;
        }
    }
    
    // Refresh symbols to reflect the new face
    refreshSymbols();
}


function hoverhighlighter (e){
    e.target.classList.add("hoverhighlighter")}

function hoverclick (e) {
    e.target.classList.remove("hoverhighlighter")
    console.log("poo")}

function hoverleave(e){
    e.target.classList.remove("hoverhighlighter")}

let beingDragged

function dragStart (e) {

    console.log("Drag starting. Drag target class is: " + e.target.className + " id is: " + e.target.id);
    beingDragged = e.target;

       // Remove hover effect class to avoid interference during drag
       beingDragged.classList.remove('hoverhighlighter');


}

function dragStartOther(e) {
    console.log("something else is being dragged. It is: " + e.target.className+ "id is: " + e.target.id);
}

function dragging(e){

}

function dragOver (e) {
   e.preventDefault()
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
                const chordSymbol = getChord(key, imgName);
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












function dragDrop(e) {
    if (beingDragged == null) {
        console.log("Nothing being dragged");
        return;
    }

    console.log("Being dragged class: " + beingDragged.className + " id: " + beingDragged.id);
    console.log("Dropping target class: " + e.target.className + " id: " + e.target.id);

    let targetSquare = e.target.closest('.cardslot, .trashcan');

    if (targetSquare && targetSquare.classList.contains("cardslot")) {
        // Move the dragged element to the new cardslot
        targetSquare.innerHTML = "";      // Clear the targetSquare content
        targetSquare.append(beingDragged); // Move the card to the targetSquare

        // Extract the bar and beat from data-box attribute
        const boxId = targetSquare.dataset.box;
        const [bar, beat] = boxId.match(/\d+/g); // Extracts bar and beat numbers

        // Find the corresponding .symbol element based on the bar and beat
        const symbolDisplay = document.getElementById(`chorddisplay${bar}${beat}`);
        /*
        if (symbolDisplay) {
            // Add the highlight animation class
            // symbolDisplay.classList.add('symbol-highlight');

            // Remove the class after the animation ends so it can be reused
            symbolDisplay.addEventListener('animationend', () => {
                symbolDisplay.classList.remove('symbol-highlight');
            }, { once: true });
        }*/

        // Update the symbol based on the placed card
        const isFlipped = beingDragged.querySelector(".cardinner").classList.contains("flipped");
        const visibleImage = isFlipped 
            ? beingDragged.querySelector(".cardinnerback img") 
            : beingDragged.querySelector(".cardinnerfront img");

        var imgName = visibleImage ? visibleImage.id : null;

        if (imgName) {
            symbolDisplay.innerHTML = getChord(key, imgName);
        }
        
        beingDragged = null;  // Clear the dragged element reference after moving
    }

    // Clear chord displays for all chord squares in the bottom chord options
    chordsquares.forEach(chordsquare => {
        chordsquare.innerHTML = "";
    });

    e.target.classList.remove("highlight");

    // Repopulate cards in the chord options based on sun/moon mode
    if (sunmoon === "moon") {
        populateCards(MOON_CARDS);
    } else {
        populateCards(SUN_CARDS);
    }

    // Refresh all symbols on the chordboard after the drop
    refreshSymbols(); // Update all symbols based on their corresponding cards
}








function dragEnd (e) {
    beingDragged = null;
}






/*
// Function to rotate the card within a cardslot and update chord symbol
function rotateCardInCardSlot(cardslot) {
    // Find a card inside the cardslot
    const card = cardslot.querySelector(".playingcard");

    if (card) {
        // Get the current rotation position (0, 90, or 180), defaulting to 0 if not set
        let currentRotation = parseInt(card.dataset.rotation) || 0;

        // Cycle through three positions: 0 -> 90 -> 180 -> back to 0
        if (currentRotation === 0) {
            currentRotation = 90;
        } else if (currentRotation === 90) {
            currentRotation = 180;
        } else {
            currentRotation = 0; // Reset to upright after 180
        }

        // Apply the new rotation to the card
        card.style.transform = `rotate(${currentRotation}deg)`;
        
        // Update the data attribute to store the current rotation
        card.dataset.rotation = currentRotation;

        // Calculate and store the inversion index in the card's dataset
        const inversionIndex = currentRotation / 90;
        card.dataset.inversionIndex = inversionIndex;

        // Get the descriptive chord name from the card image (e.g., "Sun 1 Maj")
        const imgElement = card.querySelector(".imagesize");
        if (imgElement) {
            const descriptiveChordName = imgElement.id; // e.g., "Sun 1 Maj"

            // Use getChord to fetch the actual root chord based on the key and descriptive name
            const rootChord = getChord(key, descriptiveChordName);
            console.log("Root chord:", rootChord);

            // Look up the chord inversion based on root chord and inversion index
            const inversionChord = chordInversions[rootChord]?.[inversionIndex];
            console.log("Inversion chord:", inversionChord);

            // Extract bar and beat numbers directly from the cardslot's dataset
            const [bar, beat] = cardslot.dataset.box.match(/\d+/g); // Extract bar and beat numbers

            // Find the symbol display element based on the bar and beat numbers
            const chordDisplay = document.getElementById(`chorddisplay${bar}${beat}`);
            
            if (chordDisplay) {
                // Update the display with the new inversion chord
                console.log(`Updating chord display for bar ${bar}, beat ${beat} with chord: ${inversionChord}`);
                chordDisplay.innerHTML = inversionChord;
            } else {
                console.warn(`Chord display element not found for bar ${bar}, beat ${beat}`);
            }
        } else {
            console.warn("No image element found in this card to identify root chord");
        }
    } else {
        console.warn("No card found in this cardslot");
    }
}*/




/*

// Add event listeners to all squares within the chordboard
const boardsquares = document.querySelectorAll("#chordboard .cardslot");
boardsquares.forEach(cardslot => {
    cardslot.addEventListener("click", function() {
        rotateCardInCardSlot(cardslot);
    });
});

*/

/*
card.addEventListener("click", function() {
    flipCard(card); // Call flipCard function when the card is clicked
});

*/

/*

// Function to flip the card and update the symbol based on the visible side
function flipCard(card) {
    const cardInner = card.querySelector(".cardinner");
    if (cardInner) {
        cardInner.classList.toggle("flipped"); // Toggle the flipped class

        // Delay to wait for the flip animation to complete (adjust as needed)
        setTimeout(() => {
            updateSymbol(card); // Call the symbol update function after flip
        }, 0); // Adjust delay time as needed based on animation duration
    }
}

*/

function updateSymbol(card) {
    const isFlipped = card.querySelector(".cardinner").classList.contains("flipped");
    const visibleImage = isFlipped 
        ? card.querySelector(".cardinnerback img") 
        : card.querySelector(".cardinnerfront img");

    if (visibleImage) {
        const imageName = visibleImage.id; // Use the ID of the image as the name
        console.log("Image name for symbol update:", imageName); // For debugging

        // Get the closest .beat container that contains both .cardslot and .symbol
        const beatContainer = card.closest(".beat");
        if (!beatContainer) {
            console.warn("No .beat container found for this card.");
            return;
        }
        
        // Now, look for the .symbol within this beat container
        const symbolDisplay = beatContainer.querySelector(".symbol");
        if (symbolDisplay) {
            const symbol = getChordSymbol(imageName);
            symbolDisplay.innerHTML = symbol; // Display the corresponding symbol

            // Change the color based on whether the card is flipped
           // if (isFlipped) {
                //symbolDisplay.style.color = "black"; // Set to blue (or any color) when flipped
       //     } else {
               // symbolDisplay.style.color = "rgb(120, 213, 216)"; // Set to black (or any color) when not flipped
       //     }

            console.log("Updated symbol display to:", symbol); // For debugging
        } else {
            console.warn("Symbol display element (.symbol) not found within the beat container for the card.");
        }
    } else {
        console.warn("Visible image element not found for symbol update.");
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


/*

// Add the click event to flip the card and update the symbol
document.querySelectorAll(".playingcard").forEach(card => {
    card.addEventListener("click", function() {
        flipCard(card); // Flip the card and update the symbol on click
    });
});

*/
// Select the modal and close button

// Select the modal, images, and popup container elements
const cardPopup = document.getElementById("cardPopup");
const popupDiatonicImage = document.getElementById("popupDiatonicImage");
const popupReversedImage = document.getElementById("popupReversedImage");
const popupSus2Image = document.getElementById("popupSus2Image");
const popupSus4Image = document.getElementById("popupSus4Image");

// Variable to store the triggering cardslot for later replacement
let triggeringSlot = null;

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

// Close the popup when clicking outside the popup content
window.onclick = function(event) {
    if (event.target === cardPopup) {
        hidePopup();
    }
};

// Select all the card slots
const cardSlots = document.querySelectorAll('.cardslot');

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

function initializeCardslotDragAndDrop(cardslot) {
    cardslot.addEventListener("dragover", dragOver);
    cardslot.addEventListener("drop", dragDrop);
    cardslot.addEventListener("dragend", dragEnd);
    cardslot.addEventListener("dragstart", dragStartOther);
    cardslot.setAttribute("draggable", false);
    cardslot.setAttribute("unselectable", true);
}

function reinitializeAllCardslots() {
    const allCardslots = document.querySelectorAll(".cardslot");
    allCardslots.forEach(initializeCardslotDragAndDrop);
}

// Toggle Sun/Moon button selected state
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

// Define the three colors
const colors = ['']; // Original (default color)
colors.push('#FEFAFFFF'); // First color
colors.push('#F2FFF4FF'); // Second color (gold for demonstration)

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
















