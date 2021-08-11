/**
 * @file 鼠标事件
 */
import {Vector} from "@antv/x6";

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
        this._edgeMouseEnter();
        this._edgeMouseLeave();
        this._graphMouseDown();
        this._diyGraphEvent()
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

    _edgeMouseEnter() {
        this.graph.on('edge:mouseenter', ({ cell }) => {
            cell.addTools([
                {
                    name: 'source-arrowhead',
                    args: {
                        attrs: {
                            fill: '#3cbca3',
                            'stroke-width': 3,
                        },
                    },

                },
                {
                    name: 'target-arrowhead',
                    args: {
                        attrs: {
                            fill: '#ff5247',
                            'stroke-width': 3,
                        },
                    },
                },
            ])
        });
    }

    _edgeMouseLeave() {
        this.graph.on('edge:mouseleave', ({ cell }) => {
            cell.removeTools()
        })
    }

    // 自定义画布事件  用于一个点在边上的运动
    _diyGraphEvent() {
        const { graph } = this;
        graph.on('dotMove', (cell) => {
            if (cell.isEdge()) {
                const view = graph.findViewByCell(cell);
                if (view) {
                    // 创建一个节点
                    const token = Vector.create('circle', { r: 6, fill: '#feb662' })
                    const target = cell.getTargetCell()
                    setTimeout(() => {
                        view.sendToken(token.node, 1000, () => {
                            if (target) {
                                graph.trigger('dotMove', target)
                            }
                        })
                    }, 300)
                }
            } else {
                const edges = graph.model.getConnectedEdges(cell, {
                    outgoing: true,
                })
                edges.forEach((edge) => graph.trigger('dotMove', edge))
            }
        })
    }

    _graphMouseDown() {
        const { graph } = this;
        // 点击节点时候触发点在边上的运动
        graph.on('node:mousedown', ({ cell }) => {
            graph.trigger('dotMove', cell)
        })
    }

    showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[ i ].style.visibility = show ? 'visible' : 'hidden';
        }
    }
}
