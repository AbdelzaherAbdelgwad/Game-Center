// To determine if a given permutation of a 15-puzzle (or sliding puzzle) is solvable, you can follow these steps:

// 1- Count Inversions: An inversion is when a larger numbered tile precedes a smaller numbered tile in the list when reading from left to right, 
// ignoring the blank space.

// 2- Count Blank Row: Determine the row of the blank space (or empty tile). Rows are numbered starting from 0 at the top.
// 3- Apply the Solvability Rule: The 15-puzzle is solvable under two conditions:
//      If the blank tile is on an even row (1st or 3rd row from the bottom) and the number of inversions is odd.
//      If the blank tile is on an odd row (0th or 2nd row from the bottom) and the number of inversions is even.

export default function isSolvable(puzzle) {
        const countInversions = (arr) => {
            let inversions = 0;
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j] && arr[i] !== null && arr[j] !== null) {
                        inversions++;
                    }
                }
            }
            return inversions;
        };
        const blankRow = Math.floor(puzzle.indexOf(null) / 4); 
        const inversions = countInversions(puzzle);
        const solvable =
            (blankRow % 2 === 0 && inversions % 2 === 1) ||
            (blankRow % 2 === 1 && inversions % 2 === 0);
    
        return solvable;
    }
    
   

