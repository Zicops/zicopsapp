import { Gradient, VennArc, VennDiagram, VennLabel, VennOuterLabel, VennSeries } from 'reaviz';
import styles from './dashboardComponents.module.scss';

// use this with dynamic import
export default function ZicopsVennDiagram({ isEuler = false, data = [] }) {
  if (!data?.length) return null;

  return (
    <VennDiagram
      type={isEuler ? 'euler' : 'venn'}
      height={450}
      width={450}
      data={data}
      series={
        <VennSeries
          colorScheme={(d, index) => {
            if (data?.[index]?.color) return data?.[index]?.color;

            return styles.primary;
          }}
          arc={<VennArc strokeWidth={0} gradient={<Gradient />} />}
          label={<VennLabel labelType={'value'} showAll={true} fill={'#fff'} />}
          outerLabel={<VennOuterLabel fill={'#fff'} />}
        />
      }
    />
  );
}
