import { checkerNextToMe, drawAreas } from "../utils"

export async function game() {

	// draw background
	add([
		rect(width(), height()),
		scale(),
		shader("checkers", () => ({
			"u_time": time() / 30,
			"u_color1": Color.fromHex('#cbcc85'),
			"u_color2": Color.fromHex('#f4f4f4'),
			"u_speed": vec2(-1, 2),
			"u_angle": 45 / 3,
			"u_scale": 3,
			"u_aspect": width() / height(),
		})),
	])

	// add board
	const board = add([
		sprite('board'),
		pos(center().x - 31, center().y - 55),
	])
	drawAreas(board.pos.add(7))

	// add the checkers
	const tiles = get('board')
	for (let i = 0; i < 5; i++) {
		tiles[i].checker = 'p2'
	}
	for (let i = 17; i > 12; i--) {
		tiles[i].checker = 'p1'
	}
	onDraw(() => {
		for (const tile of tiles) {
			if (tile.checker) {
				drawSprite({
					sprite: 'checker',
					pos: vec2(tile.pos),
					frame: tile.checker == 'p1' ? 0 : 1
				})
			}
		}
	})

	let p1Turn = true
	let curSelected = null
	let p1Checkers = 5
	let p2Checkers = 5
	let gameEnd = false

	const playing = onClick('board', (board) => {

		destroyAll('sightLine')

		if (board.checker == 'p1' && p1Turn || board.checker == 'p2' && !p1Turn) {
			curSelected = board
		} else if (!board.checker && curSelected) {

			const xDelta = Math.abs(curSelected.pos.x - board.pos.x)
			const yDelta = Math.abs(curSelected.pos.y - board.pos.y)

			if (yDelta > 16 || xDelta > 16) {

				if ((xDelta == 16 && yDelta == 32) || (xDelta == 32 && yDelta == 16)) return


				if (xDelta <= 32 && yDelta <= 32) {

					const sightLine = add([
						rect(16, 1),
						pos(curSelected.pos.add(8)),
						anchor('right'),
						area(),
						color(RED),
						rotate(),
						opacity(0),
						'sightLine'
					])
					sightLine.angle = sightLine.pos.angle(board.pos.add(8))
					sightLine.onCollide('board', (sBoard) => {
						if ((sBoard.checker == 'p2' && p1Turn) || (sBoard.checker == 'p1' && !p1Turn)) {

							sBoard.checker = null
							p1Turn ? p2Checkers-- : p1Checkers--

							play('capture')
							curSelected.checker = null
							board.checker = p1Turn ? 'p1' : 'p2'
							curSelected = null
							p1Turn = !p1Turn
							destroyAll('sightLine')
						}
					})
				}

				return

			}

			play('move')
			curSelected.checker = null
			board.checker = p1Turn ? 'p1' : 'p2'
			curSelected = null
			p1Turn = !p1Turn
			destroyAll('sightLine')

		}

	})

	const turnLabel = add([
		text('player', { size: 6, font: 'round' }),
		pos(center().sub(70, 50)),
		anchor('center'),
		{
			update() {
				if (!gameEnd) {
					this.text = `player ${p1Turn ? 1 : 2} turn`
				} else {
					this.text = `player ${!p1Turn ? 1 : 2} won`
				}
			}
		}
	])
	turnLabel.add([
		sprite('checker'),
		pos(0, 16),
		anchor('center'),
		{
			update() {
				if (!gameEnd) {
					this.frame = p1Turn ? 0 : 1
				} else {
					this.frame = !p1Turn ? 0 : 1
				}
			}
		}
	])

	onUpdate(() => {
		if (!gameEnd) {
			if (p2Checkers == 0 || p1Checkers == 0) {
				gameEnd = true
				playing.cancel()
				add([
					text('Play Again ?', {size: 6, font: 'round'}),
					anchor('center'),
					pos(turnLabel.pos.add(0, 50)),
					area(),
					{
						add() {
							this.onClick(() => {
								go('game')
							})
						}
					}
				])
			}
		}
	})


	camScale(6)
	camPos(center())
}