export function validate(password: string, rePassword: string) {
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~)”])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~)”]{8,}$/,
  );
  return passwordRegex.exec(password) && password === rePassword;
}
