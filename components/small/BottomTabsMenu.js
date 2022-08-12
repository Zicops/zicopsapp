const BottomTabsMenu = ({ props }) => {
  const list = ['Topics', 'Resources', 'Notes', 'Discussion'];

  return (
    <>
      <div className="bottomtabs my_30">
        <ul>
          {list
            .filter((item) => item !== props.activeCourseTab)
            .map((li, i) => (
              <li key={i} onClick={() => props.setActiveCourseTab(li)}>
                {li}
              </li>
            ))}
        </ul>
      </div>
      <style jsx>
        {`
          .bottomtabs {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            color: var(--dark_three);
          }
          .bottomtabs ul li {
            margin: 10px 0;
            cursor: pointer;
          }
          .bottomtabs ul li:hover {
            color: var(--white);
          }
        `}
      </style>
    </>
  );
};

export default BottomTabsMenu;
