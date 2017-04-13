	var counter = 0;
	var mc;
	var zoneHolder;
	var interval;
	var combatSkip = false;
	var currentMonsters = [];
	var isResting = false;
	var restingMessage = 0;
	var isDead = false;
	var deadMessage = false;
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
		Leech:1
	}
	
	function resetMore(){
		var moreHolder = {
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
		Leech:1
	};
	return moreHolder;
	}
	function resetBonus(){
		bonusHolder = {
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
	};
	return bonusHolder;
	}
	
	var lookupTable;
	
	function pageInit(){
		zoneHolder = getZone(0);
		printMap(zoneHolder.map);
		displayEntireMap(zoneHolder.map);
		mainTick(1);
	}
	function mainLoop(){
		if(!isDead){
					if(currentMonsters.length == 0){
						currentMonsters = checkRoom(zoneHolder);
						if(currentMonsters.length > 0){
							var ss = "<br><br>";
							for(var i=0; i < currentMonsters.length; i++){
								ss += "You encounter a "+currentMonsters[i].name+"!<br>";
							}
							var baby = $('#combatText').html();
							$('#combatText').html(baby).append(ss+"");
							$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
						}
					}
					if(currentMonsters.length > 0){
						if(combatSkip){
							var ss = doCombat();
							var baby = $('#combatText').html();
							if(baby.length > 20000){
								baby = baby.slice(getStringPosition(baby, "<br>", 20)+4);
							}
							$('#combatText').html(baby).append(ss);
							$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
							combatSkip = false;
						}
						else{
							combatSkip = true;
						}
					}
					else{
						if(isResting){
							doResting();
						}
						else{
							exploreMap();
						}
					}
					
					calculateFunctionalStats();
					regen();
					loadCharacterStats();
					displayStats();
				}
				else{
					doDead();
				}
	}
	function mainTick(x){
		var endTime = Date.now() + (x*1000);
		 interval = setInterval(function() {
			var elapsedTime = endTime - Date.now();
			if(elapsedTime < 0){
				var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*1000));
				console.log(timesRan);
			//	counter += timesRan;
				for(var i=0; i< timesRan; i++){
					mainLoop();
				}
				clearInterval(interval);
				mainTick(x);
			}
		}, 100);
	}
	function doDead(){
		var baby = $('#combatText').html();
		if(!deadMessage){
			$('#combatText').html(baby).append("<br><br><span style='color:red'>You are dead.<br>As you lay bloodied and beaten on the ground, your spirit leave your body."+
			"<br>\"Tisk tisk\", it says. \"Why would you make such poor choices that you die?\"<br>You will lay here until you are fully healed.</span><br>");
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
			deadMessage = true;
		}
		if(mc.hp >= mc.functionalMaxHP){
			$('#combatText').html(baby).append("<br><br><span style='color:green'>You awaken from what feels like a dark dream.<br>Looking around, you notice you have been brought back to life for another chance."+
			"<br>\"This time I will do better\", you say to yourself.</span><br>");
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
			deadMessage = false;
			isDead = false;
			newMap();
			currentMonsters = [];
		}
		displayStats();
		loadCharacterStats();
		deadRegen();
		
	}
	function doResting(){
		var baby = $('#combatText').html();
		if(restingMessage <= 0){
			$('#combatText').html(baby).append("<br><span style='color:cyan'>You are resting to regain your stamina</span>.<br>");
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
			restingMessage = 1;
		}
		if(mc.stamina >= (mc.functionalMaxStamina * .35)){
			$('#combatText').html(baby).append("<br><span style='color:cyan'>You stop resting and stand up. Ready to go again!</span>.<br>");
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
			isResting = false;
			restingMessage = 0;
		}
		playerRest();
	}
	function exploreMap(){
		mc.stamina -= zoneHolder.pathType;
		displayStats();
		if(mc.stamina > 0){
			zoneHolder.map = navigateMap(zoneHolder.map);
			printMap(zoneHolder.map);
			displayEntireMap(zoneHolder.map);
		}
		else{
			mc.stamina = 0;
			isResting = true;
		}
	}
	function multiLevelEnable(){
		mc.level = 99;
		gainLevel();
	}
	function newRandomZone(){
		zoneHolder = getZone(Math.floor(Math.random()*6));
	}
	function changeClass(x){
		mc = resetMC();
		more = resetMore();
		bonus = resetBonus();
		mc.charClassNum = x;
		mc.classPath = ""+x;
		mc.classesTaken = 1;
		switch(x){
			case(0): mc.charClass = "Warrior"; mc.baseClassNum = 0; break;
			case(1): mc.charClass = "Mage"; mc.baseClassNum = 1; break;
			case(2): mc.charClass = "Rogue"; mc.baseClassNum = 2; break;
			case(3): mc.charClass = "Monk"; mc.baseClassNum = 3; break;
		}
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
	function getStringPosition(string, subString, index){
		return string.split(subString, index).join(subString).length;
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
