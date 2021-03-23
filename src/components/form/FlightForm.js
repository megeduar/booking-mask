import React, { useState } from 'react'
import Selector from '../airport/AirportSelector';
import PassengerSelector from '../passenger/PassengerSelector';
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux'
import { setOneWay, setStartDate, setEndDate, flightSelector } from '../../slices/flight'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import "react-datepicker/dist/react-datepicker.css";

const airports = require('../../data/airports.json');

const FlightForm = () => {
    const dispatch = useDispatch();
    const { from, to, adult, child, infant, oneway, startDate, endDate } = useSelector(flightSelector)
    const [isValidForm, setIsValidForm] = useState(true)


    const handleSearchFlight = () => {
        console.log(isValid());

        if (isValid()) {
            setIsValidForm(true);
            const urlFlight = from + '-' + to + '/from-' + startDate.toISOString().slice(0, 10) + (oneway ? '' : '/to-' + endDate.toISOString().slice(0, 10)) + '/adult-' + adult + '/children-' + child + '/infants-' + infant + '/class-economy/al-LX/sidmbvi'

            window.location.href = "https://www.swiss.com/us/en/Book/Outbound/" + urlFlight;
            console.log("https://www.swiss.com/us/en/Book/Outbound/" + urlFlight)
        }
        else {
            setIsValidForm(false);
        }
    }

    const isValid = () => {
        return from !== '' && to !== '' && startDate !== null && ((oneway && endDate === null) || (!oneway && endDate !== null));
    }

    return (
        <div className="form">
            {!isValidForm && <div className="error-notification"> <em>All fields on this form are required.</em> </div>}
            <div className="row">
                <div className="col-md-5">
                    <Selector name="From" collection={airports} />
                </div>
                <div className="col-md-1">
                    <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
                </div>
                <div className="col-md-5">
                    <Selector name="To" collection={airports} />
                </div>
            </div>
            <div className="row">
                <input
                    type="checkbox"
                    value={oneway}
                    onChange={() => {
                        dispatch(setOneWay(!oneway));

                        dispatch(setEndDate(null))


                    }} />
                <label>Just Oneway Flight</label>
            </div>
            <div className="row">
                <div className="col-md-5 is-flex">
                    <div className="mr-3">
                        <DatePicker
                            selected={startDate}
                            onChange={date => dispatch(setStartDate(date))}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            isClearable
                            placeholderText="Departure date" readOnly={startDate !== null} />
                    </div>

                    <div>
                        {oneway ||
                            <DatePicker
                                selected={endDate}
                                onChange={date => dispatch(setEndDate(date))}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                isClearable
                                placeholderText="Returned date" readOnly={endDate !== null} />
                        }
                    </div>
                </div>

                <div className="col-md-1">

                </div>
                <div className="col-md-5">
                    <PassengerSelector name="Passenger" />
                </div>

            </div>
            <div className="row">
                <div className="col-md-2">
                    <input className="btn" type="button" onClick={handleSearchFlight} value="Search flights"></input>
                </div>
            </div>
        </div>

    )
}

export default FlightForm
