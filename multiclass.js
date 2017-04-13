	function checkMulticlass(){
		if(mc.level >= mc.classesTaken * 15){
			if(mc.charClassNum < 16)
				showMulticlassBtn();
		}
	}
	function showMulticlassBtn(){
		$('#multiMenu:hidden').toggle();
	}
	function showMulticlass(){
		$('#multiclassMenu').toggle();
		if($('#multiclassMenu').is(":visible")){
			showMulticlassOptions();
		}
	}
	
	function showMulticlassOptions(){
		var classPath = mc.classPath;
		var classHolder = classPath.split(",");
		var hasWarrior = false;
		var hasRogue = false;
		var hasMage = false;
		var hasMonk = false;
		var ss = "";
		for(var x=0; x < classHolder.length; x++){
			if(classHolder[x] == 0 || classHolder[x] == 4 || classHolder[x] == 5 || classHolder[x] == 6)
				hasWarrior = true;
			if(classHolder[x] == 2 || classHolder[x] == 7 || classHolder[x] == 8 || classHolder[x] == 9)
				hasRogue = true;
			if(classHolder[x] == 1 || classHolder[x] == 10 || classHolder[x] == 11 || classHolder[x] == 12)
				hasMage = true;
			if(classHolder[x] == 3 || classHolder[x] == 13 || classHolder[x] == 14 || classHolder[x] == 15)
				hasMonk = true;
		}
		if(hasWarrior && hasRogue && hasMage && hasMonk){
			switch(Number(classHolder[0])){
				case(0):ss+= "16,"; break;
				case(1):ss+= "18,"; break;
				case(2):ss+= "17,"; break;
				case(3):ss+= "19,"; break;
			}
		}
		else{
			switch(mc.baseClassNum){
				case(0):
					if(!hasRogue)
						ss += "7,";
					if(!hasMage)
						ss += "10,";
					if(!hasMonk)
						ss += "13,";
					break;
				case(1):
					if(!hasRogue)
						ss += "8,";
					if(!hasWarrior)
						ss += "5,";
					if(!hasMonk)
						ss += "15,";
					break;
				case(2):
					if(!hasWarrior)
						ss += "4,";
					if(!hasMage)
						ss += "11,";
					if(!hasMonk)
						ss += "14,";
					break;
				case(3):
					if(!hasRogue)
						ss += "9,";
					if(!hasMage)
						ss += "12,";
					if(!hasWarrior)
						ss += "6,";
					break;
			}
		}
		ss = buildClassToolTips(ss);
		$('#multiclassMenu').html(ss);
	}
	function buildClassToolTips(ss){
		var base = ss.split(",");
		var stringBuild = "<div class='multiclassHolder'>You have achieved enough experience in your current class and may now multiclass.<br><br>";
		for(var index=0; index<base.length-1; index++){
			stringBuild += "<div style='color:green' class='multiclassList' onclick='selectMulticlass(";
			switch(Number(base[index])){
				case(4):stringBuild = stringBuild + "4)'> Fencer <span class='tooltip'>"+
				"Base class: Warrior<br>The Fencer specializes in dual wielding and attacking ferociously."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Gain 20% increased damage while dual wielding</span><br>"+
				"<span style='color:lightgreen'>+Increases the damage reduction from Armor by 5%</span></span>";break;
				case(5):stringBuild = stringBuild + "5)'> Tactician <span class='tooltip'>"+
				"Base class: Warrior<br>The Tactician utilizes their perception and wit to perform davestating blows to their enemies."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Skills consume up to 2% of maximum mana to deal 1% increased damage per 5 mana consumed </span><br>"+
				"<span style='color:lightgreen'>+Increases maximum mana by 10%</span></span>";break;
				case(6):stringBuild = stringBuild + "6)'> Myrmidon <span class='tooltip'>"+
				"Base class: Warrior<br>The Myrmidon hones in on their surroundings to strike precisely and efficiently."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Critical Strikes heal you for 50% of the damage delt</span><br>"+
				"<span style='color:lightgreen'>+Increases Critical Strike Chance by 3%</span></span>";break;
				case(7):stringBuild = stringBuild + "7)'> Assassin <span class='tooltip'>"+
				"Base class: Rogue<br>The Assassin specializes in dealing high damage to solo targets."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Killing an enemy increases damage by 50% for 3 seconds. This effect can stack</span><br>"+
				"<span style='color:lightgreen'>+Increases Critical Strike Damage by 25%</span></span>";break;
				case(8):stringBuild = stringBuild + "8)'> Alchemist <span class='tooltip'>"+
				"Base class: Rogue<br>Crazed and resilient, the Alchemist brews deadly and helpful concoctions to assault his foes and benefit itself."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Using a kill has a 20% chance to use a random potion</span><br>"+
				"<span style='color:lightgreen'>+Increases the damage reduction from Resist by 5%</span></span>";break;
				case(9):stringBuild = stringBuild + "9)'> Shadow <span class='tooltip'>"+
				"Base class: Rogue<br>With a deep background in the elements, the Shadow is able to delve deeper and reach the power of Darkness."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Skills will deal 10% extra damage as Dark damage</span><br>"+
				"<span style='color:lightgreen'>+Increases maximum stamina by 10%</span></span>";break;
				case(10):stringBuild = stringBuild + "10)'> Illusionist <span class='tooltip'>"+
				"Base class: Mage<br>\"Why cower in the backlines when you can be in the middle of a battle fighting along side yourself while sitting in the back laughing at your enemies\" - The Illusionist"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Taking elemental damage will cause your next spell of the same element to deal double damage</span><br>"+
				"<span style='color:lightgreen'>+Increases the chance to evade attacks by 5%</span></span>";break;
				case(11):stringBuild = stringBuild + "11)'> Warlock <span class='tooltip'>"+
				"Base class: Mage<br>The Warlock wildly wields destructive forces that puts even the casters very life in danger."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Spells consume up to 5% of maximum hp to deal 1% increased damage per 5 hp consumed</span><br>"+
				"<span style='color:lightgreen'>+Increases maximum hp by 10%</span></span>";break;
				case(12):stringBuild = stringBuild + "12)'> Elementalist <span class='tooltip'>"+
				"Base class: Mage<br>The Elementalist commands the forces of nature to unleash powerful spells at its enemies"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Spells will deal 30% extra damage as a random element</span><br>"+
				"<span style='color:lightgreen'>+Increases all elemental resist by 5%</span></span>";break;
				case(13):stringBuild = stringBuild + "13)'> Berserker <span class='tooltip'>"+
				"Base class: Monk<br>The Berserker is a blood-crazed madman. The Berserker is more dangerous the closer it gets to death"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Deals 1% increased damage per 1% missing life</span><br>"+
				"<span style='color:lightgreen'>+Increases Life Leech by 2%</span></span>";break;
				case(14):stringBuild = stringBuild + "14)'> Shaman <span class='tooltip'>"+
				"Base class: Monk<br>With a background in the deadly arts, the Shaman uses underhand tactics to dispatch of its enemies"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Your skills have a 20% chance to stun the enemy</span><br>"+
				"<span style='color:lightgreen'>+Increases maximum hp, maximum mana, and maximum stamina by 3%</span></span>";break;
				case(15):stringBuild = stringBuild + "15)'> Psion <span class='tooltip'>"+
				"Base class: Monk<br>The Psion infuses the power of the arcane with the physical body to create a deadly unstable entity"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightblue'>+Skills deal 30% extra damage as a random element</span><br>"+
				"<span style='color:lightgreen'>+Increases the damage reduction from Armor and Resist by 1.5% and increases the chance to evade attacks by 1.5%</span></span>";break;
				case(16):stringBuild = stringBuild + "16)'> Hero <span class='tooltip'>"+
				"Base class: Warrior<br>A seasoned Warrior, the Hero accumlates all it has learned to push its expertise to the next level"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightgreen'>+Increases base damage by 15%</span></span>";break;
				case(17):stringBuild = stringBuild + "17)'> Ninja <span class='tooltip'>"+
				"Base class: Rogue<br>The Ninja is a master in the arts of deception and misdirection. By analyzing the enemy the Ninja can delivery swift and deadly blows"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightgreen'>+Critical Strike Damage is increased by 10%</span></span>";break;
				case(18):stringBuild = stringBuild + "18)'> Sorcerer <span class='tooltip'>"+
				"Base class: Mage<br>A master the arcane and mystic, the Sorcerer channels its power to bring anything to its knees"+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightgreen'>+Increases spell damage by 20%</span></span>";break;
				case(19):stringBuild = stringBuild + "19)'> Avatar <span class='tooltip'>"+
				"Base class: Monk<br>Blazing fires, sub-zero tempests, and destructive cloudburst, all playthings for the Avatar."+
				"<br><br>Selecting this class will grant the following:<br><br>"+
				"<span style='color:lightgreen'>+Increases all elemental damage by 10%</span></span>";break;

			}
			stringBuild += "</div>";
		}
		var costColor = 'red';
		var multiCost = getMultiCost();
		if(multiCost < mc.gold){
			costColor = 'green';
		}
		stringBuild = stringBuild + "<br><br><br>It will cost you <span style='color:"+costColor+";'>"+shortenLargeNumber(multiCost)+"</span> Platinum to multiclass.</div>";
		return stringBuild;
	}
	function getMultiCost(){
		return Number(mc.classesTaken * 250000);
	}
	function selectMulticlass(x){
		mc.charClassNum = x;
		mc.classPath += ","+x;
		mc.classesTaken += 1;
		switch(x){
			case(4): mc.charClass = "Fencer"; mc.baseClassNum = 0; mc.flatArmor += 5; break;
			case(5): mc.charClass = "Tactician"; mc.baseClassNum = 0; more["Mana"] *= 1.1; break;
			case(6): mc.charClass = "Myrmidon"; mc.baseClassNum = 0; mc.critChnc += 3; break;
			case(7): mc.charClass = "Assassin"; mc.baseClassNum = 2; mc.critDmg += 25; break;
			case(8): mc.charClass = "Alchemist"; mc.baseClassNum = 2; mc.flatResist += 5; break;
			case(9): mc.charClass = "Shadow"; mc.baseClassNum = 2; more["Stamina"] *= 1.1; break;
			case(10): mc.charClass = "Illusionist"; mc.baseClassNum = 1; mc.flatEvasion += 5; break;
			case(11): mc.charClass = "Warlock"; mc.baseClassNum = 1; more["HP"] *= 1.1; break;
			case(12): mc.charClass = "Elementalist"; mc.baseClassNum = 1; mc.fireResist += 5; mc.coldResist += 5; mc.shockResist += 5;break;
			case(13): mc.charClass = "Berserker"; mc.baseClassNum = 3; mc.leech += 2; break;
			case(14): mc.charClass = "Shaman"; mc.baseClassNum = 3; more["Stamina"] *= 1.03; more["Mana"] *= 1.03; more["HP"] *= 1.03; break;
			case(15): mc.charClass = "Psion"; mc.baseClassNum = 3; mc.flatEvasion += 1.5; mc.flatArmor += 1.5; mc.flatResist += 1.5; break;
			case(16): mc.charClass = "Hero"; mc.baseClassNum = 0; more["BaseDamage"] *= 1.15; break;
			case(17): mc.charClass = "Ninja"; mc.baseClassNum = 2; more["CritDmg"] *= 1.1; break;
			case(18): mc.charClass = "Sorcerer"; mc.baseClassNum = 1; more["SpellDamage"] *= 1.2; break;
			case(19): mc.charClass = "Avatar"; mc.baseClassNum = 3; more["FireDamage"] *= 1.1; more["ColdDamage"] *= 1.1; more["ShockDamage"] *= 1.1; break;
		}
		$('#multiMenu:visible').toggle();
		$('#multiclassMenu:visible').toggle();
	}