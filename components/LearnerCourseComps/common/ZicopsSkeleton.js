import { theme } from '@/helper/theme.helper';
import Skeleton from '@mui/material/Skeleton';

export default function ZicopsSkeleton(skeletonProps = {}) {
  return (
    <>
      <Skeleton
        style={{ backgroundColor: theme.skeletonColor, margin: 'auto' }}
        {...skeletonProps}
      />
    </>
  );
}
