export const combineReducers = (reducers: any) => {
    return (state:any, action: any) => {
        const newState: any = {...state};
        for (const key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    }
}
