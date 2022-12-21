import "./index.css";
import { createSorting , createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import {categoryFilter} from './components//mainPage/index';
import {brandFilter} from './components//mainPage/index';


window.onload = function() {
    createSorting();
    createGoodsCards(base.products);
    categoryFilter(base.products);
    brandFilter(base.products);
}







