export default {
    bind(el, binding) {
        // binging.value  当前指令绑定的参数
        const _opt = binding.value,
            _c = el.getElementsByClassName(_opt.className);
        _c[_opt.curIndex].className += ` ${_opt.currentClassName}`
    },
    update(el, binding) {
        const _opt = binding.value,
            _oldOpt = binding.oldValue,  // 上一次指令绑定的参数
            _c = el.getElementsByClassName(_opt.className);
        _c[_oldOpt.curIndex].className = _oldOpt.className;
        _c[_opt.curIndex].className += ` ${_opt.currentClassName}`
    }
}
