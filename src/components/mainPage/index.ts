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
let filteredArray: product[];
filteredArray = base.products;

export const createGoodsCards = (base: product[] | (product | undefined)[]) => {
    let products: HTMLDivElement;
    const productsFromPage = document.querySelector('.products');
    if (productsFromPage) {
        products = document.querySelector('.products') as HTMLDivElement;
        productsFromPage.innerHTML = '';
    } else {
        products = document.createElement('div');
        products.classList.add('products');
        main?.append(products);
    }

    const searchInputBlock = document.createElement('div');
    searchInputBlock.classList.add('search__block');
    products?.append(searchInputBlock);

    // const searchInput = document.createElement('input');
    // searchInput.classList.add('search__input');
    // searchInputBlock.append(searchInput);

    let goodsConteiner: HTMLDivElement;
    const goodsConteinerFromPage = document.querySelector('.goods__conteine');
    if (goodsConteinerFromPage) {
        goodsConteiner = document.querySelector(
            '.goods__conteiner'
        ) as HTMLDivElement;
        goodsConteinerFromPage.innerHTML = '';
    } else {
        goodsConteiner = document.createElement('div');
        goodsConteiner.classList.add('goods__conteiner');
        products?.append(goodsConteiner);
    }

    // const searchInputBlock = document.createElement('div');
    // searchInputBlock.classList.add('search__block');

    base.forEach((product: product | undefined) => {
        if (product) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.artikul = product.id + '';
            card.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).classList.contains('btn')) {
                    console.log(`click to product ${product.id} `);
                }
            });
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
                console.log(`add product ${product.id} to cart `);
            });
            btn.textContent = 'to cart';
            card.append(btn);
        }
    });

    const goodsNumber = () => {
        const goods = document.querySelectorAll('.card');
        let count = 0;
        goods.forEach((item) => {
            if (!item.classList.contains('hide')) {
                count++;
            }
        });

        if (count === 0) {
            let zeroBlock: HTMLElement;
            const zeroBlockFromPage = document.querySelector('.zero-block');
            if (zeroBlockFromPage) {
                zeroBlock = document.querySelector(
                    '.zero-block'
                ) as HTMLDivElement;
                zeroBlockFromPage.innerHTML = '';
            } else {
                zeroBlock = document.createElement('p');
                zeroBlock.classList.add('zero-block');
                goodsConteiner?.append(zeroBlock);
            }
            zeroBlock.innerHTML = 'Oops! We are not found any goods(';
        } else {
            const zeroBlockFromPage = document.querySelector('.zero-block');
            if (zeroBlockFromPage) {
                zeroBlockFromPage.innerHTML = '';
            }
        }

        return count;
    };

    const countGoods = document.createElement('p');
    countGoods.classList.add('count__goods');
    countGoods.textContent = `COUNT:${goodsNumber()}`;
    searchInputBlock.append(countGoods);
};

const sortFunctionUp = (arr: product[], sorter: string) => {
    return arr.slice().sort((a: product, b: product) => {
        return (
            (a[sorter as keyof typeof a] as number) -
            (b[sorter as keyof typeof b] as number)
        );
    });
};

const sortFunctionDown = (arr: product[], sorter: string) => {
    return arr.slice().sort((a: product, b: product) => {
        return (
            (b[sorter as keyof typeof b] as number) -
            (a[sorter as keyof typeof a] as number)
        );
    });
};

export const categoryFilter = (base: product[]) => {
    const arr: string[] = [];
    base.forEach((product: product) => {
        arr.push(product.category);
    });
    const categorySet = new Set(arr);
    return [...categorySet];
};

export const brandFilter = (base: product[]) => {
    const arr: string[] = [];
    base.forEach((product: product) => {
        arr.push(product.brand);
    });
    const brandSet = new Set(arr);
    return [...brandSet];
};

// add filter and sorting

export const createSorting = () => {
    const sorting = document.createElement('div');
    sorting.classList.add('sorting__conteiner');
    main?.append(sorting);

    const searchInput = document.createElement('input');
    searchInput.classList.add('search__input');
    sorting.append(searchInput);

    searchInput.addEventListener('input', function () {
        const val = this.value.trim();
        console.log(val);
        // let cards = document.querySelectorAll('.card');
        const reg = new RegExp(val, 'gi');
        if (val != '') {
            const finedArray: (product | undefined)[] = [];
            filteredArray.forEach((product: product) => {
                if (
                    product.brand.search(reg) !== -1 ||
                    product.category.search(reg) !== -1 ||
                    product.description.search(reg) !== -1 ||
                    product.title.search(reg) !== -1
                ) {
                    finedArray.push(product);
                }
            });
            // cards.forEach((card: Element) => {
            //     if (card instanceof HTMLDivElement) {
            //         if(card.innerText.search(reg) !== -1) {
            //             finedArray.push(base.products.find((item) => item.id === +card.dataset.artikul!));
            //         }

            //         // if(card.innerText.search(reg) == -1) {
            //         //     card.classList.add('hide');
            //         // }
            //         // else {
            //         //     card.classList.remove('hide');
            //         // }
            //     }
            // })
            createGoodsCards(finedArray);
        } else {
            createGoodsCards(filteredArray);
        }
        // else {
        //     cards.forEach((card) => {
        //         card.classList.remove('hide');
        //     })
        // }
        // filteredArray = document.querySelectorAll('.card');
        // console.log(filteredArray);
        // countGoods.textContent = `COUNT:${goodsNumber()}`;
    });

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
    sortButtons[0].addEventListener('click', () => {
        return createGoodsCards(sortFunctionUp(filteredArray, 'price'));
    });
    sortButtons[1].innerHTML = 'Price descending';
    sortButtons[1].addEventListener('click', () => {
        return createGoodsCards(sortFunctionDown(filteredArray, 'price'));
    });

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
        categoryLabel.setAttribute('for', `${item}`);
        categoryLabel.textContent = `${item}`;
        categoryList.append(categoryLabel);
    });

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
    });

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

    for (let i = 0; i < 3; i++) {
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

    for (let i = 0; i < 2; i++) {
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

    const minGap = 0;

    function priceOne() {
        const priceMin = parseInt((<HTMLInputElement>priceInputs[0]).value);
        const priceMax = parseInt((<HTMLInputElement>priceInputs[1]).value);
        if (priceMax - priceMin <= minGap) {
            (<HTMLInputElement>priceInputs[0]).value = String(
                priceMax - minGap
            );
        }
        priceSpan[0].innerHTML = `${(<HTMLInputElement>priceInputs[0]).value}$`;
    }

    function priceTwo() {
        const priceMin = parseInt((<HTMLInputElement>priceInputs[0]).value);
        const priceMax = parseInt((<HTMLInputElement>priceInputs[1]).value);
        if (priceMax - priceMin <= minGap) {
            (<HTMLInputElement>priceInputs[1]).value = String(
                priceMin + minGap
            );
        }
        priceSpan[2].innerHTML = `${(<HTMLInputElement>priceInputs[1]).value}$`;
    }

    priceInputs[0].addEventListener('input', priceOne);
    priceInputs[1].addEventListener('input', priceTwo);

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

    for (let i = 0; i < 3; i++) {
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

    for (let i = 0; i < 2; i++) {
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

    function stockOne() {
        const stockMin = parseInt((<HTMLInputElement>stockInputs[0]).value);
        const stockMax = parseInt((<HTMLInputElement>stockInputs[1]).value);
        if (stockMax - stockMin <= minGap) {
            (<HTMLInputElement>stockInputs[0]).value = String(
                stockMax - minGap
            );
        }
        stockSpan[0].innerHTML = `${(<HTMLInputElement>stockInputs[0]).value}`;
    }

    function stockTwo() {
        const stockMin = parseInt((<HTMLInputElement>stockInputs[0]).value);
        const stockMax = parseInt((<HTMLInputElement>stockInputs[1]).value);
        if (stockMax - stockMin <= minGap) {
            (<HTMLInputElement>stockInputs[1]).value = String(
                stockMin + minGap
            );
        }
        stockSpan[2].innerHTML = `${(<HTMLInputElement>stockInputs[1]).value}`;
    }

    stockInputs[0].addEventListener('input', stockOne);
    stockInputs[1].addEventListener('input', stockTwo);

    // create filter Function

    const filterGoods = () => {
        const category = [
            ...document.querySelectorAll('.category__list input:checked'),
        ].map((n: Element) => (n as HTMLInputElement).value);
        console.log(category);

        const brand = [
            ...document.querySelectorAll('.brand__list input:checked'),
        ].map((v: Element) => (v as HTMLInputElement).value);
        console.log(brand);

        const priceMin = (<HTMLInputElement>(
            document.querySelector('.price-min')
        )).value;
        console.log(priceMin);

        const priceMax = (<HTMLInputElement>(
            document.querySelector('.price-max')
        )).value;

        const stockMin = (<HTMLInputElement>(
            document.querySelector('.stock-min')
        )).value;

        const stockMax = (<HTMLInputElement>(
            document.querySelector('.stock-max')
        )).value;

        filteredArray = base.products.filter((n: product) => {
            return (
                (!category.length || category.includes(n.category)) &&
                (!brand.length || brand.includes(n.brand)) &&
                (!priceMin || +priceMin <= n.price) &&
                (!priceMax || +priceMax >= n.price) &&
                (!stockMin || +stockMin <= n.stock) &&
                (!stockMax || +stockMax >= n.stock)
            );
        });

        createGoodsCards(filteredArray);
    };
    console.log(filterGoods());
    filterBlock.addEventListener('input', () => {
        return filterGoods();
    });
};
