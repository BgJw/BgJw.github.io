import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BadgeType, DataBadge, IBadgeSlice } from "../types/Types";


const initialState: IBadgeSlice = {
    favorites: {
        amount: 0,
        data: []
    },
    cart: {
        amount: 0,
        data: []
    },
    compare: {
        amount: 0,
        data: []
    }
};

type key = keyof typeof initialState;

export const BadgeSlice = createSlice({
    name: 'badge',
    initialState,
    reducers: {
        incrementBadge: (state, {payload}: PayloadAction<BadgeType>) => {
            if(state.compare.amount < 4){ 
                state[payload as key].amount++;
            };
        },
        decrementBadge: (state, {payload}: PayloadAction<BadgeType>) => {
            state[payload as key].amount--;
        },
        
        addDataBadge: (state, {payload}: PayloadAction<DataBadge>) => {
            if(state.compare.amount <= 4){
                payload.data && state[payload.name as key].data.push(payload.data);

                window.localStorage.setItem(payload.name, JSON.stringify(state[payload.name as key]));
            };
        },
        removeDataBadge: (state, {payload}: PayloadAction<DataBadge>) => {         
            state[payload.name as key].data.map((el, i) => {
                if (el.id === payload.data?.id) {
                    state[payload.name as key].data.splice(i,1);
                }
            })
            window.localStorage.setItem(payload.name, JSON.stringify(state[payload.name as key]));
        },
        isCheckLocalStorage: (state ) => {
            if(window.localStorage.length > 0){

                for (let i = 0; i < window.localStorage.length; i++) {
                    const nameBadge = window.localStorage.key(i) as BadgeType;
                    const getItem = window.localStorage.getItem(nameBadge); 
                    
                    state[nameBadge as key] = JSON.parse(String(getItem));

                }
                
            } 
            
        }
    }

});
  
export const {incrementBadge, decrementBadge, addDataBadge, removeDataBadge, isCheckLocalStorage} = BadgeSlice.actions;

export default BadgeSlice.reducer;