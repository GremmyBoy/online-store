import './style.css';
import { base } from '../goodsBase';
import { productInCart } from './product';

const cartAmount = document.querySelector('.cart__amoumt');
const main = document.querySelector('main');
const allPrice = document.querySelector('.total-price');

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
            !this.contents.amount ?
            cartAmount.innerHTML = '0' :
            cartAmount.innerHTML = this.contents.amount + '';  
        } 
    }

    public changeTotalPrice = () => {
        if (allPrice != undefined) {
            if (!this.contents.totalPrice) {
                allPrice.innerHTML = '0.00';
            } else {
                if (this.contents.totalPrice >= 1000) {
                    allPrice.innerHTML = `${Math.floor(this.contents.totalPrice/1000)},${this.contents.totalPrice%1000}` + '.00'; 
                } else {
                    allPrice.innerHTML = this.contents.totalPrice + '.00'; 
                }
            }        
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
        } else {
            for (let key in this.contents) { 
                if (key !== 'amount' && key !== 'totalPrice') {
                    const product = base.products.find((elem) => elem.id == +key)!;
                    const productAmount = this.contents[key];
        
                    const card = document.createElement('div');
                    card.classList.add('item');
                    card.addEventListener('click', (e) => {
                    if (!(e.target as HTMLElement).classList.contains('btn')) {
                        console.log(`click to product ${product.id} `);
                    }
                    })
        
                card.innerHTML = `<span class="delete-btn" data-artikul = ${product.id} data-price = ${product.price}></span>
                <div class="image">
                  <img src="${product.images[0]}" alt="${product.title}"/>
                </div>
                <div class="info">
                    <div class="info__name">
                        <span>${product.title}</span>
                        <span>${product.brand}</span>
                    </div>
                  <span class="info__description">${product.description}</span>
                    <div class="info__details">
                        <span> Rating: ${product.rating}</span>
                        <span> Discount: ${product.discountPercentage}%</span>
                        <span> Stock: ${product.stock}</span>
                    </div>
                </div>
                <div class="quantity">
                    <button class="minus-btn" data-artikul = ${product.id} data-price = ${product.price} type="button" name="button">-</button>
                    <div class="amount">${productAmount}</div>
                    <button class="plus-btn" data-artikul = ${product.id} data-stock = ${product.stock} data-price = ${product.price} type="button" name="button">+</button>
                </div>
                <div class="price">$${product.price * productAmount}</div>`;
                    cartConteiner.append(card);
                }
                }
    
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (e.target instanceof HTMLElement && 
                        e.target.dataset.artikul && 
                        e.target.dataset.price) {
                        productInCart.deleteProduct(e.target.dataset.artikul, +e.target.dataset.price);
                    }
                })
            })
    
            document.querySelectorAll('.plus-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (e.target instanceof HTMLElement && 
                        e.target.dataset.artikul && 
                        e.target.dataset.stock &&
                        e.target.dataset.price) {
                        productInCart.plusProduct(e.target.dataset.artikul, e.target.dataset.stock, +e.target.dataset.price);
                    }
                })
            })
    
            document.querySelectorAll('.minus-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    if (e.target instanceof HTMLElement &&
                        e.target.dataset.artikul &&
                        e.target.dataset.price) {
                        productInCart.minusProduct(e.target.dataset.artikul, +e.target.dataset.price);
                    }
                })
            })
        }
    }

    public checkCart = () => {
        if (localStorage.getItem('cart')) {
            this.contents = JSON.parse(localStorage.getItem('cart')!)
        }
        this.changeCartAmount();
        this.changeTotalPrice();
    }

    public addToCart = (id: number, price: number) => {
        this.contents[`${id}`] ? this.contents[`${id}`]++ : this.contents[`${id}`] = 1;
        this.contents.amount ? this.contents.amount++ : this.contents.amount = 1;
        this.contents.totalPrice ? (this.contents.totalPrice = this.contents.totalPrice + price): this.contents.totalPrice = price;
        this.changeCartAmount();
        this.changeTotalPrice();

    
        localStorage.setItem('cart', JSON.stringify(this.contents));
    }
}

export const cart: Cart = new Cart();