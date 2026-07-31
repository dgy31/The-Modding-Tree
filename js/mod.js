let modInfo = {
	name: "The Coke Tree",
	author: "大观园",
	pointsName: "mL",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // 用于硬重置和新玩家
	offlineLimit: 0,  // 离线时间
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "更新了可乐阶层",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `恭喜！你已经到达终点并通关了这个游戏，但暂时...`

// 如果你在某个层里添加了新功能，而且这些功能在被调用时会产生效果，就把它们加到这里。
// (这里的只是例子，所有官方职能都已经处理好了)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// 确定是否显示每秒点数
function canGenPoints(){
	return true
}

// 计算每秒点数
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	return gain
}

// 你可以添加非图层相关的变量，这些变量应该放到“player”里并保存在这里，同时可以设置默认值
function addedPlayerData() { return {
}}

// 在页面顶部显示额外的东西
var displayThings = [
]

// 确定游戏何时“结束”
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// 如果你有东西会被长计时长度搞乱的话，你可以更改这个
function maxTickLength() {
	return(3600) // 默认是 1 小时，这只是随便设的大数
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}