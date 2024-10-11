export function checkerNextToMe(curPos, p1Turn) {

	const dirs = {
		'1,1': vec2(curPos.x - 16, curPos.y - 16),
		'0,1': vec2(curPos.x, curPos.y - 16),
		'-1,1': vec2(curPos.x - 16, curPos.y - 16),
		'1,0': vec2(curPos.x - 16, curPos.y),
		'-1,0': vec2(curPos.x + 16, curPos.y),
		'1,-1': vec2(curPos.x - 16, curPos.y + 16),
		'0,-1': vec2(curPos.x, curPos.y + 16),
		'-1,-1': vec2(curPos.x + 16, curPos.y + 16)
	}
	let kill = false
	let tilestokill = []


	for (const key in dirs) {
		if (Object.hasOwnProperty.call(dirs, key)) {
			const element = dirs[key];
			const tile = get(`${element.x},${element.y}`)[0]
			if (tile) {
				if (p1Turn && tile.checker == 'p2' || !p1Turn && tile.checker == 'p1') {
					kill = true
					tilestokill.push({tile: tile, dir: key})
					// tilestokill = tile
				}
			}
		}
	}

	// for (const dir of dirsAr) {
	// 	const tile = get(`${dir.x},${dir.y}`)[0]
		
	// 	if (tile) {
	// 		if (p1Turn && tile.checker == 'p2' || !p1Turn && tile.checker) {
	// 			kill = true
	// 			tilestokill.push(tile)
	// 			// tiletokill = tile
	// 		}
	// 	}
	// }

	return tilestokill
}


// } else if (!board.checker && curSelected) {

const xDelta = Math.abs(curSelected.pos.x - board.pos.x)
const yDelta = Math.abs(curSelected.pos.y - board.pos.y)
let up, left

if (yDelta > 0) {
	up = 1
} else if (yDelta < 0) {
	up = -1
} else {
	up = 0
}
if (xDelta > 0) {
	left = 1
} else if (xDelta < 0) {
	left = -1
} else {
	left = 0
}

// if (yDelta > 16 || xDelta > 16) {

	// if ((xDelta == 16 && yDelta == 32) || (xDelta == 32 && yDelta == 16)) return

	const tilestokill = checkerNextToMe(curSelected.pos, p1Turn)
	let target = null

	for (const key in tilestokill) {
		let tileCoordX = tilestokill[key].dir.split(',')[0]
		let tileCoordY = tilestokill[key].dir.split(',')[1]


		let tileCoord = vec2(Number(tileCoordX), Number(tileCoordY))

		if (tileCoord.eq(vec2(left, up))) {
			target = tilestokill[key].tile
			target.checker = null
		} else {
			return
		}
	}

// }