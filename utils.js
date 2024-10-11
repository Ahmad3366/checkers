export function drawAreas(initPos) {
	let curPos = initPos.clone()
	for (let i = 1; i <= 18; i++) {
		add([
			area({ shape: new Rect(vec2(0), 14, 14) }),
			pos(curPos),
			'board',
			`${curPos.x},${curPos.y}`,
			{
				checker: null,
			}
		])
		if (i % 3 == 0) {
			curPos.x = initPos.x
			curPos.y += 16
		} else {
			curPos.x += 16
		}
	}
}

export function checkerNextToMe(curPos, p1Turn) {

	const dirs = {
		up: vec2(curPos.x, curPos.y - 16),
		down: vec2(curPos.x, curPos.y + 16),
		left: vec2(curPos.x - 16, curPos.y),
		right: vec2(curPos.x + 16, curPos.y),
		'top-left': vec2(curPos.x - 16, curPos.y - 16),
		'top-right': vec2(curPos.x + 16, curPos.y - 16),
		'down-left': vec2(curPos.x - 16, curPos.y + 16),
		'down-right': vec2(curPos.x + 16, curPos.y + 16),

		// '1,1': vec2(curPos.x - 16, curPos.y - 16),
		// '0,1': vec2(curPos.x, curPos.y - 16),
		// '-1,1': vec2(curPos.x - 16, curPos.y - 16),
		// '1,0': vec2(curPos.x - 16, curPos.y),
		// '-1,0': vec2(curPos.x + 16, curPos.y),
		// '1,-1': vec2(curPos.x - 16, curPos.y + 16),
		// '0,-1': vec2(curPos.x, curPos.y + 16),
		// '-1,-1': vec2(curPos.x + 16, curPos.y + 16)
	}
	let tilestokill = []


	for (const key in dirs) {
		if (Object.hasOwnProperty.call(dirs, key)) {
			const element = dirs[key];

			const tile = get(`${element.x},${element.y}`)[0]
			if (tile) {
				if (p1Turn && tile.checker == 'p2' || !p1Turn && tile.checker == 'p1') {
					tilestokill.push({tile, dir: key})
				}
			}

		}
	}

	return tilestokill
}