import OrgContactForm from "../OrganizationForms/OrgContactForm";
import OrgUnitForm from "../OrganizationForms/OrgUnitForm";


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
