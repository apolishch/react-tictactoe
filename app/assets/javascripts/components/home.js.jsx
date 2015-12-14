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
  			board: Immutable.List([null, null, null, null, null, null, null, null, null]),
  			first: null,
  			difficulty: null,
  			type: null
  		})
  	}
  }

  setGameType (gameType) {
  	gameStore.dispatch({type: 'SET_GAME_TYPE', gameType: gameType})
  }

  renderTypeSelection () {
    return(<span>{() => {gameTypes.map((gameType) =>{
    	return(<div className='btn' onClick={this.setGameType.bind(this, gameType.get('value'))}>{gameType.get('label')}</div>)
    })}()}</span>)
  }
  
  render() {
  	if (this.state.data.get('type') === null) {
  		return (<span>{() => {
  			return this.renderTypeSelection.bind(this)()
  		}()}</span>)
  	}
  }
}
