import './index.css';
import { createSorting, createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404';
import { cart } from './components/cart/index';
import { productPage } from './components/productPage';
import { LibManifestPlugin } from 'webpack';

const handleLocation = () => {
    const path = window.location.pathname;
    console.log(path, 'path');
    console.log(window.location.pathname, 'window.location.pathname');
    console.log(window.location.href, 'window.location.href');

    if (path === '/online-store/' || path === '/online-store') {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '';
        createSorting();
        createGoodsCards(base.products);
        cart.checkCart();

        const cartIco = document.querySelector('.header__cart');
        cartIco?.addEventListener('click', () => {
            cart.openCart();
        });
    } else if (path === '/online-store/cart') {
        cart.checkCart();
        cart.openCart();
    } else if (path.includes('/online-store/product')) {
        const id: number = +path.slice(21);

        if (id >= 1 && id <= 100) {
            productPage.openProductPage(id);

            cart.checkCart();
            const cartIco = document.querySelector('.header__cart');
            cartIco?.addEventListener('click', () => {
                cart.openCart();
            });
        } else {
            create404();
        }
    } else if (path.includes('/online-store')) {
        create404();
    }
};

window.onpopstate = handleLocation;
handleLocation();
