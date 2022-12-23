import "./index.css";
import { createSorting , createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404';
import { cart } from './components/cart/index';

const route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href);
    handleLocation();
};

const validPaths = ["", "/", "/cart", "/product"];
const handleLocation = () => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '') {
      createSorting();
      createGoodsCards(base.products);
      cart.checkCart();
    } else if (path === "/cart") {
      cart.checkCart();
      cart.openCart();
    } else { 
      create404();
    }
}; 

window.onpopstate = handleLocation;
(window as any).route = route;
handleLocation();