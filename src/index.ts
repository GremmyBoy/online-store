import './index.css';
import { createSorting, createGoodsCards } from './components/mainPage/index';
import { base } from './components/goodsBase';
import { create404 } from './components/error/404';
import { cart } from './components/cart/index';
import { productPage } from './components/productPage';
import { filterGoods } from './components/mainPage/index';
import { searchFunc } from './components/mainPage/index';
// import { sortFunctionDown } from './components/mainPage/index';
// import { sortFunctionUp } from './components/mainPage/index';
import { resultArr } from './components/mainPage/index';

const handleLocation = () => {
    const path = window.location.pathname;
    console.log(path, 'path');
    console.log(window.location.pathname, 'window.location.pathname');
    console.log(window.location.href, 'window.location.href');

    if (path === '/' || path === '') {
        const main = document.querySelector('main');
        if (main) main.innerHTML = '';
        createSorting();
        createGoodsCards(base.products);
        cart.checkCart();

        // resultArr = base.products;
        const categoryElement = document.querySelectorAll('.category-input');
        const brandElement = document.querySelectorAll('.brand-input');
        const priceElement = document.querySelectorAll('.price__input');
        const stockElement = document.querySelectorAll('.stock__input');
        const searchElement = document.querySelector('.search__input');
        const urlCategory = new URL(window.location.href).searchParams.getAll('category')[0];
        const urlBrand = new URL(window.location.href).searchParams.getAll('brand')[0];
        const urlPrice = new URL(window.location.href).searchParams.getAll('price')[0];
        const urlStock = new URL(window.location.href).searchParams.getAll('stock')[0];
        const urlSearch = new URL(window.location.href).searchParams.getAll('search')[0];
        const urlSort = new URL(window.location.href).searchParams.getAll('sort')[0];
        console.log(urlSort);

        if (urlSearch !== undefined) {
            if (urlSearch.length > 0) {
                if (searchElement as HTMLInputElement) {
                    (<HTMLInputElement>searchElement).value = urlSearch;
                }
            }
            // else {
            //     newUrl.searchParams.delete('category');
            //     window.history.pushState({}, '', newUrl);
            // }
        }

        if (urlCategory !== undefined) {
            if (urlCategory.split(',').length > 0) {
                urlCategory.split(',').forEach((el) => {
                    for (let i = 0; i < categoryElement.length; i++) {
                        if (categoryElement[i] as HTMLInputElement) {
                            if (el === categoryElement[i].id) {
                                (<HTMLInputElement>categoryElement[i]).checked = true;
                            }
                        }
                    }
                });
            }
            // else {
            //     newUrl.searchParams.delete('category');
            //     window.history.pushState({}, '', newUrl);
            // }
        }

        if (urlBrand !== undefined) {
            if (urlBrand.split(',').length > 0) {
                urlBrand.split(',').forEach((el) => {
                    for (let i = 0; i < brandElement.length; i++) {
                        if (brandElement[i] as HTMLInputElement) {
                            if (el === brandElement[i].id) {
                                (<HTMLInputElement>brandElement[i]).checked = true;
                            }
                        }
                    }
                });
            }
            // else {
            //     newUrl.searchParams.delete('brand');
            //     window.history.pushState({}, '', newUrl);
            // }
        }

        if (urlPrice !== undefined) {
            if (urlPrice[0].split('↕').length > 0) {
                if (priceElement[0] as HTMLInputElement && priceElement[1] as HTMLInputElement) {
                    if (+urlPrice.split('↕')[0] > 10 || +urlPrice.split('↕')[1] < 1749) {
                        (<HTMLInputElement>priceElement[0]).value = urlPrice.split('↕')[0];
                        (<HTMLInputElement>priceElement[1]).value = urlPrice.split('↕')[1];
                    }
                }
            }
            // else {
            //     newUrl.searchParams.delete('price');
            //     window.history.pushState({}, '', newUrl);
            // }
        }

        if (urlStock !== undefined) {
            if (urlStock.split('↕').length > 0) {
                if (stockElement[0] as HTMLInputElement && stockElement[1] as HTMLInputElement) {
                    if (+urlStock.split('↕')[0] > 10 || +urlStock.split('↕')[1] < 1749) {
                        (<HTMLInputElement>stockElement[0]).value = urlStock.split('↕')[0];
                        (<HTMLInputElement>stockElement[1]).value = urlStock.split('↕')[1];
                    }
                }
            }
            // else {
            //     newUrl.searchParams.delete('price');
            //     window.history.pushState({}, '', newUrl);
            // }
        }

        // if (urlSort !== undefined) {
        //     if (urlSort.length > 0) {
        //         if (urlSort === 'price-Asc') {
        //             return createGoodsCards(sortFunctionUp(resultArr, 'price'));
        //         }
        //         else if (urlSort === 'price-Desc') {
        //             return createGoodsCards(sortFunctionDown(resultArr, 'price'));
        //         }
        //         else if (urlSort === 'rating-Asc') {
        //             return createGoodsCards(sortFunctionUp(resultArr, 'rating'));
        //         }
        //         else if (urlSort === 'rating-Desc') {
        //             return createGoodsCards(sortFunctionDown(resultArr, 'rating'));
        //         }
        //     }
        //     // else {
        //     //     newUrl.searchParams.delete('category');
        //     //     window.history.pushState({}, '', newUrl);
        //     // }
        // }
        filterGoods();
        searchFunc();
        console.log(resultArr);
        const cartIco = document.querySelector('.header__cart');
        cartIco?.addEventListener('click', () => {
            cart.openCart();
        });
    } else if (path === '/cart') {
        cart.checkCart();
        cart.openCart();
    } else if (path.includes('/product/')) {
        const id: number = +path.slice(9);

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

window.onpopstate = handleLocation;
handleLocation();
