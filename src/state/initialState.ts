import {InitialState} from "../models/initialState";

const initialState:InitialState = {
    newItem: null,
    editMode: null,
    createMode: null,
    list:[],
    size: 1,
    sizeVariables: [0.25,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5],
    position: {x:0,y:0}
}

export default initialState;