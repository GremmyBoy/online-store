import './style.css';
import { base } from '../goodsBase';
import { productInCart } from './product';

const cartAmount = document.querySelector('.cart__amoumt');
const main = document.querySelector('main');

class Cart {
    contents: {[key: string] : number};

    constructor() {
        if (localStorage.getItem('cart')) {
            this.contents = JSON.parse(localStorage.getItem('cart')!)
        } else {
            this.contents = {};
        }
    }

    public changeCartAmount = () => {
        if (cartAmount != undefined) {
            cartAmount.innerHTML = this.contents.amount + '';     
        }
    }

    public openCart = () => {
        let cartConteiner: HTMLDivElement;
        if (document.querySelector('.cart__conteiner')) {
            cartConteiner = document.querySelector('.cart__conteiner')!;
            document.querySelector('.cart__conteiner')!.innerHTML = '';
        } else {
            cartConteiner = document.createElement('div');
            cartConteiner.classList.add('cart__conteiner');
            main?.append(cartConteiner);
        }

        if (this.contents.amount === 0) {
            cartConteiner.innerHTML = 'Cart is Empty';
        }

        for (let key in this.contents) { 
            if (key !== 'amount') {
                const product = base.products.find((elem) => elem.id == +key)!;
                console.log(this.contents, 'this');
                const productAmount = this.contents[key];
                console.log(productAmount, 'productAmount');
    
                const card = document.createElement('div');
                card.classList.add('item');
                card.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).classList.contains('btn')) {
                    console.log(`click to product ${product.id} `)
                }
                })
    
            card.innerHTML = `<span class="delete-btn" data-artikul = ${product.id}></span>
            <div class="image">
              <img src="${product.images[0]}" alt=""/>
            </div>
            <div class="description">
              <span>${product.title}</span>
              <span>${product.brand}</span>
              <span>${product.description}</span>
            </div>
            <div class="quantity">
              <button class="plus-btn" data-artikul = ${product.id} data-stock = ${product.stock} type="button" name="button">+</button>
              <input type="text"  name="name" value="${productAmount}">
              <button class="minus-btn" data-artikul = ${product.id} type="button" name="button">-</button>
            </div>
            <div class="total-price">$${product.price * productAmount}</div>`;
                cartConteiner.append(card);
            }
            }

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && e.target.dataset.artikul) {
                    productInCart.deleteProduct(e.target.dataset.artikul)
                }
            })
        })

        document.querySelectorAll('.plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && e.target.dataset.artikul && e.target.dataset.stock) {
                    productInCart.plusProduct(e.target.dataset.artikul, e.target.dataset.stock)
                }
            })
        })

        document.querySelectorAll('.minus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target instanceof HTMLElement && e.target.dataset.artikul) {
                    productInCart.minusProduct(e.target.dataset.artikul)
                }
            })
        })
    }

    public checkCart = () => {
        if (localStorage.getItem('cart')) {
            this.contents = JSON.parse(localStorage.getItem('cart')!)
        }
        this.changeCartAmount();
        console.log(this.contents, 'cart from');
    }

    public addToCart = (id: number) => {
        this.contents[`${id}`] ? this.contents[`${id}`]++ : this.contents[`${id}`] = 1;
        this.contents.amount ? this.contents.amount++ : this.contents.amount = 1;
        this.changeCartAmount();
    
        localStorage.setItem('cart', JSON.stringify(this.contents));
    
        console.log(`add product ${id} to cart `);
        console.log(this.contents);
    }
}

export const cart: Cart = new Cart();