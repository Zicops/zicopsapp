
import OrgFormLayout from 'common/components/OrganizationRegister/OrgFormLayout';
import OrgTabs from 'common/components/OrganizationRegister/OrgTabs';
import { TAB_DATA } from 'common/components/OrganizationRegister/OrgTabs/tabs.helper';


const OrganizationUnitForm = () => {


  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}

      {/* <HomePage /> */}
      <OrgFormLayout isHeaderVisible={true}><OrgTabs tabData={TAB_DATA}/></OrgFormLayout>
    </>
  );
};

export default OrganizationUnitForm;
