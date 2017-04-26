	function monster(monString){
		var s = monString.split(",");
		this.name = s[0];
		this.currHP = 0;
		this.hp = Number(s[1]);
		this.gHp = Number(s[2]);
		this.armor = Number(s[3]);
		this.gArmor = Number(s[4]);
		this.evasion = Number(s[5]);
		this.gEvasion = Number(s[6]);
		this.resist = Number(s[7]);
		this.gResist = Number(s[8]);
		this.damage = Number(s[9]);
		this.gDamage = Number(s[10]);
		this.dmgType = s[11];
		this.critChnc = Number(s[12]);
		this.gCritChnc = Number(s[13]);
		this.critDmg = Number(s[14]);
		this.gCritDmg = Number(s[15]);
		this.fireResist = Number(s[16]);
		this.gFireResist = Number(s[17]);
		this.coldResist = Number(s[18]);
		this.gColdResist = Number(s[19]);
		this.shockResist = Number(s[20]);
		this.gShockResist = Number(s[21]);
		this.xp = Number(s[22]);
		this.gXp = Number(s[23]);
		this.level = Number(s[24]);
		this.dropChnc = Number(s[25]);
		this.itemList = s[26];
		this.maxLoot = Number(s[27]);
		this.gold = Number(s[28]);
		this.ggold = Number(s[29]);
		
		
		
		this.levelUp = function(x){
			this.hp += Math.round(this.gHp * x);
			this.currHP = this.hp;
			this.armor += Math.round(this.gArmor * x);
			this.evasion += Math.round(this.gEvasion * x);
			this.resist += Math.round(this.gResist * x);
			this.damage += Math.round(this.gDamage * x);
			this.critChnc += Math.round(this.gCritChnc * x);
			this.critDmg += Math.round(this.gCritDmg * x);
			this.fireResist += Math.round(this.gFireResist * x);
			this.coldResist += Math.round(this.gColdResist * x);
			this.shockResist += Math.round(this.gShockResist * x);
			this.xp += Math.round(this.gXp * x);
			this.gold += Math.round(this.ggold * x);
			this.level = Math.round(this.level + x);
		}
		
		this.levelUp(s[24]);
	}
	function monsterDies(monster){
		var ss = "";
		itemDrop(monster.dropChnc, monster.itemList, monster.maxLoot);
		var lvlDiff = Math.max(Math.abs(mc.level-monster.level) - (4+(mc.level/16)),0);
		var xpMult = Math.max(Math.pow(((mc.level + 5)/(mc.level+5+Math.pow(lvlDiff,2.5))),1.5),0.01);
		var totalXp = Math.floor(monster.xp * xpMult);
		ss += "<span style='color:red'>The "+monster.name+" is dead!</span><br><span style='color:green'>You earn "+totalXp+" experience points!<br>You earn "+monster.gold+" Platinum!</span>";
		mc.gold += Math.round(Number(monster.gold));
		ss += gainXP(totalXp);
		return ss;
	}