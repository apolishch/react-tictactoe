const victories = Immutable.Map({
	central: Immutable.List([
		Immutable.List([
			Immutable.List([0, 0]),
			Immutable.List([1, 1]),
			Immutable.List([2, 2])
		]),
		Immutable.List([
			Immutable.List([0, 2]),
			Immutable.List([1, 1]),
			Immutable.List([2, 0])
		]),
		Immutable.List([
			Immutable.List([0, 1]),
			Immutable.List([1, 1]),
			Immutable.List([2, 1])
		]),
		Immutable.List([
			Immutable.List([1, 0]),
			Immutable.List([1, 1]),
			Immutable.List([1, 2])
		])
	]),
	topRight: Immutable.List([
		Immutable.List([
			Immutable.List([0, 0]),
			Immutable.List([0, 1]),
			Immutable.List([0, 2])
		]),
		Immutable.List([
			Immutable.List([0, 0]),
			Immutable.List([1, 0]),
			Immutable.List([2, 0])
		])
	]),
	bottomLeft: Immutable.List([
		Immutable.List([
			Immutable.List([0, 2]),
			Immutable.List([1, 2]),
			Immutable.List([2, 2])
		]),
		Immutable.List([
			Immutable.List([2, 0]),
			Immutable.List([2, 1]),
			Immutable.List([2, 2])
		])
	])
})