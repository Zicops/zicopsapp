export function truncateToN(str, N = 100) {
  if (!str) return '';

  return str.length > N ? str.substring(0, N - 3) + '...' : str;
}

export function changeHandler(e, state, setState, inputName = null) {
  // for react multi-select - get a common variable for isMulti and replace if conditions
  if (inputName === 'language') {
    setState({
      ...state,
      [inputName]: e.map((el) => el.value)
    });
    return;
  }

  // for react select
  if (inputName) {
    setState({
      ...state,
      [inputName]: e.value
    });
    return;
  }

  // for checkbox  select
  if (e.target.type === 'checkbox') {
    setState({
      ...state,
      [e.target.name]: e.target.checked
    });
    return;
  }

  // for normal HTML input
  setState({
    ...state,
    [e.target.name]: e.target.value
  });
}

export function snakeCaseToTitleCase(string = '') {
  if (!string) return '';
  // https://stackoverflow.com/a/64489760
  return string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
}

//Email validation

export function isEmail(email) {
  return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
}

//Password validation
export function isPassword(password) {
  let errors = [];
  if (password.length < 8) {
    errors.push('Your password must be at least 8 characters');
  }
  if (password.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.');
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.');
  }
  if (errors.length > 0) {
    return errors;
  }
  return true;
}

// current epoch time
export function getCurrentEpochTime() {
  const currentTime = new Date().getTime();
  return Math.floor(currentTime / 1000);
}
