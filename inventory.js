	var sellOn = false;
	var sortType = 1;
	function handleItemDrop(x){
		var itemId = x.id;
		var item;
		item = arraySearch(itemId, "id", allItemHolder);
		if(item != null){
			inventoryHolder.push(item);
			allItemHolder.splice(allItemHolder.indexOf(item));
		}
		else{
			item = arraySearch(itemId, "id", inventoryHolder);
			if(item != null){
				giveItemXP(item);
			}
			else{
				item = eqArraySearch(itemId, equipHolder);
				if(item != null){
					giveItemXP(item)
				}
				else{
					inventoryHolder.push(x);
				}
			}
		}
		generateInventory();
		genEquipTooltip();
	}
	function equipItemFromInventory(x){
		if(sellOn){
			allItemHolder.push(inventoryHolder[x]);
			inventoryHolder.splice(x,1);
			generateInventory();
		}
		else{
			var weapon2H = false;
			if(equipHolder["mainHand"] != null){
				if(equipHolder["mainHand"].is2H){
					weapon2H = true;
				}
			}
			var item = inventoryHolder[x];
			if(item.slot == "offHand" && weapon2H){
			}
			else{
				equipItem(item);
				inventoryHolder.splice(inventoryHolder.indexOf(item),1);
				generateInventory();
			}
		}
	}
	function setSell(){
		if(!sellOn){
			sellOn = true;
			$('#sellString:hidden').toggle();
		}
		else{
			sellOn = false;
			$('#sellString:visible').toggle();
		}
	}
	function generateInventory(){
		$('#invPanel').html("");
		var invString = "";
		var invTTString = "";
		invSort();
		inventoryHolder.forEach(function(index, i){
			invString = invString + "<span class='invLine'>"+(i+1)+". <span class='invColumn' onClick='equipItemFromInventory("+i+")' style='color:"+getIlvlColor(index.level)+"'>";
			invTTString = genTTString(index);
			invString = invString+index.name+"</span>"+invTTString+"</span><br>";
		});


		$('#invPanel').html(invString);
	}
	
	function giveItem(){
		var i = getItem(0);
		handleItemDrop(i);
		for(var x = 0; x < 51; x++){
			i = getItem(1);
			handleItemDrop(i);
		}
		for(var x = 0; x < 111; x++){
		i = getItem(2);
		handleItemDrop(i);
		}
		i = getItem(3);
		handleItemDrop(i);
	}
	function setSort(x){
		sortType = x;
		generateInventory();
	}
	function invSort(){
		switch(sortType){
			case(1):inventoryHolder.sort(invABCSort); break;
			case(2):inventoryHolder.sort(invTypeSort); break;
			case(3):inventoryHolder.sort(invLevelSort); break;
		}
		
	}
	function invABCSort(a,b){
		if(a.name < b.name)
			return -1;
		if(a.name > b.name)
			return 1;
		return 0;
	}
	function invTypeSort(a,b){
		if(a.slot < b.slot)
			return -1;
		if(a.slot > b.slot)
			return 1;
		return 0;
	}
	function invLevelSort(a,b){
		if(a.level > b.level)
			return -1;
		if(a.level < b.level)
			return 1;
		return 0;
	}
	function arraySearch(nameKey, prop, myArray){
		for (var i=0; i< myArray.length; i++){
			if(myArray[i][prop] === nameKey){
				return myArray[i];
			}
		}
	}
	function eqArraySearch(nameKey, myArray){
		for(var key in myArray){
			var eqHold = myArray[key];
			if(eqHold != null){
				if(myArray[key].id == nameKey){
					return myArray[key];
				}
			}
		}
	}
	function showGearStats(){
		$('#gearPage').toggle();
	}