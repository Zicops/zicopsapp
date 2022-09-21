import { ADMIN_COURSES, ADMIN_EXAMS, ADMIN_USERS } from '../../ToolTip/tooltip.helper';

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
      description: ADMIN_EXAMS.sidebarData.myQuestionBanks
    },
    {
      title: 'Zicops Question Papers',
      link: '/admin/exams/zicops-question-papers',
      description: ADMIN_EXAMS.sidebarData.zicopsQuestionPapers
    },
    {
      title: 'My Question Papers',
      link: '/admin/exams/my-question-papers',
      description: ADMIN_EXAMS.sidebarData.myQuestionPapers
    },
    {
      title: 'Zicops Exams',
      link: '/admin/exams/zicops-exam',
      description: ADMIN_EXAMS.sidebarData.zicopsExams
    },
    {
      title: 'My Exams',
      link: '/admin/exams/my-exams',
      description: ADMIN_EXAMS.sidebarData.myExams
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
