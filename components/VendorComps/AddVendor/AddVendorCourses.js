import ZicopsCarousel from '@/components/ZicopsCarousel';
import {
  myVendors,
  coursesVendor,
  addVendorCourse
} from '@/components/VendorComps/Logic/vendorComps.helper.js';

export default function AddVendorCourses() {
  console.log(addVendorCourse);
  return (
    <div>
      <ZicopsCarousel title="Draft Courses" type="small" data={addVendorCourse} />
    </div>
  );
}
