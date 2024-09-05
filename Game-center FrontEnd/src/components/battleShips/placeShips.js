/* eslint-disable no-loop-func */
export default function PlaceShips(ships,styles,colors) {
    let prevShipsLocation=[]
    // check for no overlaps
    function haveNoCommonElements(arr1, arr2) {
      return arr1.every(element => !arr2.includes(element));
  }
   
for(let x=0;x<ships.length;x++){
    const randomPosition= Math.round(Math.random()*99)
    const isVertical = Math.round(Math.random())
    let currentShipLocation = []
    let index = 0
    // calculate current ship positions
    for(let z=0;z<ships[x];z++){
        index = isVertical ? (randomPosition>(59) ? (randomPosition - z * 10):(randomPosition + z * 10) )
        : (randomPosition% 10 > 5 ?(randomPosition - z):(randomPosition + z));
    currentShipLocation.push(index)
    }
    if(haveNoCommonElements(currentShipLocation,prevShipsLocation)){
    prevShipsLocation =[...prevShipsLocation,...currentShipLocation]
    for(let y=0;y<ships[x];y++){   
        styles(prev => {
        const newStyles = [...prev];
        newStyles[currentShipLocation[y]] = { backgroundColor: colors[x] ,borderRadius: '25%' };
        return newStyles;
        });     
    }
    }else{
    x--;
    }
}
return prevShipsLocation
      
  
}
