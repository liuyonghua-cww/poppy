/**
 * @file 鼠标事件
 */
import { BaseEvent } from "@/events/baseEvent";
export class Mouse extends BaseEvent{
    constructor(graph) {
        super(graph)
    }
    bind() {
        this.nodeMouseEnter();
        this.nodeMouseLeave();
    }
    nodeMouseEnter() {
        const { graph } = this;
        const container = document.getElementById('x6_container');
        graph.on('node:mouseenter', () => {
            const ports = container.querySelectorAll(
                '.x6-port-body',
            );
            this.showPorts(ports, true)
        })
    }
    nodeMouseLeave() {
        const { graph } = this;
        const container = document.getElementById('x6_container');
        graph.on('node:mouseleave', () => {
            const ports = container.querySelectorAll(
                '.x6-port-body',
            );
            this.showPorts(ports, false)
        })
    }
    showPorts(ports, show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
            ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
    }
}
