/**
 * @file 鼠标事件
 */
import { Vector } from "@antv/x6";

export const CONFIG_TYPE = {
    GRID: 0,
    NODE: 1,
    EDGE: 2
};
import { BaseEvent } from "@/events/baseEvent";

export class Mouse extends BaseEvent {
    constructor(graph) {
        super(graph);
        this.isEdit = false;
    }

    bind() {
        this._showNodePorts();
        this._hiddenNodePorts();
        this._addArrowMoveTool();
        this._addEdgeSegments();
        this._removeEdgeTools();
        this._triggerDotMove();
        this._dotMoveInEdge();
        this._setSelectedEdgeStyle();
        this._showCellEditor();
        // this._onEdgeConnected();
    }

    _showNodePorts() {
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

    _hiddenNodePorts() {
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

    _getClickType(callback) {
        const { graph } = this;
        let cellId = null;
        let selectedCell = null;
        let configType = null;
        graph.on('blank:click', () => {
            configType = CONFIG_TYPE.GRID;
            callback(cellId, selectedCell, configType);
            const container = document.getElementById('x6_container');
            const ports = container.querySelectorAll(
                '.x6-port-body',
            );
            this.showPorts(ports, false);
        });
        graph.on('cell:click', ({ cell }) => {
            configType = cell.isNode() ? CONFIG_TYPE.NODE : CONFIG_TYPE.EDGE;
            selectedCell = cell;
            cellId = cell.id;
            callback(cellId, selectedCell, configType);
        });
    }

    // 监听选中节点相关属性的改变
    _nodeChange(callback) {
        const { graph } = this;
        graph.on('node:change:*', () => {
            callback();
        });
    }

    // 调整箭头
    _addArrowMoveTool() {
        this.graph.on('edge:mouseenter', ({ edge }) => {
            if (this.isEdit) {
                return;
            }
            edge.addTools([
                {
                    name: 'source-arrowhead',
                    args: {
                        tagName: 'circle',
                        attrs: {
                            stroke: '#3cbca3',
                            fill: '#ffffff',
                            r: 5
                        },
                    },

                },
                {
                    name: 'target-arrowhead',
                    args: {
                        tagName: 'circle',
                        attrs: {
                            stroke: '#3cbca3',
                            fill: '#ffffff',
                            r: 5
                        },
                    },
                }
            ]);
        });
    }

    // 线段工具
    _addEdgeSegments() {
        this.graph.on('edge:mouseenter', ({ edge }) => {
            if (this.isEdit) {
                return;
            }
            edge.addTools(
                {
                    name: 'segments',
                    args: {
                        snapRadius: 20,
                        attrs: {
                            fill: '#444',
                        },
                    },
                }
            );
        });
    }

    _removeEdgeTools() {
        this.graph.on('edge:mouseleave', ({ edge }) => {
            if (this.isEdit) {
                // 如果正在编辑，则不往后面执行，页面移除tool重新渲染线条导致输入内容消失的问题
                return;
            }
            let tools = [];
            if (edge.getTools()) {
                tools = edge.getTools().items;
            }
            tools.forEach(tool => {
                if (tool.name !== "edge-editor" && tool.name !== 'boundary') {
                    edge.removeTool(tool.name);
                }
            });
        });
    }

    // 自定义画布事件  用于一个点在边上的运动
    _dotMoveInEdge() {
        const { graph } = this;
        graph.on('dotMove', (cell) => {
            if (cell.isEdge()) {
                const view = graph.findViewByCell(cell);
                if (view) {
                    // 创建一个节点
                    const token = Vector.create('circle', { r: 6, fill: '#feb662' });
                    const target = cell.getTargetCell();
                    setTimeout(() => {
                        view.sendToken(token.node, 1000, () => {
                            if (target) {
                                graph.trigger('dotMove', target);
                            }
                        });
                    }, 300);
                }
            } else {
                const edges = graph.model.getConnectedEdges(cell, {
                    outgoing: true,
                });
                edges.forEach((edge) => graph.trigger('dotMove', edge));
            }
        });
    }

    _triggerDotMove() {
        const { graph } = this;
        // 点击节点时候触发点在边上的运动
        graph.on('node:mousedown', ({ cell }) => {
            graph.trigger('dotMove', cell);
        });
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

    /*_setSelectedEdgeStyle() {
        const { graph } = this;
        graph.on('selection:changed', ({added, removed}) => {
            // 遍历新增的元素 如果是边 则进行相关操作
            added.forEach(cell => {
                if (cell.isEdge()) {
                    const cellView = graph.findViewByCell(cell)
                    if (cellView) {
                        cellView.highlight()
                    }
                    // cell.attr('line/strokeDasharray', 5); // 设置虚线
                    // cell.attr('line/style/animation', 'ant-line 30s infinite linear') // 设置动画
                }
            });
            removed.forEach(cell => {
                if (cell.isEdge()) {
                    // cell.attr('line/strokeDasharray', 0); // 移除虚线
                    const cellView = graph.findViewByCell(cell)
                    if (cellView) {
                        cellView.unhighlight()
                    }
                }
            })
        })
    }*/

    _setSelectedEdgeStyle() {
        const { graph } = this;
        graph.on('edge:selected', ({ cell, edge }) => {
            edge.attr('outline/stroke', '#239edd');
            edge.attr('outline/strokeWidth', edge.attr('line/strokeWidth') + 2);
        });
        graph.on('edge:unselected', ({ cell, edge }) => {
            if (this.isEdit) {
                return;
            }
            edge.attr('outline/stroke', 'transparent');
        });
    }

    // 双击编辑文本内容
    _showCellEditor() {
        const { graph } = this;
        // let _cell;
        graph.on('cell:dblclick', ({ cell, e }) => {
            // 进入编辑模式
            this.isEdit = true;
            // _cell = cell;
            // if (cell.isEdge()) {
            //     cell.attr('line/strokeDasharray', 0); // 移除虚线，如果虚线正在运动，会到时输入的内容丢失
            // }
            cell.addTools([
                {
                    name: cell.isEdge() ? 'edge-editor' : 'node-editor',
                    args: {
                        event: e,
                    },
                }
            ]);
            const input = document.querySelector('.x6-cell-tool-editor');
            input && input.addEventListener('blur', () => {
                // 编辑完成，移除工具
                this.isEdit = false;
                let tools = [];
                if (cell.getTools()) {
                    tools = cell.getTools().items;
                }
                tools.forEach(tool => {
                    cell.removeTool(tool.name);
                    // if (tool.name !== "edge-editor") {
                    //     cell.removeTool(tool.name);
                    // }
                });
                if (cell.isEdge()) {
                    cell.attr('outline/stroke', 'transparent');
                }
            });
        });
    }

    // // 监听边连接完成事件
    // _onEdgeConnected() {
    //     this.graph.on('edge:connected', ({ isNew, edge }) => {
    //             const source = edge.getSourceCell()
    //             const target = edge.getTargetCell();
    //             edge.setSource(source);
    //             edge.setTarget(target);
    //     })
    // }

    showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[ i ].style.visibility = show ? 'visible' : 'hidden';
        }
    }
}
