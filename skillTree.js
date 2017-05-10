	var skillsRemain = 0;
	var selectedSkills = "";
	var skillTree = {
		w1:"str:1:Strength,hp:5:Life,str:1:Strength,stam:5:Stamina,str:3:Might,end:1:Endurance",
		w2:"end:1:Endurance,arm:5:Armor,hp:5:Life,hreg:5:Life Regen,end:3:Thick Skin,hp:5:Life",
		w3:"dmg:1:Damage,cchnc:1:Crit Chance,cdmg:10:Crit Damage,str:1:Strength,dmg:3:Deadly Strikes,leech:1:Life Leech",
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
			case("intl"):ss ="Increases Intelligence by "+x; break;
			case("dex"):ss ="Increases Dexterity by "+x; break;
			case("end"):ss ="Increases Endurance by "+x; break;
			case("wis"):ss ="Increases Wisdom by "+x; break;
			case("agi"):ss ="Increases Agility by "+x; break;
			case("arm"):ss ="Increases Armor by "+x; break;
			case("eva"):ss ="Increases Evasion by "+x; break;
			case("res"):ss ="Increases Resist by "+x; break;
			case("fres"):ss ="Increases Fire Resist "+x; break;
			case("cres"):ss ="Increases Cold Resist by "+x; break;
			case("sres"):ss ="Increases Shock Resist by "+x; break;
			case("hp"):ss ="Increases maximum HP by "+x; break;
			case("mana"):ss ="Increases maximum Mana by "+x; break;
			case("stam"):ss ="Increases maximum Stamina by "+x; break;
			case("dmg"):ss ="Increases Base Damage by "+x; break;
			case("spdmg"):ss ="Increases Spell Damage by "+x; break;
			case("cchnc"):ss ="Increases Critical Strike Chance by "+x; break;
			case("cdmg"):ss ="Increases Critical Strike Damage by "+x; break;
			case("fdmg"):ss ="Increases Fire Damage by "+x; break;
			case("cdmg"):ss ="Increases Cold Damage by "+x; break;
			case("sdmg"):ss ="Increases Shock Damage by "+x; break;
			case("ddmg"):ss ="Increases Dark Damage by "+x; break;
			case("leech"):ss ="Increases Life Leech by "+x+"%"; break;
			case("hreg"):ss ="Increases HP Regen by "+x+"%"; break;
			case("mreg"):ss ="Increases Mana Regen by "+x+"%"; break;
			case("sreg"):ss ="Increases Stamina Regen by "+x+"%"; break;
		}
		return ss;
	}
	function skillTreeEffect(c,x){
		switch(c){
			case("str"): cBonus["Str"] += x; break;
			case("intl"): cBonus["Int"] += x; break;
			case("dex"): cBonus["Dex"] += x; break;
			case("end"): cBonus["End"] += x; break;
			case("wis"): cBonus["Wis"] += x; break;
			case("agi"): cBonus["Agi"] += x; break;
			case("arm"): cBonus["Armor"] += x; break;
			case("eva"): cBonus["Evasion"] += x; break;
			case("res"): cBonus["Resist"] += x; break;
			case("fres"): cBonus["FireResist"] += x; break;
			case("cres"): cBonus["ColdResist"] += x; break;
			case("sres"): cBonus["ShockResist"] += x; break;
			case("hp"): cBonus["HP"] += x; break;
			case("mana"): cBonus["Mana"] += x; break;
			case("stam"): cBonus["Stamina"] += x; break;
			case("dmg"): cBonus["BaseDamage"] += x; break;
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
		showSkillTreeMenu();
		handleSkillBtn();
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