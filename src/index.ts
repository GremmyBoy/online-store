import "./index.html";
import "./index.css";
import { createGoodsCards } from './components/mainPage/index';

window.onload = function() {
    console.log('window.onload'); 
    createGoodsCards();
}