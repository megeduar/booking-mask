import React, { Component } from 'react'
import './App.css';
import Tabs from './components/helper/Tabs';
import FlightForm from './components/form/FlightForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faHotel, faCar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  render() {
    return (
      <section>
        <Tabs>
          <div label="Flight" icon={<FontAwesomeIcon icon={faPlane} />}>
            <FlightForm />
          </div>
          <div label="Hotel" icon={<FontAwesomeIcon icon={faHotel} />}>

          </div>
          <div label="Car Rental" icon={<FontAwesomeIcon icon={faCar} />}>

          </div>
        </Tabs>
      </section>
    );
  }
}

export default App;
