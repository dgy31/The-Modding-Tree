function getClickGain() {
    let base = new Decimal(1);
    
    if (hasUpgrade("c1", 11)) base = base.mul(upgradeEffect("c1", 11));
    if (hasMilestone("c1", 0)) base = base.mul(1.5);
    return base;
}

function doClick() {
    
    let gain = getClickGain();
    player.c1.points = player.c1.points.add(gain);
    }

addLayer("c1", { 
    name: "Cola", // 这是可选的，只在少数地方使用，如果没有就直接用图层 ID。
    symbol: "Cola", // 这会出现在图层的节点上。默认是首字母大写的 ID
    position: 0,// 行内的水平位置。默认情况下，它使用图层 ID 并按字母顺序排序
    row: 0,
    displayRow: 0, 
    color: "#3f2500",
    resource: "mL可乐",
    layerShown(){return true},

    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    
    tabFormat: {
        "可乐": {
            content: [
                "main-display",
                ["display-text", () => `你有 ${format(player.points)} mL 可乐`],
                ["display-text", () => `点击获取 +${format(getClickGain())} 金币`],
                "blank",
                "clickables",
                "blank",
                "buyables",
                "blank",
                "upgrades",
            ]
        },
        "里程碑": {
            content: [
                ["display-text", () => `你有 ${format(player.points)} mL 可乐`],
                ["display-text", () => `你有 ${format(player.c1.points)} 金币`],
                "blank",
                "milestones",
            ]
        }
    },

    //hotkeys: [{key: "m", description: "M: Reset for Coins", onPress(){if (canReset(this.layer)) doReset(this.layer)}},],
    
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
            if (hasUpgrade("c1", 12)) gain = gain.add(hasUpgrade("c1", 12))
            let amount = getBuyableAmount(this.layer, this.id)
            
            return `花费 ${format(cost)} 金币<br>当前一次购买可获得 ${format(gain)} mL<br>已购买瓶数: ${format(amount)}`
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

    milestones: {
        0: {
            requirementDescription: "拥有1000mL可乐",
            effectDescription: "尝到甜头，金币获取×1.5",
            done() { return player.points.gte(1000) }
        }
    },
    
    upgrades: {
        11: {
            title: "跃跃欲试",
            description: "你渴望更多Cola,可乐以0.03倍提升金币获取",
            cost: new Decimal(300),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { let eff = player.points.mul(.03).max(1)
                return eff},
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return true }
        },
        12: {
            title: "一口下去不满足",
            description: "可乐获取量增加300mL",
            cost: new Decimal(1000),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { return new Decimal(300) ;},
            unlocked() { return hasUpgrade("c1", 11); }
        },
        13: {
            title: "可乐批发商",
            description: "可乐价格上涨乘数降低到1.2",
            cost: new Decimal(2500),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() { return new Decimal(1.2) ;},
            unlocked() { return hasUpgrade("c1", 12); }
        },
        14: {
            title: "回收可乐瓶",
            description: "基于购买可乐次数提升金币获取",
            cost: new Decimal(5000),
            currencyDisplayName: "mL",
            currencyInternalName: "points",
            effect() {
                let amount = getBuyableAmount(this.layer, 11)
                let eff = new Decimal(amount).pow(0.1).max(1)
                return eff
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("c1", 13); }
        }
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