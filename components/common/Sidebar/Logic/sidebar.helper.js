import { ADMIN_COURSES, ADMIN_EXAMS, ADMIN_USERS } from '../../ToolTip/tooltip.helper';
import { PRODUCT_TOUR_FLOW } from '../../ProductTour/productTour.flow';

export const courseSidebarData = {
  image: '/images/CourseManagement.png',
  heading: 'Course Management',
  data: [
    {
      title: 'Zicops Courses',
      link: '/admin/course/zicops-courses',
      description: ADMIN_COURSES.sidebarData.zicopsCourses
    },
    {
      title: 'My Courses',
      link: '/admin/course/my-courses',
      description: ADMIN_COURSES.sidebarData.myCourses
    },
    {
      title: 'Categories',
      link: '/admin/course/categories',
      description: ADMIN_COURSES.sidebarData.categories
    },
    {
      title: 'Sub-categories',
      link: '/admin/course/subcategories',
      description: ADMIN_COURSES.sidebarData.addSubCategories
    },
    {
      title: 'Dashboard',
      link: '/admin',
      description: ADMIN_COURSES.sidebarData.dashboard
    }
  ]
};

export const examSidebarData = {
  image: '/images/ExamManagement.png',
  heading: 'Exam Management',
  data: [
    {
      title: 'Zicops Question Banks',
      link: '/admin/exams/zicops-question-bank',
      description: ADMIN_EXAMS.sidebarData.zicopsQuestionBanks
    },
    {
      title: 'My Question Banks',
      link: '/admin/exams/my-question-bank',
      description: ADMIN_EXAMS.sidebarData.myQuestionBanks,
      tourId: PRODUCT_TOUR_FLOW?.[1]?.id
    },
    {
      title: 'Zicops Question Papers',
      link: '/admin/exams/zicops-question-papers',
      description: ADMIN_EXAMS.sidebarData.zicopsQuestionPapers
    },
    {
      title: 'My Question Papers',
      link: '/admin/exams/my-question-papers',
      description: ADMIN_EXAMS.sidebarData.myQuestionPapers,
      tourId: PRODUCT_TOUR_FLOW?.[3]?.id
    },
    {
      title: 'Zicops Exams',
      link: '/admin/exams/zicops-exam',
      description: ADMIN_EXAMS.sidebarData.zicopsExams
    },
    {
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
      title: 'My Users',
      link: '/admin/user/my-users',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    // {
    //   title: 'User Roles',
    //   // link: '/admin/user/users-roles'
    //   link: ''
    // },
    {
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
      title: 'My Learning Space',
      link: '/admin/administration/my-learning-space',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Organization',
      link: '/admin/administration/organization',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Subscription & Billing',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Notifications Manager',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Settings',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'App Integration',
      link: '',
      description: ADMIN_USERS.sidebarData.myUsers
    }
    // {
    //   title: 'User Roles',
    //   // link: '/admin/user/users-roles'
    //   link: ''
    // },
  ]
};

export const vendorSideBarData = {
  image: '/images/UserManagement.png',
  heading: 'Vendor Management',
  data: [
    {
      title: 'Market Yard',
      link: '/admin/vendor/market-yard'
    },
    {
      title: 'Manage Vendor',
      link: '/admin/vendor/manage-vendor'
    },
    {
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
      title: 'Quam',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Course Dashboard',
      link: '/admin/analytics/course-dashboard'
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Parturient Lorem',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },

    {
      title: 'Parturient Lorem',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    },
    {
      title: 'Quam',
      link: ''
      // description: ADMIN_USERS.sidebarData.myUsers
    }
    // {
    //   title: 'User Roles',
    //   // link: '/admin/user/users-roles'
    //   link: ''
    // },
  ]
};
