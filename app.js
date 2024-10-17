// script.js
document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('productModal').classList.remove('hidden');
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('productModal').classList.add('hidden');
});

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Add your form submission logic here
    document.getElementById('productModal').classList.add('hidden');
});

document.getElementById('productForm').addEventListener('submit', addProduct);

function addProduct(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;

    if (!title || !price) {
        alert('Title and price are required.');
        return;
    }

    const product = { id: Date.now(), title, price, image, category };
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    addProductToList(product);
    document.getElementById('productForm').reset();
}

document.addEventListener('DOMContentLoaded', loadProducts);

function loadProducts() {
    const initialProducts = [
        { id: 1, title: "Product 1", price: 10, category: "Category 1" },
        { id: 2, title: "Product 2", price: 20, category: "Category 2" },
        { id: 3, title: "Product 3", price: 30, category: "Category 3" },
        { id: 4, title: "Product 4", price: 40, category: "Category 4" },
        { id: 5, title: "Product 5", price: 50, category: "Category 5" },
        { id: 6, title: "Product 6", price: 60, category: "Category 6" },
        { id: 7, title: "Product 7", price: 70, category: "Category 7" },
        { id: 8, title: "Product 8", price: 80, category: "Category 8" },
        { id: 9, title: "Product 9", price: 90, category: "Category 9" }
    ];

    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(addProductToList);
}

function addProductToList(product) {

    const productList = document.getElementById('productList');
    const productItem = document.createElement('li');
    // p-4 , 
    productItem.className = 'bg-white rounded shadow flex justify-between items-center ';

    productItem.innerHTML = `
    <div class="border rounded-lg overflow-hidden shadow-md flex flex-col justify-between items-center p-4 mb-4 w-64 h-80">
    <div class="w-full flex flex-col items-center">
        <h3 class="text-xl font-bold mb-2">${product.title}</h3>
        <img src="${"img/test.png"}" alt="${product.title}" class="w-32 h-32 object-cover mb-2">
        <p class="text-gray-700 mb-2">${product.category}</p>
    </div>
    <div class="w-full flex flex-col items-center">
        <p class="text-gray-700 mb-4">$${product.price}</p>
        <div class="w-full flex justify-between">
            <button class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onclick="editProduct(${product.id})">Edit</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    </div>
</div>

    `
    productList.appendChild(productItem);
}



function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}


function editProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;

    document.getElementById('productForm').removeEventListener('submit', addProduct);
    document.getElementById('productForm').addEventListener('submit', function(event) {
        event.preventDefault();
        product.title = document.getElementById('title').value;
        product.price = document.getElementById('price').value;
        product.image = document.getElementById('image').value;
        product.category = document.getElementById('category').value;

        saveProducts(products);
        document.getElementById('productList').innerHTML = '';
        products.forEach(addProductToList);
        document.getElementById('productForm').reset();
        document.getElementById('productForm').removeEventListener('submit', arguments.callee);
        document.getElementById('productForm').addEventListener('submit', addProduct);
    });
}


function deleteProduct(productId) {
    let products = getProducts();
    products = products.filter(p => p.id !== productId);
    saveProducts(products);
    document.getElementById('productList').innerHTML = '';
    products.forEach(addProductToList);
}



document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('sort').addEventListener('change', filterProducts);
document.getElementById('filterCategory').addEventListener('input', filterProducts);

function filterProducts() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const sortValue = document.getElementById('sort').value;
    const filterCategoryValue = document.getElementById('filterCategory').value.toLowerCase();
    
    let products = getProducts();

    if (searchValue) {
        products = products.filter(product => product.title.toLowerCase().includes(searchValue));
    }
    
    if (filterCategoryValue) {
        products = products.filter(product => product.category.toLowerCase().includes(filterCategoryValue));
    }

    if (sortValue === 'lowToHigh') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'highToLow') {
        products.sort((a, b) => b.price - a.price);
    }

    document.getElementById('productList').innerHTML = '';
    products.forEach(addProductToList);
}


document.getElementById('productForm').reset();







let ClearAll =() =>{
    localStorage.removeItem("products");
    // location.reload();
    
    console.log(localStorage);
}