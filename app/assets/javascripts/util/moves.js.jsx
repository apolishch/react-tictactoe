const emptyFields = (board) => {
	const empties = board.reduce((memo, row, rowIndex) => {
		row.map((field, fieldIndex) => {
			if(field === null) {
				memo = memo.push(rowIndex*3 + fieldIndex)
			}
		})
		return memo
	}, Immutable.List([]))
	return empties
}

const victoryCheck = (board) => {
	let victory = null
	let victoryValue = null
	if (board.getIn([1, 1]) !== null) {
		victory = victories.get('central').some((victory) => {
			return victory.every((victoryPath) => {
				return board.getIn(victoryPath) === board.getIn([1, 1])
			})
		})
		victoryValue = board.getIn([1, 1])
	}
	if ((board.getIn([0, 0]) !== null) && (!victory)) {
		victory = victories.get('topRight').some((victory) => {
			return victory.every((victoryPath) => {
				return board.getIn(victoryPath) === board.getIn([0, 0])
			})
		})		
		victoryValue = board.getIn([0, 0])
	}
	if ((board.getIn([2, 2]) !== null ) && (!victory)) {
		victory = victories.get('bottomLeft').some((victory) => {
			return victory.every((victoryPath) => {
				return board.getIn(victoryPath) === board.getIn([2, 2])
			})
		})
		victoryValue = board.getIn([2, 2])
	}
	return Immutable.List([victory, victoryValue])
}

const drawCheck = (board) => {
	return emptyFields(board).size === 0
}

const random = (board) => {
	const empties = emptyFields(board)
	const probability = 1/(empties.size - 1)
	const move = empties.get(Math.floor(Math.random(1)/probability))
	return board.setIn([Math.floor(move/3), move % 3], 'opponent')
}

const scoreState = (board, depth, victory, player) => {
	if (victory.get(0) && (victory.get(1) === player)) {
    	return 10 - depth
	} else if (victory.get(0) && (victory.get(1) !== null)) {
		return depth - 10
	} else {
		return 0
	}
}

const minMax = (board, maximizePlayer, nextMove, lowerBound, upperBound) => {
    let move = Immutable.List(board)
    
    const comingMove = nextMove === 'opponent' ? 'you' : 'opponent'
    const empties = emptyFields(board)
    const depth = 9 - empties.size
    const victory = victoryCheck(board)

    let scores = Immutable.List([])
    let moves = Immutable.List([])
    let forceMove = null
    
    //clever shortcut heuristic and/or cheating
    if (maximizePlayer && (board.getIn([1,1]) === null)) {
    	return Immutable.List([board.setIn([1,1], 'opponent'), Infinity])
    }

    if (empties.size === 0 || victory.get(0)) {
    	return Immutable.List([board, scoreState(board, depth, victory, nextMove)])
    }
  
    empties.every((fieldIndex) => {
    	const row = Math.floor(fieldIndex/3)
    	const col = fieldIndex % 3
    	move = board.setIn([row, col], nextMove)
		moves = moves.push(move)
		score = minMax(Immutable.List(move), maximizePlayer, comingMove, lowerBound, upperBound).get(1)
		scores = scores.push(score)
		return true
    })
    if (maximizePlayer || (nextMove === 'you')) {
    	const upperBound = scores.max()
    	const highestState = moves.get(scores.indexOf(upperBound))
    	return Immutable.List([highestState, upperBound])
    } else {
    	const lowerBound = scores.max()
    	const lowestState = moves.get(scores.indexOf(lowerBound))
    	return Immutable.List([lowestState, lowerBound])
    }

}

const maxMin = (board) => {
	return minMax(board, false, 'opponent')
}


const makeMove = (board, difficulty) => {
	if (difficulty === 'hard') {
		return minMax (board, true, 'opponent').get(0)
	} else if (difficulty === 'medium') {
		return random (board)
	} else {
		return maxMin (board).get(0)
	}
}

const getMove = (board, type, difficulty) => {
  if ((type === 'single') && (!victoryCheck(board).get(0))) {
  	return makeMove (board, difficulty)
  } else if(type === 'remote') {
  	getApiMove()
  }
  return board
}