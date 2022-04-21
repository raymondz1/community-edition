import React, {
    createContext,
    Dispatch,
    ReactNode,
    Reducer,
    ReducerAction,
    useReducer,
} from 'react';
import vsphereReducer from '../reducers/Vsphere.reducer';

const initialState = {
    data: {
        REGION: '',
    },
};
export type StoreDispatch = Dispatch<ReducerAction<Reducer<any, any>>>;
const VsphereStore = createContext<{
    vsphereState: { [key: string]: any };
    vsphereDispatch: StoreDispatch;
}>({
    vsphereState: initialState,
    vsphereDispatch: () => null,
});

const VpshereProvider: React.FC<{ children: ReactNode }> = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [vsphereState, vsphereDispatch] = useReducer(
        vsphereReducer,
        initialState
    );

    return (
        <VsphereStore.Provider value={{ vsphereState, vsphereDispatch }}>
            {children}
        </VsphereStore.Provider>
    );
};

export { VsphereStore, VpshereProvider };
