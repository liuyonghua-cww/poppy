var value = 0.6;

option = {
    title: {
        text: '',
    },
    series: [
        {
            type: 'liquidFill',
            radius: '78.1%',
            center: ['50%', '50%'],

            color: [
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#16FFF1', // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: '#37D3FF', // 100% 处的颜色
                        },
                    ],
                },
            ],
            data: [value, value], // data个数代表波浪数
            backgroundStyle: {
                borderWidth: 1,
                borderColor: 'rgba(55, 211, 255, 0.42)',
                color: 'rgba(12, 41, 49, 0.6)',
            },
            //  label: {
            //             formatter:
            //         },
            outline: {
                show: false,
            },
        },
    ],
};
return option;
