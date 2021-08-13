/**
 * @file 键盘事件
 */
import { BaseEvent } from "@/events/baseEvent";

export class Keyboard extends BaseEvent {
    constructor(graph) {
        super(graph);
    }
    bind() {
        this._copy();
        this._cut();
        this._paste();
        this._undo();
        this._redo();
        this._selectAll();
        this._delete();
        this._zoomIn();
        this._zoomOut();
    }
    _copy() {
        const { graph } = this;
        graph.bindKey([ 'meta+c', 'ctrl+c' ], () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.copy(cells);
            }
            return false;
        });
    }

    _cut() {
        const { graph } = this;
        graph.bindKey([ 'meta+x', 'ctrl+x' ], () => {
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.cut(cells);
            }
            return false;
        });
    }

    _paste() {
        const { graph } = this;
        graph.bindKey([ 'meta+v', 'ctrl+v' ], () => {
            if (!graph.isClipboardEmpty()) {
                const cells = graph.paste({ offset: 32 });
                graph.cleanSelection();
                graph.select(cells);
            }
            return false;
        });
    }

    _undo() {
        const { graph } = this;
        graph.bindKey([ 'meta+z', 'ctrl+z' ], () => {
            if (graph.history.canUndo()) {
                graph.history.undo();
            }
            return false;
        });
    }

    _redo() {
        const { graph } = this;
        graph.bindKey([ 'meta+shift+z', 'ctrl+shift+z' ], () => {
            if (graph.history.canRedo()) {
                graph.history.redo();
            }
            return false;
        });
    }

    _selectAll() {
        const { graph } = this;
        graph.bindKey([ 'meta+a', 'ctrl+a' ], () => {
            const cells = graph.getCells();
            if (cells.length) {
                graph.select(cells);
            }
            return false
        });
    }

    _delete() {
        const { graph } = this;
        // 监听delete键将进行删除 防止双击输入文本时按下 backspace 把节点给删掉
        graph.bindKey('delete', () => {
            const cells = graph.getSelectedCells();
            if (cells) {
                graph.removeCells(cells);
            }
            return false
        })
    }

    _zoomIn() {
        const { graph } = this;
        graph.bindKey(['meta+1', 'ctrl+1'], () => {
            const zoom = graph.zoom();
            if (zoom < 1.5) {
                graph.zoom(0.1);
            }
            return false;
        })
    }

    _zoomOut() {
        const { graph } = this;
        graph.bindKey(['meta+2', 'ctrl+2'], () => {
            const zoom = graph.zoom();
            if (zoom > 0.5) {
                graph.zoom(-0.1);
            }
            return false;
        })
    }

}
