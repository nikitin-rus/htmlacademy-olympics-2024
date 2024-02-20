(function () {
  /* Код компонента пишите здесь */

  const form = document.querySelector('#booking-form');
  const phone = document.querySelector('#phone');
  const checkin = document.querySelector('#checkin-date');
  const checkout = document.querySelector('#checkout-date');

  /** @param {SubmitEvent} e */
  function formSubmit(e) {
    e.preventDefault();

    const phoneReg = /^((\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    const dateReg = /^(\d{4}[-/.]\d\d[-/.]\d\d)|(\d\d.\d\d.\d{4})\$/;

    validateInput(phone, phoneReg);
    validateInput(checkin, dateReg);
    validateInput(checkout, dateReg);

    const checkinDate = new Date(Date.parse(checkin.value));
    const checkoutDate = new Date(Date.parse(checkout.value));

    checkinDate.setHours(0);
    checkoutDate.setHours(0);

    console.log((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    if ((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24) < 4) {
      checkin.classList.remove("field-correct");
      checkout.classList.remove("field-correct");
      checkin.classList.add("field-error");
      checkout.classList.add("field-error");
    }
  }

  /**
   * @param {HTMLInputElement} input 
   * @param {RegExp} regExp 
   */
  function validateInput(input, regExp) {
    input.classList.add(regExp.test(input.value) ?
      "field-correct" :
      "field-error"
    );
  }

  form.addEventListener('submit', (e) => formSubmit(e));
})();
