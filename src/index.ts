import "./index.css";
import { createSorting , createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { product } from "./components/mainPage/index";


window.onload = function() {
    createSorting();
    createGoodsCards(base.products);
}



// console.log(sortFunction(base.products, 'price'));






