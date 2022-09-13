let totalCarrito = 0

const alerta  = () => {
    Swal.fire({
        title: 'Succes',
        text: 'Se agrego correctamente tu producto al carrito',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
}
const alertaVaciar  = () => {
    Swal.fire({
        title: 'succes',
        text: 'Se vacio correctamente tu carrito',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
}

async function fetchItems () {
	const response = await fetch('proyect.json');
	const items = await response.json();
	return items
}
fetchItems().then(items => {

const body = document.getElementsByTagName('body')[0];

const buttonHandler = (event, item) => {
	if (event.target.id.indexOf('add-') > -1) {
		item.count++
	} else {
		item.count <= 0 ? alert('No es posible')	: item.count--;
	}

	const itemCount = document.getElementById('item-' + item.id);
	itemCount.innerText = item.count;
};
const vaciarHandler = (event) => {
	alertaVaciar()
	let rows = Array.from(document.getElementsByClassName('row'))
	rows.forEach(r => {
		cartDiv.removeChild(r)
	
	})

	total.innerText = 0
};

const buttonCartHandler = (event, item) => {
	let row = document.createElement('p')
	row.className = 'row';
	row.innerText = item.count + ' ' + item.nombre;
	cartDiv.appendChild(row);
	alerta()

	totalCarrito = totalCarrito + item.count * item.precio;
	total.innerText = totalCarrito
};

const createButton = (text, prefix, item, handler) => {
	var button = document.createElement("button");
	button.style.margin = '0 5px';
	button.id = prefix + item.id;
	button.innerText = text;
	button.addEventListener('click', (e) => handler(e, item));

	return button;
};

const createButtons = (item) => {
	var div = document.createElement('div');
	div.style.margin = '10px 0 30px 0';
	div.id = "buttons-container"

	div.appendChild(createButton('+', 'add-', item, buttonHandler));
	div.appendChild(createButton('-', 'remove-', item, buttonHandler));
	div.appendChild(createButton('Add', 'cart-', item, buttonCartHandler));
	return div;
};

const div = document.createElement("div");
div.id = "container"
document.body.appendChild(div);

items.forEach(item => {
	var name = document.createElement('label');
	name.innerHTML = '<b>Nombre: </b>' + item.nombre + '<br>';
	div.appendChild(name);

	var price = document.createElement('label');
	price.innerHTML = '<b>Precio: </b>' + item.precio + '<br>';
	div.appendChild(price);

	var itemCountLabel = document.createElement('label');
	itemCountLabel.innerHTML = '<b>Items: </b>' + item.count;
	div.appendChild(itemCountLabel);

	var itemCount = document.createElement('label');
	itemCount.id = 'item-' + item.id;
	itemCount.innerText = item.count;
	div.appendChild(itemCount);

	div.appendChild(createButtons(item));
});

var hr = document.createElement('hr');
document.body.appendChild(hr);


let carritoHead = document.getElementById('carritoH3')
	carritoHead.innerHTML = `<h3>Carrito</h3>`;
	document.body.append(carritoHead);

const total = document.getElementById('total')
	total.innerHTML = `Total`;
	document.body.append(total);

let vaciar = document.getElementById('vaciar')
	vaciar.innerHTML = `Vaciar`;
	vaciar.addEventListener('click', (e) => vaciarHandler(e))
	document.body.append(vaciar);



const cartDiv = document.createElement("div");
cartDiv.id = "cart-container"
document.body.appendChild(cartDiv);


});