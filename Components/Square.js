import React from 'react'
import "../App.css"

function Square({value, setValue}) {
    return (
        <div className="square" onClick={setValue}>{value}</div>
    )
}

export default Square
