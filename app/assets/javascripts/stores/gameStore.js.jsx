const initialState = Immutable.Map({
	board: Immutable.List([null, null, null, null, null, null, null, null, null]),
	first: null,
	difficulty: null,
	type: null
})

const configHandler = (state, action) => {
	let newState = undefined
	switch (action.type) {
	case 'SET_GAME_TYPE':
	  newState = state.set('type', action.gameType)
	  break
	case 'SET_DIFFICULTY':
	  newState = state.set('difficulty', action.difficulty)
	  break
	case 'SET_FIRST_MOVE':
	  newState = state.set('first', action.first)
	  break
	default:
	  newState = state
	  break
	}
	return newState
}

const moveHandler = (state, action) => {
	let newState = undefined
	switch (action.type) {
	case 'MAKE_MOVE':
	  newState = state.set('board', action.board)
	  break
	default:
	  newState = state
	  break
	}
	return newState
}

const storeHandler = (state=initialState, action) => {
	let newState = undefined
	newState = configHandler(state, action)
	newState = moveHandler(newState, action)
	return newState
}

const gameStore = Redux.createStore(storeHandler)