import React from 'react'
import NoRepeatLogic from './noRepeatLogic';

export default function winCheck(boardValues) {
    const values = [...boardValues]
    let uniqueBlockValues=new Set();
    let uniqueColumnValues=new Set();
    let uniqueRowValues=new Set();
    let win = []

    function blockCheck(index){
        const [row,col,block] = NoRepeatLogic(index)
            for(let value of block){
                values.at(value) && uniqueBlockValues.add(values.at(value))
            }
            if(uniqueBlockValues.size === 9){
                win.push(0)
            }
            uniqueBlockValues.clear()
    }
    function rowCheck(index){
        const [row,col,block] = NoRepeatLogic(index)
            for(let value of row){
                values.at(value) && uniqueRowValues.add(values.at(value))
            }
            if(uniqueRowValues.size === 9){
                win.push(1)
            }
            uniqueRowValues.clear()

    }
    function columnCheck(index){
        const [row,col,block] = NoRepeatLogic(index)
            for(let value of col){
                values.at(value) && uniqueColumnValues.add(values.at(value))
            }
            if(uniqueColumnValues.size === 9){
                win.push(2)
            }
            uniqueColumnValues.clear()

    }
    for(let n = 0 ;n<9;n++){
        let y = Math.floor(n / 3) * 27 + (n % 3) * 3;
        blockCheck(y)
        rowCheck(n*9)
        columnCheck(n)
    }
  
    
    return win
   

}
// let y;
//         if (n === 0) y= 0;
//         if (n === 1) y= 3;
//         if (n === 2) y= 6;
//         if (n === 3) y= 27;
//         if (n >= 4 && n <= 6) y= 27 + 3 * (n - 3);
//         if (n >= 7 && n <= 8) y= 54 + 3 * (n - 6);