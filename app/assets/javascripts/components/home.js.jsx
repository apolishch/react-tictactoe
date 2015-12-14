class HomeComponent extends React.Component {
  constructor(props) {
  	gameStore.subscribe(() => {
  		this.setState(() => {
  			return {data: gameStore.getState()}
  		})
  	})
  	super(props)
  	this.state = {
  		data: Immutable.Map({
  			board: Immutable.List([Immutable.List([null, null, null]), Immutable.List([null, null, null]), Immutable.List([null, null, null])]),
  			order: null,
  			difficulty: null,
  			type: null,
  			nextMove: null
  		})
  	}
  }

  setGameType (gameType) {
  	gameStore.dispatch({type: 'SET_GAME_TYPE', gameType: gameType})
  }

  setDifficulty (difficulty) {
  	gameStore.dispatch({type: 'SET_DIFFICULTY', difficulty: difficulty})
  }

  setOrder (order) {
  	gameStore.dispatch({type: 'SET_ORDER', order: order})
  }

  renderOrderSelection () {
  	return(<span>{() => {return orders.map((order, index) =>{
    	return(<div key={index} className='btn' onClick={this.setOrder.bind(this, order.get('value'))}>{order.get('label')}</div>)
    })}()}</span>)
  }

  renderDifficultySelection () {
  	return(<span>{() => {return difficulties.map((difficulty, index) =>{
    	return(<div key={index} className='btn' onClick={this.setDifficulty.bind(this, difficulty.get('value'))}>{difficulty.get('label')}</div>)
    })}()}</span>)
  }

  renderTypeSelection () {
    return(<span>{() => {return gameTypes.map((gameType, index) => {
    	return(<div key={index} className='btn' onClick={this.setGameType.bind(this, gameType.get('value'))}>{gameType.get('label')}</div>)
    })}()}</span>)
  }

  makeMove (fieldIndex, rowIndex) {
  	gameStore.dispatch({
  						type: 'MAKE_MOVE', 
  						board: this.state.data.get('board').setIn([rowIndex, fieldIndex], this.state.data.get('nextMove'))
  						})
  }

  renderField (field, fieldIndex, rowIndex) {
  	let you = null
  	let opponent = null
  	let fieldValue = null
  	if (this.state.data.get('order') === 'you') {
  		you = 'crosses'
  		opponent = 'naughts'
  		if (field) {
  			fieldValue = field === 'you' ? 'X' : 'O'
  		}
  	} else {
  		you = 'naughts'
  		opponent = 'crosses'
  		if (field) {
  			fieldValue = field === 'you' ? 'O' : 'X'
  		}
  	}
    return(<div className={field ? eval(field) : 'none'} onClick={this.makeMove.bind(this, fieldIndex, rowIndex)}>{fieldValue}</div>)
  }

  renderRow (row, rowIndex) {
  	return(<div className='row'>{() => {return row.map((field, index) => {
      return (<div className='col-md-4' key={index}>{() => {return this.renderField.bind(this)(field, index, rowIndex)}()}</div>)
  	})}()}</div>)
  }

  renderBoard () {
  	return(<div>{() => {
      return this.state.data.get('board').map((row, index) => {
      	return (<div className='board-row' key={index}>{() => {return this.renderRow.bind(this)(row, index)}()}</div>)
      })
  	}()}</div>)
  }

  newGame () {
  	gameStore.dispatch({type: 'NEW_GAME'})
  }
  
  render() {
  	if (this.state.data.get('type') === null) {
  		return (<span>{() => {
  			return this.renderTypeSelection.bind(this)()
  		}()}</span>)
  	} else if ((this.state.data.get('type') === 'single') && (this.state.data.get('difficulty') === null)) {
  		return (<span>{() => {
  			return this.renderDifficultySelection.bind(this)()
  		}()}</span>)
  	} else if(this.state.data.get('order') === null) {
  		return (<span>{() => {
  			return this.renderOrderSelection.bind(this)()
  		}()}</span>)
  	} else {
  		return(<span>
  			<div className='btn btn-primary' onClick={this.newGame.bind(this)}>New Game </div>
  			<br/>
  			<label className='next-move'>Next Move: {this.state.data.get('nextMove')}</label>
  			<div className='board'>{() => {
  				return this.renderBoard.bind(this)()
  			}()}</div>
  		</span>)
  	}
  }
}
