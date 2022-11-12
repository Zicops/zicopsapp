
import OrgFormLayout from 'common/components/OrganizationRegister/OrgFormLayout';
import OrgGetStarted from 'common/components/OrganizationRegister/OrgGetStarted';


const OrgRegister = () => {


  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}

      {/* <HomePage /> */}
      <OrgFormLayout isHeaderVisible={false}><OrgGetStarted /></OrgFormLayout>
    </>
  );
};

export default OrgRegister;
