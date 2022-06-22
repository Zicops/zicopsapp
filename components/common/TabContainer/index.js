import { arrayOf, element, shape, string } from 'prop-types';
import Button from '../Button';

// Add proptype for extra added props
export default function TabContainer({ tabData, tab, setTab, footerObj = {}, children }) {
  const {
    status,
    submitDisplay = 'Submit',
    disableSubmit = false,
    handleSubmit = function () {},
    cancelDisplay = 'Cancel',
    handleCancel = function () {},
    showFooter = true
  } = footerObj;

  function showActiveTab(tab) {
    const index = tabData.findIndex((t) => {
      return t.name === tab;
    });

    if (index >= 0) return tabData[index].component;
    return tabData[0].component;
  }

  return (
    <>
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

      <section className="tabSection">{showActiveTab(tab)}</section>

      {/* footer */}
      {showFooter && (
        <div className="content-panel">
          <div className="left-text">
            <h3>Status: {status}</h3>
          </div>

          {children}

          <div className="right-text">
            <Button clickHandler={handleCancel} text={cancelDisplay} />
            <Button clickHandler={handleSubmit} isDisabled={disableSubmit} text={submitDisplay} />
          </div>
        </div>
      )}
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
          // height: 60vh;
          overflow: auto;
          padding: 20px 50px;
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

        // footer
        .content-panel {
          margin: 0;
          color: var(--white);
          height: 65px;
          // box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
          background-color: #000000;
          border-radius: 0 0 10px 10px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .left-text {
          margin-left: 50px;
          font-size: 14px;
        }
        .right-text {
          margin-right: 50px;
        }
      `}</style>
    </>
  );
}

const tabObj = shape({
  name: string.isRequired,
  component: element.isRequired
});

TabContainer.propTypes = { tabData: arrayOf(tabObj), switchTab: string };
