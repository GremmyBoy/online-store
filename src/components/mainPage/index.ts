import './../../libs/reset.css';
import './style.css';
import { cart } from '../cart/index';
import { base } from '../goodsBase';

export interface product {
        id: number;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        category: string;
        thumbnail: string;
        images: string[];
}

const main = document.querySelector('main');
let filteredArray: any;
    filteredArray = base.products;

const sortFunctionUp = (arr: product[], item: string) => {
    return arr.slice().sort(
    (a: any, b: any) => 
        a[item] - b[item]
    )
}

const sortFunctionDown = (arr: product[], item: string) => {
    return arr.slice().sort(
    (a: any, b: any) => 
        b[item] - a[item]
    )
}

export const categoryFilter = (base: product[]) => {
    let arr: any = [];
    base.forEach((product: product) => {
        arr.push(product.category);
    });
    let categorySet = new Set(arr);
    return [...categorySet];
}

export const brandFilter = (base: product[]) => {
    let arr: any = [];
    base.forEach((product: product) => {
        arr.push(product.brand);
    });
    let brandSet = new Set(arr);
    return [...brandSet];
}

// add filter and sorting

export const createSorting = () => {
    const sorting = document.createElement('div');
    sorting.classList.add('sorting__conteiner');
    main?.append(sorting);

    const sortBlock = document.createElement('div');
    sortBlock.classList.add('sort__block');
    sorting.append(sortBlock);

    for (let i = 0; i < 2; i++) {
        const sortButton = document.createElement('button');
        sortButton.classList.add('sort__button');
        sortBlock.append(sortButton);
    }

    const sortButtons = document.querySelectorAll('.sort__button');
    sortButtons[0].innerHTML = 'Price ascending';
    sortButtons[0].addEventListener('click', (e) => {
        return createGoodsCards(sortFunctionUp(filteredArray, 'price'));
    })
    sortButtons[1].innerHTML = 'Price descending';
    sortButtons[1].addEventListener('click', (e) => {
        return createGoodsCards(sortFunctionDown(filteredArray, 'price'));
    })

    // Create filter block

    const filterBlock = document.createElement('div');
    filterBlock.classList.add('filter__block');
    sorting.append(filterBlock);
    // addEvent INPUT for filterblock
   
    
    // create Category list

    const categoryBlock = document.createElement('div');
    categoryBlock.classList.add('category__block');
    filterBlock.append(categoryBlock);

    const categoryTitle = document.createElement('h2');
    categoryBlock.append(categoryTitle);
    categoryTitle.innerHTML = 'Category';

    const categoryList = document.createElement('div');
    categoryList.classList.add('category__list');
    categoryBlock.append(categoryList);
    categoryFilter(base.products).forEach((item) => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('category__item');
        categoryList.append(categoryItem);

        const categoryInput = document.createElement('input');
        categoryInput.setAttribute('type', 'checkbox');
        categoryInput.setAttribute('id', `${item}`);
        categoryInput.setAttribute('value', `${item}`);
        categoryList.append(categoryInput);

        const categoryLabel = document.createElement('label');
        categoryLabel.setAttribute('for', `${item}`)
        categoryLabel.textContent = `${item}`;
        categoryList.append(categoryLabel);
    })

    // Create brand block

    const brandBlock = document.createElement('div');
    brandBlock.classList.add('brand__block');
    filterBlock.append(brandBlock);

    const brandTitle = document.createElement('h2');
    brandBlock.append(brandTitle);
    brandTitle.innerHTML = 'Brand';

    const brandList = document.createElement('div');
    brandList.classList.add('brand__list');
    brandBlock.append(brandList);
    brandFilter(base.products).forEach((item) => {
        const brandItem = document.createElement('div');
        brandItem.classList.add('brand__item');
        brandList.append(brandItem);

        const brandInput = document.createElement('input');
        brandInput.setAttribute('type', 'checkbox');
        brandInput.setAttribute('id', `${item}`);
        brandInput.setAttribute('value', `${item}`);
        brandList.append(brandInput);

        const brandLabel = document.createElement('label');
        brandLabel.setAttribute('for', `${item}`);
        brandLabel.textContent = `${item}`;
        brandList.append(brandLabel);
    })

    // create price block

    const priceBlock = document.createElement('div');
    priceBlock.classList.add('price__block');
    filterBlock.append(priceBlock);
    
    const priceTitle = document.createElement('h2');
    priceTitle.innerHTML = 'Price';
    priceBlock.append(priceTitle);

    const priceValues = document.createElement('div');
    priceValues.classList.add('price__values');
    priceBlock.append(priceValues);

    for(let i = 0; i < 3; i++){
        const priceSpan = document.createElement('span');
        priceValues.append(priceSpan);
    }

    const priceSpan = document.querySelectorAll('.price__values span');
    priceSpan[0].classList.add('price-range1');
    priceSpan[0].innerHTML = '10$';
    priceSpan[1].innerHTML = '-';
    priceSpan[2].classList.add('price-range2');
    priceSpan[2].innerHTML = '1749$';

    const priceFormBlock = document.createElement('div');
    priceFormBlock.classList.add('price__form-block');
    priceBlock.append(priceFormBlock);

    const priceInputTrack = document.createElement('div');
    priceInputTrack.classList.add('price__track');
    priceFormBlock.append(priceInputTrack);

    for(let i = 0; i < 2; i++){
        const priceInput = document.createElement('input');
        priceInput.setAttribute('type', 'range');
        priceInput.setAttribute('min', '10');
        priceInput.setAttribute('max', '1749');
        priceInput.classList.add('price__input');
        priceFormBlock.append(priceInput);
    }

    const priceInputs = document.querySelectorAll('.price__input');
    priceInputs[0].classList.add('price-min');
    priceInputs[0].setAttribute('value', '10');
    priceInputs[1].classList.add('price-max');
    priceInputs[1].setAttribute('value', '1749');

    priceInputs[0].addEventListener('input', priceOne);

    priceInputs[1].addEventListener('input', priceTwo);


    const minGap = 0;

    function priceOne() {
        let priceMin = parseInt((<HTMLInputElement>priceInputs[0]).value);
        let priceMax = parseInt((<HTMLInputElement>priceInputs[1]).value);
        if(priceMax - priceMin <= minGap) {
            (<HTMLInputElement>priceInputs[0]).value = String(priceMax - minGap);
        }
        priceSpan[0].innerHTML = `${(<HTMLInputElement>priceInputs[0]).value}$`;
    }

    function priceTwo() {
        let priceMin = parseInt((<HTMLInputElement>priceInputs[0]).value);
        let priceMax = parseInt((<HTMLInputElement>priceInputs[1]).value);
        if(priceMax - priceMin <= minGap) {
            (<HTMLInputElement>priceInputs[1]).value = String(priceMin + minGap);
        }
        priceSpan[2].innerHTML = `${(<HTMLInputElement>priceInputs[1]).value}$` ;
    }

    // create stock block

    const stockBlock = document.createElement('div');
    stockBlock.classList.add('stock__block');
    filterBlock.append(stockBlock);
    
    const stockTitle = document.createElement('h2');
    stockTitle.innerHTML = 'Stock';
    stockBlock.append(stockTitle);

    const stockValues = document.createElement('div');
    stockValues.classList.add('stock__values');
    stockBlock.append(stockValues);

    for(let i = 0; i < 3; i++) {
        const stockSpan = document.createElement('span');
        stockValues.append(stockSpan);
    }

    const stockSpan = document.querySelectorAll('.stock__values span');
    stockSpan[0].classList.add('stock-range1');
    stockSpan[0].innerHTML = '2';
    stockSpan[1].innerHTML = '-';
    stockSpan[2].classList.add('stock-range2');
    stockSpan[2].innerHTML = '150';

    const stockFormBlock = document.createElement('div');
    stockFormBlock.classList.add('stock__form-block');
    stockBlock.append(stockFormBlock);

    const stockInputTrack = document.createElement('div');
    stockInputTrack.classList.add('stock__track');
    stockFormBlock.append(stockInputTrack);

    for(let i = 0; i < 2; i++) {
        const stockInput = document.createElement('input');
        stockInput.setAttribute('type', 'range');
        stockInput.setAttribute('min', '2');
        stockInput.setAttribute('max', '150');
        stockInput.classList.add('stock__input');
        stockFormBlock.append(stockInput);
    }

    const stockInputs = document.querySelectorAll('.stock__input');
    stockInputs[0].classList.add('stock-min');
    stockInputs[0].setAttribute('value', '2');
    stockInputs[1].classList.add('stock-max');
    stockInputs[1].setAttribute('value', '150');

    stockInputs[0].addEventListener('input', stockOne);

    stockInputs[1].addEventListener('input', stockTwo);

    function stockOne() {
        let stockMin = parseInt((<HTMLInputElement>stockInputs[0]).value);
        let stockMax = parseInt((<HTMLInputElement>stockInputs[1]).value);
        if(stockMax - stockMin <= minGap) {
            (<HTMLInputElement>stockInputs[0]).value = String(stockMax - minGap);
        }
        stockSpan[0].innerHTML = `${(<HTMLInputElement>stockInputs[0]).value}`;
    }

    function stockTwo() {
        let stockMin = parseInt((<HTMLInputElement>stockInputs[0]).value);
        let stockMax = parseInt((<HTMLInputElement>stockInputs[1]).value);
        if(stockMax - stockMin <= minGap) {
            (<HTMLInputElement>stockInputs[1]).value = String(stockMin + minGap);
            
        }
        stockSpan[2].innerHTML = `${(<HTMLInputElement>stockInputs[1]).value}` ;
    }

    // create filter Function

    const filterGoods = () => {
        const category = [...document.querySelectorAll('.category__list input:checked')].map((n: any) => n.value);
        console.log(category);

        const brand = [...document.querySelectorAll('.brand__list input:checked')].map((v: any) => v.value);
        console.log(brand);
        
        const priceMin = (<HTMLInputElement>document.querySelector('.price-min')).value;
        console.log(priceMin);
        
        const priceMax = (<HTMLInputElement>document.querySelector('.price-max')).value;
        
        const stockMin = (<HTMLInputElement>document.querySelector('.stock-min')).value;
        
        const stockMax = (<HTMLInputElement>document.querySelector('.stock-max')).value;
        
        filteredArray = base.products.filter((n: any) => {
            return ((!category.length || category.includes(n.category)) &&
            (!brand.length || brand.includes(n.brand))
            ) &&
            (!priceMin || priceMin <= n.price) &&
            (!priceMax || priceMax >= n.price) &&
            (!stockMin || stockMin <= n.stock) &&
            (!stockMax || stockMax >= n.stock)  
        })

        createGoodsCards(filteredArray);
    }
        console.log(filterGoods());
    filterBlock.addEventListener('input', (e) => {
        return filterGoods();
    })
}


// сreate Сards

export const createGoodsCards = (base: product[]) => {
    let products: HTMLDivElement;
    if (document.querySelector('.products')) {
        products = document.querySelector('.products')!;
        document.querySelector('.products')!.innerHTML = '';
    } else {
        products = document.createElement('div');
        products.classList.add('products');
        main?.append(products);
    }

    const searchInputBlock = document.createElement('div');
    searchInputBlock.classList.add('search__block');
    products?.append(searchInputBlock);
    
    const searchInput = document.createElement('input');
    searchInput.classList.add('search__input');
    searchInputBlock.append(searchInput);


    let goodsConteiner: HTMLDivElement;
    if (document.querySelector('.goods__conteiner')) {
        goodsConteiner = document.querySelector('.goods__conteiner')!;
        document.querySelector('.goods__conteiner')!.innerHTML = '';
    } else {
        goodsConteiner = document.createElement('div');
        goodsConteiner.classList.add('goods__conteiner');
        products?.append(goodsConteiner);
    }

    // const searchInputBlock = document.createElement('div');
    // searchInputBlock.classList.add('search__block');

    
    base.forEach((product: product) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.addEventListener('click', (e) => {
            if (!(e.target as HTMLElement).classList.contains('btn')) {
                console.log(`click to product ${product.id} `)
            }
        })
        goodsConteiner.append(card);

        const image = document.createElement('img');
        image.classList.add('card__image');
        image.src = product.images[0];
        card.append(image);

        const description = document.createElement('div');
        description.classList.add('card__description');
        card.append(description);

        const name = document.createElement('p');
        name.classList.add('product__name');
        name.textContent = product.title;
        description.append(name);

        const brand = document.createElement('p');
        brand.classList.add('product__brand');
        brand.textContent = product.brand;
        description.append(brand);

        const price = document.createElement('p');
        price.classList.add('product__price');
        price.textContent = `$ ${product.price}`;
        description.append(price);

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn__toCart');
        btn.dataset.artikul = product.id + '';
        btn.addEventListener('click', () => {
            cart.addToCart(product.id, product.price);
            // console.log(`add product ${product.id} to cart `)
        })
        btn.textContent = 'to cart';
        card.append(btn);
    })

    const goodsNumber = () => {
        let goods = document.querySelectorAll('.card');
        let count = 0;
        goods.forEach((item) => {
            if (!item.classList.contains('hide')){
                count++;
            }
        })
        console.log(count);
        return count;
    }

    const countGoods = document.createElement('p');
    countGoods.classList.add('count__goods');
    countGoods.textContent = `COUNT:${goodsNumber()}`
    searchInputBlock.append(countGoods);

    // Create search function

    searchInput.addEventListener('input', function() {
        let val = this.value.trim();
        let cards = document.querySelectorAll('.card');
        let reg = new RegExp(val, 'gi');
        if(val != '') {
            cards.forEach((card: any) => {
                if(card.innerText.search(reg) == -1) {
                    card.classList.add('hide');
                }
                else {
                    card.classList.remove('hide');
                }
            })
        }
        else {
            cards.forEach((card) => {
                card.classList.remove('hide');
            })
        }
        // filteredArray = document.querySelectorAll('.card');
        // console.log(filteredArray);
        countGoods.textContent = `COUNT:${goodsNumber()}`;
        // if(countGoods.textContent === `COUNT:0`) {
        //     let zeroBlock = document.createElement('p');
        //     zeroBlock.classList.add('zero-block');
        //     goodsConteiner?.append(zeroBlock);
        //     zeroBlock.innerHTML = 'Oops! We are not found any goods(';
        // }
        // else {
        //     let zeroBlock = document.querySelector('.zero-block');
        //     zeroBlock?.remove();
        // }
    })

    if (countGoods.textContent === 'COUNT:0') {
        let zeroBlock = document.createElement('p');
        zeroBlock.classList.add('zero-block');
        goodsConteiner?.append(zeroBlock);
        zeroBlock.innerHTML = 'Oops! We are not found any goods(';
    }
}














