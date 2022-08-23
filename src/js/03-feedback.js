import {load, save} from "./storage";
import _ from "lodash";

const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

console.log(email);
console.log(message);

email.addEventListener('input', func);
message.addEventListener('input', func);


function func(params) {

    console.log('input');
    
}