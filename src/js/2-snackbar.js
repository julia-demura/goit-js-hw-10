import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const delayNumber = Number(form.elements.delay.value);
    const stateValue = form.elements.state.value;
    promise(delayNumber, stateValue)
        .then((delay) => {
            iziToast.success({
                position: 'topRight',
                message: `✅ Fulfilled promise in ${delayNumber}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                position: 'topRight',
                message: `❌ Rejected promise in ${delayNumber}ms`,
            });
        });
    form.reset();
    
});
function promise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}