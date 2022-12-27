import { cart } from "./index";

class Product {
    public deleteProduct = (id: string) => {
        cart.contents.amount = cart.contents.amount - cart.contents[id];
        delete cart.contents[id];
        this.updateProducts();
    }

    public minusProduct = (id: string) => {
        cart.contents.amount = cart.contents.amount - 1;
        cart.contents[id]--;
        if (cart.contents[id] < 1) {
            this.deleteProduct(id);
        } else {
            this.updateProducts();
        }
    }

    public plusProduct = (id: string, stock: string) => {
        cart.contents.amount = cart.contents.amount + 1;
        cart.contents[id]++;
        if (cart.contents[id] > +stock) {
            console.log('на складе больше нет товара')
        } else {
           this.updateProducts();
        }
    }

    private updateProducts = () => {
        cart.changeCartAmount();
        cart.openCart();
        localStorage.setItem('cart', JSON.stringify(cart.contents));
    }
}

export const productInCart: Product = new Product();