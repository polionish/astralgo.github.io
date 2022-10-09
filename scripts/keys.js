document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
        history.back();
    }
};

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode === 37) {
        history.back();
    }
};


var tx = document.getElementsByClassName('txt-form');//РАСТЯГИВАЕМ_textarea

for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;width:790px;font-size: larger;');
    tx[i].addEventListener("input", OnInput, false);

}

function OnInput() {

    this.style.height = 'auto';

    this.style.height = (this.scrollHeight) + 'px';//////console.log(this.scrollHeight);

}
