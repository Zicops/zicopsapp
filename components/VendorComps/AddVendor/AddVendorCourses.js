import { addVendorCourse } from '@/components/VendorComps/Logic/vendorComps.helper.js';
import ZicopsCarousel from '@/components/ZicopsCarousel';

export default function AddVendorCourses() {
  return (
    <div>
      <ZicopsCarousel title="Draft Courses" type="small" data={addVendorCourse} />
    </div>
  );
}
