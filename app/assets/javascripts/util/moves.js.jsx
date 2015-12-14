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

const makeMove = (board, difficulty) => {
	if (difficulty === 'hard') {
		return minMax (board)
	} else if (difficulty === 'medium') {
		return random (board)
	} else {
		return maxMin (board)
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