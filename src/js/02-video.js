import {load, save} from "./storage";
import Player from "@vimeo/player";
import _ from "lodash";

// Handle of player on DOM
const iframe = document.querySelector("iframe");
// Init instance of player
const player = new Player(iframe);

// Player's event "Time update"
player.on("timeupdate", (data) => {
    const { seconds } = data;
    save("videoplayer-current-time", seconds);
});

// Set time to the player
const setCurrentTime = () => {
    let time = load("videoplayer-current-time");
    time != null && player.setCurrentTime(time);
};

// On load player try to get saved time and set it
player.ready().then(
    _.throttle(() => {
        setCurrentTime();
    }, 1000),
);

// Storage funcs
// const saveToStorage = (name, value) => {
//     try {
//         localStorage.setItem(name, value);
//     } catch (error) {
//         console.log("Something happen...");
//     }
// };

// const loadFromStorage = (name) => {
//     try {
//         return localStorage.getItem(name);
//     } catch (error) {
//         console.log("Something happen...");
//     }
// };

// const removeFromStorage = (name) => {
//     try {
//         localStorage.removeItem(name);
//     } catch (error) {
//         console.log("Something happen...");
//     }
// };
