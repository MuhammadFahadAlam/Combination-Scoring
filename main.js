function givePoints(original, allCombo) {
	let pointsArr = [];
	for (let i = 0; i < allCombo.length; i++) {
		var combo = allCombo[i];
		let flag = 0;
		let points = 0;
		for (let j = 0; j < combo.length; j++) {
			if (original.includes(combo[j])) {
				flag += 1;
			}
		}
		if (flag == 3) {
			points = 3;
		} else if (flag == 4) {
			points = 30;
		} else if (flag == 5) {
			points = 1000;
		} else if (flag == 6) {
			points = 0;
		} else {
			points = '';
		}
		pointsArr.push(points);
	}
	return pointsArr;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function giveAmount(points) {
	var amountArr = [];
	var amountStringArr = [];
	for (let i = 0; i < points.length; i++) {
		if (points[i] === '') {
			amount = 0;
			amountString = '';
		} else {
			amount = points[i] * 10000;
			amountString = numberWithCommas(amount);
		}
		amountArr.push(amount);
		amountStringArr.push(amountString);
	}
	return { amountArr: amountArr, amountStringArr: amountStringArr };
}

function givePointsAndCreateTable() {
	var original = document.getElementById('original');
	var inputNumbers = document.getElementById('inputNumbers');
	var alert = document.getElementById('alert');
	var originalArr = original.value.replace(/\s+/g, '').split(',');
	if (originalArr.length != 6) {
		alert.style.display = 'block';
		return;
	} else {
		alert.style.display = 'none';
	}
	var inputNumbersArr = inputNumbers.value.replace(/\s+/g, '').split(',');
	if (inputNumbersArr.length != 10) {
		alert.style.display = 'block';
		return;
	} else {
		alert.style.display = 'none';
	}
	function combinations(array) {
		return new Array(1 << array.length)
			.fill()
			.map((e1, i) => array.filter((e2, j) => i & (1 << j)));
	}
	var allCombo = combinations(inputNumbersArr).filter((a) => a.length == 6);
	var pointsArr = givePoints(originalArr, allCombo);
	var { amountArr, amountStringArr } = giveAmount(pointsArr);

	var amountSum = amountArr.reduce(function (a, b) {
		return a + b;
	}, 0);

	createTable(allCombo, pointsArr, amountStringArr, amountSum);
}

function createTable(allCombo, pointsArr, amountStringArr, amountSum) {
	var tableDiv = document.getElementById('tableDiv');

	var sumPoints = 0;

	if (tableDiv.children.length) {
		tableDiv.innerHTML = '';
	}

	var table = document.createElement('table');
	table.classList.add('table', 'table-striped', 'table-bordered');
	table.id = 'table';

	var tbody = document.createElement('tbody');

	var tr = document.createElement('tr');
	tr.classList.add('bg-info', 'text-white');

	var th0 = document.createElement('th');
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	var th3 = document.createElement('th');

	var textHead0 = document.createTextNode('Id');
	var textHead1 = document.createTextNode('Combination');
	var textHead2 = document.createTextNode('Points');
	var textHead3 = document.createTextNode('Amount');

	th0.appendChild(textHead0);
	th1.appendChild(textHead1);
	th2.appendChild(textHead2);
	th3.appendChild(textHead3);

	tr.appendChild(th0);
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);

	tbody.appendChild(tr);

	for (var i = 0; i < allCombo.length; i++) {
		if (pointsArr[i] === '') {
			sumPoints += 0;
			pointsArr[i] = null;
			amountStringArr[i] = null;
		} else if (pointsArr[i] === 1000) {
			sumPoints += 1000;
			pointsArr[i] = '1,000';
		} else {
			sumPoints += pointsArr[i];
		}

		var tr = document.createElement('tr');

		var th0 = document.createElement('th');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		var textHead0 = document.createTextNode(i + 1);
		var text1 = document.createTextNode(allCombo[i].join(', '));
		var text2 = document.createTextNode(pointsArr[i]);
		var text3 = document.createTextNode(amountStringArr[i]);

		th0.appendChild(textHead0);
		td1.appendChild(text1);
		td2.appendChild(text2);
		td3.appendChild(text3);

		tr.appendChild(th0);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		tbody.appendChild(tr);
	}

	var tr = document.createElement('tr');
	tr.classList.add('bg-info', 'text-white');

	var th0 = document.createElement('th');
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	var th3 = document.createElement('th');

	var textTail0 = document.createTextNode('');
	var textTail1 = document.createTextNode('Summary');
	var textTail2 = document.createTextNode(numberWithCommas(sumPoints));
	var textTail3 = document.createTextNode(numberWithCommas(amountSum));

	th0.appendChild(textTail0);
	th1.appendChild(textTail1);
	th2.appendChild(textTail2);
	th3.appendChild(textTail3);

	tr.appendChild(th0);
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);

	tbody.appendChild(tr);

	table.append(tbody);
	tableDiv.appendChild(table);
}
