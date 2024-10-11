import kaplay from "kaplay";
import 'kaplay/global'
import loadAssets from "./loader";
import { mainMenu } from "./scenes/mainMenu";
import { game } from "./scenes/game";

kaplay({
	width: 1280,
	height: 720,
	letterbox: true,
	logMax: 1,
	debugKey: '/'
})

loadAssets()

const scenes = {
	mainMenu,
	game
}

for (const key in scenes) {
	scene(key, scenes[key])
}

go('mainMenu')