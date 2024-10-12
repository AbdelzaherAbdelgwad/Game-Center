// import './wordle.css'
export default function WordleSquare(props,{children}) {
   
  return (
    <div>
        <input 
            value ={props.value} 
            className='WordleSquare' 
            type="text" maxLength="1" 
            onChange={props.onChange} 
            disabled ={props.disabled} 
            ref={props.refs} 
            onKeyDown={props.onKeyDown}
            style={props.style}
        
        >

          {children}

        </input>
    </div>
  )
}
