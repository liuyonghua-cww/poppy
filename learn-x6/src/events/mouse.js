/**
 * @file 鼠标事件
 */
export const CONFIG_TYPE = {
    GRID: 0,
    NODE: 1,
    EDGE: 2
};
import { BaseEvent } from "@/events/baseEvent";

export class Mouse extends BaseEvent {
    constructor(graph) {
        super(graph);
    }

    bind() {
        this._nodeMouseEnter();
        this._nodeMouseLeave();
    }

    _nodeMouseEnter() {
        const { graph } = this;
        const container = document.getElementById('x6_container');
        graph.on('node:mouseenter', () => {
            const ports = container.querySelectorAll(
                '.x6-port-body',
            );
            this.showPorts(ports, true);
        });
    }

    _nodeMouseLeave() {
        const { graph } = this;
        const container = document.getElementById('x6_container');
        graph.on('node:mouseleave', () => {
            const ports = container.querySelectorAll(
                '.x6-port-body',
            );
            this.showPorts(ports, false);
        });
    }

    _click(callback) {
        const { graph } = this;
        let cellId = null;
        let selectedCell = null;
        let configType = null;
        graph.on('blank:click', () => {
            configType = CONFIG_TYPE.GRID;
            callback(cellId, selectedCell, configType);
        });
        graph.on('cell:click', ({ cell }) => {
            configType = cell.isNode() ? CONFIG_TYPE.NODE : CONFIG_TYPE.EDGE;
            selectedCell = cell;
            cellId = cell.id;
            callback(cellId, selectedCell, configType);
        });
    }

    // 监听选中节点的改变
    _nodeChange(callback) {
        const { graph } = this;
        graph.on('node:change:*', () => {
            callback();
        });
    }

    showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[ i ].style.visibility = show ? 'visible' : 'hidden';
        }
    }
}
