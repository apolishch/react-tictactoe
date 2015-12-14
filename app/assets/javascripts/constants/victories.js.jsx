const victories = Immutable.Map({
	central: Immutable.List([
		Immutable.List([
			Immutable.List(['board', 0, 0]),
			Immutable.List(['board', 1, 1]),
			Immutable.List(['board', 2, 2])
		]),
		Immutable.List([
			Immutable.List(['board', 0, 2]),
			Immutable.List(['board', 1, 1]),
			Immutable.List(['board', 2, 0])
		]),
		Immutable.List([
			Immutable.List(['board', 0, 1]),
			Immutable.List(['board', 1, 1]),
			Immutable.List(['board', 2, 1])
		]),
		Immutable.List([
			Immutable.List(['board', 1, 0]),
			Immutable.List(['board', 1, 1]),
			Immutable.List(['board', 1, 2])
		])
	]),
	topRight: Immutable.List([
		Immutable.List([
			Immutable.List(['board', 0, 0]),
			Immutable.List(['board', 0, 1]),
			Immutable.List(['board', 0, 2])
		]),
		Immutable.List([
			Immutable.List(['board', 0, 0]),
			Immutable.List(['board', 1, 0]),
			Immutable.List(['board', 2, 0])
		])
	]),
	bottomLeft: Immutable.List([
		Immutable.List([
			Immutable.List(['board', 0, 2]),
			Immutable.List(['board', 1, 2]),
			Immutable.List(['board', 2, 2])
		]),
		Immutable.List([
			Immutable.List(['board', 2, 0]),
			Immutable.List(['board', 2, 1]),
			Immutable.List(['board', 2, 2])
		])
	])
})