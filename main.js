	var counter = 0;
	var mc;
	var zoneHolder;
	var interval;
	var mapsCompleted = 0;
	var bonus = {
		Str:0,
		Int:0,
		Dex:0,
		End:0,
		Wis:0,
		Agi:0,
		HP:0,
		Mana:0,
		Stamina:0,
		BaseDamage:0,
		SpellDamage:0,
		FireDamage:0,
		ColdDamage:0,
		ShockDamage:0,
		DarkDamage:0,
		CritChnc:0,
		CritDmg:0,
		Armor:0,
		Evasion:0,
		Resist:0,
		FireResist:0,
		ColdResist:0,
		ShockResist:0,
		Leech:0
	}
	var more = {
		Str:1,
		Int:1,
		Dex:1,
		End:1,
		Wis:1,
		Agi:1,
		HP:1,
		Mana:1,
		Stamina:1,
		HReg:1,
		MReg:1,
		SReg:1,
		BaseDamage:1,
		SpellDamage:1,
		FireDamage:1,
		ColdDamage:1,
		ShockDamage:1,
		DarkDamage:1,
		CritChnc:1,
		CritDmg:1,
		Armor:1,
		Evasion:1,
		Resist:1,
		FireResist:1,
		ColdResist:1,
		ShockResist:1,
		Leech:0
	}
	
	var lookupTable;
	
	function pageInit(){
		zoneHolder = getZone(6);
		printMap(zoneHolder.map);
		displayEntireMap(zoneHolder.map);
		createCooldown(1);
	}
	
	function createCooldown(x){
		var endTime = Date.now() + (x*500);
		 interval = setInterval(function() {
			var elapsedTime = endTime - Date.now();
			if(elapsedTime < 0){
				var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*500));
				clearInterval(interval);
				createCooldown(x);
			//	counter += timesRan;
				zoneHolder.map = navigateMap(zoneHolder.map);
				printMap(zoneHolder.map);
				displayEntireMap(zoneHolder.map);
				calculateFunctionalStats();
				regen();
				loadCharacterStats();
				displayStats();
			}
		}, 10);
	}
	
	function newRandomZone(){
		zoneHolder = getZone(Math.floor(Math.random()*6));
	}
	
	function shortenLargeNumber(number){
	var SI_PREFIXES = ["Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion"];
    var tier = Math.log10(number) / 3 | 0;
    if(tier < 2) return Math.round(number).formatMoney();
    var prefix = SI_PREFIXES[tier-2];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
	return scaled.toFixed(2) + " "+prefix;
}
	

	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
		c = isNaN(c = Math.abs(c)) ? 0 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	};
	
	//mapHolder = navigateMap(m);
//		printMap(maze, startingX, startingY);
