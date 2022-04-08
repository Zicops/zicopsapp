import { useContext } from 'react';
import { courseContext } from '../../state/contexts/CourseContext';
import ModuleContextProvider from '../../state/contexts/ModuleContext';
import useHandleTabs from './Logic/useHandleTabs';
import { contentPanel } from './tabs.module.scss';

export default function Tabs() {
  const courseContextData = useContext(courseContext);
  const { tab, setTab, tabData, showActiveTab } = useHandleTabs(courseContextData);

  return (
    <div className={`${contentPanel}`}>
      <nav className="tabHeader">
        <ul>
          {tabData.map((t) => (
            <li
              key={t.name}
              className={tab === t.name ? 'tabli active' : 'tabli'}
              onClick={() => setTab(t.name)}>
              {t.name}
            </li>
          ))}
        </ul>
      </nav>

      <section className="tabSection">
        <ModuleContextProvider>{showActiveTab(tab)}</ModuleContextProvider>
      </section>

      {/* TODO: add the style in the scss file */}
      <style jsx>{`
        .tabHeader {
        }
        .tabHeader ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
        }
        .tabli {
          padding: 7px 35px 8px 35px;
          background-color: transparent;
          color: var(--dark_three);
          border-radius: 5px 5px 0 0;
          font-size: 16px;
          line-height: 20px;
          outline: 0;
          border: 0;
          cursor: pointer;
        }

        .tabli.active {
          background-color: #202222;
          color: var(--white);
          box-shadow: 0 0px 10px 0 var(--dark_one);
          border-bottom: 1px solid var(--white);
        }
        .tabSection {
          background-color: #202222;
          height: 60vh;
          overflow: auto;
        }

        .tabSection::-webkit-scrollbar {
          width: 15px;
          border-radius: 7px;
          cursor: pointer;
        }
        .tabSection::-webkit-scrollbar-track {
          background: #2a2e31;
          border-radius: 7px;
        }

        .tabSection::-webkit-scrollbar-thumb {
          background: #969a9d;
          border-radius: 7px;
        }

        .tabSection::-webkit-scrollbar-thumb::hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
