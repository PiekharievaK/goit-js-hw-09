const refs = {
    btnStart: document.querySelector(`[data-start]`),
    btnStop: document.querySelector(`[data-stop]`)
};

let switcherInterwalId = null;

refs.btnStart.addEventListener(`click`, startColorSwitcher)
refs.btnStop.addEventListener(`click`,  stopColorSwitcher)

function startColorSwitcher() {
    switcherInterwalId = setInterval(intervalColorSwitcher, 1000);
};

function intervalColorSwitcher() {
    document.body.style.backgroundColor = getRandomHexColor();
    refs.btnStart.disabled = true;}
 
function stopColorSwitcher() {
    if (!refs.btnStart.disabled) {
        return
    } 
    clearInterval(switcherInterwalId);
    refs.btnStart.disabled = false;
 };

 function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}