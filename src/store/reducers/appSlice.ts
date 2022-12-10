import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "../../state/initialState";
import {ItemI, NewItemI, PositionI} from "../../models/initialState";

export const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        setSize(state,action: PayloadAction<number | string>){
            if (typeof action.payload === 'number'){
                state.size = action.payload;
            }
            if (typeof action.payload === 'string'){
                const index = state.sizeVariables.indexOf(state.size);
                switch (true){
                    case (action.payload === 'minus') && index !== 0:
                        state.size = state.sizeVariables[index - 1]
                    break;
                    case (action.payload === 'plus') && (index !== (state.sizeVariables.length - 1)):
                        state.size = state.sizeVariables[index + 1]
                    break;
                }
            }
        },
        setList(state,action:PayloadAction<ItemI[]>){
            state.list = action.payload
        },
        setPosition(state,action:PayloadAction<PositionI>){
            state.position = action.payload;
        },
        setEditMode(state,action:PayloadAction<number | string | null>){
            state.editMode = action.payload;
        },
        setCreateMode(state,action:PayloadAction<number | string | null>){
            state.createMode = action.payload;
        },
        createItem(state,action:PayloadAction<NewItemI | null>){
            state.newItem = action.payload;
        }
    }
})

export default appSlice.reducer;