import reducer from '@/reduce/list';
import { ADD, REMOVE, COMPLETED } from "@/action/list";

export default (ctx) => {
    const { addItem, removeItem, changeCompleted } = reducer(ctx.todoData);
    return function (type, args) {
        switch (type) {
            case ADD:
                ctx.todoData = addItem(args);
                break;
            case REMOVE:
                ctx.todoData = removeItem(args);
                break;
            case COMPLETED:
                ctx.todoData = changeCompleted(args);
                console.log(ctx.todoData);
                break;
            default:
                break;
        }
    }
};
