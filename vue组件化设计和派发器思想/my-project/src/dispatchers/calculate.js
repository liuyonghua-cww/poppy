import calculatorReducer from "@/reduce/calculate";
import { CHANGE_METHOD, SET_NUMBER } from "@/action/calculate";

export default (ctx) => {
    const { setNumber, changeMethod } = calculatorReducer(ctx.$data);
    return function (type, ...args) {
        switch (type) {
            case SET_NUMBER:
                ctx.result = setNumber(...args);
                break;
            case CHANGE_METHOD:
                ctx.result = changeMethod(...args);
                break;
            default:
                break;
        }
    }
}
