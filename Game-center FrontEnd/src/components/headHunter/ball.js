export default function Ball(props) {
   
  return (
    <div className="ball" onClick={props.onBallClick } style={props.style} onMouseOver={props.hover}>
        <h2>{props.value}</h2>
    </div>
  )
}
