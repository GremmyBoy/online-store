import './../../libs/reset.css';
import './style.css';
import { cart } from '../cart/index';

interface product {
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

export const createSorting = () => {
    const sorting = document.createElement('div');
    sorting.classList.add('sorting__conteiner');
    main?.append(sorting);
    // TODO: add sorting content
    sorting.textContent = 'sorting';
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
            cart.addToCart(product.id, product.price);
            // console.log(`add product ${product.id} to cart `)
        })
        btn.textContent = 'to cart';
        card.append(btn);

    })
}
