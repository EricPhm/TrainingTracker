
// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { Middleware } from 'redux';
// import thunk, { ThunkMiddleware } from 'redux-thunk';

// // action types
// const ADD_CHALLENGE = 'ADD_CHALLENGE';


// // interface
// interface Segment {
//     name: string
// }

// interface Challenge {
//     name: string
//     segment: Segment[]
// }

// // state
// interface challengeState {
//     challenges: Challenge[]
// }

// interface AddChallengeAction {
//     type: typeof ADD_CHALLENGE
//     payload: Challenge
// }

// // types
// type actionTypes = AddChallengeAction


// // actions
// const addChallenge = (challenge: Challenge): AddChallengeAction => ({
//     type: ADD_CHALLENGE,
//     payload: challenge,
// })

// // reducer
// const initialState: challengeState = {
//     challenges: []
// }

// const challengeReducer = (state = initialState, action: actionTypes): challengeState => {
//     switch (action.type) {
//         case ADD_CHALLENGE:
//             return {
//                 ...state,
//                 challenges: [...state.challenges, action.payload]
//             }
//         default: 
//             return state
//     }
// }

// // combine reducer
// const rootReducer = combineReducers({
//     challenge: challengeReducer
// })

// export type RootState = ReturnType<typeof rootReducer>

// // local storage middleware
// const localStorageMiddleware: Middleware<Record<string, never>, RootState> = store => next => (action) => {
//     const result = next(action);
//     localStorage.setItem('challenges', JSON.stringify(store.getState().challenge.challenges))
//     return result
// }


// // initial state when re-open page
// const persistedChallenges = localStorage.getItem('challenges') 
//     ? JSON.parse(localStorage.getItem('challenges') as string) : [];


// const initialStateWithLocalStorage: Partial<RootState> = {
//     challenge: {
//         challenges: persistedChallenges,
//     },
// };

//     // Store Configuration
// const store = createStore(
//     rootReducer,
//     initialStateWithLocalStorage as RootState,
//     applyMiddleware(thunk as ThunkMiddleware<RootState>, localStorageMiddleware),
// );

// export { store, addChallenge };
// export type { Challenge, Segment, RootState };