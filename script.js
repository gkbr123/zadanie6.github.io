"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("calculator-form");
    var quantity = document.getElementById("quantity");
    var optionContainer = document.getElementById("option-container");
    var propertyContainer = document.getElementById("property-container");
    var serviceOption = document.getElementById("service-option");
    var extraProperty = document.getElementById("extra-property");
    var result = document.getElementById("result");
    var priceDetails = document.getElementById("price-details");
    var services = form.elements.service;

    var prices = {
        cleaning: 1000,
        printing: 0,
        delivery: 500
    };

    var optionPrices = {
        "black-white": 5,
        color: 15,
        photo: 30
    };

    function getSelectedService() {
        var selectedService = "cleaning";
        var index;

        for (index = 0; index < services.length; index += 1) {
            if (services[index].checked) {
                selectedService = services[index].value;
                break;
            }
        }

        return selectedService;
    }

    function updateForm() {
        var service = getSelectedService();

        optionContainer.hidden = service !== "printing";
        propertyContainer.hidden = service !== "delivery";

        calculatePrice();
    }

    function calculatePrice() {
        var service = getSelectedService();
        var quantityText = quantity.value.trim();
        var amount;
        var total;
        var description;

        if (!/^[1-9][0-9]*$/.test(quantityText)) {
            result.textContent = "Введите целое число больше нуля";
            priceDetails.textContent = "";
            return;
        }

        amount = Number(quantityText);

        if (!Number.isSafeInteger(amount)) {
            result.textContent = "Слишком большое количество";
            priceDetails.textContent = "";
            return;
        }

        if (service === "printing") {
            total = amount * optionPrices[serviceOption.value];
            description = "Цена за страницу: " +
                optionPrices[serviceOption.value] + " руб.";
        } else {
            total = amount * prices[service];
            description = "Цена за единицу: " +
                prices[service] + " руб.";
        }

        if (service === "delivery" && extraProperty.checked) {
            total += 300;
            description += " Срочность: +300 руб.";
        }

        result.textContent = total.toLocaleString("ru-RU") + " руб.";
        priceDetails.textContent = description;
    }

    form.addEventListener("change", function () {
        updateForm();
    });

    quantity.addEventListener("input", function () {
        calculatePrice();
    });

    updateForm();
});
