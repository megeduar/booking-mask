import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFrom, setTo } from '../../slices/flight'

const AirportSelector = (props) => {
    const [activeAirport, setActiveAirport] = useState(0);
    const [filteredAirport, setfilteredAirport] = useState([]);
    const [showAirports, setShowAirports] = useState(false);
    const [input, setInput] = useState("");
    const [iata, setIata] = useState("");
    const [airportSelected, setAirportSelected] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (airportSelected || iata === '') {
            if (props.name === "From") {
                dispatch(setFrom(iata));
            } else {
                dispatch(setTo(iata))
            }

            // setAirportSelected(false)
        }
    })

    const onChange = e => {
        const { collection } = props;
        const input = e.currentTarget.value;

        const filteredAirport = collection.filter(
            n => n.name.toLowerCase().indexOf(input.toLowerCase()) > -1
        );

        setAirportSelected(false);
        setActiveAirport(0);
        setfilteredAirport(filteredAirport);
        setShowAirports(true);
        setInput(e.currentTarget.value)
    }

    const onCLick = e => {
        setActiveAirport(0);
        setfilteredAirport([]);
        setShowAirports(false);
        setInput(e.currentTarget.innerText);
        setAirportSelected(true);
        setIata(e.target.getAttribute('id'))
    }

    const closeCLick = e => {
        setActiveAirport(0);
        setfilteredAirport([]);
        setShowAirports(false);
        setInput('');
        setAirportSelected(false);
        setIata('')
    }

    const onKeyDown = e => {
        if (e.keyCode === 13) {
            setInput(filteredAirport[activeAirport].name);
            setIata(filteredAirport[activeAirport].iata)
            setActiveAirport(0);
            setShowAirports(false);
            setAirportSelected(true);
        }
        else if (e.keyCode === 38) {
            if (activeAirport === 0) return
            setActiveAirport(activeAirport - 1);
        }
        else if (e.keyCode === 40) {
            if (activeAirport - 1 === filteredAirport.length) {
                return;
            }
            setActiveAirport(activeAirport + 1);
        }
    }

    let airportListSelector;

    if (showAirports && input) {
        if (filteredAirport.length) {
            airportListSelector = (
                <ul className="container">
                    {
                        filteredAirport.map((airport, index) => {
                            let className;

                            if (index === activeAirport) {
                                className = "airport-active";
                            }
                            return (
                                <li onClick={onCLick} className={className} id={airport.iata} key={index}>
                                    {airport.name}
                                </li>
                            );
                        })
                    }
                </ul>
            );
        }
        else {
            airportListSelector = (
                <div className="no-airport">
                    <em>Airport not available.</em>
                </div>
            )
        }
    }

    return (
        <Fragment>
            <input
                type="input"
                className="selector"
                name={props.name}
                placeholder={props.name}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input} readOnly={airportSelected} />

            {airportSelected && <button type="button" onClick={closeCLick} class="close-icon" aria-label="Close" tabindex="-1"></button>}

            {airportListSelector}

            {/* {(!airportSelected && !input) && <>
                <div className="no-airport">
                    <em>Choice a airport.</em>
                </div>
            </>} */}
        </Fragment>
    );
}

export default AirportSelector;