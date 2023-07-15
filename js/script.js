
const sentElement = (nomor, pesan) => {
	return `
		<div class="card mb-2">
			<div class="card-body p-1">
				<div class="d-flex justify-content-between">
					<div><b>${nomor}</b></div>
					<div>
						<a class="btn btn-sm btn-success" 
						href="whatsapp://send/?phone=${nomor}&text=${pesan}&type=phone_number&app_absent=0">
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
	const pesan = $('[name="pesan"]').val();

	window.location.href = `whatsapp://send/?phone=${nomor}&text=${pesan}&type=phone_number&app_absent=0`
});

$('#multi').click(function() {
	let nomor = $('[name="list-nomor"]').val();
	nomor = nomor.split('\n');
	const pesan = $('[name="pesan_multi"]').val();

	let el = '';
	nomor.forEach(val => {
		const no = (val[0] == '0') ? '62' + val.substr(1) : val;
		el += sentElement(no, pesan);
	});

	$('#target').html(el);
});