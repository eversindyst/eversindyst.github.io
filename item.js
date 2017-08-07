	var equipHolder = {mainHand:null, offHand:null, helmet:null, amulet:null, body:null, shoulders:null, gloves:null, pants:null, boots:null, trinket:null, aura:null};
	var inventoryHolder = new Array();
	var allItemHolder = new Array();
	
	function item(id, slot, name, baseStats, effects, lvlStats, upgStats, upgName, upgEffects, xpMult, xpGain, is2H, isOH){
		this.id = id
		this.xpMult = xpMult;
		this.xpGain = xpGain;
		this.xp = 0;
		this.level = 1;
		this.slot = slot;
		this.name = name;
		this.baseName = name;
		this.baseStat = baseStats;
		this.upgStats = upgStats.split(";");
		this.upgName = upgName;
		this.base = baseStats.split(";");
		this.lvl = lvlStats.split(";");
		this.equip = false;
		this.effects = effects.split(";");
		this.upgEffects = upgEffects.split(";");
		if(is2H == null){
			this.is2H = false;
		}
		else{
			this.is2H = is2H;
		}
		if(isOH == null){
			this.isOH = false;
		}
		else{
			this.isOH = isOH;
		}
	}
	function checkDualWield(){
		mc.dualWield = false;
		if(equipHolder["mainHand"] != null && equipHolder["offHand"] != null){
			if(equipHolder["offHand"].isOH)
				mc.dualWield = true;
		}
	}
	function giveItemXP(item){
		if(item.level != 6){
			item.xp += Math.floor(Number(Math.pow(item.xpMult, (item.level-1)) * item.xpGain));
			if(item.xp >= 100){
				item.xp = 0;
				itemLevelUp(item);
			}
		}
		else{
			item.xp = 99;
		}
	}
	
	function itemLevelUp(item){
		if(item.level == 6)
			return;
		item.level += Number(1);
		if(item.level == 6){
			item.name = item.upgName;
			item.base = item.upgStats;
			item.effects = item.upgEffects;
		}
		else{
			item.name = item.baseName+" +"+(item.level-1);
			var base = item.base;
			var lvStat = item.lvl;
			for(var index=0; index<lvStat.length; index++){
				var found = false;
				var statHold = lvStat[index].split(":");
				for(var j=0; j<base.length; j++){
					var baseHold = base[j].split(":");
					if(statHold[0] == baseHold[0]){
						base[j] = baseHold[0]+":"+Number(Number(baseHold[1])+Number(statHold[1]));
						found = true;
					}
				}
				if(!found){
					base.push(lvStat[index]);
				}
			}
			item.base = base;
		}
		if(item.equip)
			genItemTooltip(item);
	}
	function genEquipTooltip(){
		for(var key in equipHolder){
			if(equipHolder[key] != null){
				genItemTooltip(equipHolder[key]);
			}
		}
	}
	function equipItem(item){
		if(equipHolder[item.slot] != null)
			unequipItem(item.slot);
		item.equip = true;
		equipHolder[item.slot] = item;
		genItemTooltip(item);
		checkDualWield();
	}
	function genItemTooltip(item){
		var slot = item.slot;
		var ttString = genTTString(item);
		$('#'+slot+'EQ').html("<span style='color:"+getIlvlColor(item.level)+"' onClick='unequipItem(\""+item.slot+"\")'>"+item.name+"</span>").append(ttString); 
	}
	function genTTString(item){
		var base = item.base
		var showPositive = "+";
		var slotDisplay = item.slot;
		if(item.slot == "body"){
			slotDisplay = "torso";
		}
		var stringBuild = "<span class='tooltip' id='"+item.slot+"TT'><span>Slot: "+slotDisplay.charAt(0).toUpperCase()+slotDisplay.slice(1)+"</span> <span style='position:absolute;right:15%'>Exp: "+item.xp+"%</span><br><br>";
		for(var index=0; index<base.length; index++){
			var statHold = base[index].split(":");
			if(statHold[1] < 0){
				showPositive = "";
			}
			else{
				showPositive = "+";
			}
			switch(statHold[0]){
				case("Str"):stringBuild = stringBuild + "<span style='color:grey'>Strength <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Int"):stringBuild = stringBuild + "<span style='color:grey'>Intelligence <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Dex"):stringBuild = stringBuild + "<span style='color:grey'>Dexterity <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("End"):stringBuild = stringBuild + "<span style='color:grey'>Endurance <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Wis"):stringBuild = stringBuild + "<span style='color:grey'>Wisdom <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Agi"):stringBuild = stringBuild + "<span style='color:grey'>Agility <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("HP"):stringBuild = stringBuild + "<span style='color:#154FAF'>Max HP <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Mana"):stringBuild = stringBuild + "<span style='color:#154FAF'>Max Mana <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Stamina"):stringBuild = stringBuild + "<span style='color:#154FAF'>Max Stamina <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("BaseDamage"):stringBuild = stringBuild + "<span style='color:white'>Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("SpellDamage"):stringBuild = stringBuild + "<span style='color:#A54996'>Spell Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("FireDamage"):stringBuild = stringBuild + "<span style='color:red'>Fire Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("ColdDamage"):stringBuild = stringBuild + "<span style='color:cyan'>Cold Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("ShockDamage"):stringBuild = stringBuild + "<span style='color:yellow'>Shock Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("DarkDamage"):stringBuild = stringBuild + "<span style='color:purple'>Dark Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("CritChnc"):stringBuild = stringBuild + "<span style='color:orange'>Crit Chance <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("CritDmg"):stringBuild = stringBuild + "<span style='color:orange'>Crit Damage <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("Armor"):stringBuild = stringBuild + "<span style='color:brown'>Armor <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Evasion"):stringBuild = stringBuild + "<span style='color:green'>Evasion <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("Resist"):stringBuild = stringBuild + "<span style='color:lightblue'>Resist <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"</span></span><br>";break;
				case("FireResist"):stringBuild = stringBuild + "<span style='color:red'>Fire Resist <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("ColdResist"):stringBuild = stringBuild + "<span style='color:cyan'>Cold Resist <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("ShockResist"):stringBuild = stringBuild + "<span style='color:yellow'>Shock Resist <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				case("Leech"):stringBuild = stringBuild + "<span style='color:darkred'>Life Leech <span style='position:absolute;right:15%;'>"+showPositive+statHold[1]+"%</span></span><br>";break;
				
			}
		}
		if(item.effects[0].length > 0){
			stringBuild += "<br>";
			for(var x = 0; x < item.effects.length; x++){
				var effect = item.effects[x].split(":");
				stringBuild = stringBuild + "<span style='color:#6751D7'>"+effect[0]+"<span style=''><br>"+getEffectString(effect)+"</span></span><br>";break;
			}
		}
		stringBuild = stringBuild + "</span>";
		return stringBuild;
	}
	function getIlvlColor(x){
		var pickedColor = "Red";
		if(x == 1)
			pickedColor = "White";
		if(x == 2)
			pickedColor = "Green";
		if(x == 3)
			pickedColor = "Blue";
		if(x == 4)
			pickedColor = "Purple";
		if(x == 5)
			pickedColor = "Orange";
		return pickedColor;
	}
	function unequipItem(slot){
		if(equipHolder[slot] != null){
			var item = equipHolder[slot];
			equipHolder[item.slot] = null;
			inventoryHolder.push(item);
			removeItemTT(item);
			item.equip = false;
			generateInventory();
			checkDualWield();
		}
	}
	function removeItemTT(item){
		var slot = item.slot;
		$('#'+slot+'EQ').text("None") 
	}