import React, { useState } from 'react'
import "./Numeric.css";

const Numeric = (props) => {
    const [count, setValue] = useState(props.defaultValue)

    return (
        <div className="numeric">
            <button className="button" name="up" onClick={() => { setValue(count - 1); props.changeValue(count - 1) }} disabled={count === props.min}>-</button>
            <input type="number" value={count} readOnly></input>
            <button className="button" name="down" onClick={() => { setValue(count + 1); props.changeValue(count + 1) }} disabled={count === props.max}>+</button>
        </div>
    )

}

export default Numeric
