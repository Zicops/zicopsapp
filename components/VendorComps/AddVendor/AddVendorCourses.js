import ZicopsCarousel from '@/components/ZicopsCarousel';
import { myVendors, coursesVendor } from '@/components/VendorComps/Logic/vendorComps.helper.js';

export default function AddVendorCourses() {
  return (
    <div>
      <ZicopsCarousel
        title="My Vendors"
        type="vendor"
        data={coursesVendor}
        //   handleTitleClick={() =>
        //     router.push(
        //       `/search-page?userCourse=${JSON.stringify({ isOngoing: true })}`,
        //       '/search-page'
        //     )
        //   }
      />
    </div>
  );
}
