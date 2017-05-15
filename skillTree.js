	var skillsRemain = 0;
	var selectedSkills = "";
	var skillTree = {
		w1:"str:1:Strength,hp:5:Life,str:1:Strength,stam:5:Stamina,str:3:Might,end:1:Endurance,str:1:Strength,dmg:1:Damage,hp:5:Life,end:6:Heavy Hide,dex:2:Dexterity,agi:2:Agility,stam:5:Stamina,hreg:5:Life Regen,hp:20:Vigor,stam:10:Stamina,str:2:Strength,end:2:Endurance,arm:10:Armor,stam:50:Expanded Lungs,arm:5:Armor,wis:3:Wisdom,agi:3:Agility,dex:3:Dexterity,intl:10:Expansive Mind,cchnc:1:Crit Chance,cdmg:10:Crit Damage,str:2:Strength,leech:2:Life Leech,mend:2:Golem Blood,str:2:Strength,str:2:Strength,arm:10:Armor,intl:3:Intelligence,str:5:Brute Force,dex:2:Dexterity,agi:2:Agility,wis:2:Wisdom,sreg:5:Stamina Regen,mdmg:2:Shattering Blow,str:2:Strength,end:2:Endurance,arm:5:Armor,eva:5:Evasion,res:10:Mental Fortress,agi:2:Agilty,dex:2:Dexterity,wis:3:Wisdom,end:3:Endurance,mstr:2:Weighted Training,mana:10:Mana,mana:10:Mana,hp:10:Life,res:5:Resist,arm:15:Plate Armor,eva:5:Evasion,leech:1:Life Leech,cdmg:10:Crit Damage,dex:2:Dexterity,w1m:0:Juggernaut,wis:2:Wisdom,intl:2:Intelligence,agi:3:Agility,dex:3:Dexterity,dmg:3:Sharpened Blade",
		w2:"end:1:Endurance,arm:5:Armor,hp:5:Life,hreg:5:Life Regen,end:3:Thick Skin,hp:5:Life,arm:5:Armor,end:1:Endurance,dmg:1:Damage,end:5:Built by Bricks,str:2:Strength,hreg:5:Life Regen,eva:5:Evasion,arm:5:Armor,res:10:Barrier,hp:10:Life,stam:5:Stamina,sreg:5:Stamina Regen,hreg:5:Life Regen,hp:50:Boon of Life,end:1:Endurance,str:1:Strength,agi:2:Agility,wis:2:Wisdom,eva:15:Quick Step,arm:10:Armor,fres:3:Fire Resist,cres:3:Cold Resist,sres:3:Shock Resist,mend:3:Unstoppable,end:2:Endurance,str:2:Strength,dex:2:Dexterity,intl:2:Intelligence,end:5:Diamond Skin,hp:10:Life,stam:10:Stamina,sreg:5:Stamina Regen,hreg:5:Life Regen,mhp:4:Children of the Earth,arm:15:Armor,end:2:Endurance,leech:2:Life Leech,wis:3:Wisdom,eva:25:Mirage,arm:10:Armor,res:10:Resist,end:3:Endurance,str:3:Strength,mstam:3:Second Wind,mana:10:Mana,hp:10:Life,stam:10:Stamina,arm:5:Armor,end:5:Healthy Body,arm:10:Armor,end:3:Endurance,wis:3:Wisdom,agi:3:Agility,w2m:0:Unscratched,hp:10:Life,end:3:Endurance,stam:10:Stamina,mana:10:Mana,hp:30:Lifes Embrace",
		w3:"dmg:1:Damage,cchnc:1:Crit Chance,cdmg:10:Crit Damage,str:1:Strength,dmg:3:Deadly Strikes,leech:1:Life Leech,str:1:Strength,end:1:Endurance,dmg:1:Damage,cchnc:3:Precision,str:2:Strength,leech:1:Life Leech,dmg:1:Damage,arm:5:Armor,cdmg:15:Piercing Blows,hp:5:Life,stam:5:Stamina,dmg:1:Damage,str:2:Strength,str:5:Brute,cchnc:1:Crit Chance,cdmg:10:Crit Damage,dmg:1:Damage,str:2:Strength,dex:4:Swift Strikes,end:2:Endurance,hp:10:Life,leech:1:Life Leech,dmg:2:Damage,mstr:2:Unending Strength,end:2:Endurance,dex:2:Dexterity,leech:1:Life Leech,str:2:Strength,cdmg:15:Heart-seeker,dex:3:Dexterity,agi:2:Agility,intl:2:Intelligence,wis:2:Wisdom,mstr:3:Rapid Gains,arm:5:Armor,hp:10:Life,end:2:Endurance,str:2:Strength,arm:10:Blood Covered Armor,cchnc:1:Crit Chance,dmg:1:Damage,str:2:Strength,cdmg:10:Crit Damage,mstam:5:Winded,mana:10:Mana,dex:2:Dexterity,stam:10:Stamina,cdmg:10:crit Damage,ddmg:10:Dark Blade,str:2:Strength,end:2:Endurance,dex:3:Dexterity,leech:2:Life Leech,w3m:0:Destructive Nature,dex:3:Dexterity,str:3:Strength,hp:10:Life,end:2:Endurance,cchnc:2:Opportunity",
		m1:"",
		m2:"",
		m3:"",
		r1:"",
		r2:"",
		r3:"",
		mk1:"",
		mk2:"",
		mk3:""
	}
	function skillTreeDesc(c,x){
		var ss = "";
		switch(c){
			case("str"):ss ="Increases Strength by "+x; break;
			case("mstr"):ss ="Increases Strength by "+x+"%"; break;
			case("intl"):ss ="Increases Intelligence by "+x; break;
			case("dex"):ss ="Increases Dexterity by "+x; break;
			case("end"):ss ="Increases Endurance by "+x; break;
			case("mend"):ss ="Increases Endurance by "+x+"%"; break;
			case("wis"):ss ="Increases Wisdom by "+x; break;
			case("agi"):ss ="Increases Agility by "+x; break;
			case("arm"):ss ="Increases Armor by "+x; break;
			case("eva"):ss ="Increases Evasion by "+x; break;
			case("res"):ss ="Increases Resist by "+x; break;
			case("fres"):ss ="Increases Fire Resist "+x; break;
			case("cres"):ss ="Increases Cold Resist by "+x; break;
			case("sres"):ss ="Increases Shock Resist by "+x; break;
			case("hp"):ss ="Increases maximum HP by "+x; break;
			case("mhp"):ss ="Increases maximum HP by "+x+"%"; break;
			case("mana"):ss ="Increases maximum Mana by "+x; break;
			case("stam"):ss ="Increases maximum Stamina by "+x; break;
			case("mstam"):ss ="Increases maximum Stamina by "+x+"%"; break;
			case("dmg"):ss ="Increases Base Damage by "+x; break;
			case("mdmg"):ss ="Increases Base Damage by "+x+"%"; break;
			case("spdmg"):ss ="Increases Spell Damage by "+x+"%"; break;
			case("cchnc"):ss ="Increases Critical Strike Chance by "+x+"%"; break;
			case("cdmg"):ss ="Increases Critical Strike Damage by "+x+"%"; break;
			case("fdmg"):ss ="Increases Fire Damage by "+x+"%"; break;
			case("cdmg"):ss ="Increases Cold Damage by "+x+"%"; break;
			case("sdmg"):ss ="Increases Shock Damage by "+x+"%"; break;
			case("ddmg"):ss ="Increases Dark Damage by "+x+"%"; break;
			case("leech"):ss ="Increases Life Leech by "+x+"%"; break;
			case("hreg"):ss ="Increases HP Regen by "+x+"%"; break;
			case("mreg"):ss ="Increases Mana Regen by "+x+"%"; break;
			case("sreg"):ss ="Increases Stamina Regen by "+x+"%"; break;
			case("w1m"):ss = "Increases Strength and Endurance by 5%"; break;
			case("w2m"):ss = "Increases Armor by 15%"; break;
			case("w3m"):ss = "Increases Base Damage by 5%"; break;
		}
		return ss;
	}
	function skillTreeEffect(c,x){
		switch(c){
			case("str"): cBonus["Str"] += x; break;
			case("mstr"): cMore["Str"] *= (1+(x/100)); break;
			case("intl"): cBonus["Int"] += x; break;
			case("dex"): cBonus["Dex"] += x; break;
			case("end"): cBonus["End"] += x; break;
			case("mend"): cMore["End"] *= (1+(x/100)); break;
			case("wis"): cBonus["Wis"] += x; break;
			case("agi"): cBonus["Agi"] += x; break;
			case("arm"): cBonus["Armor"] += x; break;
			case("eva"): cBonus["Evasion"] += x; break;
			case("res"): cBonus["Resist"] += x; break;
			case("fres"): cBonus["FireResist"] += x; break;
			case("cres"): cBonus["ColdResist"] += x; break;
			case("sres"): cBonus["ShockResist"] += x; break;
			case("hp"): cBonus["HP"] += x; break;
			case("mhp"): cMore["HP"] *= (1+(x/100)); break;
			case("mana"): cBonus["Mana"] += x; break;
			case("stam"): cBonus["Stamina"] += x; break;
			case("mstam"): cMore["Stamina"] *= (1+(x/100)); break;
			case("dmg"): cBonus["BaseDamage"] += x; break;
			case("mdmg"): cMore["BaseDamage"] *= (1+(x/100)); break;
			case("spdmg"): cBonus["SpellDamage"] += x; break;
			case("cchnc"): cBonus["CritChnc"] += x; break;
			case("cdmg"): cBonus["CritDmg"] += x; break;
			case("fdmg"): cBonus["FireDamage"] += x; break;
			case("cdmg"): cBonus["ColdDamage"] += x; break;
			case("sdmg"): cBonus["ShockDamage"] += x; break;
			case("ddmg"): cBonus["DarkDamage"] += x; break;
			case("leech"): cBonus["Leech"] += x; break;
			case("hreg"): cMore["HReg"] *= (1+(x/100)); break;
			case("mreg"): cMore["MReg"] *= (1+(x/100)); break;
			case("sreg"): cMore["SReg"] *= (1+(x/100)); break;
			case("w1m"): cMore["Str"] *= 1.05; cMore["End"] *= 1.05; break;
			case("w2m"): cMore["Armor"] *= 1.15; break;
			case("w2m"): cMore["BaseDamage"] *= 1.05; break;
		}
	}

	var currTree1, currTree2, currTree3;
	var t1Max = false;
	var t2Max = false;
	var t3Max = false;
	
	function buildSkillTree(){
		var classChar;
		var choiceHolder;
		var choice1 = null;
		var choice2 = null;
		var choice3 = null;
		switch(mc.baseClassNum){
			case(0): classChar = "w"; break;
			case(1): classChar = "m"; break;
			case(2): classChar = "r"; break;
			case(3): classChar = "mk"; break;
		}
		if(!t1Max && currTree1 == null){
			currTree1 = skillTree[classChar+"1"];
		}
		if(!t2Max && currTree2 == null){
			currTree2 = skillTree[classChar+"2"];
		}
		if(!t3Max && currTree3 == null){
			currTree3 = skillTree[classChar+"3"];
		}
		if(currTree1 != null){
			choiceHolder = currTree1.split(",");
			choice1 = choiceHolder[0];
		}
		if(currTree2 != null){
			choiceHolder = currTree2.split(",");
			choice2 = choiceHolder[0];
		}
		if(currTree3 != null){
			choiceHolder = currTree3.split(",");
			choice3 = choiceHolder[0];
		}
		
		buildSkillSelectionPage(choice1, choice2, choice3);
	}
	function skillTreeSelected(x, cv){
		var strHolder = cv.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		selectedSkills += cv+";";
		if(x==1){
			var index = currTree1.indexOf(",");
			if(index != -1){
				currTree1 = currTree1.slice((index+1));
			}
			else{
				t1Max = true;
				currTree1 = null;
			}
		}
		if(x==2){
			var index = currTree2.indexOf(",");
			if(index != -1){
				currTree2 = currTree2.slice((index+1));
			}
			else{
				t2Max = true;
				currTree2 = null;
			}
		}
		if(x==3){
			var index = currTree3.indexOf(",");
			if(index != -1){
				currTree3 = currTree3.slice((index+1));
			}
			else{
				t3Max = true;
				currTree3 = null;
			}
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
			var classChar;
			switch(mc.baseClassNum){
				case(0): classChar = "w"; break;
				case(1): classChar = "m"; break;
				case(2): classChar = "r"; break;
				case(3): classChar = "mk"; break;
			} 
			currTree1 = skillTree[classChar+"1"]; 
			currTree2 = skillTree[classChar+"2"]; 
			currTree3 = skillTree[classChar+"3"]; 
			for(var x = 0; x < ss.length; x++){
				var sArea = ss[x];
				if(sArea != ""){
					var whichTree = 0;
					var index;
					if(currTree1 != null){
						index = currTree1.indexOf(sArea);
						if(index == 0){
							freeSkillTree(1, sArea);
						}
					}
					if(currTree2 != null){
						index = currTree2.indexOf(sArea);
						if(index == 0){
							freeSkillTree(2, sArea);
						}
					}
					if(currTree3 != null){
						index = currTree3.indexOf(sArea);
						if(index == 0){
							freeSkillTree(3, sArea);
						}
					}
				}
			}
		}
	}
	function freeSkillTree(x, cv){
		var strHolder = cv.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		if(x==1){
			var index = currTree1.indexOf(",");
			if(index != -1){
				currTree1 = currTree1.slice((index+1));
			}
			else{
				t1Max = true;
				currTree1 = null;
			}
		}
		if(x==2){
			var index = currTree2.indexOf(",");
			if(index != -1){
				currTree2 = currTree2.slice((index+1));
			}
			else{
				t2Max = true;
				currTree2 = null;
			}
		}
		if(x==3){
			var index = currTree3.indexOf(",");
			if(index != -1){
				currTree3 = currTree3.slice((index+1));
			}
			else{
				t3Max = true;
				currTree3 = null;
			}
		}
		skillTreeEffect(c, v);
		handleSkillBtn();
	}