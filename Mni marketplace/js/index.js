addEventListener("DOMContentLoaded", function () {

    let allProducts = [];

    ReactDOM.createRoot(document.getElementById('cart-root')).render(
        React.createElement(Cart)
    );

    function displayProducts(products) {
        const grid = document.querySelector('.grid');
        grid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            
        <div class="cardImage">
            <span>${product.rating.rate}</span>
          <img src="${product.image}" alt="${product.title}">
        </div>
        <ul>
            <h1>${product.title}</h1>
            <p>${product.category}</p>
            <p class="price">${product.price} $</p>
            <p class="desc">${product.description}</p>
            <span> <b>${product.rating.count}</b> left in stock</span>
            
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
        </ul>
      `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function addToCart(e) {
        const productId = e.target.dataset.id;
        const product = allProducts.find(p => p.id == productId);
        window.addToCart(product);
    }

    function filterAndSearch() {
        const searchValue = document.getElementById('search').value.toLowerCase();
        const filterValue = document.getElementById('filter').value;

        const filtered = allProducts.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchValue);
            const matchesFilter = filterValue === 'all' || product.category === filterValue;
            return matchesSearch && matchesFilter;
        });

        displayProducts(filtered);
    }

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });

    document.getElementById('search').addEventListener('input', filterAndSearch);
    document.getElementById('filter').addEventListener('change', filterAndSearch);

    const layoutSwitch = document.querySelector(".layout")
    const gridCont = document.querySelector(".grid")

    layoutSwitch.addEventListener("click", function () {
        layoutSwitch.classList.toggle("active")
        gridCont.classList.toggle("active")
    })





    const lenis = new Lenis({
        autoRaf: true,
    });
    lenis.on('scroll', (e) => {

    });

})