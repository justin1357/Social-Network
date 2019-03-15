export default function reducer(state = {}, action) {
    //return a new state object that contains a new property
    // whose value is an array we got back from the server
    if (action.type == "GET_FRIENDS") {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type == "DELETE_FRIEND") {
        console.log("action", action);
        state = Object.assign({}, state, {
            friends: state.friends.map(user => {
                if (action.friends.id == user.id) {
                    return Object.assign({}, user, {
                        accepted: null
                    });
                } else {
                    return Object.assign({}, user);
                }
            })
        });
    }
    if (action.type == "ACCEPT_FRIEND") {
        console.log("action", action);
        state = Object.assign({}, state, {
            friends: state.friends.map(user => {
                if (action.friends.id == user.id) {
                    return Object.assign({}, user, {
                        accepted: true
                    });
                } else {
                    return Object.assign({}, user);
                }
            })
        });
    }
    if (action.type == "GET_OTHERPROFILE") {
        state = Object.assign({}, state, {
            user: action.user
        });
    }

    console.log("State in reducer", state);
    return state;
}
