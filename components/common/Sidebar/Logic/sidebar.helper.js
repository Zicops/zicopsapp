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
      tourId: PRODUCT_TOUR_FLOW?.[7]?.id
    },
    {
      id: 3,
      title: 'Categories',
      link: '/admin/course/categories',
      description: ADMIN_COURSES.sidebarData.categories,
      tourId: PRODUCT_TOUR_FLOW?.[9]?.id
    },
    {
      id: 4,
      title: 'Sub-categories',
      link: '/admin/course/subcategories',
      description: ADMIN_COURSES.sidebarData.addSubCategories,
      tourId: PRODUCT_TOUR_FLOW?.[11]?.id
    },
    {
      id: 5,
      title: 'Dashboard',
      link: '/admin',
      description: ADMIN_COURSES.sidebarData.dashboard,
      isHidden: true,
      tourId: PRODUCT_TOUR_FLOW?.[12]?.id
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
      link: '/admin/vendor/manage-vendor'
    },
    {
      id: 3,
      title: 'Dashboard',
      link: '/admin'
    },
    {
      id: 4,
      title: 'Orders',
      link: '/admin/vendor/orders'
    }
  ]
};

export const analyticsSideBarData = {
  image: '/images/Analytics.png',
  heading: 'Analytics',
  data: [
    {
      id: 1,
      title: 'Quam',
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
      title: 'Parturient Lorem',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 4,
      title: 'Parturient Lorem Is',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      id: 5,
      title: 'Quam Hujs',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    }
  ]
};
