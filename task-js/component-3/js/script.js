(function () {
    /* Код компонента пишите здесь */

    const form = document.querySelector('#booking-form');

    /** @param {SubmitEvent} e */
    function handleFormSubmit(e) {
        e.preventDefault();

        const validFieldClassName = "field-correct";
        const invalidFieldClassName = "field-error";

        /**
         * Удаление всех пердыдущих класснеймов, 
         * обозначающих валидность формы
        */

        for (const field of form.querySelectorAll('.field-input')) {
            field.classList.remove(validFieldClassName, invalidFieldClassName);
        }

        /** Валидация телефона */

        const phone = document.querySelector('#phone');

        addInputValidityClassName(phone, checkPhone(phone.value),
            validFieldClassName, invalidFieldClassName);

        /** Валидация дат */

        const checkinDate = document.querySelector('#checkin-date');
        const checkoutDate = document.querySelector('#checkout-date');

        let isDateInputValid = false;
        if (checkDate(checkinDate.value) && checkDate(checkoutDate.value)) {
            const date1 = parseDate(checkinDate.value,
                isDateWithHyphens(checkinDate.value));

            const date2 = parseDate(checkoutDate.value,
                isDateWithHyphens(checkoutDate.value));

            if (((date2 - date1) / (1000 * 60 * 60 * 24)) >= 4) {
                isDateInputValid = true;
            }
        }

        addInputValidityClassName(checkinDate, isDateInputValid,
            validFieldClassName, invalidFieldClassName);

        addInputValidityClassName(checkoutDate, isDateInputValid,
            validFieldClassName, invalidFieldClassName);
    }

    /**
     * @param {string} date
     * @param {boolean} isHyphens
     * @returns {Date} date object
     */
    function parseDate(date, isHyphens) {
        let year, month, day;

        if (isHyphens) {
            [year, month, day] = date.split("-");
        } else {
            [day, month, year] = date.split(".");
        }

        return new Date(year, month, day);
    }

    /** 
     * @param {string} phone 
     * @returns {boolean}  
    */
    function checkPhone(phone) {
        const validSymbols = [" ", "(", ")", "-"];

        if (phone[0] !== "+" || phone[1] !== "7") {
            return false;
        }

        let numberCnt = 0;
        for (const char of phone.slice(2)) {
            const isCharNaN = isNaN(parseInt(char));

            if (isCharNaN && !validSymbols.includes(char)) {
                return false;
            }

            if (!isCharNaN) {
                numberCnt++;
            }
        }

        return numberCnt === 10;
    }

    /** 
     * @param {string} date
     * @returns {boolean}
     */
    function checkDate(date) {
        return isDateWithHyphens(date) || isDateWithDots(date);
    }

    /** 
     * @param {string} date
     * @returns {boolean}
    */
    function isDateWithHyphens(date) {
        return date[4] === "-" && date[7] === "-";
    }

    /** 
     * @param {string} date
     * @returns {boolean}
    */
    function isDateWithDots(date) {
        return date[2] === "." && date[5] === ".";
    }

    /** 
     * @param {HTMLInputElement} input
     * @param {boolean} isInputValid 
     * @param {string} validClassName
     * @param {string} invalidClassName 
    */
    function addInputValidityClassName(
        input, isInputValid,
        validClassName, invalidClassName) {
        if (isInputValid) {
            input.classList.add(validClassName);
        } else {
            input.classList.add(invalidClassName);
        }
    }

    form.addEventListener('submit', (e) => handleFormSubmit(e));
})();
