var storeGenerator = function () {
	var orderedProducts = [];
	return {
		getAll: function () {return orderedProducts;},
		print: function () {
			var print = orderedProducts.length ? orderedProducts.length : '0';
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
	$('<img>', {
		class: 'product-image',
		src: productData.image,
	}).appendTo(container)
	var productInfo = $('<div>', {
		class: "info",
	}).appendTo(container)
	var productName = $('<span>', {
		text: productData.text,
		class: "prefix",
	}).appendTo(productInfo)
	/*var weight = */$('<span>', {
		text: productData.weight,
		class: "weight",
	}).appendTo(productInfo)
	var productDiscount = $('<div>', {
		class: "discount",
	}).appendTo(container)
	/*var productPrice = */$('<span>', {
		text: productData.price,
		class: "price",
	}).appendTo(productDiscount)
	/*var offer = */$('<span>', {
		text: productData.offer,
		class: "offer",
	}).appendTo(productDiscount)
	var price4unit = $('<span>', {
		text: productData.price4unit,
		class: "price4unit",
	}).appendTo(container)
	/*var price4unit = */$('<span>', {
		text: productData.unit,
		class: "unit",
	}).appendTo(price4unit)
	$('<span>', {
		text: productData.expire,
		class: "expire",
	}).appendTo(container)
	$('<span>', {
		text: productData.totalDiscount,
		class: "totalDiscount",
	})
	.prepend($('<img>', {class: 'discount-like', src: 'img/buytoday.png'}))
	.appendTo(container)
	$('<button>', {
		text: 'הוספה לסל',
		click: function (event) {
		store.order(productData);
		},
	}).appendTo(container)
	return container;
}
