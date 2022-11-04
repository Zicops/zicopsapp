
import OrgEmail from 'common/components/OrganizationRegister/OrgEmail';
import OrgFormLayout from 'common/components/OrganizationRegister/OrgFormLayout';


const CreateLearningSpace = () => {


  return (
    <>
      {/* <Head>
        <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
      </Head>

      {mounted ? createPortal(<VrBackground />, ref.current) : null} */}

      {/* <HomePage /> */}
      <OrgFormLayout isHeaderVisible={false}><OrgEmail /></OrgFormLayout>
    </>
  );
};

export default CreateLearningSpace;
