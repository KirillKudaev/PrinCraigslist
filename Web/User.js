function getItem() {
	event.preventDefault();
	var item;
	var driver = new Driver();
	
	var itemCat = "Book"; //$("#searchItemCategory").val();
	var titleContains = "B"; // $("#searchItemTitle").val();
	
	
	//call the function
	driver.getItem(itemCat, titleContains, function(item) {
		console.log("title: " + item[0].get("title"));
		console.log("desc: " + item[0].get("description"));
		console.log("category: " + item[0].get("category"));
		console.log("price: " + item[0].get("price"));
		console.log("id: " + item[0].get("objectId"));
		console.log("userId: " + item[0].get("userId"));
		console.log("userEmail: " + item[0].get("userEmail"));
	});
}

function updateItem() {
	event.preventDefault();

	var driver = new Driver();

	var errors = driver.updateItem("UfZKQDYQsh"/*$("#itemId").val()*/, $("#updateTitle").val(), $("#updateDescription").val(),
		null, $("#updateCategory").val(), $("#updatePrice").val());

	
	if (errors.length > 0) {
		console.log(errors);
		errors.forEach(function(err) {
			console.log("error");
			alert("Error - " + err.tag + " : " + err.desc);
		});
	}
	else 
		console.log("no errors");
	
}