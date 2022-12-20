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
    sortButtons[0].classList.add('up__btn');
    sortButtons[0].innerHTML = 'Price ascending';
    sortButtons[0].addEventListener('click', (e) => {
        return createGoodsCards(sortFunctionUp(base.products, 'price'));
    })
    sortButtons[1].innerHTML = 'Price descending';
    sortButtons[1].addEventListener('click', (e) => {
        return createGoodsCards(sortFunctionDown(base.products, 'price'));
    })
}

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














