import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Provider } from '@/components/types';

interface ProviderState {
    list: Provider[];
    loading: boolean;
    error: string | null;
}

const initialState: ProviderState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchProviders = createAsyncThunk<
    Provider[],
    { service: string; type: string; centre: string; search: string }
>(
    'providers/fetch',
    async (filters) => {
        const params = new URLSearchParams(filters);
        const res = await fetch(`/api/providers?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch providers');
        return res.json() as Promise<Provider[]>;
    }
);

const providerSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        setProviders(state, action: PayloadAction<Provider[]>) {
            state.list = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProviders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProviders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.list = payload;
            })
            .addCase(fetchProviders.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message ?? 'Unknown error';
            });
    },
});

export const { setProviders } = providerSlice.actions;
export default providerSlice.reducer;
