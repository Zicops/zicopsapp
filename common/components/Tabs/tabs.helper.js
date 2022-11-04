// import OrgRegisterForm from '@/components/OrganizationRegister/OrgRegisterForm';
import OrgContactForm from '../OrgContactForm';
// import OrgHomePage from '../OrgHomePage';
import OrgUnitForm from '../OrgUnitForm';

export const TAB_DATA = [
  {
    id: 1,
    title: 'Step1: Organization Unit',
    component: function (setTab = () => {}) {
      return <OrgUnitForm setTab={setTab} />;
    }
    // component: <OrgHomePage />
  },
  {
    id: 2,
    title: 'Step 2: Contact person',
    component: function (setTab = () => {}) {
      return <OrgContactForm setTab={setTab} />;
    }
  }
];
