
import OrgRegisterForm from 'common/components/OrganizationRegister/OrganizationForms/OrgRegisterForm';
import OrgFormLayout from 'common/components/OrganizationRegister/OrgFormLayout';



const OrganizationRegisterForm = () => {


  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}

      {/* <HomePage /> */}
      <OrgFormLayout isHeaderVisible={true} headerTitle={'Organization Registration'} headerImg={'./images/corporate_fare.svg'}><OrgRegisterForm /></OrgFormLayout>
    </>
  );
};

export default OrganizationRegisterForm;
