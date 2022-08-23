import { load, save, remove } from "./storage";
import _ from "lodash";

window.addEventListener("load", (event) => {
    // Name of field in the storage
    const storageName = "feedback-form-state";

    // Refs to elements
    const elements = {
        email: document.querySelector('input[name="email"]'),
        message: document.querySelector('textarea[name="message"]'),
        button: document.querySelector("button"),
    };

    // Load saved data
    function loadData() {
        try {
            const { email, message } = load(storageName);
            elements.email.value = email;
            elements.message.value = message;
        } catch (error) {
            console.log("Storage is empty");
        }
    }

    // Load
    loadData();

    // Save data on typing in the inputs
    function onInput() {
        save(storageName, {
            email: elements.email.value,
            message: elements.message.value,
        });
    }

    // Clear all saved data from storage and clear fields
    function clearStorage() {
        elements.email.value = "";
        elements.message.value = "";
        remove(storageName);
    }

    // Post data
    function postData(e) {
        e.preventDefault();
        const email = elements.email.value;
        const message = elements.message.value;

        if (email || message) {
            console.log(`Email: ${email}, Message: ${message}`);
            clearStorage();
        }
    }

    // Throttle on typing
    const throttled = _.throttle(() => onInput(), 500);

    // Events
    elements.email.addEventListener("input", throttled);
    elements.message.addEventListener("input", throttled);
    elements.button.addEventListener("click", (e) => {
        postData(e);
    });
});
