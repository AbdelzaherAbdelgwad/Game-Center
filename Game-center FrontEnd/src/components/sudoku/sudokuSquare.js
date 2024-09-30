export default function SudokuSquare(props) {
   
  return (
    <input className = 'sudokuInput' maxLength={1} onChange={props.onChange} value={props.value} disabled = {props.disabled}></input>
  )
}
