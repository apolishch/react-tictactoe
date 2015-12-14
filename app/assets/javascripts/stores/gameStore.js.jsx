const initialState = Immutable.Map({
	board: Immutable.List([Immutable.List([null, null, null]), Immutable.List([null, null, null]), Immutable.List([null, null, null])]),
	order: null,
	difficulty: null,
	type: null,
	nextMove: null,
	victor: null,
	draw: null
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
	  if ((state.get('type') !== 'hotSeat') && (newState.get('nextMove') === 'opponent')) {
	  	newState = newState.set('board', getMove(newState.get('board'), state.get('type'), state.get('difficulty')))
	  	if (state.get('type') !== 'remote') {
	  		newState = newState.set('nextMove', 'you')
	  	}
	  }
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
	  if (state.get('type') === 'remote') {
	  	sendMove(action.board)
	  }
	  newState = newState.set('nextMove', state.get('nextMove') === 'you' ? 'opponent' : 'you')
	  if ((state.get('type') !== 'hotSeat') && (newState.get('nextMove') === 'opponent')) {
	  	newState = newState.set('board', getMove(newState.get('board'), state.get('type'), state.get('difficulty')))
	  	if (state.get('type') !== 'remote') {
	  		newState = newState.set('nextMove', 'you')
	  	}
	  }
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

const victoryHandler = (state) => {
	let newState = undefined
	let victory = false
	let victoryValue = false
	let victoryState = victoryCheck(state.get('board'))
	victory = victoryState.get(0)
	victoryValue = victoryState.get(1)
	if (victory) {
		newState = state.set('victor', victoryValue)
	} else {
		newState = state
	}
	return newState
}

const drawHandler = (state) => {
	if (state.get('victor') === null) {
	  	return state.set('draw', drawCheck(state.get('board')))
	} else {
		return state
	}
}

const storeHandler = (state=initialState, action) => {
	let newState = undefined
	newState = configHandler(state, action)
	newState = moveHandler(newState, action)
	newState = victoryHandler(newState)
	newState = drawHandler(newState)
	return newState
}

const gameStore = Redux.createStore(storeHandler)