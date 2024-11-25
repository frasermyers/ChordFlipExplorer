const board = document.getElementById("board"); // Define chordboard, where you drop cards
const numberofrows = 1; // Number of rows you want in the chordboard
const barsPerRow = 4; // Number of bars you want per row
const beatsperbar = 1; // Default number of beats in a bar
const totalBars = barsPerRow * numberofrows; // Total number of bars in the chordboard

let line;


let beingDragged;


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


// Variable to store the triggering cardslot for later replacement
let triggeringSlot = null;


// Define the three colors
const colors = ['']; // Original (default color)
colors.push('#FEFAFFFF'); // First color
colors.push('#F2FFF4FF'); // Second color (gold for demonstration)



