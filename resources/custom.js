function redstoneCalculator_updateSummary(item) {
	var result = 0;
	document.querySelectorAll(`span[id$="-${item}"]:not(#summary-amount-${item})`).forEach(function(i) {
		result += parseInt(i.innerHTML);
	});
	return result;
}
function redstoneCalculator_calculate(calculateditem) {
	for (var item in calculator.ingredients[calculateditem]) {
		var itemAmount = calculator.ingredients[calculateditem][item];
		if (itemAmount.includes("/")) {
			var itemamount2 = itemAmount[2];
			if (isNaN(itemAmount[3]) === false) {
				itemamount2 += itemAmount[3];
			}
			itemAmount = Math.ceil(document.getElementById(calculateditem).value / parseInt(itemamount2)) * parseInt(itemAmount[0]);
		}
		else {
			itemAmount = Math.ceil(itemAmount*document.getElementById(calculateditem).value);
		}
		document.getElementById(calculateditem+'-'+item).innerHTML = itemAmount;
		document.getElementById("summary-amount-"+item).innerHTML = redstoneCalculator_updateSummary(item);
	}
	
}
document.addEventListener("input", function(e) {
	if (e.target.value.length > e.target.maxLength) {
		e.target.value = e.target.value.slice(0, e.target.maxLength);
	}
	if(e.target.tagName != "input") {
		redstoneCalculator_calculate(e.target.id);
	}
	return;
});
window.onload = function() {
	for (var item in calculator.ingredients) {
		var result = ''
		result += '<div class="input-group"><div class="input-group-addon" data-toggle="tooltip" title="'+calculator.names[item]+'">';
		result += '<img src="resources/items/'+item+'.png" alt="'+calculator.names[item]+'"></div>';
		result += '<input class="form-control" id="'+item+'" min="0" max="999999" maxlength="6" step="1" type="number" value="0">';
		result += '<div class="input-group-addon materials">';
		for (var ingredient in calculator.ingredients[item]) {
			result += '<span class="list-items" data-toggle="tooltip" title="'+calculator.names[ingredient]+'"><img src="resources/items/'+ingredient+'.png" alt="'+calculator.names[ingredient]+'" class="item-image"><span id="'+item+'-'+ingredient+'">0</span></span>';
			if (document.getElementById("redstone-summary").innerHTML.includes("summary-amount-"+ingredient) == false) {
				document.getElementById("redstone-summary").innerHTML += '<div class="list-items" data-toggle="tooltip" title="'+calculator.names[ingredient]+'"><img src="resources/items/'+ingredient+'.png" alt="'+calculator.names[ingredient]+'" class="item-image"><span id="summary-amount-'+ingredient+'">0</span></div>';
			}
		}
		result += '</div></div>';
		document.getElementById("redstone-list").innerHTML += result;
	}
	$('[data-toggle="tooltip"]').tooltip(); 
};