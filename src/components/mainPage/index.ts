import './../../libs/reset.css';
import './style.css';
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
    console.log([...categorySet]);
    return [...categorySet];
}

export const brandFilter = (base: product[]) => {
    let arr: any = [];
    base.forEach((product: product) => {
        arr.push(product.brand);
    });
    let brandSet = new Set(arr);
    console.log([...brandSet]);
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
        return createGoodsCards(sortFunctionUp(base.products, 'price'));
    })
    sortButtons[1].innerHTML = 'Price descending';
    sortButtons[1].addEventListener('click', (e) => {
        return createGoodsCards(sortFunctionDown(base.products, 'price'));
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
        categoryList.append(categoryInput);

        const categoryLabel = document.createElement('label');
        categoryLabel.setAttribute('for', `${item}`)
        categoryLabel.textContent = `${item}`;
        categoryList.append(categoryLabel);
    })

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
        brandList.append(brandInput);

        const brandLabel = document.createElement('label');
        brandLabel.setAttribute('for', `${item}`);
        brandLabel.textContent = `${item}`;
        brandList.append(brandLabel);
    })
}

// create cards

export const createGoodsCards = (base: product[]) => {
console.log('createGoodsCards');
    let goodsConteiner: HTMLDivElement;
    if (document.querySelector('.goods__conteiner')) {
        goodsConteiner = document.querySelector('.goods__conteiner')!;
        document.querySelector('.goods__conteiner')!.innerHTML = '';
    } else {
        goodsConteiner = document.createElement('div');
        goodsConteiner.classList.add('goods__conteiner');
        main?.append(goodsConteiner);
    }

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
            console.log(`add product ${product.id} to cart `)
            // TODO: add function 'addToCard'
        })
        btn.textContent = 'to cart';
        card.append(btn);

    })
}

















