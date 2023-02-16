// https://stackoverflow.com/a/74943769/13419786
import 'chart.js/auto';
import { useEffect, useRef, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from '../charts.module.scss';

export default function BarChart({
  chartData,
  options = null,
  containerStyles = {},
  direction = 'ltr'
}) {
  const containerRef = useRef();
  const barContainerRef = useRef();

  // auto scroll to bottom as the x axis scale is at the bottom
  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef.current.scrollTop = containerRef?.current?.scrollHeight;
  }, [containerRef?.current?.scrollHeight]);

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style = {
        ...(tooltipEl.style || {}),

        background: 'red',
        borderRadius: '3px',
        color: 'white',
        opacity: 1,
        pointerEvents: 'none',
        position: 'absolute',
        transform: 'translate(-50%, 0)',
        transition: 'all .1s ease'
      };

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement('thead');

      titleLines.forEach((title) => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = 0;

        const th = document.createElement('th');
        th.style.borderWidth = 0;
        const text = document.createTextNode(`${title} esce`);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement('span');
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = '2px';
        span.style.marginRight = '10px';
        span.style.height = '10px';
        span.style.width = '10px';
        span.style.display = 'inline-block';

        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = 0;

        const td = document.createElement('td');
        td.style.borderWidth = 0;

        const text = document.createTextNode(body);

        td.appendChild(span);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const _options = {
    layout: {
      padding: {
        top: 5
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler,

        callbacks: {
          footer: (tooltipItems) => {
            let sum = 0;

            tooltipItems.forEach(function (tooltipItem) {
              sum += tooltipItem.parsed.y;
            });
            return 'Sum: ' + sum;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  // append plugins to props options
  if (options) options.plugins = { ...(options.plugins || {}), ..._options.plugins };

  // https://stackoverflow.com/questions/39473991/how-to-make-a-chart-js-bar-chart-scrollable
  return (
    <>
      <div className={`${styles.userInfoWraper}`} dir={direction} ref={containerRef}>
        <div className={`${styles.chartAreaWrapper}`} style={containerStyles} ref={barContainerRef}>
          <Bar data={chartData} options={options || _options} />
        </div>
      </div>
    </>
  );
}
