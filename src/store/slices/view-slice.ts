import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { View } from "@/components/types";

type ViewState = {
    view: View;
}

const initialState: ViewState = { view: 'list' };

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setView(state: { view: View }, action: PayloadAction<View>) {
            state.view = action.payload;
        },
    },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;
