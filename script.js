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

        this.unit = obj.unit

        window.addEventListener("scroll", () => {this.scroll()})
        window.addEventListener("resize", () => {this.scroll()})

        this.scroll()
    }

    scroll() {
        this.menuTop = this.scrollNumber()
        if ((this.menuTop - window.pageYOffset) > 0) {
            this.el.style.top = this.menuTop - window.pageYOffset + 'px';
        } else {
            this.el.style.top = "0";
        }
    }

    scrollNumber() {
        if (this.unit == "px") {
            return this.top >= 0 ? this.top : 0;
        } else if (this.unit == "%" || this.unit == undefined) {
            return this.calc(window.innerHeight, this.top) - this.el.clientHeight;
        }
    }

    calc(height, top) {
        return height / 100 * top
    }
}

const myScroll = new Scroll({
    el: ".header__nav",
    top: 100,
    unit: "%"
})

 


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

    rnd(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    catchMe() {

        this.elem.style.marginLeft = this.rnd((this.parentElem.clientWidth - this.elem.clientWidth), 0) + 'px';
        
        this.elem.style.marginTop = this.rnd((this.parentElem.clientHeight - this.elem.clientHeight - myScroll.el.clientHeight), 0) + 'px';

    }
}

const catchHeader = new Catch({
    elem: ".header__content",
    parentElem: ".header"
})


class TypingText {
    constructor(text) {
        if (typeof text.element == 'string') {
            this.element = document.querySelector(text.element);
        } else if (text.element instanceof HTMLElement) {
            // instanceof - проверяет наличие класса в предках
            this.element = text.element
        }

        this.titleIn = this.element.querySelector('.header__content h1');

        this.title = this.titleIn.textContent;

        this.subTitleIn = this.element.querySelector('.header__content p');

        this.subTitle = this.subTitleIn.textContent;
        
        
        window.addEventListener("load", () => {
            this.typeText()    
        })

        
    }

    typeText() {
        this.typeHeader = this.title.split('');
        let result1 = '';
        let result2 = '';
        for (let i = 0; i < this.typeHeader.length; i++) {
            setTimeout(() => {
                const elemHead = this.typeHeader[i];
                result1 += elemHead
                this.titleIn.innerHTML = result1;
                
            }, i*150);
        }

        this.typeSub = this.subTitle.split('');
        for (let j = 0; j < this.typeSub.length; j++) {
            setTimeout(() => {
                const elemDesc = this.typeSub[j];
                result2 += elemDesc;
                this.subTitleIn.innerHTML = result2;
                
            }, j*150);
        }

        setTimeout(() => {
            this.typeText();
        }, 4000);
    }
}

const typeText = new TypingText({
    element: ".header__content"
})