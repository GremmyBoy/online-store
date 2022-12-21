import "./index.css";
import { createSorting , createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404'

const route = (event: Event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href);
    handleLocation();
};

const validPaths = ["", "/", "/cart", "/product"];
const handleLocation = () => {
    const path = window.location.pathname;

    if (path === '/') {
      createSorting();
      createGoodsCards(base.products);
    } else if (path === "/cart") {
      // TODO: add function createCart
    } else { 
      create404();
    }
}; 

window.onpopstate = handleLocation;
(window as any).route = route;
handleLocation();