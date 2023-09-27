/* eslint-disable no-prototype-builtins */
export function dataToFormData(obj) {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else if (value instanceof Object && !(value instanceof File)&& !(value instanceof Blob)) {
        formData.append(key, dataToFormData(value));
      } else{
        formData.append(key, value);
      }
    }
  }
  return formData;
}
