(function () {
    /**
     * Служебная функция для заполнения диапазона слайдера цветом.
     * @param {number} from - начальное значение в %% диапазона.
     * @param {number} to - конечное значение в %% диапазона.
     * @param {HTMLElement} controlSlider - Элемент управления слайдером
     */
    const fillSlider = (from, to, controlSlider) => {
        const sliderColor = '#ffffff';
        const rangeColor = '#25daa5';
        controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
    };

    /* Код компонента пишите ниже */

    const [range1, range2, range3] = Array.from(document.querySelectorAll('.range_container'));
    const [fromInput1, fromInput2, fromInput3] = Array.from(document.querySelectorAll('.fromInput'));
    const [toInput1, toInput2, toInput3] = Array.from(document.querySelectorAll('.toInput'));
    const [fromSlider1, fromSlider2, fromSlider3] = Array.from(document.querySelectorAll('.fromSlider'));
    const [toSlider1, toSlider2, toSlider3] = Array.from(document.querySelectorAll('.toSlider'));

    /* Первоначальные настройки компонента */

    fromInput1.closest('.form_control_container').hidden = true;
    fromSlider1.hidden = true;
    toSlider1.style.background = '#ffffff';

    /* Первый слайдер */

    toInput1.addEventListener('input', (e) => {
        toSlider1.value = e.target.value;
    });

    toSlider1.addEventListener('input', (e) => {
        toInput1.value = e.target.value;
    });

    /* Второй слайдер */

    fromInput2.addEventListener('input', (e) => {
        fromSlider2.value = e.target.value;
    });

    toInput2.addEventListener('input', (e) => {
        toSlider2.value = e.target.value;
    });

    fromSlider2.addEventListener('input', (e) => {
        fromInput2.value = e.target.value;
    });

    toSlider2.addEventListener('input', (e) => {
        toInput2.value = e.target.value;
    });

    range2.addEventListener('input', (e) => {
        fillSlider((fromInput2.value / 12) * 100, (toInput2.value / 12) * 100, toSlider2);
    });

    /* Третий слайдер */

    const minDiff = +range3.getAttribute('data-min-diff');
    const maxDiff = +range3.getAttribute('data-max-diff');

    fromInput3.addEventListener('input', (e) => {
        fromSlider3.value = e.target.value;
    });

    toInput3.addEventListener('input', (e) => {
        toSlider3.value = e.target.value;
    });

    fromSlider3.addEventListener('input', (e) => {
        fromInput3.value = e.target.value;
    });

    toSlider3.addEventListener('input', (e) => {
        toInput3.value = e.target.value;
    });

    range3.addEventListener('input', (e) => {
        const from = +fromInput3.value;
        const to = +toInput3.value;

        const diff = to - from;

        const isLeft = e.target.classList.contains("fromSlider") ||
            e.target.classList.contains("fromInput");

        /** Если расстояние больше максимального и сдвинут левый край диапазона */

        if (diff > maxDiff && isLeft) {
            toSlider3.value = +toSlider3.value - (diff - maxDiff);
            toInput3.value = toSlider3.value;
        }

        /** Если расстояние больше максимального и сдвинут правый край диапазона */

        if (diff > maxDiff && !isLeft) {
            fromSlider3.value = +fromSlider3.value + (diff - maxDiff);
            fromInput3.value = fromSlider3.value;
        }

        /** Если расстояние меньше минимального и сдвинут левый край диапазона */

        if (diff < minDiff && isLeft) {
            const max = +toSlider3.getAttribute('max');

            /** Если достигнут предел сдвига правого края диапазона вправо */

            if (+toSlider3.value === max) {
                fromSlider3.value = max - minDiff;
                fromInput3.value = max - minDiff;
            } else {
                toSlider3.value = +toSlider3.value + (minDiff - diff);
                toInput3.value = toSlider3.value;
            }
        }

        /** Если расстояние меньше минимального и сдвинут правый край диапазона */

        if (diff < minDiff && !isLeft) {
            const min = +fromInput3.getAttribute('min');

            /** Если достигнут предел сдвига левого края диапазона влево */

            if (+fromInput3.value === min) {
                toSlider3.value = minDiff;
                toInput3.value = minDiff;
            } else {
                fromSlider3.value = +fromSlider3.value - (minDiff - diff);
                fromInput3.value = fromSlider3.value;
            }
        }

        fillSlider((+fromInput3.value / 12) * 100, (+toInput3.value / 12) * 100, toSlider3);
    });
})();
