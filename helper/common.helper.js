export function truncateToN(str, N = 100) {
  if (!str) return '';

  return str.length > N ? str.substring(0, N - 3) + '...' : str;
}

export function changeHandler(e, state, setState, inputName = null) {
  // for react multi-select - get a common variable for isMulti and replace if conditions
  if (inputName === 'language') {
    setState({
      ...state,
      [inputName]: e.map(el=>el.value)
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
