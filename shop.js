$('document').ready(function() {
	loadGoods();
});

function loadGoods() {
	$.getJSON('goods.json', function (data) {
		console.log(data);
		var out = '';
		console.log(data.length)
		for(var i = 0; i < data.length; i++){
			out += '<p>' + data[i]['name'] + '</p>';
			out += '<p>' + data[i]['cost'] + '</p>';
		}
		$('#goods').html(out);
	})
}

