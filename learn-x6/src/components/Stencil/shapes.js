import { Graph } from "@antv/x6";

const ports = {
    groups: {
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#D06269',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#D06269',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#D06269',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#D06269',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
        },
    },
    items: [
        {
            group: 'top', // 指定分组名称
        },
        {
            group: 'right',
        },
        {
            group: 'bottom',
        },
        {
            group: 'left',
        },
    ],
};
const textWrap = {
    width: -10,
    ellipsis: true
}
Graph.registerNode('custom-rect', {
    inherit: 'rect',
    width: 30,
    height: 15,
    attrs: {
        body: {
            strokeWidth: 1,
        },
        label: {
            textWrap
        }
    },
    ports: { ...ports },
})

Graph.registerNode('custom-polygon', {
    inherit: 'polygon',
    width: 30,
    height: 15,
    attrs: {
        body: {
            strokeWidth: 1,
        },
        label: {
            textWrap
        }
    },
    ports: { ...ports },
})

Graph.registerNode('custom-circle', {
    inherit: 'circle',
    width: 24,
    height: 24,
    attrs: {
        body: {
            strokeWidth: 1,
        },
        label: {
            textWrap
        }
    },
    ports: { ...ports },
})

export const absolutePorts=  {
    groups: {
        group1: {
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#D06269',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                        visibility: 'hidden',
                    },
                },
            },
            position: {
                name: 'absolute',
            },
        },
    },
}
// 数据图形的连接桩
export const ports_data = {
    ...absolutePorts,
    items: [
        {
            group: 'group1',
            // 通过 args 指定绝对位置
            args: {
                x: 0.5,
                y: 0,
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.5,
                y: '100%',
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.125,
                y: 0.5,
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.875,
                y: 0.5,
            }
        }
    ]
}

export const ports_triangle = {
    ...absolutePorts,
    items: [
        {
            group: 'group1',
            args: {
                x: 0.5,
                y: 0,
            }
        },
        {
            group: 'group1',
            args: {
                x: 0,
                y: '100%',
            }
        },
        {
            group: 'group1',
            args: {
                x: '100%',
                y: '100%',
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.25,
                y: 0.5,
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.75,
                y: 0.5,
            }
        },
        {
            group: 'group1',
            args: {
                x: 0.5,
                y: '100%',
            }
        },
    ]
};
