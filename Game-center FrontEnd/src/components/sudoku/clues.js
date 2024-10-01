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
    randomValues.forEach((_, index) => {
        const clueIndex = positions[index];
        const [clueRow, clueCol, clueBlock] = NoRepeatLogic(clueIndex);
        let newValue;
        const existingValues = new Set();
    [...clueCol,...clueBlock,...clueRow].forEach((value,_) => {
            if (positions.includes(value) && value !== clueIndex) {
                const existingValue = randomValues[positions.indexOf(value)];
                existingValues.add(existingValue); 
            }
        });
    
        
    
        do {
            newValue = Math.floor(Math.random() * 9) + 1;
        } while (existingValues.has(newValue)); 
    
        randomValues[index] = newValue; 
    });
    
  return (
    [positions,randomValues]
  )
}


