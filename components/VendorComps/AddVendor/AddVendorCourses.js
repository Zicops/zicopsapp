import ZicopsCarousel from '@/components/ZicopsCarousel';
import { useEffect } from 'react';
import useHandleVendor from '../Logic/useHandleVendor';

export default function AddVendorCourses() {
  const { getVendorCourses, vendorCourses } = useHandleVendor();

  useEffect(() => {
    getVendorCourses();
  }, []);

  return (
    <div>
      <ZicopsCarousel title="Draft Courses" type="small" data={vendorCourses} />
    </div>
  );
}
