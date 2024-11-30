export function validateInn(inn) {
	var result = false;
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if (!inn.length) {
		console.log('Пожалуйста, введите ИНН');
	} else if (/[^0-9]/.test(inn)) {
		console.log('ИНН может состоять только из цифр');
	} else if (inn.length !== 10) {
		console.log('ИНН компании может состоять только из 10 цифр');
	} else {
		var checkDigit = function (inn, coefficients) {
			var n = 0;
			for (var i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n10 === parseInt(inn[9])) {
      result = true;
    }
		if (!result) {
      console.log('ИНН: неправильное контрольное число');
		}
	}
	return result;
}


export default validateInn;
