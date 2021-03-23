import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    from: '',
    to: '',
    oneway: false,
    adult: 1,
    child: 0,
    infant: 0,
    startDate: null,
    endDate: null
}

const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        setFrom: (state, { payload }) => {
            state.from = payload
        },
        setTo: (state, { payload }) => {
            state.to = payload
        },
        setOneWay: (state, { payload }) => {
            state.oneway = payload
        },
        setAdult: (state, { payload }) => {
            state.adult = payload
        },
        setChild: (state, { payload }) => {
            state.child = payload
        },
        setInfant: (state, { payload }) => {
            state.infant = payload
        },
        setStartDate: (state, { payload }) => {
            state.startDate = payload
        },
        setEndDate: (state, { payload }) => {
            state.endDate = payload
        }
    }
})

export const { setFrom, setTo, setOneWay, setAdult, setChild, setInfant, setStartDate, setEndDate } = flightSlice.actions

export const flightSelector = (state) => state

export default flightSlice.reducer

