const main = document.querySelector('main');

class ModalWindow {

    public openModalWindow = () => {
        let modalWindow: HTMLDivElement;
        if (document.querySelector('.modal-window')) {
            modalWindow = document.querySelector('.modal-window')!;
            document.querySelector('.modal-window')!.innerHTML = '';
        } else {
            modalWindow = document.createElement('div');
            modalWindow.classList.add('modal-window');
            main?.append(modalWindow);
        }
        modalWindow.style.display = 'flex';
    
        modalWindow.innerHTML = `<form class="modal-window__form form" action="" novalidate>
        <div class="person__details form__details">
            <h2 class="title">Personal details</h2>
            <div class="person__name form__item">
                <input type="text" placeholder="Name" required></div>
            <div class="phone form__item">
                <input type="text" placeholder="Phone number" required></div>
            <div class="adress form__item">
                <input type="text" placeholder="Delivery adress" required></div>
            <div class="email form__item">
                <input type="email" placeholder="E-mail" required></div></div>
        <div class="credit-card__details form__details">
            <h2 class="title">Credit card details</h2>
            <div class="credit-card">
                <div class="card__number">
                    <img src="../../assets/card.png" alt="card">
                    <input class="form__item" type="text" placeholder="Card number" required></div>
                <div class="card__info">
                    <div class="valid-date"> Valid: 
                        <input type="text" placeholder="Valid Thru" required></div>
                    <div class="cvv"> CVV: 
                        <input type="text" placeholder="Code" required></div>
                </div></div></div>
        <input type="Submit" class="btn btn-buy" value="Pay Now"></form>`
    
        this.backdropOpenClose(true);
    }
    
    private closeModalWindow = () => {
      let modalWindow: HTMLDivElement = document.querySelector('.modal-window')!;
      modalWindow.style.display = 'none';
    }

    private backdropOpenClose = (condition: boolean) => {
        let backdrop: HTMLDivElement;
        if (document.querySelector('.backdrop')) {
          backdrop = document.querySelector('.backdrop')!;
        } else {
          backdrop = document.createElement('div');
          backdrop.classList.add('backdrop');
          document.body.append(backdrop);
          backdrop.addEventListener('click', () => {
            this.closeModalWindow();
            this.backdropOpenClose(false);
          });
        }
      
        condition ? backdrop.style.display = 'block' : backdrop.style.display = 'none';
      }
}

export const modal: ModalWindow = new ModalWindow;