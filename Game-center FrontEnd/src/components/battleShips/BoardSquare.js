export default function Square(props) {
   
  return (
    <div className="BattleShipSquare" onClick={props.onSquareClick} style={props.style} ref={props.refs}>
        <h1>{props.value}</h1>
    </div>
  )
}
