const validate = (rules, value) => {
  let valid = true;
  for (let rule of rules) {
    if (typeof rule === 'function') {
      const isValid = rule(value);
      if (isValid !== true) {
        valid = isValid;
        break;
      }
    } else {
      console.error("Form validation don't accept to: ", rule);
    }
  }
  return valid;
};

export { validate as validation };
