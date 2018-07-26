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
				print = orderedProducts.length;
			} else {
				print = 'nothing'
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
// var productsData = [
// 	{	"id": "product_1", "name" : "Schnitzel", "cost" : 19.9,	"description" : "Tasty schnitzel fingers", "image" : "img/1.jpg"},
	
// 	{	"id": "product_2",	"name" : "Rice sheets",	"cost" : 10.9,	"description" : "Rice sheets for sushi", "image" : "img/2.jpg"},
	
// 	{	"id": "product_3",	"name" : "Soap", "cost" : 9.9,	"description" : "Soap with apple flavor", "image" : "img/3.jpg"},
	
// 	{	"id": "product_4",  "name" : "Bran Flakes",	"cost" : 23.5, "description" : "Bran Flakes with vitamins",	"image" : "img/4.jpg"},
	
// 	{	"id": "product_5",	"name" : "Shower gel", "cost" : 10,	"description" : "Shower gel for men", "image" : "img/6.jpg"},
	
// 	{	"id": "product_6",	"name" : "Body lotion",	"cost" : 14.9, "description" : "Body lotion with vanilla flavor", "image" : "img/7.jpg"},

// 	{	"id": "product_7",	"name" : "Cheese", "cost" : 12.9, "description" : "Cheese Adam Si", "image" : "img/8.jpg"},

// 	{	"id": "product_8",	"name" : "Artik", "cost" : 7.9,	"description" : "Artik with banana and strawberry",	"image" : "img/10.jpg"}
// ];
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
