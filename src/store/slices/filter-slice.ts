import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
    service: string;
    type: string;
    centre: string;
    search: string;
}

const initialState: FilterState = {
    service: '',
    type: '',
    centre: '',
    search: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setService(state, action: PayloadAction<string>) {
            state.service = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        },
        setCentre(state, action: PayloadAction<string>) {
            state.centre = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const { setService, setType, setCentre, setSearch, resetFilters } =
    filterSlice.actions;
export default filterSlice.reducer;
