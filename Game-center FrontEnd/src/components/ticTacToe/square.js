export default function Square(props) {
   
  return (
    <div className="Square" onClick={props.onSquareClick } style={props.style}>
        <h1>{props.value}</h1>
    </div>
  )
}
