
let otherVal = [];
let remIm = false;

const sentElement = (nomor, pesan, opt) => {
	let msg = pesan;
	
	if(opt) {
		for(let i = 0; i < opt.length; i++) {
			const mark = i + 1;
			msg = msg.replaceAll('$'+mark.toString(), opt[i]);
		}
	}

	return `
		<div class="card mb-2">
			<div class="card-body p-1">
				<div class="d-flex justify-content-between">
					<div><b>${nomor}</b></div>
					<div>
						<a class="btn btn-sm btn-success sent" 
						href="whatsapp://send/?phone=${nomor}&text=${msg}&type=phone_number&app_absent=0">
						<i class="fas fa-paper-plane"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	`
}

$('#single').click(function() {
	let nomor = $('[name="nomor"]').val();
	nomor = (nomor[0] == '0') ? '62' + nomor.substr(1) : nomor;
	const pesan = encodeURI($('[name="pesan"]').val());

	window.location.href = `whatsapp://send/?phone=${nomor}&text=${pesan}&type=phone_number&app_absent=0`
});

$('#multi').click(function() {
	let nomor = $('[name="list-nomor"]').val();
	nomor = nomor.split('\n');
	const pesan = encodeURI($('[name="pesan_multi"]').val());

	let el = '';
	nomor.forEach((val, i) => {
		const no = (val[0] == '0') ? '62' + val.substr(1) : val;
		el += sentElement(no, pesan, otherVal[i]);
	});

	$('#target').html(el);
});

$('[name="remove"]').change(function() {
	remIm = $(this).is(':checked');
});

$('#target').on('click', '.sent', function(e) {
	if(remIm) {
		$(this).parent().parent().parent().parent('.card').remove();
	}
});

const ExcelToJSON = function() {
	this.parseExcel = function(file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const data = e.target.result;
			const workbook = XLSX.read(data, {
				type: 'binary'
			});

			workbook.SheetNames.forEach(function(sheetName) {
				const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				const numberList = JSON.parse(JSON.stringify(XL_row_object));

				let numbers = [];
				for (i = 0; i < numberList.length; i++) {
					const columns = Object.values(numberList[i])
					numbers.push(columns[0]);

					let values = [];
					columns.forEach((val, i) => {
						if(i != 0) {
							values.push(val);
						}
					});

					otherVal.push(values);
				}
				// console.log(otherVal)
				$('[name="list-nomor"]').val(numbers.join('\n'));
			});
		}

		reader.onerror = function(ex) {
			console.log(ex);
		}

		reader.readAsBinaryString(file);
	}
}

$('#excelFile').change(function (e) {
	otherVal = [];
	const files = e.target.files;
	const xl2json = new ExcelToJSON();
	xl2json.parseExcel(files[0]);
});