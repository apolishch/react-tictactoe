const initialState = Immutable.Map({
	board: Immutable.List([Immutable.List([null, null, null]), Immutable.List([null, null, null]), Immutable.List([null, null, null])]),
	order: null,
	difficulty: null,
	type: null,
	nextMove: null
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
	case 'SET_ORDER':
	  newState = state.set('order', action.order)
	  newState = newState.set('nextMove', action.order)
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
	  newState = newState.set('nextMove', state.get('nextMove') === 'you' ? 'opponent' : 'you')
	  break
	case 'NEW_GAME':
	  newState = initialState
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