
const inventory = [
    { id: "101", name: "Футболка Базовая Белая", size: "M", stock: 12, price: "7 990 ₸" },
    { id: "102", name: "Джинсы Slim Fit", size: "L", stock: 5, price: "18 990 ₸" },
    { id: "103", name: "Худи Оверсайз ALMA", size: "S", stock: 0, price: "22 500 ₸" },
    { id: "104", name: "Куртка Джинсовая", size: "M", stock: 3, price: "29 990 ₸" },
    { id: "105", name: "Футболка Базовая Чёрная", size: "L", stock: 8, price: "7 990 ₸" }
];


const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const employeeNameInput = document.getElementById('employeeName');
const userNameDisplay = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = employeeNameInput.value.trim();
    if (name) {
        userNameDisplay.textContent = `Сотрудник: ${name}`;
        loginModal.style.display = 'none';
    }
});

logoutBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    employeeNameInput.value = '';
    userNameDisplay.textContent = 'Сотрудник: Гость';
});


const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (!query) {
        searchResults.innerHTML = '<p class="placeholder-text">Введите запрос для поиска...</p>';
        return;
    }

    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(query) || item.id.includes(query)
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<p class="placeholder-text">Ничего не найдено</p>';
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-item';
        
        const stockStatus = item.stock > 0 
            ? `<span style="color: green;">В наличии: ${item.stock} шт.</span>` 
            : `<span style="color: red;">Нет на складе</span>`;

        div.innerHTML = `
            <div>
                <strong>[Арт. ${item.id}] ${item.name}</strong> (Размер: ${item.size})
            </div>
            <div>
                ${stockStatus} | <strong>${item.price}</strong>
            </div>
        `;
        searchResults.appendChild(div);
    });
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});


let salesCount = 0;
const salesCountDisplay = document.getElementById('salesCount');
const addSaleBtn = document.getElementById('addSaleBtn');
const resetSaleBtn = document.getElementById('resetSaleBtn');

addSaleBtn.addEventListener('click', () => {
    salesCount++;
    salesCountDisplay.textContent = salesCount;
});

resetSaleBtn.addEventListener('click', () => {
    if (confirm('Сбросить счетчик продаж за текущую смену?')) {
        salesCount = 0;
        salesCountDisplay.textContent = salesCount;
    }
});
