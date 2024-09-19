export default function Ball(props) {
   
  return (
    <div className="ball" onClick={props.onBallClick } style={props.style} onMouseOver={props.hover}>
        <h1>{props.value}</h1>
    </div>
  )
}
