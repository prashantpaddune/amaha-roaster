import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterReducer from './slices/filter-slice';
import providerReducer from './slices/provider-slice';
import viewReducer from './slices/view-slice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    view: viewReducer,
    filters: filterReducer,
    providers: providerReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['view']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
        getDefault({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
