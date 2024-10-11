export default function loadAssets() {
	loadShaderURL('checkers', null, './shaders/checkers.frag')

	loadRoot('./assets/')
	loadSprite('logo', 'logo.png')
	loadSprite('board', 'board.png')
	loadSprite('checker', 'checkers.png', {
		sliceX: 2
	})

	loadFont('round', 'Round9x13.ttf', {outline: 6})
}