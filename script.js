class Scroll {
    constructor(obj) {
        if (typeof obj.el == 'string') {
            this.el = document.querySelector(obj.el);
        } else if (obj.el instanceof HTMLElement) {
            // instanceof - проверяет наличие класса в предках
            this.el = obj.el;
        }

        this.el.style.position = "fixed";
        this.top = obj.top; // храним начальное положение сверху
        this.el.style.top = this.top + 'px';

        window.addEventListener("scroll", () => {
            this.scroll();
        })
    }

    scroll() {
        if ((this.top - window.pageYOffset) > 0) {
            this.el.style.top = this.top - window.pageYOffset + 'px';
        } else {
            this.el.style.top = "0";
        }
    }
}

const myScroll = new Scroll({
    el: ".header__nav",
    top: 969
})


function rnd(max, min) {
    return Math.floor(Math.random() * (max - min + 1) - min);
}


class Catch {
    constructor(obj) {
        if (typeof obj.elem == 'string') {
            this.elem = document.querySelector(obj.elem);
            if (typeof obj.parentElem == 'string') {
                this.parentElem = document.querySelector(obj.parentElem); 
            }
        } else if (obj.elem instanceof HTMLElement) {
            // instanceof - проверяет наличие класса в предках
            if (obj.parentElem instanceof HTMLElement) {
                this.parentElem = obj.parentElem;    
            }
            this.elem = obj.elem;
            this.parentElem = obj.parentElem;
        }

        this.elem.addEventListener("mouseover", () => {
            this.catchMe();
        })
    }

    catchMe() {

        this.elem.style.marginLeft = rnd((this.parentElem.clientWidth - 231), 10) + 'px';
        
        this.elem.style.marginTop = rnd((this.parentElem.clientHeight - 54), 10) + 'px';

    }
}


const CatchHeader = new Catch({
    elem: ".header__content",
    parentElem: ".header"
})



console.dir(CatchHeader.parentElem);

console.dir(CatchHeader.elem);