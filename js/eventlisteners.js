document.onmousedown = function() {
    console.log("onmousedown");
    window.getSelection().removeAllRanges();
}

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

function hoverhighlighter (e){
    e.target.classList.add("hoverhighlighter")}

function hoverclick (e) {
    e.target.classList.remove("hoverhighlighter")
    console.log("poo")}

function hoverleave(e){
    e.target.classList.remove("hoverhighlighter")}



// Close the popup when clicking outside the popup content
window.onclick = function(event) {
    if (event.target === cardPopup) {
        hidePopup();
    }
};


