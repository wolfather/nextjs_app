import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "../slice/session";
import { useDispatch, useSelector, useStore } from "react-redux";


export const store = () => {
    return configureStore({
        reducer: {
            sessionReducer
        },
        // middleware: (getDefaultMiddleware) =>
        //   getDefaultMiddleware().concat(loggerMiddleware),
        // preloadedState,
        // enhancers: (getDefaultEnhancers) =>
        //   getDefaultEnhancers().concat(monitorReducersEnhancer),
    })
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()