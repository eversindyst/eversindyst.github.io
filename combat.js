		function doCombat(){
			var ss = "<br>";
			var pCrit = false;
			mc.totBaseDamage = mc.totFireDamage = mc.totColdDamage = mc.totShockDamage = mc.totDarkDamage = 0;
			mc.totColdDamage = 1;
			mc.totShockDamage = 1;
			/* Run buff effects here */
			calculateFunctionalStats();
			
			mc.totBaseDamage = Math.max(Math.round(mc.functionalBaseDamage * (1-(calcArmor(currentMonsters[0].armor, currentMonsters[0].level, 0, 0)/100))) + Math.round(Math.random()*(mc.functionalBaseDamage*.3)+1) - Math.round(Math.random()*(mc.functionalBaseDamage*.3)+1),1);
			if(Math.random()*100 <= mc.functionalCritChnc){
				mc.totBaseDamage *= Math.round(mc.functionalCritDmg/100);
				pCrit = true;
			}
			if(mc.stamina >= 1){
				mc.stamina -= 1;
				displayStats();
				ss += applyDamage(0, ss, pCrit);
			}
			else{
				ss += "<span style='color:red'>You do not have enough stamina to attack</span>";
			}
			ss += "<br>"
			for(var i = 0; i < currentMonsters.length; i++){
				var dmgAmt = currentMonsters[i].damage;
				var dmgType = currentMonsters[i].dmgType;
				var dmgColor = "white";
				var eva = calcEva(mc.functionalEvasion, mc.level, mc.agility, mc.flatEvasion);
				if(Math.random()*100 > eva){
					switch(dmgType){
						case("base"):dmgColor = "white"; break;
						case("fire"):dmgColor = "red"; break;
						case("cold"):dmgColor = "cyan"; break;
						case("shock"):dmgColor = "yellow"; break;
						case("dark"):dmgColor = "purple"; break;
					}
					dmgAmt = Math.round(dmgAmt * (1-(calcArmor(mc.functionalArmor, mc.level, mc.endurance, mc.flatArmor)/100))) + Math.round(Math.random()*(dmgAmt*.3)+1) - Math.round(Math.random()*(dmgAmt*.3)+1);
					mc.hp -= dmgAmt;
					if(mc.hp <= 0){
						ss += "<span style='color:red'>With a savage hit, the "+currentMonsters[i].name+" snaps your neck, killing you.</span><br>";
						i = currentMonsters.length;
						isDead = true;
					}
					else{
						ss += "The "+currentMonsters[i].name+" "+getDamageString(dmgAmt, mc.functionalMaxHP)+" you for <span style='color:"+dmgColor+"'>"+dmgAmt+"</span> damage.<br>";
						
					}
				}
				else{
					ss += "<span style='color:#4A66B4'>The "+currentMonsters[i].name+" lunges at you but you evade the attack.</span><br>";
				}
				if(!isDead && i == currentMonsters.length-1)
					ss += "You are "+getConditionString(mc.functionalMaxHP, mc.hp)+"<br>";
			}				
			return ss;
		}
		function applyDamage(x, ss, crit){
			var monEvasion = ((calcEva(currentMonsters[0].armor, currentMonsters[0].level, 0, 0)/100));
			var prevDmg = false;
			if(Math.random() > monEvasion){
				var totDmg = mc.totBaseDamage + mc.totFireDamage + mc.totColdDamage + mc.totShockDamage + mc.totDarkDamage;
				if(crit){
					ss += "You <span style='color:red'>*CRITICALLY HIT*</span> the "+currentMonsters[x].name+" for <span style='font-size:110%'>*"+totDmg+"*</span>(";
				}
				else{
					ss += "Your attack "+getDamageString(totDmg, currentMonsters[x].hp)+" the "+currentMonsters[x].name+" for "+totDmg+" (";
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
				ss += ") damage.<br>";
				if(currentMonsters[x].currHP <= 0){
					ss += monsterDies(currentMonsters[x]);
					removeMonster(x);
				}
				else{
					ss += "The "+currentMonsters[x].name+" is "+getConditionString(currentMonsters[x].hp, currentMonsters[x].currHP)+"<br>";
				}
			}
			else{
				ss += "<span style='color:#4A66B4'>The "+currentMonsters[x].name+" swifty dodges your attack.</span><br>";
			}
			return ss;
		}
		function getDamageString(x, y){
			var z = Math.floor((x/y)*100);
			var ss = "<span style='color:";
			switch(true){
				case(z < 3):ss +="grey'>tickles"; break;
				case(z >2 && z < 6): ss += "white'>scratches";break;
				case(z >5 && z < 9): ss += "lightgreen'>scrapes";break;
				case(z >8 && z < 12): ss += "green'>injures";break;
				case(z >11 && z < 15): ss += "yellow'>wounds";break;
				case(z >14 && z < 18): ss += "darkorange'>ravages";break;
				case(z >17 && z < 21): ss += "brown'>massacres";break;
				case(z >20 && z < 24): ss += "darkred'>annihilates";break;
				case(z >23): ss += "red'>destroys";break;
			}
			ss += "</span>";
			return ss;
		}
		function getConditionString(x, y){
			var z = Math.floor((y/x)*100);
			var ss = "<span style='color:";
			switch(true){
				case(z < 5): ss +="red'>on the verge of death"; break;
				case(z > 4 && z < 15): ss +="darkred'>gushing tons of blood"; break;
				case(z > 14 && z < 31): ss+="brown'>covered in bloody wounds and bruises"; break;
				case(z > 30 && z < 45): ss+="darkorange'>limping around begging for help"; break;
				case(z > 44 && z < 62): ss+="yellow'>visibly in pain"; break;
				case(z > 61 && z < 74): ss+="green'>in okay condition"; break;
				case(z > 73 && z < 88): ss+="lightgreen'>doing fine"; break;
				case(z > 87): ss+="lightgreen'>in great condition"; break;
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