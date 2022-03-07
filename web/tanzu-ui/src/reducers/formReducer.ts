import { TEXT_CHANGE } from "../constants/actionTypes";

interface FormState {
    VCENETER_SERVER?: string,
    VCENETER_USERNAME?: string,
    VCENETER_PASSWORD?: string
};

interface Action {
    type: string,
    payload: {
        name: string,
        value: string
    }
};
export function formReducer (state: FormState, action: Action) {
    let newState = {};
    switch (action.type) {
        case TEXT_CHANGE:
            newState =  {
                ...state,
                [action.payload.name]: action.payload.value
            }
    }
    return newState;
}