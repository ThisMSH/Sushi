if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready)
} else {
	ready()
}


function ready() {
	// Header part
	const header = document.querySelector("header");

	window.addEventListener ("scroll", function() {
		header.classList.toggle ("sticky", window.scrollY > 0);
	});

	let menu = document.querySelector('#menu-icon');
	let navbar = document.querySelector('.nav-mobile');

	menu.onclick = () => {
		menu.classList.toggle('bx-x');
		navbar.classList.toggle('open');
	};

	window.onscroll = () => {
		menu.classList.remove('bx-x');
		navbar.classList.remove('open');
	};
	// End of header part

	// Go to Top button
	// Get the button:
	let mybutton = document.getElementById("myTopBtn");

	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function() {scrollFunction()};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			mybutton.style.display = "block";
		} else {
			mybutton.style.display = "none";
		}
	}

	// End of Go to Top button

	var removeCartItemsButton = document.getElementsByClassName("remove-button")
	for (var i = 0; i < removeCartItemsButton.length; i++) {
		var button = removeCartItemsButton[i]
		button.addEventListener("click", removeCartItem)
	}

	var addToCart = document.getElementsByClassName("add-button")
	for (var i = 0; i < addToCart.length; i++) {
		var button = addToCart[i]
		button.addEventListener("click", addToCartClicked)
	}

	document.getElementsByClassName("purchase-button")[0].addEventListener("click", purchaseClicked)
}

// Cart section
function purchaseClicked() {
	alert("Thank you for your purchase.")
	var cartItems = document.getElementsByClassName("cart-items-list")[0]
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}

function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}

function addToCartClicked(event) {
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var itemName = shopItem.getElementsByClassName("item-name")[0].innerText
	var itemPrice = shopItem.getElementsByClassName("item-cart-price")[0].innerText
	var itemImg = shopItem.getElementsByClassName("cat-image")[0].src
	addItemToCart(itemName, itemPrice, itemImg)
	updateCartTotal()
}

function addItemToCart(itemName, itemPrice, itemImg) {
	var cartRow = document.createElement("div")
	cartRow.classList.add("cart-items")
	var cartItems = document.getElementsByClassName("cart-items-list")[0]
	var cartRowContents = `
		<div class="item">
			<img src="${itemImg}" alt="Image of your item">
			<span>${itemName}</span>
		</div>
		<div class="item">
			<span class="item-price">${itemPrice}</span>
			<button type="button" class="remove-button">Remove</button>
		</div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName("remove-button")[0].addEventListener("click", removeCartItem)
}

function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName("cart-items-list")[0]
	var cartItems = cartItemContainer.getElementsByClassName("cart-items")
	var total = 0
	for (var i = 0; i < cartItems.length; i++) {
		var cartItem = cartItems[i]
		var priceItem = cartItem.getElementsByClassName("item-price")[0]
		var price = parseFloat(priceItem.innerText.replace("$", ""))
		total = total + price
	}
	total = Math.round(total * 100) / 100 //this shows 2 decimals only in the total
	document.getElementsByClassName("total-price")[0].innerText = total + " $"
}
// End of cart section

// Categories section
function category(evt, categoryID) {
	var categoryContents = document.getElementsByClassName("category-section")
	var categoryButton = document.getElementsByClassName("category-btn")

	if(categoryID == "cat-section") {
		for(var i = 0; i < categoryContents.length; i++) {
			categoryContents[i].style.display = "flex"
		}
		
		return
	}

	for(var i = 0; i < categoryContents.length; i++) {
		categoryContents[i].style.display = "none"
	}

	for(var i = 0; i < categoryButton.length; i++) {
		categoryButton[i].className = categoryButton[i].className.replace(" active", "")
	}

	document.getElementById(categoryID).style.display = "flex"
	evt.currentTarget.className += " active"
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}