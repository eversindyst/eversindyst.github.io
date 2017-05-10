		var stun_g;
		var weak_g;
		var vuln_g;
		var stunDur_g;
		var weakDur_g;
		var vulnDur_g;
		
		function doCombat(){
			var ss = "<br><hr>";
			var pCrit = false;
			mc.totBaseDamage = mc.totFireDamage = mc.totColdDamage = mc.totShockDamage = mc.totDarkDamage = stun_g = weak_g = vuln_g = stunDur_g = weakDur_g = vulnDur_g = 0;
		//	mc.totFireDamage = mc.totColdDamage = mc.totShockDamage = 50;
			/* Run buff effects here */
			doStatEffects();
			calculateFunctionalStats();
			
			mc.totBaseDamage = Math.max(Math.round((mc.functionalBaseDamage + Math.round(Math.random()*(mc.functionalBaseDamage*.3)+1) - Math.round(Math.random()*(mc.functionalBaseDamage*.3)+1)) * (1-(calcArmor(currentMonsters[0].armor, currentMonsters[0].level, 0, 0)/100)) * (1-(calcRes(currentMonsters[0].resist, currentMonsters[0].level, 0, 0)/100))),1);
			if(Math.random()*100 <= mc.functionalCritChnc){
				mc.totBaseDamage = Math.round(mc.totBaseDamage * (mc.functionalCritDmg/100));
				pCrit = true;
			}
			
			doDamageEffects();
			
			mc.totFireDamage = Math.round((mc.totFireDamage * (1+(mc.totFireDamage/currentMonsters[0].hp))) * (1-(currentMonsters[0].fireResist/100)) * (1-(calcRes(currentMonsters[0].resist, currentMonsters[0].level, 0, 0)/100)));
			mc.totColdDamage = Math.round(.8 * (mc.totColdDamage * (1-((currentMonsters[0].coldResist -(mc.totColdDamage/currentMonsters[0].hp*100))/100))) * (1-(calcRes(currentMonsters[0].resist, currentMonsters[0].level, 0, 0)/100)));
			mc.totShockDamage = Math.round((mc.totShockDamage  + Math.round(Math.random()*(mc.totShockDamage*2.8)+1) - Math.round(Math.random()*(mc.totShockDamage*.95)+1)) * (1-(currentMonsters[0].shockResist/100)) * (1-(calcRes(currentMonsters[0].resist, currentMonsters[0].level, 0, 0)/100)));
			
			if(mc.stamina >= 1){
				mc.stamina -= 1;
				displayStats();
				var monEvasion = ((calcEva(currentMonsters[0].armor, currentMonsters[0].level, 0, 0)/100));
				if(Math.random() > monEvasion){
					mc.hp += mc.totBaseDamage * (mc.functionalLeech/100);
					ss += applyDamage(0, pCrit, "Attack");
				}
				else{
					ss += "<span style='color:#4A66B4'>The "+currentMonsters[0].name+"(1) swifty dodges your attack.</span><br>";
				}
			}
			else{
				ss += "<span style='color:red'>You do not have enough stamina to attack</span><br>";
			}
			var spellCast = false;
			for(var key in equipSpells){
				if(equipSpells[key] != null){
					pCrit = false;
					var spell = equipSpells[key];
					mc.totBaseDamage = mc.totFireDamage = mc.totColdDamage = mc.totShockDamage = mc.totDarkDamage = 0;
					if(Math.random()*100 <= spell.chnc){
						spellCast = true;
						var bb = spell.cast();
						if( (mc.totBaseDamage + mc.totFireDamage + mc.totColdDamage + mc.totShockDamage + mc.totDarkDamage) > 0){
							if(Math.random()*100 <= mc.functionalCritChnc){
								mc.totBaseDamage = Math.round(mc.totBaseDamage * (mc.functionalCritDmg/100));
								mc.totFireDamage = Math.round(mc.totFireDamage * (mc.functionalCritDmg/100));
								mc.totColdDamage = Math.round(mc.totColdDamage * (mc.functionalCritDmg/100));
								mc.totShockDamage = Math.round(mc.totShockDamage * (mc.functionalCritDmg/100));
								mc.totDarkDamage = Math.round(mc.totDarkDamage * (mc.functionalCritDmg/100));
								pCrit = true;
							}
							for(var x=0; x < spell.targets; x++){
								if(currentMonsters[x] != null){
									mc.totBaseDamage = Math.max(Math.round(mc.totBaseDamage * (1-(calcArmor(currentMonsters[x].armor, currentMonsters[x].level, 0, 0)/100)) * (1-(calcRes(currentMonsters[x].resist, currentMonsters[x].level, 0, 0)/100))),1);
									mc.totFireDamage = Math.round((mc.totFireDamage * (1+(mc.totFireDamage/currentMonsters[x].hp))) * (1-(currentMonsters[x].fireResist/100)) * (1-(calcRes(currentMonsters[x].resist, currentMonsters[x].level, 0, 0)/100)));
									mc.totColdDamage = Math.round(.8 * (mc.totColdDamage * (1-((currentMonsters[x].coldResist -(mc.totColdDamage/currentMonsters[x].hp*100))/100))) * (1-(calcRes(currentMonsters[x].resist, currentMonsters[x].level, 0, 0)/100)));
									mc.totShockDamage = Math.round((mc.totShockDamage  + Math.round(Math.random()*(mc.totShockDamage*2.8)+1) - Math.round(Math.random()*(mc.totShockDamage*.95)+1)) * (1-(currentMonsters[x].shockResist/100)) * (1-(calcRes(currentMonsters[x].resist, currentMonsters[x].level, 0, 0)/100)));
									
									ss += applyDamage(x, pCrit, spell.name);
									if(currentMonsters[x].currHP > 0){
										if(stun_g > Math.random()){
											currentMonsters[x].stun = stunDur_g;
											ss += "<span style='color:#04B1AE'>The "+currentMonsters[x].name+" is stunned by your "+spell.name+"</span><br>";
										}
										if(weak_g > Math.random()){
											currentMonsters[x].weak = weakDur_g;
											ss += "<span style='color:#9DC912'>The "+currentMonsters[x].name+" is weakened by your "+spell.name+"</span><br>";
										}
										if(vuln_g > Math.random()){
											currentMonsters[x].vuln = vulnDur_g;
											ss += "<span style='color:#B40800'>The "+currentMonsters[x].name+" is vulnerable from your "+spell.name+"</span><br>";
										}
									}
								}
							}
							for(var x=0; x < spell.targets; x++){
								if(currentMonsters[x] != null){
									ss += getMonsterStatus(x);
									ss += "<br>";
								}
							}
						}
						if(bb != "")
						ss += bb;
					}
				}
			}
			if(!spellCast){
				ss += getMonsterStatus(0)+"<br>";
			}
			for(var x=currentMonsters.length-1; x >= 0; x--){
				if(currentMonsters[x].currHP <= 0){
					removeMonster(x);
				}
			}
			if(currentMonsters.length > 0)
				ss += "<br>";
			for(var i = 0; i < currentMonsters.length; i++){
				if(currentMonsters[i].vuln > 0)
					currentMonsters[i].vuln -= 1;
				if(currentMonsters[i].stun <= 0){
					var dmgAmt = currentMonsters[i].damage;
					var dmgType = currentMonsters[i].dmgType;
					var dmgColor = "white";
					var eva = calcEva(mc.functionalEvasion, mc.level, mc.agility, mc.flatEvasion);
					if(currentMonsters[i].weak > 0){
						dmgAmt = Math.floor(dmgAmt/2);
						currentMonsters[i].weak -= 1;
					}
					if(Math.random()*100 > eva){
						switch(dmgType){
							case("base"):dmgColor = "white";
							dmgAmt = Math.floor((dmgAmt + Math.round(Math.random()*(dmgAmt*.3)+1) - Math.round(Math.random()*(dmgAmt*.3)+1)) * (1-(calcArmor(mc.functionalArmor, mc.level, mc.functionalEndurance, mc.flatArmor)/100)) * (1-(calcRes(mc.functionalResist, mc.level, mc.functionalWisdom, mc.flatResist)/100)));break;
							case("fire"):dmgColor = "red"; 
							dmgAmt = Math.floor((dmgAmt * (1+(dmgAmt/mc.functionalMaxHP))) * (1-(mc.functionalFireResist/100)) * (1-(calcRes(mc.functionalResist, mc.level, mc.functionalWisdom, mc.flatResist)/100))); break;
							case("cold"):dmgColor = "cyan"; 
							dmgAmt = Math.floor(.8 * (dmgAmt * (1-((mc.functionalColdResist -(dmgAmt/mc.functionalMaxHP*100))/100))) * (1-(calcRes(mc.functionalResist, mc.level, mc.functionalWisdom, mc.flatResist)/100))); break;
							case("shock"):dmgColor = "yellow"; 
							dmgAmt = Math.floor((dmgAmt  + Math.round(Math.random()*(dmgAmt*2.8)+1) - Math.round(Math.random()*(dmgAmt*.95)+1)) * (1-(mc.functionalShockResist/100)) * (1-(calcRes(mc.functionalResist, mc.level, mc.functionalWisdom, mc.flatResist)/100))); break;
							case("dark"):dmgColor = "purple"; break;
						}
						mc.hp -= dmgAmt;
						if(mc.hp < 1){
							ss += "<span style='color:red'>With a savage hit, the "+currentMonsters[i].name+"("+(i+1)+") snaps your neck, killing you.</span><br>";
							i = currentMonsters.length;
							isDead = true;
						}
						else{
							ss += "The "+currentMonsters[i].name+"("+(i+1)+") "+getDamageString(dmgAmt, mc.functionalMaxHP)+" you for <span style='color:"+dmgColor+"'>"+dmgAmt+"</span> damage.<br>";
							
						}
					}
					else{
						ss += "<span style='color:#4A66B4'>The "+currentMonsters[i].name+"("+(i+1)+") lunges at you but you evade the attack.</span><br>";
					}
					if(!isDead && i == currentMonsters.length-1)
						ss += "You are "+getConditionString(mc.functionalMaxHP, mc.hp)+"";
				}
				else{
					ss += "<span style='color:#04B1AE'>The "+currentMonsters[i].name+" is stunned</span><br>";
					currentMonsters[i].stun -= 1;
				}
			}				
			return ss;
		}
		
		function applyDamage(x, crit, attStr){
			var ss = "";
			var prevDmg = false;
			if(currentMonsters[x].vuln > 0){
				mc.totBaseDamage = Math.floor(mc.totBaseDamage * 1.5);
				mc.totFireDamage = Math.floor(mc.totFireDamage * 1.5);
				mc.totColdDamage = Math.floor(mc.totColdDamage * 1.5);
				mc.totShockDamage = Math.floor(mc.totShockDamage * 1.5);
				mc.totDarkDamage = Math.floor(mc.totDarkDamage * 1.5);
			}
			
			var totDmg = mc.totBaseDamage + mc.totFireDamage + mc.totColdDamage + mc.totShockDamage + mc.totDarkDamage;
			if(crit){
				ss += "Your "+attStr+" <span style='color:red'>*CRITICALLY HITS*</span> the "+currentMonsters[x].name+"("+(x+1)+") for <span style='font-size:110%'>*"+totDmg+"*</span>(";
			}
			else{
				ss += "Your "+attStr+" "+getDamageString(totDmg, currentMonsters[x].hp)+" the "+currentMonsters[x].name+"("+(x+1)+") for "+totDmg+" (";
			}

			if(mc.totBaseDamage > 0){
				ss += mc.totBaseDamage+"";
				prevDmg = true;
				currentMonsters[x].currHP -= mc.totBaseDamage;
			}
			if(mc.totFireDamage > 0){
				if(prevDmg)
					ss += ",";
				prevDmg = true;
				ss += "<span style='color:red'>"+mc.totFireDamage+"</span>";
				currentMonsters[x].currHP -= mc.totFireDamage;
			}
			if(mc.totColdDamage > 0){
				if(prevDmg)
					ss += ",";
				prevDmg = true;
				ss += "<span style='color:cyan'>"+mc.totColdDamage+"</span>";
				currentMonsters[x].currHP -= mc.totColdDamage;
			}
			if(mc.totShockDamage > 0){
				if(prevDmg)
					ss += ",";
				prevDmg = true;
				ss += "<span style='color:yellow'>"+mc.totShockDamage+"</span>";
				currentMonsters[x].currHP -= mc.totShockDamage;
			}
			if(mc.totDarkDamage > 0){
				if(prevDmg)
					ss += ",";
				prevDmg = true;
				ss += "<span style='color:purple'>"+mc.totDarkDamage+"</span>";
				currentMonsters[x].currHP -= mc.totDarkDamage;
			}
			ss += ") damage<br>";
			
			return ss;
		}
		function getMonsterStatus(x){
			var ss = "";
			if(currentMonsters[x].currHP <= 0){
				ss += monsterDies(currentMonsters[x]);
			}
			else{
				ss += "The "+currentMonsters[x].name+"("+(x+1)+") is "+getConditionString(currentMonsters[x].hp, currentMonsters[x].currHP)+"";
			}
			return ss;
		}
		function getDamageString(x, y){
			var z = Math.floor((x/y)*100);
			var ss = "<span style='color:";
			switch(true){
				case(z < 3):ss +="grey'>tickles"; break;
				case(z >2 && z < 7): ss += "white'>scratches";break;
				case(z >6 && z < 10): ss += "lightgreen'>scrapes";break;
				case(z >9 && z < 13): ss += "green'>injures";break;
				case(z >12 && z < 16): ss += "yellow'>wounds";break;
				case(z >15 && z < 19): ss += "orange'>ravages";break;
				case(z >18 && z < 22): ss += "darkorange'>decimates";break;
				case(z >21 && z < 28): ss += "#A85E11'>massacres";break;
				case(z >27 && z < 36): ss += "brown'>devastates";break;
				case(z >35 && z < 45): ss += "darkred'>annihilates";break;
				case(z >44): ss += "red'>destroys";break;
			}
			ss += "</span>";
			return ss;
		}
		function getConditionString(x, y){
			var z = Math.floor((y/x)*100);
			var ss = "<span style='color:";
			switch(true){
				case(z < 9): ss +="red'>on the verge of death"; break;
				case(z > 8 && z < 16): ss +="darkred'>gushing tons of blood"; break;
				case(z > 15 && z < 21): ss +="brown'>wishing the blood and pain would stop"; break;
				case(z > 20 && z < 31): ss+="#A85E11'>covered in bloody wounds and bruises"; break;
				case(z > 30 && z < 50): ss+="darkorange'>limping around begging for help"; break;
				case(z > 49 && z < 66): ss+="yellow'>visibly in pain"; break;
				case(z > 65 && z < 79): ss+="green'>in okay condition"; break;
				case(z > 78 && z < 91): ss+="lightgreen'>doing fine"; break;
				case(z > 90): ss+="lightgreen'>in great condition"; break;
			}
			ss += "</span>";
			return ss;
		}
		function removeMonster(x){
			var locX = zoneHolder.map.x;
			var locY = zoneHolder.map.y;
			zoneHolder.rooms[locX][locY].monsters.splice(x,1);
			currentMonsters.splice(x,1);
			zoneHolder.mobCount -= 1;
			if(zoneHolder.rooms[locX][locY].monsters.length == 0){
				zoneHolder.rooms[locX][locY] = null;
			}
		}
		function doStatEffects(){
			for(var key in equipHolder){
				if(equipHolder[key]!= null){
					var effectHolder = equipHolder[key].effects;
					for(var x = 0; x< effectHolder.length; x++){
						if(effectHolder[x].length > 0){
							var effectProp = effectHolder[x].split(":");
							if(effectProp[1] == "statUpBonus" || effectProp[1] == "statUpMore")
								handleEffect(effectProp);
						}
					}
				}
			}
		}
		
		function doDamageEffects(){
			for(var key in equipHolder){
				if(equipHolder[key]!= null){
					var effectHolder = equipHolder[key].effects;
					for(var x = 0; x< effectHolder.length; x++){
						if(effectHolder[x].length > 0){
							var effectProp = effectHolder[x].split(":");
							if(effectProp[1] == "addedDamage")
								handleEffect(effectProp);
						}
					}
				}
			}
		}
		
		function handleEffect(effects){
			switch(effects[1]){
				case("statUpBonus"): 
					effectDB[effects[1]](effects[2],effects[3],effects[4],effects[5]);
					break;
				case("statUpMore"): 
					effectDB[effects[1]](effects[2],effects[3],effects[4],effects[5]);
					break;
				case("addedDamage"):
					effectDB[effects[1]](effects[2],effects[3]);
					break;
			}
		}