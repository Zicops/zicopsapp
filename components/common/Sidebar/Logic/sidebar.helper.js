import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PRODUCT_TOUR_FLOW } from '../../ProductTour/productTour.flow';
import { ADMIN_COURSES, ADMIN_EXAMS, ADMIN_USERS } from '../../ToolTip/tooltip.helper';

export const courseSidebarData = {
  image: '/images/CourseManagement.png',
  heading: 'Course Management',
  data: [
    {
      id: 1,
      title: 'Zicops Courses',
      link: '/admin/course/zicops-courses',
      description: ADMIN_COURSES.sidebarData.zicopsCourses
    },
    {
      id: 2,
      title: 'My Courses',
      link: '/admin/course/my-courses',
      description: ADMIN_COURSES.sidebarData.myCourses,
      isVendor: true
    },
    {
      id: 3,
      title: 'Categories',
      link: '/admin/course/categories',
      description: ADMIN_COURSES.sidebarData.categories
    },
    {
      id: 4,
      title: 'Sub-categories',
      link: '/admin/course/subcategories',
      description: ADMIN_COURSES.sidebarData.addSubCategories
    },
    {
      id: 5,
      title: 'Dashboard',
      link: '/admin/analytics/course-dashboard',
      description: ADMIN_COURSES.sidebarData.dashboard,
      isHidden: true
    }
  ]
};

export const examSidebarData = {
  image: '/images/ExamManagement.png',
  heading: 'Exam Management',
  data: [
    {
      id: 1,
      title: 'Zicops Question Banks',
      link: '/admin/exams/zicops-question-bank',
      description: ADMIN_EXAMS.sidebarData.zicopsQuestionBanks
    },
    {
      id: 2,
      title: 'My Question Banks',
      link: '/admin/exams/my-question-bank',
      description: ADMIN_EXAMS.sidebarData.myQuestionBanks,
      tourId: PRODUCT_TOUR_FLOW?.[1]?.id
    },
    {
      id: 3,
      title: 'Zicops Question Papers',
      link: '/admin/exams/zicops-question-papers',
      description: ADMIN_EXAMS.sidebarData.zicopsQuestionPapers
    },
    {
      id: 4,
      title: 'My Question Papers',
      link: '/admin/exams/my-question-papers',
      description: ADMIN_EXAMS.sidebarData.myQuestionPapers,
      tourId: PRODUCT_TOUR_FLOW?.[3]?.id
    },
    {
      id: 5,
      title: 'Zicops Exams',
      link: '/admin/exams/zicops-exam',
      description: ADMIN_EXAMS.sidebarData.zicopsExams
    },
    {
      id: 6,
      title: 'My Exams',
      link: '/admin/exams/my-exams',
      description: ADMIN_EXAMS.sidebarData.myExams,
      tourId: PRODUCT_TOUR_FLOW?.[5]?.id
    }
  ]
};

export const userSideBarData = {
  image: '/images/UserManagement.png',
  heading: 'User Management',
  data: [
    {
      id: 1,
      title: 'My Users',
      link: '/admin/user/my-users',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    // {
    //   id: 2,
    //   title: 'User Roles',
    //   // link: '/admin/user/users-roles'
    //   link: ''
    // },
    {
      id: 3,
      title: 'User Cohort',
      link: '/admin/user/user-cohort',
      description: ADMIN_USERS.sidebarData.userCohort
    }
  ]
};

export const administrationSideBarData = {
  image: '/images/UserManagement.png',
  heading: 'Administration',
  data: [
    {
      id: 1,
      title: 'My Learning Space',
      link: '/admin/administration/my-learning-space',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 2,
      title: 'Organization',
      link: '/admin/administration/organization',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 3,
      title: 'Subscription & Billing',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers,
      isHidden: true
    },
    {
      id: 4,
      title: 'Notifications Manager',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers,
      isHidden: true
    },
    {
      id: 5,
      title: 'Settings',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers,
      isHidden: true
    },
    {
      id: 6,
      title: 'App Integration',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers,
      isHidden: true
    }
  ]
};

export const vendorSideBarData = {
  image: '/images/UserManagement.png',
  heading: 'Vendor Management',
  data: [
    {
      id: 1,
      title: 'Market Yard',
      link: '/admin/vendor/market-yard'
    },
    {
      id: 2,
      title: 'Manage Vendor',
      link: '/admin/vendor/manage-vendor',
      isVendor: true,
      isCustomRoute: true
    },
    {
      id: 3,
      title: 'Dashboard',
      link: '/admin'
    },
    {
      id: 4,
      title: 'Orders',
      link: '/admin/vendor/orders',
      isHidden: true
    }
  ]
};

export const trainerSideBarData = {
  image: '/images/UserManagement.png',
  heading: 'Training Management',
  data: [
    {
      id: 1,
      title: 'Classroom Training',
      link: ''
    },
    {
      id: 2,
      title: 'Trainers',
      link: '/admin/training/trainers',
      isCustomRoute: true
    },
    {
      id: 3,
      title: 'Dashboard',
      link: '/admin'
    }
  ]
};

export const analyticsSideBarData = {
  image: '/images/Analytics.png',
  heading: 'Analytics',
  data: [
    {
      id: 1,
      title: 'User Dashboard',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 2,
      title: 'Course Dashboard',
      link: '/admin/analytics/course-dashboard'
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 3,
      title: 'Exam Dashboard',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 4,
      title: 'Vendor Dashboard',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 5,
      title: 'Training Dashboard',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    }
  ]
};

export default function useHandleRole() {
  const courseSidebarData = {
    image: '/images/CourseManagement.png',
    heading: 'Course Management',
    data: [
      {
        id: 1,
        title: 'Zicops Courses',
        link: '/admin/course/zicops-courses',
        description: ADMIN_COURSES.sidebarData.zicopsCourses
      },
      {
        id: 2,
        title: 'My Courses',
        link: '/admin/course/my-courses',
        description: ADMIN_COURSES.sidebarData.myCourses
      },
      {
        id: 3,
        title: 'Categories',
        link: '/admin/course/categories',
        description: ADMIN_COURSES.sidebarData.categories
      },
      {
        id: 4,
        title: 'Sub-categories',
        link: '/admin/course/subcategories',
        description: ADMIN_COURSES.sidebarData.addSubCategories
      },
      {
        id: 5,
        title: 'Dashboard',
        link: '/admin',
        description: ADMIN_COURSES.sidebarData.dashboard,
        isHidden: true
      }
    ]
  };

  const [sideBarData, setSideBarData] = useState([]);

  function getRoleBasedSideBarData() {
    let initialSideBar = { ...courseSidebarData };
    const userOrgData = useRecoilValue(UsersOrganizationAtom);
    if (userOrgData?.user_lsp_role !== USER_LSP_ROLE?.vendor) return initialSideBar;
    let sideBarArray = initialSideBar?.data?.map((data) => {
      if (data?.title !== 'My Courses') return { ...data, isHidden: true };
      return { ...data };
    });

    return { ...initialSideBar, data: [...sideBarArray] };
  }

  return { getRoleBasedSideBarData };
}
