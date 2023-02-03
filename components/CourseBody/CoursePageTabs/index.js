import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';

const CoursePageTabs = forwardRef(
  ({ tabData, setActiveTab, activeCourseTab, customStyles }, ref) => {
    const { isDev, isDemo } = useRecoilValue(FeatureFlagsAtom);

    return (
      <>
        <div className="middle_tab" ref={ref} style={customStyles}>
          <div className="tabs">
            <ul>
              {tabData.map((tab) => {
                let isDisabled = false;
                if (tab?.isDisabled || tab?.isDemo || tab?.isDev) isDisabled = true;
                if (isDemo && tab?.isDemo) isDisabled = false;
                if (isDev && tab?.isDev) isDisabled = false;

                return (
                  <li
                    className={`${activeCourseTab == tab.name ? 'active' : ''} ${
                      isDisabled ? 'disabled' : ''
                    }`}
                    key={tab.name}
                    onClick={() => {
                      if (isDisabled) return;

                      setActiveTab(tab.name);
                    }}>
                    {tab.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* move to .scss */}
        <style jsx>
          {`
            .middle_tab .tabs li.disabled {
              cursor: no-drop;
            }
            .middle_tab {
              position: sticky;
              top: 70px;
              z-index: 800;

              background: var(--tile-bg);

              display: flex;
              justify-content: center;
              width: 100%;
              /* margin-top: 15px; */
              margin-bottom: 5px;
              border-bottom: 1px solid #6bcfcf;
            }

            .middle_tab .tabs ul {
              display: flex;
              justify-content: center;
              align-items: center;
              list-style-type: none;

              font-size: 14px;
              font-weight: bold;
              line-height: 30px;
              color: #858f8f;
            }
            .middle_tab .tabs li {
              min-width: 150px;
              text-align: center;
              cursor: pointer;
              padding: 5px 0;
              border: 1px solid transparent;
              border-bottom: 2px solid #1a1a1a;
            }
            .middle_tab .tabs ul li:hover {
              /* border: 1px solid #6bcfcf;
                    border-bottom: 2px solid #1a1a1a;
                    margin-bottom: -2px; */
              color: #ffffff;
            }
            .middle_tab .tabs .active {
              color: #6bcfcf;
              border: 1px solid #6bcfcf;
              border-bottom: 2px solid #1a1a1a;
              margin-bottom: -2px;
            }
          `}
        </style>
      </>
    );
  }
);

export default CoursePageTabs;
