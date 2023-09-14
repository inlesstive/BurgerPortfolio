// const products = {
//     crazy: {
//         name: 'Crazy',
//         price: 31000,
//         img: 'images/products/burger-1.png',
//         amount: 0,
//         get totalSumm() {
//             return this.price * this.amount;
//         }
//     },
//     light: {
//         name: 'Light',
//         price: 26000,
//         img: 'images/products/burger-2.png',
//         amount: 0,
//         get totalSumm() {
//             return this.price * this.amount;
//         }
//     },
//     cheeseburger: {
//         name: 'Cheeseburger',
//         price: 29000,
//         img: 'images/products/burger-3.png',
//         amount: 0,
//         get totalSumm() {
//             return this.price * this.amount;
//         }
//     },
//     dburger: {
//         name: 'dBurger',
//         price: 24000,
//         img: 'images/products/burger-4.png',
//         amount: 0,
//         get totalSumm() {
//             return this.price * this.amount;
//         }
//     },
// };




    const products = {};
    
    function loadData() {
        const allProducts = document.querySelectorAll('.wrapper__list-card');
        
        
        for (let i = 0; i < allProducts.length; i++) {
            const objKey = allProducts[i].getAttribute('id');
            const getPrice = allProducts[i].querySelector('.wrapper__list-text').innerHTML;
            const priceArr = getPrice.split(' ');
            
            priceArr.pop();
            
            const price = parseInt(priceArr.join(''));
            
            products[objKey] = {
                name: allProducts[i].querySelector('.wrapper__list-title').innerHTML,
                img: allProducts[i].querySelector('.wrapper__list-image').getAttribute('src'),
                price: price,
                amount: 0,
                get totalSumm() {
                    return this.price * this.amount;
                }
            }
            
        }
    }
    loadData()
    console.log(products);

// 

const productsBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketCheckList = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer'),
    closeBasketEl = document.querySelector('.closed__modal');
    
    
    closeBasketEl.addEventListener('click', function () {
        basketModal.classList.remove('active');
    })

productsBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(btn);
    })
})


function plusOrMinus(btn) {

    let parrent = btn.closest('.wrapper__list-card'),
        parrentId = parrent.getAttribute('id');
    products[parrentId].amount++;
    basket();

}

function basket() {
    const productsArray = [];
    for (const key in products) {
        let totalCount = 0;
        const po = products[key];
        const productCard = document.querySelector(`#${key.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.wrapper__list-count');
            
            console.log(parentIndicator);
        if (po.amount) {
            productsArray.push(po);
            basketBtnCount.classList.add('active');
            totalCount += po.amount;
            parentIndicator.classList.add('active');
            parentIndicator.innerHTML = po.amount;
        } else {
            parentIndicator.classList.remove('active');
            parentIndicator.innerHTML = 0;
        }
        basketBtnCount.innerHTML = totalCount;
    }
    basketCheckList.innerHTML = '';
    for (let i = 0; i < productsArray.length; i++) {
        basketCheckList.innerHTML += cardItemBurger(productsArray[i]);
    }

    const allCount = totalCountProduct();

    if (allCount) {
        basketBtnCount.classList.add('active');
    } else {
        basketBtnCount.classList.remove('active');
    }
    basketBtnCount.innerHTML = allCount.toLocaleString();

    totalPriceBasket.innerHTML = totalSummProduct();

}

basketBtn.addEventListener('click', function () {
    basketModal.classList.add('active');
});

closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active');
});

function cardItemBurger(productData) {

    const {
        name,
        totalSumm: price,
        amount,
        img
    } = productData;

    return `
       <div class = "wrapper__navbar-product">
           <div class = "wrapper__navbar-info">
               <img class ="wrapper__navbar-productImage" src="${img}" alt = "productImage">
               <div class = "wrapper__navbar-infoSub">
                 <p class = "wrapper__navbar-infoName">${name}</p>
                 <p class = "wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span>сум</p>
               </div>    
           </div>
           <div class = "wrapper__navbar-option" id = "${name.toLowerCase()}_card">
           <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
           <output class="wrapper__navbar-count">${amount}</output>
           <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
           </div>
       </div>
    `;
}


window.addEventListener('click', e => {
    const btn = e.target;
    if (btn.classList.contains('wrapper__navbar-symbol')) {

        const attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.wrapper__navbar-option');

        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0].toLowerCase();
            
            if (attr == '-') {
                products[idProduct].amount--;
            } else if (attr == '+') {
                products[idProduct].amount++;
            }
        }
        basket();
    }
});

function totalCountProduct() {
    let count = 0;
    for (const key in products) {
        count += products[key].amount;
    }

    return count;
}

function totalSummProduct() {
    let total = 0;
    for (const key in products) {
        total += products[key].totalSumm;
    }
    return total;
}


btnCard.addEventListener('click', function () {
    printBody.innerHTML = '';
    for (const key in products) {
        const {
            name,
            image,
            totalSumm,
            amount
        } = products[key];

        if (amount) {
            printBody.innerHTML = `         
            `;
        }
    }
    window.print();
})