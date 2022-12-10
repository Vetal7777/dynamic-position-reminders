import {InitialState} from "../models/initialState";

const initialState:InitialState = {
    list:[
        {
            title: 'First',
            id: 111111,
            children: []
        },
        {
            title: 'Second',
            id: 22222,
            children: []
        },
        {
            title: 'Fourth',
            id: 444444,
            children: [{
                title: 'Fives',
                id: 555555,
                children: []
            },]
        },
    ],
    size: 1,
    sizeVariables: [0.25,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5],
    position: {x:0,y:0}
}

export default initialState;