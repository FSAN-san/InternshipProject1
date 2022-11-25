import * as echarts from 'echarts/core'
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
])

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
    >;

const option: EChartsOption = {
    title: {
        text: '各分类作品数',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '作品总数',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

const initChart = (dom: any, data: any) => {
    const chart = echarts.init(dom);
    (<any>option.series)[0].data = data
    chart.setOption(option, true)
    return chart
}
export default initChart
