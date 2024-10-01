import NoRepeatLogic from "./noRepeatLogic";

export default function Clues(noOfClues) {
    // Generate unique random positions
    let randomValues = Array(noOfClues).fill(null)

    const uniqueRandomPositions = new Set();
    while (uniqueRandomPositions.size < noOfClues) {
        uniqueRandomPositions.add(Math.floor(Math.random() * 81));
    }
    const positionsArray = Array.from(uniqueRandomPositions);

    // Generate values for each position
     randomValues = positionsArray.map(clueIndex => {
        const [clueRow, clueCol, clueBlock] = NoRepeatLogic(clueIndex);
        const existingValues = new Set();

        // Collect existing values in the same row, column, and block
        [...clueRow, ...clueCol, ...clueBlock].forEach(value => {
            if (positionsArray.includes(value) && value !== clueIndex) {
                const existingValue = randomValues[positionsArray.indexOf(value)];
                if (existingValue) existingValues.add(existingValue);
            }
        });

        // Generate a new unique value
        let newValue;
        do {
            newValue = Math.floor(Math.random() * 9) + 1;
        } while (existingValues.has(newValue));

        return newValue;
    });

    return [positionsArray, randomValues];
}