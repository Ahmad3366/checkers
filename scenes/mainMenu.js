export async function mainMenu() {

	// draw background
	add([
		rect(width(), height()),
		scale(),
		shader("checkers", () => ({
			"u_time": time() / 30,
			"u_color1": Color.fromHex('#f4f4f4'),
			"u_color2": Color.fromHex('#777848'),
			"u_speed": vec2(1, 0),
			"u_angle": 45 / 3,
			"u_scale": 3,
			"u_aspect": width() / height(),
		})),
	])

	//logo
	const logo = add([
		sprite('logo'),
		anchor('center'),
		pos(center().x, center().y - 200),
		scale(0.5),
		animate({relative: true}),
	])
	logo.animate('pos', [vec2(0, 0), vec2(0, 10)], {
		duration: 2,
		direction: 'ping-pong',
		easing: easings.easeInOutCubic
	})

	// start
	const prompt = add([
		text('press [Enter] to start !', {font: 'round'}),
		pos(center().x, center().y + 50),
		anchor('center'),
		opacity(),
		animate()
	])
	prompt.animate('opacity', [1, 0], {
		duration: 0.8,
		direction: 'ping-pong'
	})
	onKeyPress('enter', () => {
		go('game')
	})
	onClick(() => {
		go('game')
	})
}