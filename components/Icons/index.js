export function DownArrowIcon({ color }) {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4439 3.55853L9.31595 10.4168L2.22168 3.55558V8.55019L9.31186 15.4074L16.4235 8.55954L16.4439 3.55853Z"
        fill={color}
      />
    </svg>
  );
}

export function TrendingUp({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask
        id="mask0_597_4785"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="22"
        height="22">
        <rect x="0.666992" y="3.05176e-05" width="21.3333" height="21.3333" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_597_4785)">
              <path
                  d="M3.71128 16.1332L2.28906 14.711L9.04462 7.91098L12.6002 11.4665L16.9335 7.17765H14.6668V5.15543H20.378V10.8443H18.3557V8.59987L12.6002 14.3554L9.04462 10.7999L3.71128 16.1332Z"
                  fill={color}
                //   "#26BA4D"
        />
      </g>
    </svg>
  );
}
