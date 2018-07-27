var storeGenerator = function () {
	var orderedProducts = [];
	return {
		getAll: function () {return orderedProducts;},
		print: function () {
			var print = '';
			if (orderedProducts.length) {
				// for (var i = 0; i < orderedProducts.length; i++) {
				// 	print += orderedProducts[i].name + ' ';
				// }
				print =  "מוצרים " + orderedProducts.length;
			} else {
				print = '0 מוצרים'
			}
			$('#products').text(print);
		},
		order: function (product) {
			orderedProducts.push(product);
			this.print();
			// backup
			localStorage.setItem('products', JSON.stringify(orderedProducts))
		},
		clear: function () {
			orderedProducts = []
			this.print()
		},
	}
}
var store = storeGenerator();
var goodsContainer = $('#goods');
$.get( "goods.json", function( productsData ) {
	for (var i = 0; i < productsData.length; i++) {
		goodsContainer.append(createProduct(productsData[i]))
	}
});
var backedUpProductsJson = localStorage.getItem('products');
if (backedUpProductsJson) {
	var backedUpProductsList = JSON.parse(backedUpProductsJson);
	for (var i = 0; i < backedUpProductsList.length; i++) {
		store.order(backedUpProductsList[i])
	}
}
store.print();
$('#clear_busket').click(function(event) {
	store.clear();
});
function createProduct(productData) {
	var container = $('<div>', {
		class: "product",
	});
	/*var productImage = */$('<img>', {
		src: productData.image,
	}).appendTo(container)
	/*var productName = */$('<span>', {
		text: productData.text,
		class: "prefix",
	}).appendTo(container)
	/*var productPrice = */$('<span>', {
		text: productData.price,
		class: "price",
	}).appendTo(container)
	$('<button>', {
		text: 'הוספה לסל',
		click: function (event) {
			store.order(productData);
		},
	}).appendTo(container)
	return container;
}
