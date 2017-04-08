	function monster(hp, armor, evasion, resist, damage, dmgType, critChnc, critDmg, fireResist, coldResist, shockResist, baseXp, xp, level, dropChnc, itemList, maxLoot){
		this.hp = 50;
		this.gHp = hp;
		this.armor = 1;
		this.gArmor = armor;
		this.evasion = 5;
		this.gEvasion = evasion;
		this.resist = 0;
		this.gResist = resist;
		this.damage = 2;
		this.gDamage = damage;
		this.dmgType = dmgType;
		this.critChnc = 3;
		this.gCritChnc = critChnc;
		this.critDmg = 110;
		this.gCritDmg = critDmg;
		this.fireResist = 0;
		this.gFireResist = fireResist;
		this.coldResist = 0;
		this.gColdResist = coldResist;
		this.shockResist = 0;
		this.gShockResist = shockResist;
		this.xp = Number(baseXp);
		this.gXp = xp;
		this.level = level;
		this.dropChnc = Number(dropChnc);
		this.itemList = itemList;
		this.maxLoot = Number(maxLoot);
		
		
		
		this.levelUp = function(x){
			this.hp += Math.round(this.gHp * x);
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
		}
		
		this.levelUp(level);
	}
	function monsterDies(monster){
		itemDrop(monster.dropChnc, monster.itemList, monster.maxLoot);
	}