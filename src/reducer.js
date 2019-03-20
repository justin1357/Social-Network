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
    if (action.type == "ONLINE_USERS") {
        state = Object.assign({}, state, {
            user: action.onlineUsers
        });
    }
    if (action.type == "USER_JOINED") {
        console.log("action user joined in reducer", action);
        state = Object.assign({}, state, {
            user:
                state.user && state.user.concat(action.onlineUsers.onlineUsers)
        });
    }
    if (action.type == "USER_LEFT") {
        return {
            ...state,
            user: state.user.filter(user => user.id != action.userLeft)
        };
    }
    if (action.type == "LAST_MESSAGES") {
        console.log("action.message in reduecer.js 1", action, "state", state);
        state = Object.assign({}, state, {
            messages: action.messages && action.messages.messages.reverse()
        });
    }
    if (action.type == "NEW_MESSAGE") {
        console.log("action.message in reduecer.js 2", action, "state", state);
        state = Object.assign({}, state, {
            messages:
                state.messages &&
                state.messages.concat(action.messages.messages)
        });
    }

    console.log("State in reducer", state);
    return state;
}
