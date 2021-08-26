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
const font = {
    fontSize: 16,
    fontFamily: '微软雅黑'
}
export const customType = ['custom-rect', 'custom-polygon', 'custom-circle', 'custom-path']
export const registerCustomRect = (stroke) => {
    Graph.registerNode('custom-rect', {
        inherit: 'rect',
        width: 30,
        height: 15,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: stroke,
                fill: 'transparent'
            },
            label: {
                textWrap,
                ...font
            }
        },
        ports: { ...ports },
    })
}

export const registerCustomPolygon = (stroke) => {
    Graph.registerNode('custom-polygon', {
        inherit: 'polygon',
        width: 30,
        height: 20,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: stroke,
                fill: 'transparent'
            },
            label: {
                textWrap,
                ...font
            }
        },
        ports: { ...ports },
    })
}

export const registerCustomCircle = (stroke) => {
    Graph.registerNode('custom-circle', {
        inherit: 'circle',
        width: 30,
        height: 30,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: stroke,
                fill: 'transparent'
            },
            label: {
                textWrap,
                ...font
            }
        },
        ports: { ...ports },
    })
}

export const registerCustomPath = (stroke) => {
    Graph.registerNode('custom-path', {
        inherit: 'path',
        width: 30,
        height: 30,
        attrs: {
            body: {
                fill: 'transparent',
                strokeWidth: 1,
                stroke: stroke,
            },
            label: {
                textWrap,
                ...font
            }
        },
        ports: { ...ports },
    })
}

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
export const ports_parallelogram = {
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

// 三角形
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

// 五边形
export const ports_pentagon = {
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
                x: '100%',
                y: 0.4,
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
                x: 0,
                y: 0.4,
            }
        },
    ]
}

// 六边形
export const ports_hexagon = {
    ...absolutePorts
}
