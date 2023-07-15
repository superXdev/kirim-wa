
$('#single').click(function() {
	const nomor = $('[name="nomor"]').val();
	const pesan = $('[name="pesan"]').val();

	window.location.href = `whatsapp://send/?phone=${nomor}&text=${pesan}&type=phone_number&app_absent=0`
});