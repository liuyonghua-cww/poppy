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
        this._diyGraphEvent();
        this._selectionChanged();
    }

    _nodeMouseEnter() {
        const { graph } = this;
        // 移入节点显示连接桩
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
        // 移出隐藏连接桩
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

    // 调整箭头
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

    // 监听选中节点/边改变
    /*
    * graph.on('selection:changed', (args: {
    *   added: Cell[]     // 新增被选中的节点/边
    *   removed: Cell[]   // 被取消选中的节点/边
    *   selected: Cell[]  // 被选中的节点/边
    *   options: Model.SetOptions
    * }) => {
    *   // code here
    * })
    * */
    _selectionChanged() {
        const { graph } = this;
        graph.on('selection:changed', ({added, removed}) => {
            // 遍历新增的元素 如果是边 则进行相关操作
            added.forEach(cell => {
                if (cell.isEdge()) {
                    cell.attr('line/strokeDasharray', 5); // 设置虚线
                    cell.attr('line/style/animation', 'ant-line 30s infinite linear') // 设置动画
                    cell.addTools([
                        {
                            name: 'vertices',
                            args: {
                                padding: 4,
                                attrs: {
                                    strokeWidth: 0.1,
                                    stroke: '#2d8cf0',
                                    fill: '#ffffff',
                                }
                            },
                        },
                    ])
                }
            });
            removed.forEach(cell => {
                if (cell.isEdge()) {
                    cell.attr('line/strokeDasharray', 0); // 移除虚线
                    cell.removeTools()
                }
            })
        })
    }

    showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[ i ].style.visibility = show ? 'visible' : 'hidden';
        }
    }
}
