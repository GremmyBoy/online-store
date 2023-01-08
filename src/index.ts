import './index.css';
import { createSorting, createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404';
import { cart } from './components/cart/index';
import { productPage } from './components/productPage';
import { LibManifestPlugin } from 'webpack';

const handleLocation = () => {
    const path = window.location.pathname.split('/');
    const newPath = path[path.length - 1];

    if (newPath === '/' || newPath === '') {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '';
        createSorting();
        createGoodsCards(base.products);
        cart.checkCart();

        const cartIco = document.querySelector('.header__cart');
        cartIco?.addEventListener('click', () => {
            cart.openCart();
        });
    } else if (newPath === 'cart') {
        cart.checkCart();
        cart.openCart();
    } else if (newPath.includes('product')) {
        const id: number = +newPath.slice(7);

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
