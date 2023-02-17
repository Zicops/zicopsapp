// components\common\Charts\VennDiagram.js

import dynamic from 'next/dynamic';

const VennDiagram = dynamic(
  import('reaviz').then((r) => r.VennDiagram),
  { ssr: false }
);
const VennSeries = dynamic(
  import('reaviz').then((r) => r.VennSeries),
  { ssr: false }
);

export default function ZicopsVennDiagram({ data = [] }) {
  return (
    <>
      <VennDiagram
        height={450}
        width={450}
        data={data}
        series={<VennSeries colorScheme={['#2d60e8']} />}
      />
    </>
  );
}
