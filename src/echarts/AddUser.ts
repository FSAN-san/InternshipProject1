import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { GridOption, TitleOption, TooltipOption } from 'echarts/types/dist/shared'

echarts.use([BarChart, CanvasRenderer, TitleComponent, TooltipComponent, GridComponent])

type EChartsOption = echarts.ComposeOption<
    GridOption | BarSeriesOption | TitleOption | TooltipOption
    >;

const option: EChartsOption = {
    title: {
        text: '最近一周新增作品数',
        left: 'center'
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '新增作品',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }
    ]
}

const initChart = (dom: any, xData: string[], data: any) => {
    const chart = echarts.init(dom);
    (<any>option.series)[0].data = data;
    (<any>option.xAxis).data = xData
    chart.setOption(option, true)
    return chart
}
export default initChart
