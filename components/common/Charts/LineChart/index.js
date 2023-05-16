import { Line } from 'react-chartjs-2';
import styles from '../../Charts/charts.module.scss';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);

const LineChart = ({ chartData = {}, options = {}, tooltipBody = () => {} }) => {
  // https://stackoverflow.com/questions/64622766/chart-js-bar-chart-mouse-hovering-highlights-all-the-datasets-instead-of-just-th
  // refer for hover
  const _options = {
    responsive: true,
    maintainAspectRatio: false,
    ...(options || {}),
    layout: {
      padding: {
        top: 5,
      },
      ...(options?.layout || {}),
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,
      },
      ...(options.plugins || {}),
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      ...(options.animation || {}),
    },
  };

  function getOrCreateTooltip(chart) {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const div = document.createElement('div');
      div.classList.add('tooltip');
      div.style.margin = '0px';

      tooltipEl.appendChild(div);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  }

  function externalTooltipHandler(context) {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    const tooltipRoot = tooltipEl.querySelector('.tooltip');
    tooltipEl.style.opacity = 1;

    let bodyNode = null;
    if (tooltip?.body) {
      const dataPoints = tooltip?.dataPoints?.[0];
      const tooltipData = dataPoints?.dataset?.data?.[dataPoints?.dataIndex];

      bodyNode = tooltipBody(tooltipData, tooltip);

      // Remove old children
      while (tooltipRoot?.firstChild) {
        tooltipRoot?.firstChild?.remove();
      }

      if (bodyNode) tooltipRoot.appendChild(bodyNode);
      if (!bodyNode) tooltipEl.style.opacity = 0;
    }

    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    const containerDom = chart?.canvas?.parentNode;

    const container = {
      height: containerDom?.clientHeight || 0,
      width: containerDom?.clientWidth || 0,
    };
    const tooltipContainer = {
      height: tooltipRoot?.clientHeight || 0,
      width: tooltipRoot?.clientWidth || 0,
    };

    const estimatedPostionLeft = positionX + tooltip.caretX;
    let positionLeft = estimatedPostionLeft;
    if (estimatedPostionLeft - tooltipContainer.width < 10)
      positionLeft = estimatedPostionLeft + tooltipContainer.width / 2 + 10;
    if (estimatedPostionLeft + tooltipContainer.width + 10 > container?.width)
      positionLeft = estimatedPostionLeft - tooltipContainer.width / 2 - 10;

    const estimatedPostionTop = positionY + tooltip.caretY;
    let positionTop = estimatedPostionTop;
    if (estimatedPostionTop + tooltipContainer.height + 10 > container?.height)
      positionTop = estimatedPostionTop - tooltipContainer.height - 10;
    if (estimatedPostionTop - tooltipContainer.height - 10 < 0)
      positionTop = estimatedPostionTop + 10;

    // Display, position, and set styles for font
    tooltipEl.style.minWidth = '100px';
    tooltipEl.style.left = positionLeft + 'px';
    tooltipEl.style.top = positionTop + 'px';
  }

  return (
    <div className={`${styles.userInfoWraper}`}>
      <Line data={chartData} options={_options} />
    </div>
  );
};

export default LineChart;
