export function truncateToN(str, N = 100) {
  if (!str) return '';

  return str.length > N ? str.substring(0, N - 3) + '...' : str;
}

export function getDynamicFontClass(text, class1, class2) {
  if (text?.length > 40) {
    return class2;
  }
  return class1;
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

export async function convertUrlToFile(dataUrl, fileName = 'file.jpg') {
  if (!dataUrl) return;

  let response = await fetch(dataUrl);
  let data = await response.blob();
  let metadata = { type: 'image/jpeg' };
  return new File([data], fileName, metadata);
}

export async function getUrlFromFile(file) {
  if (!file) return;

  let fileUrl = await new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader?.result);
    fileReader?.readAsDataURL(file);
  });

  return fileUrl;
}

//
export function getNotificationMsg(type = '', msgObj = {}) {
  if (type === '') {
    return false;
  }
  const notificationObj = {
    courseAssign: function (msg) {
      return `A new course ${msg.courseName} has been assigned to you. The end date for completing this course is ${msg.endDate}. Check the course`;
    },
    courseUnassign: function (msg) {
      return `The ${msg.courseName} course has been unassigned by your admin from your learning space. However the course is now available in your personal learning space, so continue learning in your own capacity.`;
    },
    cohortAssign: function (msg) {
      return ` 
      You have been mapped to Cohort ${msg?.cohortName}. Check out the cohort and its members and courses to be completed.`;
    },
    cohortUnassign: function (msg) {
      return `Note: You are no longer member of Cohort ${msg?.cohortName}. However streaming of learning to you, continues`;
    },
    promotedManager: function (msg) {
      return `You have been assigned as Cohort Manager for ${msg?.cohortName} cohort. Check out the cohort and manage the same.`;
    },
    demotedManager: function (msg) {
      return `Note: You are no longer Manager of Cohort ${msg?.cohortName}. Please continue your learning as a member.`;
    },
    unassignSelfCourse: function (msg) {
      return `You have removed course ${msg.courseName}. Please let us know your feedback`;
    }
  };

  if (!notificationObj?.[type]) return false;

  return notificationObj?.[type](msgObj);
}

// this function is used to sanitize the sendData for any api that we are calling
export function sanitizeFormData(dataObj) {
  if (!dataObj) return dataObj;
  let _dataObj = structuredClone(dataObj);

  Object.keys(_dataObj).forEach((k) => {
    if (!_dataObj[k]) return;
    if (typeof _dataObj[k] === 'object') return sanitizeFormData(_dataObj[k]);
    if (typeof _dataObj[k] === 'string') _dataObj[k] = _dataObj[k]?.trim();
  });

  return _dataObj;
}
