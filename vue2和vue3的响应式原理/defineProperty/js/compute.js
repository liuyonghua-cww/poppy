class Calculator {
    constructor(doc) {
        const oCal = doc.querySelector('.J_calculator');
        this.fInput  = oCal.querySelector('.f-input');
        this.sInput  = oCal.querySelector('.s-input');
        this.oBtnGroup = oCal.querySelector('.btn-group');
        this.oBtnItems = this.oBtnGroup.querySelectorAll('button');
        this.oReault = oCal.querySelector('.result');
        this.data = this.defineData();
        this.btnIdx = 0;
    }
    init() {
        this.bindEvent()
    }

    bindEvent() {
        this.oBtnGroup.addEventListener('click', this.onFieldBtnClick.bind(this), false);
        this.fInput.addEventListener('input', this.onNumInput.bind(this), false);
        this.sInput.addEventListener('input', this.onNumInput.bind(this), false);
    }

    onFieldBtnClick(ev) {
        const e = ev || window.event,
            tar = e.target || e.srcElement,
            tarName = tar.tagName.toLowerCase();
        tarName === 'button' && this.fieldUpdate(tar);
    }

    onNumInput(ev) {
        const e = ev || window.event,
            tar = e.target || e.srcElement,
            className = tar.className,
            val = Number(tar.value.replace(/\s+/g, '')) || 0;
        switch (className) {
            case 'f-input':
                this.data.fNumber = val;
                break;
            case 's-input':
                this.data.sNumber = val;
                break;
        }

    }


    fieldUpdate(target) {;
        this.oBtnItems[this.btnIdx].className = '';
        this.btnIdx = [].indexOf.call(this.oBtnItems, target);
        target.className += 'current';
        this.data.field = target.getAttribute('data-field');
    }
    defineData() {
        let _obj = {},
            _fNumber = 0,
            _sNumber = 0,
            _field = '+';

        const _self = this;
        Object.defineProperties(_obj, {
            fNumber: {
                get() {
                    return _fNumber;
                },
                set(v) {
                    _fNumber = v;
                    _self.compute(_fNumber, _sNumber, _field);
                }
            },
            sNumber: {
                get() {
                    return _sNumber;
                },
                set(v) {
                    _sNumber = v;
                    _self.compute(_fNumber, _sNumber, _field);
                }
            },
            field: {
                get() {
                    return _field;
                },
                set(v) {
                    _field = v;
                    _self.compute(_fNumber, _sNumber, _field);
                }
            },
        });
        return _obj;
    }
    compute(fNum, sNum, field) {
        const string = fNum + field + sNum;
        this.oReault.innerHTML = eval(string)
    }
}
new Calculator(document).init();
