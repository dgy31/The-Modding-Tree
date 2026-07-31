function getClickGain() {
    let base = new Decimal(1);

    if (hasUpgrade("c1", 11)) base = base.mul(upgradeEffect("c1", 11));
    return base;
}

function doClick() {
    
    let gain = getClickGain();
    player.c1.points = player.c1.points.add(gain);
    }

addLayer("c1", { 
    name: "Cola", // 这是可选的，只在少数地方使用，如果没有就直接用图层 ID。
    symbol: "Cola", // 这会出现在图层的节点上。默认是首字母大写的 ID
    position: 0, // 行内的水平位置。默认情况下，它使用图层 ID 并按字母顺序排序
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#3f2500",
    tabFormat: {
        "可乐": {
            content: [
                "requires",
                "main-display",
                "blank",
                "clickables",
                "buyables",
                "blank",
                "upgrades",
                "blank",
                
            ]
        },
        "金币": {
            color: "#FFD700",
            content: [
                ["display-text", () => {
                    return `你有 ${format(player.c1.points)} 金币`
                }],
                ["display-text", () => `点击获取 +${format(getClickGain())} 金币`],
                "blank",
                "clickables",
                "blank",
                "upgrades",
                "blank",
            ]
        }
    },

    requires: new Decimal(10), // 可以是一个考虑需求增加的函数
    resource: "coins", // 声望货币的名称
    baseResource: "mL", // 资源声望的名称是基于
    baseAmount() {return player.points}, // 获取当前的 baseResource 数量
    type: "normal", // 普通：获取货币的成本取决于获得的数量。固定：成本取决于你已经拥有多少。
    exponent: 0.5, // 声望货币指数
    gainMult() { // 计算主货币的奖金倍数
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // 从奖金计算主要货币的指数
        return new Decimal(1)
    },
    row: 0, // 层所在的行（0 是第一行）
    hotkeys: [
        {key: "m", description: "M: Reset for Coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    clickables: {
        11: {
            title: "赚取金币",
            color: "#FFD700",
            display() {
                return `点击获取 +${format(getClickGain())} 金币` },
            canClick() { return true;},
            onClick() { doClick(); }
            }
        },

    buyables: {
    11: {
        style: { 'height': '120px' },
        title: "购买可乐",
        cost(x) {
            let base = new Decimal(5)
            let rate = new Decimal(1.5)
            if (hasUpgrade("c1", 13)) rate = new Decimal(1.2)
            return base.mul(Decimal.pow(rate, x))
        },
        display() {
            let cost = this.cost(getBuyableAmount(this.layer, this.id))
            let gain = new Decimal(300)
            if (hasUpgrade("c1", 12)) gain = gain.add(200)
            return `花费 ${format(cost)} 金币<br>当前一次购买可获得 ${format(gain)} mL`
        },
        canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id))) },
        buy() {
            let cost = this.cost(getBuyableAmount(this.layer, this.id))
            player[this.layer].points = player[this.layer].points.sub(cost)
            player.points = player.points.add(new Decimal(300))
            if (hasUpgrade("c1", 12)) player.points = player.points.add(new Decimal(200))
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        }
    }},
    
    upgrades: {
        11: {
            title: "喝300mL可乐",
            description: "你渴望喝下更多Cola,可乐以0.03倍提升金币获取",
            cost: new Decimal(300),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { let eff = player.points.mul(.03).max(1)
                return eff},
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return true }
        },
        12: {
            title: "喝1L可乐",
            description: "你不再满足于300mL的Cola,购买可乐改为获取500mL",
            cost: new Decimal(1000),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { return new Decimal(0.5) ;},
            unlocked() { return hasUpgrade("c1", 11); }
        },
        13: {
            title: "喝2.5L可乐",
            description: "你开始寻找批发商乐，可乐价格上涨乘数降低为1.2",
            cost: new Decimal(5000),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { return new Decimal(1.2) ;},
            unlocked() { return hasUpgrade("c1", 12); }
        }
        14: {
            title: "喝5L可乐",

    }     
})


addLayer("c2", {
    name: "Cola Concentrate", // 这是可选的，只在少数地方使用，如果没有就直接用图层 ID。
    symbol: "CC", // 这会出现在图层的节点上。默认是首字母大写的 ID
    position: 0, // 行内的水平位置。默认情况下，它使用图层 ID 并按字母顺序排序
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff9500",
    row: 1,
    
    layerShown(){return true}

    })