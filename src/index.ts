import "./index.css";
import { createSorting , createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';

window.onload = function() {
    createSorting();
    createGoodsCards(base.products);
}