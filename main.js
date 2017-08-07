	var counter = 0;
	var mc;
	var zoneHolder;
	var interval;
	var combatSkip = false;
	var currentMonsters = [];
	var isResting = false;
	var isManResting = false;
	var restingMessage = 0;
	var isDead = false;
	var deadMessage = false;
	var showAnimation = true;
	var endTime;
	var mobKilled = 0;
	
	var mobCounter = 0;
	var itemCounter = 0;
	
	var bonus ={Str:0,Int:0,Dex:0,End:0,Wis:0,
				Agi:0,HP:0,Mana:0,Stamina:0,
				BaseDamage:0,SpellDamage:0,FireDamage:0,
				ColdDamage:0,ShockDamage:0,DarkDamage:0,
				CritChnc:0,CritDmg:0,Armor:0,Evasion:0,
				Resist:0,FireResist:0,ColdResist:0,
				ShockResist:0,Leech:0
	}
	var iBonus ={Str:0,Int:0,Dex:0,End:0,Wis:0,
				Agi:0,HP:0,Mana:0,Stamina:0,
				BaseDamage:0,SpellDamage:0,FireDamage:0,
				ColdDamage:0,ShockDamage:0,DarkDamage:0,
				CritChnc:0,CritDmg:0,Armor:0,Evasion:0,
				Resist:0,FireResist:0,ColdResist:0,
				ShockResist:0,Leech:0
	}
	var cBonus ={Str:0,Int:0,Dex:0,End:0,Wis:0,
				Agi:0,HP:0,Mana:0,Stamina:0,
				BaseDamage:0,SpellDamage:0,FireDamage:0,
				ColdDamage:0,ShockDamage:0,DarkDamage:0,
				CritChnc:0,CritDmg:0,Armor:0,Evasion:0,
				Resist:0,FireResist:0,ColdResist:0,
				ShockResist:0,Leech:0
	}

	var more ={Str:1,Int:1,Dex:1,End:1,Wis:1,
				Agi:1,HP:1,Mana:1,Stamina:1,
				BaseDamage:1,SpellDamage:1,FireDamage:1,
				ColdDamage:1,ShockDamage:1,DarkDamage:1,
				CritChnc:1,CritDmg:1,Armor:1,Evasion:1,
				Resist:1,FireResist:1,ColdResist:1,
				ShockResist:1,Leech:1,HReg:1,MReg:1,SReg:1
	}
	var iMore ={Str:1,Int:1,Dex:1,End:1,Wis:1,
				Agi:1,HP:1,Mana:1,Stamina:1,
				BaseDamage:1,SpellDamage:1,FireDamage:1,
				ColdDamage:1,ShockDamage:1,DarkDamage:1,
				CritChnc:1,CritDmg:1,Armor:1,Evasion:1,
				Resist:1,FireResist:1,ColdResist:1,
				ShockResist:1,Leech:1,HReg:1,MReg:1,SReg:1
	}
	var cMore ={Str:1,Int:1,Dex:1,End:1,Wis:1,
				Agi:1,HP:1,Mana:1,Stamina:1,
				BaseDamage:1,SpellDamage:1,FireDamage:1,
				ColdDamage:1,ShockDamage:1,DarkDamage:1,
				CritChnc:1,CritDmg:1,Armor:1,Evasion:1,
				Resist:1,FireResist:1,ColdResist:1,
				ShockResist:1,Leech:1,HReg:1,MReg:1,SReg:1
	}
	
	var lookupTable;
	
	function pickClass(x){
		switch(x){
			case(0): iBonus["Str"] +=2; iBonus["End"] +=2; mc.charClass = "Warrior"; mc.charClassNum = 0; mc.baseClassNum = 0; mc.classPath = "0"; break;
			case(1): iBonus["Int"] +=4; mc.charClass = "Mage"; mc.charClassNum = 1; mc.baseClassNum = 1; mc.classPath = "1"; break;
			case(2): iBonus["Dex"] +=1; iBonus["Agi"] +=3; mc.charClass = "Rogue"; mc.charClassNum = 2; mc.baseClassNum = 2; mc.classPath = "2"; break;
			case(3): iBonus["Str"] +=1; iBonus["Wis"] +=3; mc.charClass = "Monk"; mc.charClassNum = 3; mc.baseClassNum = 3; mc.classPath = "3"; break;
		}
		$('#firstTimeMenu').toggle();
		resetMC();
		startGame();
	}
	function showClassHelp(){
		$('#classHelpPage').toggle();
	}
	function pageInit(){
		endTime = Date.now() + 1000;
		zoneHolder = getZone(0);
		loadGame();
	}
	function startGame(){
		printMap(zoneHolder.map);
		displayEntireMap(zoneHolder.map);
		handleSkillBtn();
		mainTick(1);
		saveLoop(10);
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
					if(showAnimation)
						addText(ss);
				}
			}
			if(currentMonsters.length > 0){
				if(combatSkip){
					var ss = doCombat();
					if(showAnimation)
						addText(ss);
					
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
					if(isManResting){
						doManualRest();
					}
					else{
						exploreMap();
					}
				}
			}
			
			calculateFunctionalStats();
			regen();
			if(showAnimation){
				loadCharacterStats();
				displayStats();
				buildSpellMenuList();
			}
		}
		else{
			doDead();
		}
	}
	function mainTick(x){
		interval = setInterval(function() {
			var elapsedTime = endTime - Date.now();
			if(elapsedTime < 0){
				var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(x*1000));
			//	console.log(timesRan);
			//	counter += timesRan;
				if(timesRan > 1){
					showAnimation = false;
					for(var i=0; i<(timesRan-1); i++){
						mainLoop();
					}
					showAnimation = true;
				}
				mainLoop();
				clearInterval(interval);
				endTime = Date.now() + (x*1000);
				mainTick(x);
			}
		}, 100);
	}
	function saveLoop(x){
		var saveTime = Date.now() + (x * 1000);
		var interr = setInterval(function() {
			var elapsedTime = saveTime - Date.now();
			if(elapsedTime < 0){
				saveGame();
				clearInterval(interr);
				saveLoop(x);
			}
		}, 100);
	}
	
	setTimeout(function(){
		console.log("Mobs per hour: "+mobCounter *3);
		console.log("Items per hour: "+itemCounter *3);
	}, 1200000);
	
	function addText(ss){
		var baby = $('#combatText').html();
		if(baby.length > 20000){
			baby = baby.slice(getStringPosition(baby, "<br>", 20)+4);
		}
		if(Math.abs($('#combatText').scrollTop() - ($('#combatText').prop("scrollHeight")-399)) <= 5){
			$('#combatText').html(baby).append(ss);
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
		}	
		else{
			$('#combatText').html(baby).append(ss);
		}
		if($('#combatText').prop("scrollHeight") <= 700)
			$('#combatText').scrollTop($('#combatText').prop("scrollHeight"));
	}
	function doDead(){
		var ss = "";
		if(!deadMessage){
			ss = "<br><br><span style='color:red'>You are dead.<br>As you lay bloodied and beaten on the ground, your spirit leave your body."+
			"<br>\"Tisk tisk\", it says. \"Why would you make such poor choices that you die?\"<br>You will lay here until you are fully healed.</span><br>";
			if(showAnimation){
				addText(ss);
				deadMessage = true;
			}
		}
		if(mc.hp >= mc.functionalMaxHP){
			ss = "<br><br><span style='color:green'>You awaken from what feels like a dark dream.<br>Looking around, you notice you have been brought back to life for another chance."+
			"<br>\"This time I will do better\", you say to yourself.</span><br>";
			if(showAnimation)
				addText(ss);
			deadMessage = false;
			isDead = false;
			newMap();
			currentMonsters = [];
		}
		if(showAnimation){
			displayStats();
			loadCharacterStats();
		}
		deadRegen();
		
	}
	function doResting(){
		var ss = "";
		if(restingMessage <= 0){
			ss = "<br><span style='color:cyan'>You are resting to regain your stamina.</span><br>";
			if(showAnimation){
				addText(ss);
				restingMessage = 1;
			}
		}
		if(mc.stamina >= mc.functionalMaxStamina){
			ss = "<br><span style='color:cyan'>You stop resting and stand up. Ready to go again!</span><br>";
			if(showAnimation)
				addText(ss);
			isResting = false;
			restingMessage = 0;
		}
		playerRest();
	}
	function doManualRest(){
		var ss = "";
		if(restingMessage <= 0){
			ss = "<br><span style='color:cyan'>You sit down to rest.</span><br>";
			if(showAnimation){
				addText(ss);
				restingMessage = 1;
			}
		}
		if(mc.stamina >= mc.functionalMaxStamina && mc.hp >= mc.functionalMaxHP && mc.mana >= mc.functionalMaxMana){
			ss = "<br><span style='color:cyan'>You stop resting and stand up. Ready to go again!</span><br>";
			if(showAnimation)
				addText(ss);
			isManResting = false;
			restingMessage = 0;
		}
		playerManRest();
	}
	function setManRest(){
		isManResting = true;
	}
	function exploreMap(){
		mc.stamina -= zoneHolder.pathType;
		displayStats();
		if(mc.stamina > 0){
			zoneHolder.map = navigateMap(zoneHolder.map);
			if(showAnimation){
				printMap(zoneHolder.map);
				displayEntireMap(zoneHolder.map);
			}
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
	function changeClass(){
		resetMC();
		changeZone(0);
	}
	function resetGame(){
		if(confirm("Are you sure you want to reset your game?")){
			localStorage.clear();
			location.reload();
		}
	}
	
	function saveGame(){
	console.log("saving");
		localStorage.setItem("endTime", endTime);
		localStorage.setItem("zone", zoneHolder.id);
		localStorage.setItem("2player", JSON.stringify(mc));
		localStorage.setItem("isDead", isDead);
		localStorage.setItem("isResting", isResting);
		localStorage.setItem("equipItem", JSON.stringify(equipHolder));
		localStorage.setItem("invItem", JSON.stringify(inventoryHolder));
		localStorage.setItem("allItem", JSON.stringify(allItemHolder));
		localStorage.setItem("mapProg", JSON.stringify(mapCompletion));
		localStorage.setItem("charBonus", JSON.stringify(iBonus));
		localStorage.setItem("charMore", JSON.stringify(iMore));
		localStorage.setItem("savedTree", selectedSkills);
		localStorage.setItem("eqSpells", JSON.stringify(equipSpells));
		localStorage.setItem("spellHold", JSON.stringify(spellsHolder));
		localStorage.setItem("2Time", "true");
	}
	function loadGame(){
		if(localStorage.getItem("2Time")){
			if(localStorage.getItem("endTime"))
				endTime = localStorage.getItem("endTime");
		//	endTime = Number(Date.now()-(60*1000*60*24));
			if(localStorage.getItem("zone"))
				zoneHolder = getZone(localStorage.getItem("zone"));
			if(localStorage.getItem("2player"))
				mc = JSON.parse(localStorage.getItem("2player"));
			if(localStorage.getItem("isDead"))
				isDead = (localStorage.getItem('isDead') == 'true');
			if(localStorage.getItem("isResting"))
				isResting = (localStorage.getItem('isResting') == 'true');
			if(localStorage.getItem("equipItem"))
				equipHolder = JSON.parse(localStorage.getItem("equipItem"));
			if(localStorage.getItem("invItem"))
				inventoryHolder = JSON.parse(localStorage.getItem("invItem"));
			if(localStorage.getItem("allItem"))
				allItemHolder = JSON.parse(localStorage.getItem("allItem"));	
			if(localStorage.getItem("mapProg"))
				mapCompletion = JSON.parse(localStorage.getItem("mapProg"));
			if(localStorage.getItem("charBonus"))
				iBonus = JSON.parse(localStorage.getItem("charBonus"));
			if(localStorage.getItem("charMore"))
				iMore = JSON.parse(localStorage.getItem("charMore"));
			if(localStorage.getItem("savedTree"))
				selectedSkills = localStorage.getItem("savedTree");
			if(localStorage.getItem("eqSpells"))
				equipSpells = JSON.parse(localStorage.getItem("eqSpells"));
			if(localStorage.getItem("spellHold"))
				spellsHolder = JSON.parse(localStorage.getItem("spellHold"));
			
				
			generateInventory();
			genEquipTooltip();
						
			checkMulticlass();
			calculateLoadedData();
			calculateMapData();
			unlockZone();
			getPlayerSpells();
			handleSkillBtn();
			loadSavedSkills();
			saveGame();
			startGame();
		}
		else{
			$('#firstTimeMenu').toggle();
		}
	}
	function tmc(){
		mc.level = 39;
		gainLevel();
	}
	function tst(){
		mc.level = 99;
		gainLevel();
		mc.skillsRemain = 100;
		mc.gold = 12313;
		mc.gold *= 12389;
	}
	function calculateMapData(){
		for(var i=0; i < mapCompletion.length; i++){
			if(mapCompletion[i]){
				completeZone(i);
			}
		}
	}
	function calculateLoadedData(){
		var elapsedTime = endTime - Date.now();
		if(elapsedTime < 0){
			var timesRan = 1+Math.floor(Math.abs(elapsedTime)/(1000));
			if(timesRan >= 120){
				calculateFunctionalStats();
				var mobchnc = .015;
				var pcDmg = .4 * (mc.functionalBaseDamage *(1+(mc.functionalSpellDamage + mc.functionalFireDamage + mc.functionalColdDamage + mc.functionalShockDamage + mc.functionalDarkDamage)/100) * ((mc.functionalCritChnc/100) * (mc.functionalCritDmg+1)));
				var mobHp = 50 + (6 * Math.pow(1.125,zoneHolder.level) * (zoneHolder.level/1.5));
				var combatTurns = Math.max((mobHp / pcDmg),1);
				var oldLvl = mc.level;
				var lvlDiff = zoneHolder.level - oldLvl;
				var effness = 1;
				if(lvlDiff > 3){
					effness *= .8;
				}
				if(lvlDiff > 5){
					effness *= .8;
				}
				if(lvlDiff > 7){
					effness *= .7;
				}
				var fights = Math.round(((timesRan * mobchnc) / combatTurns) * effness);
				var mobxp = 4 + (3 * Math.pow(1.07, zoneHolder.level * 1.5));
				var mobplat = 1 + (1.1 * Math.pow(1.03, zoneHolder.level * 1.5));
				var platGain = Math.round(mobplat * fights);
				var xpGain = Math.round(mobxp * fights);
				var totXpGain = 0;
				
				for(var x=0; x < fights; x++){
					var lvlDiff = Math.max(Math.abs(mc.level-zoneHolder.level) - (4+(mc.level/16)),0);
					var xpMult = Math.max(Math.pow(((mc.level + 5)/(mc.level+5+Math.pow(lvlDiff,2.5))),1.5),0.01);
					var totalXp = Math.floor(mobxp * xpMult);
					totXpGain += totalXp;
					gainXP(totalXp);
				}
				var newLvl = mc.level - oldLvl;
				
				mc.gold += platGain;
				var ss = "";
				if(newLvl == 1){
					ss = "While you were offline you killed "+fights+" monsters and earned "+platGain+" platinum, "+totXpGain+" experience, and "+newLvl+" level!";
				}
				else{
					if(newLvl > 1){
						ss = "While you were offline you killed "+fights+" monsters and earned "+platGain+" platinum, "+totXpGain+" experience, and "+newLvl+" levels!";
					}
					else{
						ss = "While you were offline you killed "+fights+" monsters and earned "+platGain+" platinum and "+totXpGain+" experience!";
					}
				}
				ss += "<br>";
				addText(ss);
				endTime = Date.now() + 1000;
			}	
		}
	}
	function godMode(){
		var godTime = Date.now() + (1000);
		var interr = setInterval(function() {
			var elapsedTime = godTime - Date.now();
			if(elapsedTime < 0){
				mc.hp = 100000;
				mc.mana = 100000;
				mc.stamina = 100000;
				clearInterval(interr);
				godMode();
			}
		}, 100);
	}
	
	function showHelpMenu(){
		$('#helpPage').toggle();
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
