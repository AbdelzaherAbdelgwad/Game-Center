import NoRepeatLogic from "./noRepeatLogic";

export default function Clues(noOfClues) {
    let uniqueRandomPositions = Array(noOfClues).fill(null)
    let randomValues = Array(noOfClues).fill(null)
    // indexes
    uniqueRandomPositions.forEach((value,index)=>{
        let newValue;
        do {
            newValue = Math.floor(Math.random() * 81);
        } while (uniqueRandomPositions.includes(newValue));
                
        uniqueRandomPositions[index] = newValue
    })
    // values
    randomValues.forEach((_, index) => {
        const clueIndex = uniqueRandomPositions[index];
        const [clueRow, clueCol, clueBlock] = NoRepeatLogic(clueIndex);
        let newValue;
    
        const existingValues = new Set();
    
    [...clueCol,...clueBlock,...clueRow].forEach(value => {
            if (uniqueRandomPositions.includes(value) && value !== clueIndex) {
                const existingValue = randomValues[uniqueRandomPositions.indexOf(value)];
                existingValues.add(existingValue); 
            }
        });
    
        
    
        do {
            newValue = Math.floor(Math.random() * 9) + 1;
        } while (existingValues.has(newValue)); 
    
        randomValues[index] = newValue; 
    });
    
  return (
    [uniqueRandomPositions,randomValues]
  )
}
