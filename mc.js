	var mc = {
	
		skillsRemain : 1,
		dualWield : false,
		level : 1,
		exp : 0,
		gold : 0,
		TNL : 50,
		hpRegen : 0,
		manaRegen : 0,
		staminaRegen : 0,
		hp : 112,
		maxHP : 108,
		hpRPer : .0015,
		mana : 60,
		maxMana : 60,
		manaRPer : .00175,
		stamina : 150,
		maxStamina : 141,
		staminaRPer : .0019,
		strength : 10,	//Every 2 Strength gives 1 base damage. Every 5 Strength gives 1 hp
		intelligence : 10, //Every 2 Intelligence gives 1% spell damage. Every 5 intelligence gives 2 mana
		dexterity : 10, //Every 2 agility gives 1 stamina. Every 5 agility gives 1% increase crit, 5% crit damage.
		endurance : 10, //Every 5 endurance gives 1 hp and 1 stamina. Every 10 endurance gives 1% physical damage reduction
		wisdom : 10,  //Every 5 wisdom gives 2 mana and 1% chance to avoid status effects. Every 10 wisdom gives 1% resist
		agility : 10,  //Every 5 agility gives 1 stamina and 1 mana. Every 10 agility gives 1% evasion chance
		baseDamage : 3,
		spellDamage : 0,
		fireDamage : 0,
		coldDamage : 0,
		shockDamage : 0,
		darkDamage : 0,
		critChnc : 0,
		critDmg : 140,
		armor : 10,
		evasion : 10,
		flatArmor : 0,
		flatEvasion : 0,
		flatResist : 0,
		resist : 5,
		fireResist : 0,
		coldResist : 0,
		shockResist : 0,
		leech : 0,
		charClass : "Warrior",  //warrior, mage, rogue, monk for base classes. Assassin, Illusionist, Berserker, Fencer, Warlock, Shaman, Tactician, Alchemist, Psion, Myrmidon, Shadow, Elementalist other classes. Hero Ninja Sorcerer Avatar as final classes
		charClassNum : 0,	//warrior 0, mage 1, rogue 2, monk 3. fencer 4. tactician 5. myrmidon 6. assassin 7. alchemist 8. shadow 9. illusionist 10. warlock 11. elementalist 12. berserker 13. shaman 14. psion 15. Hero 16. Ninja 17. Sorcerer 18. Avatar 19
		baseClassNum : 0,
		classPath : "0",	//"0,7" = warrior and then assassin
		classesTaken : 1,
		
		totBaseDamage : 0,
		totFireDamage : 0,
		totColdDamage : 0,
		totShockDamage : 0,
		totDarkDamage : 0,
		
		functionalBaseDamage : 0,
		functionalSpellDamage : 0,
		functionalFireDamage : 0,
		functionalColdDamage : 0,
		functionalShockDamage : 0,
		functionalDarkDamage : 0,
		functionalCritChnc : 5,
		functionalCritDmg : 1.5,
		functionalArmor : 0,
		functionalEvasion : 0,
		functionalResist : 0,
		functionalFireResist : 0,
		functionalColdResist : 0,
		functionalShockResist : 0,
		functionalLeech : 0,
		
		functionalMaxHP : 0,
		functionalMaxMana : 0,
		functionalMaxStamina : 0,
		functionalStrength : 0,
		functionalIntelligence : 0,
		functionalDexterity : 0,
		functionalEndurance : 0,
		functionalWisdom : 0,
		functionalAgility : 0
	};
	
	function resetMC(){
		mc.level = 1;
		mc.exp = 0;
		mc.TNL = 50;
		mc.maxHP = 108;
		mc.maxMana = 60;
		mc.maxStamina = 141;
		mc.skillsRemain = 1;
		mc.dualWield = false;
		handleSkillBtn();
		currTree1 = null;
		currTree2 = null;
		currTree3 = null;
		t1Max = false;
		t2Max = false;
		t3Max = false;
		
		for(var key in cBonus){
			cBonus[key] = 0;
		}
		for(var key in cMore){
			cMore[key] = 1;
		}
		
		for(key in equipHolder){
			if(equipHolder[key] != null){
				unequipItem(equipHolder[key].slot);
			}
		}
		equipHolder = {mainHand:null, offHand:null, helmet:null, amulet:null, body:null, shoulders:null, gloves:null, pants:null, boots:null, ring:null, trinket:null, aura:null};
		inventoryHolder = new Array();
		allItemHolder = new Array();
		spellsHolder = new Array();
		equipSpells = {slot1: null,slot2: null,slot3: null};
		getPlayerSpells();
		generateInventory();
		genEquipTooltip();
		
	}
	
	function regen(){
		mc.hp += mc.hpRegen;
		if(mc.hp >= mc.functionalMaxHP)
			mc.hp = mc.functionalMaxHP;
		mc.mana += mc.manaRegen;
		if(mc.mana >= mc.functionalMaxMana)
			mc.mana = mc.functionalMaxMana;
		mc.stamina += mc.staminaRegen;
		if(mc.stamina >= mc.functionalMaxStamina)
			mc.stamina = mc.functionalMaxStamina;
	}
	function playerRest(){
		mc.stamina += (mc.staminaRegen*4);
		if(mc.stamina >= mc.functionalMaxStamina)
			mc.stamina = mc.functionalMaxStamina;
	}
	function deadRegen(){
		mc.hp += (mc.hpRegen * 4);
		if(mc.hp >= mc.functionalMaxHP)
			mc.hp = mc.functionalMaxHP;
	}
	function playerManRest(){
		mc.stamina += (mc.staminaRegen*2);
		if(mc.stamina >= mc.functionalMaxStamina)
			mc.stamina = mc.functionalMaxStamina;
		mc.hp += (mc.hpRegen * 2);
		if(mc.hp >= mc.functionalMaxHP)
			mc.hp = mc.functionalMaxHP;
		mc.mana += (mc.manaRegen * 2);
		if(mc.mana >= mc.functionalMaxMana)
			mc.mana = mc.functionalMaxMana;
	}
	
	function showCharacterStats(){
		$('#profilePage').toggle();
	}
	function loadCharacterStats(){
		$('#statLv').text(mc.level);$('#statStr').text(mc.functionalStrength);$('#statInt').text(mc.functionalIntelligence);
		$('#statDex').text(mc.functionalDexterity);$('#statEnd').text(mc.functionalEndurance);$('#statWis').text(mc.functionalWisdom);
		$('#statAgi').text(mc.functionalAgility);$('#statDmg').text(mc.functionalBaseDamage);$('#statSpD').text(mc.functionalSpellDamage);
		$('#statArm').text(mc.functionalArmor);$('#statEva').text(mc.functionalEvasion);$('#statRes').text(mc.functionalResist);
		$('#statCrC').text(mc.functionalCritChnc);$('#statCrD').text(mc.functionalCritDmg);$('#statFR').text(mc.functionalFireResist);
		$('#statCR').text(mc.functionalColdResist);$('#statSR').text(mc.functionalShockResist);$('#statFD').text(mc.functionalFireDamage);
		$('#statCD').text(mc.functionalColdDamage);$('#statSD').text(mc.functionalShockDamage);$('#statDD').text(mc.functionalDarkDamage);
		$('#statGold').text(shortenLargeNumber(mc.gold));$('#statExp').text(shortenLargeNumber((mc.TNL - mc.exp)));
		$('#armPerc').text(calcArmor(mc.functionalArmor, mc.level, mc.functionalEndurance, mc.flatArmor));
		$('#evaPerc').text(calcEva(mc.functionalEvasion, mc.level, mc.functionalAgility, mc.flatEvasion));
		$('#resPerc').text(calcRes(mc.functionalResist, mc.level, mc.functionalWisdom, mc.flatResist));
		$('#statLeech').text(mc.functionalLeech);
		$('#statHp').text(Math.floor(mc.hp));      $('#statMHp').text(mc.functionalMaxHP);
		$('#statMn').text(Math.floor(mc.mana));    $('#statMMn').text(mc.functionalMaxMana);
		$('#statSt').text(Math.floor(mc.stamina)); $('#statMSt').text(mc.functionalMaxStamina);
		$('#hpReg').text(Math.round(mc.hpRegen*100)/100);
		$('#manaReg').text(Math.round(mc.manaRegen*100)/100);
		$('#stamReg').text(Math.round(mc.staminaRegen*100)/100);
		$('#className').text(mc.charClass);
	}
	function calcArmor(curVal, targetLevel, statBonus, flatVal){
		var damReduc = Math.round(((Math.round((curVal/(curVal+(100+targetLevel*2.5))+statBonus/1000)*10000)/100)+flatVal) * 100)/100;
		return damReduc;
	}
	function calcEva(curVal, targetLevel, statBonus, flatVal){
		var damReduc = Math.round(((Math.round((curVal/(curVal+(170+targetLevel*1.7))+statBonus/1000)*10000)/100)+flatVal) * 100)/100;
		return damReduc;
	}
	function calcRes(curVal, targetLevel, statBonus, flatVal){
		var damReduc = Math.round(((Math.round((curVal/(curVal+(225+targetLevel*2.2))+statBonus/1000)*10000)/100)+flatVal) * 100)/100;
		return damReduc;
	}
	function displayStats(){
	//	$('#counter').text(counter);	
		$('#currentHP').text(Math.floor(mc.hp));
		$('#currentMana').text(Math.floor(mc.mana));
		$('#currentStamina').text(Math.floor(mc.stamina));
		colorizeStats();
	}
	function calculateFunctionalStats(){
		for(var key in bonus){
			bonus[key] = 0;
		}
		for(var key in more){
			more[key] = 1;
		}
		for(var key in equipHolder){
			if(equipHolder[key] != null){
				var item = equipHolder[key];
				for(var index=0; index<item.base.length; index++){
					var statHold = item.base[index].split(":");
					bonus[statHold[0]] += Number(statHold[1]);			
				}
			}
		}
		for(var key in bonus){
			bonus[key] = bonus[key] + iBonus[key] + cBonus[key];
		}
		for(var key in more){
			more[key] = more[key] * iMore[key] * cMore[key];
		}

		mc.functionalStrength = Math.round(Number((mc.strength + bonus["Str"]) * more["Str"]));
		mc.functionalIntelligence = Math.round(Number((mc.intelligence + bonus["Int"]) * more["Int"]));
		mc.functionalDexterity = Math.round(Number((mc.dexterity + bonus["Dex"]) * more["Dex"]));
		mc.functionalEndurance = Math.round(Number((mc.endurance + bonus["End"]) * more["End"]));
		mc.functionalWisdom = Math.round(Number((mc.wisdom + bonus["Wis"]) * more["Wis"]));
		mc.functionalAgility = Math.round(Number((mc.agility + bonus["Agi"]) * more["Agi"]));
		mc.functionalMaxHP = Math.round(Number((mc.maxHP + bonus["HP"])*more["HP"]*(1+((mc.functionalEndurance/5)/100))));
		mc.functionalMaxMana = Math.round(Number((mc.maxMana + bonus["Mana"])*more["Mana"]*(1+(((mc.functionalWisdom/5))/100))));
		mc.functionalMaxStamina = Math.round(Number((mc.maxStamina +bonus["Stamina"])*more["Stamina"]*(1+((mc.functionalAgility/5)/100))));
		mc.hpRegen = Math.round(Number((mc.functionalMaxHP * (mc.hpRPer * more["HReg"] * (1+(mc.functionalEndurance/100)))))*1000)/1000;
		mc.manaRegen = Math.round(Number((mc.functionalMaxMana * (mc.manaRPer * more["MReg"] * (1+(mc.functionalWisdom/100)))))*1000)/1000;
		mc.staminaRegen = Math.round(Number((mc.functionalMaxStamina * (mc.staminaRPer * more["SReg"] * (1+(mc.functionalAgility/100)))))*1000)/1000;
		
		mc.functionalBaseDamage = Math.round(Number((mc.baseDamage + (mc.functionalStrength/5) + bonus["BaseDamage"])*more["BaseDamage"]*(1+((mc.functionalStrength/2)/100))));
		mc.functionalSpellDamage = Math.round(Number((mc.spellDamage + (mc.functionalIntelligence/2) + bonus["SpellDamage"])*more["SpellDamage"]));
		mc.functionalFireDamage = Math.round(Number((mc.fireDamage + ((mc.functionalIntelligence/5) * 2) + bonus["FireDamage"])*more["FireDamage"]));
		mc.functionalColdDamage = Math.round(Number((mc.coldDamage + ((mc.functionalIntelligence/5) * 2) + bonus["ColdDamage"])*more["ColdDamage"]));
		mc.functionalShockDamage = Math.round(Number((mc.shockDamage + ((mc.functionalIntelligence/5) * 2) + bonus["ShockDamage"])*more["ShockDamage"]));
		mc.functionalDarkDamage = Math.round(Number((mc.darkDamage + bonus["DarkDamage"])*more["DarkDamage"]));
		mc.functionalCritChnc = Math.round(Number((mc.critChnc + (mc.functionalDexterity/2.5) + bonus["CritChnc"])*more["CritChnc"]));
		mc.functionalCritDmg = Math.round(Number((mc.critDmg + ((mc.functionalDexterity/5)*5) + bonus["CritDmg"])*more["CritDmg"]));
		mc.functionalArmor = Math.round(Number((mc.armor + bonus["Armor"])*more["Armor"]));
		mc.functionalEvasion = Math.round(Number((mc.evasion + bonus["Evasion"])*more["Evasion"]));
		mc.functionalResist = Math.round(Number((mc.resist + bonus["Resist"])*more["Resist"]));
		mc.functionalFireResist = Math.round(Number((mc.fireResist + bonus["FireResist"])*more["FireResist"]));
		mc.functionalColdResist = Math.round(Number((mc.coldResist + bonus["ColdResist"])*more["ColdResist"]));
		mc.functionalShockResist = Math.round(Number((mc.shockResist + bonus["ShockResist"])*more["ShockResist"]));
		mc.functionalLeech = Math.round(Number((mc.leech + bonus["Leech"])*more["Leech"]));
		
		if(mc.functionalBaseDamage <= 0)
			mc.functionalBaseDamage = 1;
	}
		function colorizeStats(){
		$('#currentHP').css('color',getPercentColor((mc.hp/mc.functionalMaxHP)*100));
		$('#currentMana').css('color',getPercentColor((mc.mana/mc.functionalMaxMana)*100));
		$('#currentStamina').css('color',getPercentColor((mc.stamina/mc.functionalMaxStamina)*100));
		$('#statHp').css('color',getPercentColor((mc.hp/mc.functionalMaxHP)*100));
		$('#statMn').css('color',getPercentColor((mc.mana/mc.functionalMaxMana)*100));
		$('#statSt').css('color',getPercentColor((mc.stamina/mc.functionalMaxStamina)*100));
	}
	function getPercentColor(x){
		var pickedColor = "#FF0000";
		if(x >= 90){
			pickedColor = "#1CBABA";
		}
		else if(x >= 70){
			pickedColor = "#36F122";
		}
		else if(x >= 50){
			pickedColor = "#006EFF";
		}
		else if(x > 20){
			pickedColor = "#FFFE00";
		}
		return pickedColor;
	}
	function gainXP(x){
		mc.exp += x;
		var ss = "";
		if(mc.exp >= mc.TNL){
			x= mc.exp - mc.TNL
			ss = gainLevel();
			gainXP(x);
		}
		$('#expTNL').text(Math.round((mc.exp/mc.TNL)*10000)/100);
		return ss;
	}
	function gainLevel(){
		mc.level += 1;
		mc.exp = 0;
		var oldHp = mc.maxHP;
		var oldM = mc.maxMana;
		var oldS = mc.maxStamina;
		mc.maxHP = 108 + Math.round(mc.level * 7.3);
		mc.maxMana = 60 + Math.round(mc.level * 5.5);
		mc.maxStamina = 141 + Math.round(mc.level * 5.7);
		var ss = "<br><span style='color:red'>Ding! Congratulations, you are now level "+mc.level+"<br>You gain "+(mc.maxHP - oldHp)+" Hp, "+(mc.maxMana - oldM)+" Mana, and "+(mc.maxStamina-oldS)+" Stamina.</span><br>";
		calculateFunctionalStats()
		mc.hp = mc.functionalMaxHP;
		mc.mana = mc.functionalMaxMana;
		mc.stamina = mc.functionalMaxStamina;
		
		if(mc.level < 30){
			mc.TNL = 50 + Math.round((4*(Math.pow(mc.level,3))/5));
		}
		else if(mc.level < 60){
				mc.TNL = 10000 + Math.round((4*(Math.pow(mc.level,3.2))/3.5));
			}
			else{
				mc.TNL = 4000000 + Math.round((6*(Math.pow(mc.level,3.6))/1.5));
			}
		checkMulticlass();
		getPlayerSpells();
		mc.skillsRemain += 1;
		handleSkillBtn();
		return ss;
	}
	
	/* Each sub/final class needs a perma and temp passive. Along with their own skilllist and talents per level. You can multiclass at level 15 * x (x is classes youv'e been) AKA: first:15. Second:30. Third:45. Fourth:60. Final: 75
	fencer		-20% more damage when duel wielding		+5% armor
	tactician	-skills consume 2% of max mana and deal 1% more damage per 5 mana consumed	+10% max mana
	myrmidon	-critical strikes heal you for half the damage delt		+3% crit strike chance
	assassin	-killing an enemy gives 50% more damage for 3 seconds (stacks)		+25% crit damage
	alchemist	-using a skill has a chance to cast a random spell.		+5% resist
	shadow		-skills deal 10% extra damage as dark damage.		+10% stamina
	illusionist	-spells have a 20% chance to cast again.		+5% evasion
	warlock		-spells consume 10% of life to deal 1% more damage per 5 life consumed. +10% max life
	elementalist -taking elemental damage gives 40% resist to that element and 30% increased damage
				of that element for 3 seconds does not stack.	+5% all resist
				
	berserker -deal 1% more damage per 1% missing life.	+2% life leech
	shaman    -killing an enemy restores 5% mana.	+3% life +3% mana +3% stamina
	psion	  -your attacks deal up to 30% extra damage as a random element. +1.5% evasion +1.5% resist +1.5% armor
	
	hero		-Increases base damage by 15%
	ninja		-Increses critical strike chance by 10%
	sorcerer	-Increases spell damage by 20%
	avatar		-Increases all elemental damage by 10%
	
fencer			rogue -> warrior
tactician		mage -> warrior
myrmidon		monk -> warrior
assassin		warrior -> rogue
alchemist		mage -> rogue
shadow			monk -> rogue
illusionist		warrior -> mage
warlock			rogue -> mage
elementalist		monk -> mage
berserker		warrior -> monk
shaman			rogue -> monk
psion			mage -> monk
	*/