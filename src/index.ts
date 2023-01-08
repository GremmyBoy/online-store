import './index.css';
import { createSorting, createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404';
import { cart } from './components/cart/index';
import { productPage } from './components/productPage';
import { LibManifestPlugin } from 'webpack';

// const validPaths = ['', '/', '/cart', '/product'];
const handleLocation = () => {
    const path = window.location.pathname;
    console.log(path);

    if (path === '/' || path === '') {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '';
        createSorting();
        createGoodsCards(base.products);
        cart.checkCart();

        const cartIco = document.querySelector('.header__cart');
        cartIco?.addEventListener('click', () => {
            cart.openCart();
        });
    } else if (path === '/cart') {
        cart.checkCart();
        cart.openCart();
    } else if (path.includes('/product')) {
        const id: number = +path.slice(8);

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
    } else {
        create404();
    }
};

// const route = (event: Event) => {
//     event = event || window.event;
//     event.preventDefault();
//     window.history.pushState({}, '', (event.target as HTMLAnchorElement).href);
//     handleLocation();
// };

window.onpopstate = handleLocation;
// (window as any).route = route;
handleLocation();
