import { TOGGLE_NAV } from "../constants/actionTypes";

interface UiState {
    navExpanded: boolean
};

interface Action {
    type: string
}
export function uiReducer (state: UiState, action: Action) {
    let newState = {};
    switch (action.type) {
        case TOGGLE_NAV:
            newState =  {
                ...state,
                navExpanded: !state.navExpanded
            }
    }
    return newState;
}