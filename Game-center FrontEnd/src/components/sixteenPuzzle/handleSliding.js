export default async function handleSliding(setBoardValues,index) {
    
        if (0 < index && index < 6){
           await setBoardValues(prev=>{
            let newValues = [...prev]
            const offset = index - 1;
            for (let i = 0; i < 3; i++) {
                newValues[offset + 4*i] = prev[offset+ 4*(i+1)];
            }
            newValues[offset + 12] = prev[offset]
            return newValues
           }) 
        }

        if (index >30){
            await setBoardValues(prev=>{
            let newValues = [...prev]
            const offset = index - 19;
            for (let i = 0; i < 3; i++) {
                newValues[offset - 4*i] = prev[offset - 4*(i+1)];
            }
            newValues[offset - 12] = prev[offset]
            return newValues
           }) 
        }

        if ( index%6 === 0 ){
            await setBoardValues(prev=>{
            let newValues = [...prev]
            let offset;
            for (let i = 0; i < 3; i++) {
                offset = (index/2 + i +(index/6))-4
                newValues[offset] = prev[offset + 1];
            }
           newValues[offset+1] = prev[offset-2]
           return newValues
           }) 
        }

        if ( (index + 1)%6 === 0 ){
            let offset;
            if(index === 11){
                offset = 0;
            }else if(index === 17){
                offset = 4;
            }else if(index === 23){
                offset = 8;
            }else if(index === 29){
                offset = 12;
            }
            await setBoardValues(prev=>{
            let newValues = [...prev]
            for (let i = 0; i < 3; i++) {
                newValues[offset+1+i] = prev[offset+i]
            }
            newValues[offset] = prev[offset+3]
           return newValues
           }) 
        }

    }
    /* 
    
    */

