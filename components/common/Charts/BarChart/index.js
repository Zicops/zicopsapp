// https://stackoverflow.com/a/74943769/13419786
import 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from '../charts.module.scss';

export default function BarChart({
  chartData,
  options = {},
  containerStyles = {},
  tooltipBody = () => {},
  direction = 'ltr',
  labelLength = 10
}) {
  const containerRef = useRef();
  const barContainerRef = useRef();

  // auto scroll to bottom as the x axis scale is at the bottom
  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef.current.scrollTop = containerRef?.current?.scrollHeight;
  }, [containerRef?.current?.scrollHeight]);

  const _chartData = {
    ...chartData,
    labels: chartData?.labels?.map((label) => {
      // if (label?.length > labelLength) return truncateToN(label, labelLength);

      if (label?.length > labelLength) {
        return getArrForLongName(label, labelLength);
      }
      return label;
    })
  };

  function getArrForLongName(name = '', length = 10) {
    if (name?.length <= length) return name;

    const nameArr = name?.split('');
    const spaceIndex = nameArr?.findIndex((val) => val === ' ');

    if (spaceIndex > 0 && spaceIndex < length + 2 && name?.length <= length + 2) return [name];
    const _length = spaceIndex > 0 && spaceIndex < length + 2 ? spaceIndex : length;

    const firstHalf = name.substring(0, _length);
    const secondHalf = name.substring(_length);

    let isSpaceInBetween = firstHalf?.[firstHalf?.length - 1] === ' ';

    if (!isSpaceInBetween) isSpaceInBetween = secondHalf?.[0] === ' ';

    const firstHalfValue = `${firstHalf}${isSpaceInBetween ? '' : '-'}`;
    const secondHalfValue =
      secondHalf?.length > length ? `${secondHalf?.substring(0, length)}...` : secondHalf;
    return [firstHalfValue, `${isSpaceInBetween ? '' : '-'}${secondHalfValue}`];
  }

  const _options = {
    responsive: true,
    maintainAspectRatio: false,
    ...(options || {}),
    layout: {
      padding: {
        top: 5
      },
      ...(options?.layout || {})
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler

        // callbacks: {
        //   footer: (tooltipItems) => {
        //     let sum = 0;

        //     tooltipItems.forEach(function (tooltipItem) {
        //       sum += tooltipItem.parsed.y;
        //     });
        //     return 'Sum: ' + sum;
        //   }
        // }
      },
      ...(options?.plugins || {})
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      ...(options?.animation || {})
    },
    interaction: {
      mode: 'index',
      intersect: false,
      ...(options?.interaction || {})
    }
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

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    const containerDom = chart?.canvas?.parentNode?.parentNode;

    const container = {
      height: containerDom?.clientHeight || 0,
      width: containerDom?.clientWidth || 0
    };
    const tooltipContainer = {
      height: tooltipRoot?.clientHeight || 0,
      width: tooltipRoot?.clientWidth || 0
    };

    const estimatedPostionLeft = positionX + tooltip.caretX;
    let positionLeft = estimatedPostionLeft;
    if (estimatedPostionLeft - tooltipContainer.width < 100)
      positionLeft = estimatedPostionLeft - tooltipContainer.width / 2 + 10;
    if (estimatedPostionLeft + tooltipContainer.width >= container.width + 10)
      positionLeft = estimatedPostionLeft - tooltipContainer.width / 2 + 10;

    const estimatedPostionTop = positionY + tooltip.caretY;
    let positionTop = estimatedPostionTop;
    if (estimatedPostionTop + tooltipContainer.height >= container.height + 10)
      positionTop = estimatedPostionTop - tooltipContainer.height / 2 - 75;

    // Display, position, and set styles for font
    tooltipEl.style.left = positionLeft + 'px';
    tooltipEl.style.top = positionTop + 'px';
    tooltipEl.style.minWidth = '160px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  }
  // append plugins to props options
  // if (options) {
  //   options.plugins = { ...(options.plugins || {}), ..._options.plugins };
  //   options.scales = { ...(options.scales || {}), ..._options.scales };
  //   options.interaction = { ...(options.interaction || {}), ..._options.interaction };
  // }

  // https://stackoverflow.com/questions/39473991/how-to-make-a-chart-js-bar-chart-scrollable
  return (
    <>
      <div className={`${styles.userInfoWraper}`} dir={direction} ref={containerRef}>
        <div
          className={`${styles.chartAreaWrapper}`}
          dir={'ltr'}
          style={containerStyles}
          ref={barContainerRef}>
          <Bar data={_chartData} options={_options} />
        </div>
      </div>
    </>
  );
}
