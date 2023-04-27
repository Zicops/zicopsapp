import TabContainer from '@/common/TabContainer';
import { useRecoilState } from 'recoil';
import { ActiveCourseTabNameAtom } from '@/state/atoms/courses.atom';
import { usersTabs } from '../Logic/adminCourseComps.helper';
export default function RegisterUserTabs() {
  const [activeUserTab, setActiveUserTab] = useRecoilState(ActiveCourseTabNameAtom);

  // set course master as default if state is empty
  if (!activeUserTab) setActiveUserTab(usersTabs.registrations.name);
  return (
    <>
      <TabContainer
        tabData={usersTabs}
        tab={activeUserTab}
        setTab={setActiveUserTab}
        customStyles={{ height: '65vh', padding: '0px', backgroundColor: '#121212' }}
        footerObj={{ showFooter: false }}></TabContainer>
    </>
  );
}
