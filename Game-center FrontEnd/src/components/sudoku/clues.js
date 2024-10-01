import NoRepeatLogic from "./noRepeatLogic";

export default function Clues(noOfClues) {
    let randomValues = Array(noOfClues).fill(null)
    // indexes
    let uniqueRandomPositions = new Set();
    while (uniqueRandomPositions.size < noOfClues) {
        uniqueRandomPositions.add(Math.floor(Math.random() * 81));
    }
    let positions = [...uniqueRandomPositions]
    // values
    // Efficient Sudoku Fill
randomValues.forEach((_, index) => {
    const clueIndex = positions[index];
    const [clueRow, clueCol, clueBlock] = NoRepeatLogic(clueIndex);
    
    // Create a set of existing values
    const existingValues = new Set();
    const allClueValues = [...clueRow, ...clueCol, ...clueBlock];

    allClueValues.forEach(value => {
        if (positions.includes(value) && value !== clueIndex) {
            const existingValue = randomValues[positions.indexOf(value)];
            existingValues.add(existingValue);
        }
    });

    // Create a list of possible values (1-9)
    const possibleValues = Array.from({ length: 9 }, (_, i) => i + 1)
                               .filter(value => !existingValues.has(value));
    
    // Randomly assign a value from the filtered possible values
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    randomValues[index] = possibleValues[randomIndex];
});

    
  return (
    [positions,randomValues]
  )
}


