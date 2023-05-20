const toBoolean = (value) => {
  if (value instanceof Array) return Boolean(value.length);
  if (value instanceof Object) return Boolean(Object.keys(value).length);
  return Boolean(value);
};

export { toBoolean };
