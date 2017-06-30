	var skillsRemain = 0;
	var selectedSkills = "";
	var selSk1 = 0;
	var selSk2 = 0;
	var selSk3 = 0;
	var skillTree = {
		l0:"str,intl,dex",
		l1:"end,wis,agi",
		l2:"hp,mana,stam",
		l3:"arm,res,eva",
		l4:"dmg,spdmg,crit"
		};
	var skillTreeName = {
		l0:"Strength,Intelligence,Dexterity",
		l1:"Endurance,Wisdom,Agility",
		l2:"Life,Mana,Stamina",
		l3:"Armor,Resist,Evasion",
		l4:"Damage,Spell Damage,Critical Strikes"
	}
	function skillTreeDesc(c,x){
		var ss = "";
		switch(c){
			case("str"):ss ="Increases Strength by "+x; break;
			case("mstr"):ss ="Increases Strength by "+x+"%"; break;
			case("intl"):ss ="Increases Intelligence by "+x; break;
			case("mintl"):ss ="Increases Intelligence by "+x+"%"; break;
			case("dex"):ss ="Increases Dexterity by "+x; break;
			case("mdex"):ss ="Increases Dexterity by "+x+"%"; break;
			case("end"):ss ="Increases Endurance by "+x; break;
			case("mend"):ss ="Increases Endurance by "+x+"%"; break;
			case("wis"):ss ="Increases Wisdom by "+x; break;
			case("mwis"):ss ="Increases Wisdom by "+x+"%"; break;
			case("agi"):ss ="Increases Agility by "+x; break;
			case("magi"):ss ="Increases Agility by "+x+"%"; break;
			case("arm"):ss ="Increases Armor by "+x; break;
			case("eva"):ss ="Increases Evasion by "+x; break;
			case("res"):ss ="Increases Resist by "+x; break;
			case("fres"):ss ="Increases Fire Resist "+x; break;
			case("cres"):ss ="Increases Cold Resist by "+x; break;
			case("sres"):ss ="Increases Shock Resist by "+x; break;
			case("hp"):ss ="Increases maximum HP by "+x+" and HP Regen by "+Math.round((x/15*100))/100+"%"; break;
			case("mhp"):ss ="Increases maximum HP by "+x+"%"; break;
			case("mana"):ss ="Increases maximum Mana by "+x+" and Mana Regen by "+Math.round((x/15*100))/100+"%";; break;
			case("mmana"):ss ="Increases maximum Mana by "+x+"%"; break;
			case("stam"):ss ="Increases maximum Stamina by "+x+" and Stamina Regen by "+Math.round((x/15*100))/100+"%";; break;
			case("mstam"):ss ="Increases maximum Stamina by "+x+"%"; break;
			case("dmg"):ss ="Increases Base Damage by "+x; break;
			case("mdmg"):ss ="Increases Base Damage by "+x+"%"; break;
			case("spdmg"):ss ="Increases Spell Damage by "+x+"%"; break;
			case("crit"):ss ="Increases Critical Strike Chance by "+x+"% and Critical Strike Damage by "+x*6+"%"; break;
			case("cchnc"):ss ="Increases Critical Strike Chance by "+x+"%"; break;
			case("cdmg"):ss ="Increases Critical Strike Damage by "+x+"%"; break;
			case("fdmg"):ss ="Increases Fire Damage by "+x+"%"; break;
			case("cldmg"):ss ="Increases Cold Damage by "+x+"%"; break;
			case("sdmg"):ss ="Increases Shock Damage by "+x+"%"; break;
			case("ddmg"):ss ="Increases Dark Damage by "+x+"%"; break;
			case("leech"):ss ="Increases Life Leech by "+x+"%"; break;
			case("hreg"):ss ="Increases Life Regen by "+x+"%"; break;
			case("mreg"):ss ="Increases Mana Regen by "+x+"%"; break;
			case("sreg"):ss ="Increases Stamina Regen by "+x+"%"; break;
			case("w1m"):ss = "Increases Strength and Endurance by 5%"; break;
			case("w2m"):ss = "Increases Armor by 15%"; break;
			case("w3m"):ss = "Increases Base Damage by 10%"; break;
			case("m1m"):ss = "Increases Mana and Mana regen by 15%"; break;
			case("m2m"):ss = "Increases Intelligence by 4% and Crit Damage by 20%"; break;
			case("m3m"):ss = "Increases Intelligence and Strength by 3%"; break;
			case("r1m"):ss = "Increases Evasion by 15%"; break;
			case("r2m"):ss = "Increases Dexterity and Strength by 3%"; break;
			case("r3m"):ss = "Increases Dark Damage by 20%"; break;
			case("mk1m"):ss = "Increases Armor, Evasion, and Resist by 10%"; break;
			case("mk2m"):ss = "Increases Damage by 6% and Life Leech by 4%"; break;
			case("mk3m"):ss = "Increases all elemental damage by 5%"; break;
		}
		return ss;
	}
	function skillTreeEffect(c,x){
		switch(c){
			case("str"): cBonus["Str"] += x; break;
			case("mstr"): cMore["Str"] *= (1+(x/100)); break;
			case("intl"): cBonus["Int"] += x; break;
			case("mintl"): cMore["Int"] *= (1+(x/100)); break;
			case("dex"): cBonus["Dex"] += x; break;
			case("mdex"): cMore["Dex"] *= (1+(x/100)); break;
			case("end"): cBonus["End"] += x; break;
			case("mend"): cMore["End"] *= (1+(x/100)); break;
			case("wis"): cBonus["Wis"] += x; break;
			case("mwis"): cMore["Wis"] *= (1+(x/100)); break;
			case("agi"): cBonus["Agi"] += x; break;
			case("magi"): cMore["Agi"] *= (1+(x/100)); break;
			case("arm"): cBonus["Armor"] += x; break;
			case("eva"): cBonus["Evasion"] += x; break;
			case("res"): cBonus["Resist"] += x; break;
			case("fres"): cBonus["FireResist"] += x; break;
			case("cres"): cBonus["ColdResist"] += x; break;
			case("sres"): cBonus["ShockResist"] += x; break;
			case("hp"): cBonus["HP"] += x; cMore["HReg"] *= Math.round((1+(x/1500))*1000)/1000; break;
			case("mhp"): cMore["HP"] *= (1+(x/100)); break;
			case("mana"): cBonus["Mana"] += x; cMore["MReg"] *= Math.round((1+(x/1500))*1000)/1000; break; break;
			case("mmana"): cMore["Mana"] *= (1+(x/100)); break;
			case("stam"): cBonus["Stamina"] += x; cMore["SReg"] *= Math.round((1+(x/1500))*1000)/1000; break; break;
			case("mstam"): cMore["Stamina"] *= (1+(x/100)); break;
			case("dmg"): cBonus["BaseDamage"] += x; break;
			case("mdmg"): cMore["BaseDamage"] *= (1+(x/100)); break;
			case("spdmg"): cBonus["SpellDamage"] += x; break;
			case("crit"): cBonus["CritChnc"] += x; cBonus["CritDmg"] += (x*6); break;
			case("cchnc"): cBonus["CritChnc"] += x; break;
			case("cdmg"): cBonus["CritDmg"] += x; break;
			case("fdmg"): cBonus["FireDamage"] += x; break;
			case("cldmg"): cBonus["ColdDamage"] += x; break;
			case("sdmg"): cBonus["ShockDamage"] += x; break;
			case("ddmg"): cBonus["DarkDamage"] += x; break;
			case("leech"): cBonus["Leech"] += x; break;
			case("hreg"): cMore["HReg"] *= (1+(x/100)); break;
			case("mreg"): cMore["MReg"] *= (1+(x/100)); break;
			case("sreg"): cMore["SReg"] *= (1+(x/100)); break;
			case("w1m"): cMore["Str"] *= 1.05; cMore["End"] *= 1.05; break;
			case("w2m"): cMore["Armor"] *= 1.15; break;
			case("w2m"): cMore["BaseDamage"] *= 1.1; break;
			case("m1m"): cMore["Mana"] *= 1.15; cMore["MReg"] *= 1.15; break;
			case("m2m"): cMore["Int"] *= 1.04; cBonus["CritDmg"] += 20; break;
			case("m3m"): cMore["Int"] *= 1.03; cMore["Str"] *= 1.03; break;
			case("r1m"): cMore["Evasion"] *=1.15; break;
			case("r2m"): cMore["Str"] *= 1.03; cMore["Dex"] *= 1.03; break;
			case("r3m"): cBonus["DarkDamage"] += 20; break;
			case("mk1m"): cMore["Evasion"] *=1.1; cMore["Armor"] *= 1.1; cMore["Resist"] *= 1.1; break;
			case("mk2m"): cMore["BaseDamage"] *= 1.06; cBonus["Leech"] += 4; break;
			case("mk3m"): cBonus["FireDamage"] += 5; cBonus["ColdDamage"] += 5; cBonus["ShockDamage"] += 5; break;
		}
	}

	var currTree1, currTree2, currTree3;
	var t1Max = false;
	var t2Max = false;
	var t3Max = false;
	
	function getSkillChoice(slot, override, ovVal){
		var lvlMod = (selectedSkills.length/2)%5;
		if(override)
			lvlMod = (ovVal %5);
		var skillChoice = skillTree["l"+lvlMod];
		var skill_a = skillChoice.split(",");
		var selectSkill = skill_a[slot];
		var nameChoice = skillTreeName["l"+lvlMod];
		var name_a = nameChoice.split(",");
		var selectName = name_a[slot];
		var retVal = selectSkill+":"+getSkillValue(slot, ((selectedSkills.length/2)+1), override, (ovVal+1))+":"+selectName;
		return retVal;
	}
	function getSkillValue(slot, lvl, override, ovVal){
		slot = slot+"";
		var modType = lvl % 5;
		var modWorth = Math.floor(lvl / 5);
		if(override){
			modType = ovVal % 5;
			modWorth = Math.floor(ovVal / 5);
		}
		var retVal = 0;
		switch(modType){
			case(1): retVal = Math.round(1 + ((3+modWorth)*.09)); break;
			case(2): retVal = Math.round(1 + ((3+modWorth)*.12)); break;
			case(3): switch(slot){
				case '0': retVal = Math.round(3+(modWorth*1.41)); break;
				case '1': retVal = Math.round(5+(modWorth*1.86)); break;
				case '2': retVal = Math.round(4+(modWorth*1.3)); break;
			}break;
			case(4): switch(slot){
				case '0': retVal = Math.round(3+((1.2+modWorth)*.34)); break;
				case '1': retVal = Math.round(2+((6+modWorth)*.43)); break;
				case '2': retVal = Math.round(2.5+((2.1+modWorth)*.38)); break;
			}break;
			case(0): switch(slot){
				case '0': retVal = Math.round(1+((2+modWorth)*.1)); break;
				case '1': retVal = Math.round(1.5+((2+modWorth)*.07)); break;
				case '2': retVal = Math.round(.7+(modWorth*.05)); break;
			}break;
		}
		return retVal;
	}
	function buildSkillTree(){
		var classChar;
		var choiceHolder;
		var choice1 = getSkillChoice(0, false, 0);
		var choice2 = getSkillChoice(1, false, 0);
		var choice3 = getSkillChoice(2, false, 0);
		
		buildSkillSelectionPage(choice1, choice2, choice3);
	}
	function skillTreeSelected(x, cv){
		var strHolder = cv.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		if(x==1){
			selectedSkills += 0+";";
		}
		if(x==2){
			selectedSkills += 1+";";
		}
		if(x==3){
			selectedSkills += 2+";";
		}
		mc.skillsRemain -= 1;
		skillTreeEffect(c, v);
		if(mc.skillsRemain <= 0){
			showSkillTreeMenu();
			handleSkillBtn();
		}
		else{
			buildSkillTree();
		}
	}
	function handleSkillBtn(){
		hideSkillTreeBtn();
		if(mc.skillsRemain > 0 )
			showSkillTreeBtn();
	}
	function hideSkillTreeBtn(){
		$('#skillBtn:visible').toggle();
	}
	function showSkillTreeBtn(){
		$('#skillBtn:hidden').toggle();
	}
	function showSkillTreeMenu(){
		$('#skillTHolder').toggle();
		if($('#skillTHolder').is(":visible")){
			$('#skillTreePage:hidden').toggle();
			buildSkillTree();
		}
	}
	function buildSkillSelectionPage(cf1,cf2,cf3){
		var ss = "";
		var c1 = null;
		var x1;
		var c2 = null;
		var x2;
		var c3 = null;
		var x3;
		var n1 = "";
		var n2 = "";
		var n3 = "";
		if(cf1 != null){
			c1 = cf1.split(":");
			x1 = c1[1];
			n1 = c1[2];
			c1 = c1[0];
		}
		if(cf2 != null){
			c2 = cf2.split(":");
			x2 = c2[1];
			n2 = c2[2];
			c2 = c2[0];
		}
		if(cf3 != null){
			c3 = cf3.split(":");
			x3 = c3[1];
			n3 = c3[2];
			c3 = c3[0];
		}
		
		ss = "<div class='skillLineHolder'>You have leveled up! Please select a trait.<br><br>";
		if(c1 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(1,\""+cf1+"\")'>"+n1+"<span class='tooltip'>"+skillTreeDesc(c1,x1)+"</span></div>";
		if(c2 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(2,\""+cf2+"\")'>"+n2+"<span class='tooltip'>"+skillTreeDesc(c2,x2)+"</span></div>";
		if(c3 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(3,\""+cf3+"\")'>"+n3+"<span class='tooltip'>"+skillTreeDesc(c3,x3)+"</span></div>";
		ss += "</div>";
		$('#skillTreePage').html(ss);
	}
	
	function loadSavedSkills(){
		if(selectedSkills.length > 0){
			var ss = selectedSkills.split(";");
			for(var y =0; y < (ss.length-1); y++){
					freeSkillTree(ss[y], y);
			}
		}
	}
	function freeSkillTree(x, y){
		var selChoice = getSkillChoice(x, true, y);
		var strHolder = selChoice.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		skillTreeEffect(c, v);
		handleSkillBtn();
	}