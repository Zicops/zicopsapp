export function DownArrowIcon({ color = '#6BCFCF', turns = '0' }) {
  return (
    <svg
      width="25"
      height="100%"
      viewBox="0 0 25 21"
      fill="none"
      style={{ transform: `rotate(${turns}turn)` }}
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.6"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.0002 0.63328L12.7539 12.4162L0.56543 0.628204V9.20929L12.7469 20.9905L24.9651 9.22537L25.0002 0.63328Z"
        fill={color}
      />
    </svg>
  );
}

export function DownSortTriangleIcon({ color = '#6BCFCF', turns = '0' }) {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 12 6"
      style={{ transform: `rotate(${turns}turn)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L0 0H12L6 6Z" fill={color} />
    </svg>
  );
}

export function ExpertiseIcon() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.774902 17.3V14.3C0.774902 13.7 0.929236 13.1457 1.2379 12.637C1.5459 12.129 1.95824 11.7417 2.4749 11.475C3.3249 11.0417 4.2999 10.6707 5.3999 10.362C6.4999 10.054 7.69157 9.9 8.9749 9.9C9.4749 9.9 9.99157 9.929 10.5249 9.987C11.0582 10.0457 11.5499 10.125 11.9999 10.225L9.9999 12.225C9.83324 12.1917 9.66657 12.175 9.4999 12.175C9.33324 12.175 9.15824 12.175 8.9749 12.175C7.80824 12.175 6.7539 12.3167 5.8119 12.6C4.87057 12.8833 4.11657 13.1833 3.5499 13.5C3.3999 13.5833 3.27924 13.6957 3.1879 13.837C3.0959 13.979 3.0499 14.1417 3.0499 14.325V15.025H9.1499L11.4249 17.3H0.774902ZM14.6999 17.575L11.1999 14.05L12.6499 12.6L14.6999 14.65L19.7499 9.6L21.2249 11.05L14.6999 17.575ZM8.9749 8.9C7.80824 8.9 6.81657 8.48733 5.9999 7.662C5.18324 6.83733 4.7749 5.85 4.7749 4.7C4.7749 3.53333 5.18324 2.54167 5.9999 1.725C6.81657 0.908333 7.80824 0.5 8.9749 0.5C10.1416 0.5 11.1332 0.908333 11.9499 1.725C12.7666 2.54167 13.1749 3.53333 13.1749 4.7C13.1749 5.85 12.7666 6.83733 11.9499 7.662C11.1332 8.48733 10.1416 8.9 8.9749 8.9ZM8.9749 6.625C9.50824 6.625 9.96257 6.43733 10.3379 6.062C10.7126 5.68733 10.8999 5.23333 10.8999 4.7C10.8999 4.16667 10.7126 3.71233 10.3379 3.337C9.96257 2.96233 9.50824 2.775 8.9749 2.775C8.44157 2.775 7.98757 2.96233 7.6129 3.337C7.23757 3.71233 7.0499 4.16667 7.0499 4.7C7.0499 5.23333 7.23757 5.68733 7.6129 6.062C7.98757 6.43733 8.44157 6.625 8.9749 6.625Z"
        fill="#6BCFCF"
      />
    </svg>
  );
}

export function LanguagesIcon() {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.9 21.1752L16.525 8.9752H18.675L23.3 21.1752H21.175L20.1 18.0752H15.175L14.025 21.1752H11.9ZM15.775 16.3002H19.4501L17.65 11.2502H17.55L15.775 16.3002ZM3.85005 18.1252L2.42505 16.7002L7.57505 11.5502C6.92505 10.8502 6.35838 10.1169 5.87505 9.3502C5.39172 8.58353 4.97505 7.7752 4.62505 6.9252H6.75005C7.06672 7.54186 7.40005 8.09586 7.75005 8.5872C8.10005 9.0792 8.51672 9.59186 9.00005 10.1252C9.75005 9.30853 10.371 8.4752 10.863 7.6252C11.3544 6.7752 11.7667 5.86686 12.1 4.9002H0.800049V2.8502H7.92505V0.825195H9.97505V2.8502H17.1V4.9002H14.15C13.7834 6.10019 13.296 7.27086 12.688 8.4122C12.0794 9.5542 11.325 10.6169 10.425 11.6002L12.875 14.1002L12.1 16.2002L8.95005 13.0252L3.85005 18.1252Z"
        fill="#6BCFCF"
      />
    </svg>
  );
}

export function ContentFormatIcon() {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.44444 13.3H12.2222V15.2H4.44444V13.3ZM4.44444 9.5H15.5556V11.4H4.44444V9.5ZM4.44444 5.7H15.5556V7.6H4.44444V5.7ZM17.7778 1.9H13.1333C12.6667 0.798 11.4444 0 10 0C8.55556 0 7.33333 0.798 6.86667 1.9H2.22222C2.06667 1.9 1.92222 1.9095 1.77778 1.938C1.34444 2.014 0.955555 2.204 0.655555 2.4605C0.455555 2.6315 0.288889 2.8405 0.177778 3.0685C0.0666668 3.287 0 3.534 0 3.8V17.1C0 17.3565 0.0666668 17.613 0.177778 17.841C0.288889 18.069 0.455555 18.2685 0.655555 18.449C0.955555 18.7055 1.34444 18.8955 1.77778 18.9715C1.92222 18.9905 2.06667 19 2.22222 19H17.7778C19 19 20 18.145 20 17.1V3.8C20 2.755 19 1.9 17.7778 1.9ZM10 1.6625C10.4556 1.6625 10.8333 1.9855 10.8333 2.375C10.8333 2.7645 10.4556 3.0875 10 3.0875C9.54444 3.0875 9.16667 2.7645 9.16667 2.375C9.16667 1.9855 9.54444 1.6625 10 1.6625ZM17.7778 17.1H2.22222V3.8H17.7778V17.1Z"
        fill="#6BCFCF"
      />
    </svg>
  );
}
