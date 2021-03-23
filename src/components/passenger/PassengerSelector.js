import React, { Fragment, useState } from 'react'
import Numeric from '../helper/Numeric'
import { useDispatch, useSelector } from 'react-redux'
import { setAdult, setChild, setInfant, flightSelector } from '../../slices/flight'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const PassengerSelector = (props) => {
    const [display, showDetails] = useState(false)
    const dispatch = useDispatch()
    const { adult, child, infant } = useSelector(flightSelector)

    const handlerAdult = (value) => {
        dispatch(setAdult(value))
    }

    const handlerChild = (value) => {
        dispatch(setChild(value))
    }

    const handlerInfant = (value) => {
        dispatch(setInfant(value))
    }

    let passengerSelector;

    if (display) {
        passengerSelector = (
            <div class="item-list">
                <Item name="Adult" defaultValue={adult} details="" min={1} max={40} changeValue={handlerAdult} />
                <Item name="Children" defaultValue={child} details="(2 to 11 Years )" min={0} max={40} changeValue={handlerChild} />
                <Item name="Infant" defaultValue={infant} details="(0 to 2 Years)" min={0} max={40} changeValue={handlerInfant} />
            </div>
        );
    }

    return (
        <Fragment>
            <button type="button"
                class="passenger-button"
                name={props.name}
                value={props.name}
                onClick={() => showDetails(!display)}>

                <span class="passenger-label">
                    <span class="fake-label">Passengers of travel</span>
                    {adult} adults
                    {!child || <>, {child} child </>}
                    {!infant || <>, {infant} infant </>}
                </span>

                {/* <span>
                    {
                        display ?
                            <FontAwesomeIcon icon={faAngleUp} className="icon" /> :
                            <FontAwesomeIcon icon={faAngleDown} className="icon" />
                    }
                </span> */}
            </button>
            {passengerSelector}
        </Fragment>
    )
}

const Item = (props) => {
    return (
        <div className="item-selector">
            <div className="col-md-5 item-title">{props.name}
                <br /> <span className="item-details">{props.details}</span>
            </div>
            <div className="col-md-1">
                <Numeric
                    defaultValue={props.defaultValue}
                    min={props.min}
                    max={props.max}
                    changeValue={props.changeValue} />
            </div>
        </div>
    )
}


export default PassengerSelector
