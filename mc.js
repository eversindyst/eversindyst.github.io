	var mc = {
	
		level : 1,
		exp : 0,
		gold : 0,
		TNL : 50,
		hpRegen : 0,
		manaRegen : 0,
		staminaRegen : 0,
		hp : 100,
		maxHP : 96,
		hpRPer : .0015,
		mana : 50,
		maxMana : 40,
		manaRPer : .00083,
		stamina : 150,
		maxStamina : 141,
		staminaRPer : .0017,
		strength : 10,	//Every 2 Strength gives 1 base damage. Every 5 Strength gives 1 hp
		intelligence : 10, //Every 2 Intelligence gives 1% spell damage. Every 5 intelligence gives 2 mana
		dexterity : 10, //Every 2 agility gives 1 stamina. Every 5 agility gives 1% increase crit, 5% crit damage.
		endurance : 10, //Every 5 endurance gives 1 hp and 1 stamina. Every 10 endurance gives 1% physical damage reduction
		wisdom : 10,  //Every 5 wisdom gives 2 mana and 1% chance to avoid status effects. Every 10 wisdom gives 1% magical damage reduction
		agility : 10,  //Every 5 agility gives 1 stamina and 1 mana. Every 10 agility gives 1% evasion chance
		baseDamage : 0,
		spellDamage : 0,
		fireDamage : 0,
		coldDamage : 0,
		shockDamage : 0,
		darkDamage : 0,
		critChnc : 3,
		critDmg : 140,
		armor : 5,
		evasion : 10,
		flatArmor : 0,
		flatEvasion : 0,
		flatResist : 0,
		resist : 5,
		fireResist : 0,
		coldResist : 0,
		shockResist : 0,
		leech : 0,
		charClass : "Warrior",  //warrior, mage, rogue, priest for base classes. Assassin, Illusionist, Berserker, Fencer, Warlock, Shaman, Tactician, Alchemist, Psion, Myrmidon, Shadow, Elementalist other classes. Hero Ninja Sorcerer Avatar as final classes
		charClassNum : 0,	//warrior 0, mage 1, rogue 2, priest 3. fencer 4. tactician 5. myrmidon 6. assassin 7. alchemist 8. shadow 9. illusionist 10. warlock 11. elementalist 12. berserker 13. shaman 14. psion 15. Hero 16. Ninja 17. Sorcerer 18. Avatar 19
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
		var newMC = {
	
		level : 1,
		exp : 0,
		gold : 0,
		TNL : 50,
		hpRegen : 0,
		manaRegen : 0,
		staminaRegen : 0,
		hp : 100,
		maxHP : 96,
		hpRPer : .0015,
		mana : 50,
		maxMana : 40,
		manaRPer : .00083,
		stamina : 150,
		maxStamina : 141,
		staminaRPer : .0017,
		strength : 10,	//Every 2 Strength gives 1 base damage. Every 5 Strength gives 1 hp
		intelligence : 10, //Every 2 Intelligence gives 1% spell damage. Every 5 intelligence gives 2 mana
		dexterity : 10, //Every 2 agility gives 1 stamina. Every 5 agility gives 1% increase crit, 5% crit damage.
		endurance : 10, //Every 5 endurance gives 1 hp and 1 stamina. Every 10 endurance gives 1% physical damage reduction
		wisdom : 10,  //Every 5 wisdom gives 2 mana and 1% chance to avoid status effects. Every 10 wisdom gives 1% magical damage reduction
		agility : 10,  //Every 5 agility gives 1 stamina and 1 mana. Every 10 agility gives 1% evasion chance
		baseDamage : 0,
		spellDamage : 0,
		fireDamage : 0,
		coldDamage : 0,
		shockDamage : 0,
		darkDamage : 0,
		critChnc : 3,
		critDmg : 140,
		armor : 5,
		evasion : 10,
		flatArmor : 0,
		flatEvasion : 0,
		flatResist : 0,
		resist : 5,
		fireResist : 0,
		coldResist : 0,
		shockResist : 0,
		leech : 0,
		charClass : "Warrior",  //warrior, mage, rogue, priest for base classes. Assassin, Illusionist, Berserker, Fencer, Warlock, Shaman, Tactician, Alchemist, Psion, Myrmidon, Shadow, Elementalist other classes. Hero Ninja Sorcerer Avatar as final classes
		charClassNum : 0,	//warrior 0, mage 1, rogue 2, priest 3. fencer 4. tactician 5. myrmidon 6. assassin 7. alchemist 8. shadow 9. illusionist 10. warlock 11. elementalist 12. berserker 13. shaman 14. psion 15. Hero 16. Ninja 17. Sorcerer 18. Avatar 19
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
	return newMC;
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
		$('#armPerc').text(calcArmor(mc.functionalArmor, mc.level, mc.endurance, mc.flatArmor));
		$('#evaPerc').text(calcEva(mc.functionalEvasion, mc.level, mc.agility, mc.flatEvasion));
		$('#resPerc').text(calcRes(mc.functionalResist, mc.level, mc.wisdom, mc.flatResist));
		$('#statLeech').text(mc.functionalLeech);
		$('#statHp').text(Math.round(mc.hp));      $('#statMHp').text(mc.functionalMaxHP);
		$('#statMn').text(Math.round(mc.mana));    $('#statMMn').text(mc.functionalMaxMana);
		$('#statSt').text(Math.round(mc.stamina)); $('#statMSt').text(mc.functionalMaxStamina);
		$('#hpReg').text(Math.round(mc.hpRegen*100)/100);
		$('#manaReg').text(Math.round(mc.manaRegen*100)/100);
		$('#stamReg').text(Math.round(mc.staminaRegen*100)/100);
		$('#className').text(mc.charClass);
	}
	function calcArmor(x, y, z, a){
		var damReduc = Math.round(((Math.round((x/(x+(50+y*2.5))+z/1000)*10000)/100)+a) * 100)/100;
		return damReduc;
	}
	function calcEva(x, y, z, a){
		var damReduc = Math.round(((Math.round((x/(x+(100+y*1.2))+z/1000)*10000)/100)+a) * 100)/100;
		return damReduc;
	}
	function calcRes(x, y, z, a){
		var damReduc = Math.round(((Math.round((x/(x+(25+y*1.5))+z/1000)*10000)/100)+a) * 100)/100;
		return damReduc;
	}
	function displayStats(){
	//	$('#counter').text(counter);	
		$('#currentHP').text(Math.round(mc.hp));
		$('#currentMana').text(Math.round(mc.mana));
		$('#currentStamina').text(Math.round(mc.stamina));
		colorizeStats();
	}
	function calculateFunctionalStats(){
		mc.functionalStrength = Math.round(Number((mc.strength + bonus["Str"]) * more["Str"]));
		mc.functionalIntelligence = Math.round(Number((mc.intelligence + bonus["Int"]) * more["Int"]));
		mc.functionalDexterity = Math.round(Number((mc.dexterity + bonus["Dex"]) * more["Dex"]));
		mc.functionalEndurance = Math.round(Number((mc.endurance + bonus["End"]) * more["End"]));
		mc.functionalWisdom = Math.round(Number((mc.wisdom + bonus["Wis"]) * more["Wis"]));
		mc.functionalAgility = Math.round(Number((mc.agility + bonus["Agi"]) * more["Agi"]));
		mc.functionalMaxHP = Math.round(Number((mc.maxHP + Math.floor((mc.functionalStrength/5) + (mc.functionalEndurance/5))+bonus["HP"])*more["HP"]));
		mc.functionalMaxMana = Math.round(Number((mc.maxMana + Math.floor(((mc.functionalIntelligence/5)*2) + ((mc.functionalWisdom/5)*2) + (mc.functionalAgility/5))+bonus["Mana"])*more["Mana"]));
		mc.functionalMaxStamina = Math.round(Number((mc.maxStamina + Math.floor((mc.functionalDexterity/2) + (mc.functionalEndurance/5) + (mc.functionalAgility/5))+bonus["Stamina"])*more["Stamina"]));
		mc.hpRegen = Math.round(Number((mc.functionalMaxHP * (mc.hpRPer * more["HReg"])))*1000)/1000;
		mc.manaRegen = Math.round(Number((mc.functionalMaxMana * (mc.manaRPer * more["MReg"])))*1000)/1000;
		mc.staminaRegen = Math.round(Number((mc.functionalMaxStamina * (mc.staminaRPer * more["SReg"])))*1000)/1000;
		
		mc.functionalBaseDamage = Math.round(Number((mc.baseDamage + Math.floor(mc.functionalStrength/2) + bonus["BaseDamage"])*more["BaseDamage"]));
		mc.functionalSpellDamage = Math.round(Number((mc.spellDamage + Math.floor(mc.functionalIntelligence/2) + bonus["SpellDamage"])*more["SpellDamage"]));
		mc.functionalFireDamage = Math.round(Number((mc.fireDamage + bonus["FireDamage"])*more["FireDamage"]));
		mc.functionalColdDamage = Math.round(Number((mc.coldDamage + bonus["ColdDamage"])*more["ColdDamage"]));
		mc.functionalShockDamage = Math.round(Number((mc.shockDamage + bonus["ShockDamage"])*more["ShockDamage"]));
		mc.functionalDarkDamage = Math.round(Number((mc.darkDamage + bonus["DarkDamage"])*more["DarkDamage"]));
		mc.functionalCritChnc = Math.round(Number((mc.critChnc + Math.floor(mc.functionalAgility/5) + bonus["CritChnc"])*more["CritChnc"]));
		mc.functionalCritDmg = Math.round(Number((mc.critDmg + (Math.floor(mc.functionalAgility/5)*5) + bonus["CritDmg"])*more["CritDmg"]));
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
		if(mc.exp >= mc.TNL){
			gainLevel();
		}
		$('#expTNL').text(Math.round((mc.exp/mc.TNL)*10000)/100);
	}
	function gainLevel(){
		mc.level += 1;
		mc.exp = 0;
		mc.maxHP = 96 + Math.round(mc.level * 4.3);
		mc.maxMana = 40 + Math.round(mc.level * 2.4);
		mc.maxStamina = 141 + Math.round(mc.level * 1.3);
		calculateFunctionalStats()
		mc.hp = mc.functionalMaxHP;
		mc.mana = mc.functionalMaxMana;
		mc.stamina = mc.functionalMaxStamina;
		
		if(mc.level < 30){
			mc.TNL = 50 + Math.round((4*(Math.pow(mc.level,3))/5));
		}
		else if(mc.level < 60){
				mc.TNL = 10000 + Math.round((4*(Math.pow(mc.level,3.2))/4));
			}
			else{
				mc.TNL = 4000000 + Math.round((6*(Math.pow(mc.level,3.6))/2));
			}
		checkMulticlass();
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