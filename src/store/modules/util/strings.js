/* eslint-disable import/prefer-default-export */
export function stripExtraDoubleQuotes(source) {
  let stripped;
  if (source.substr(0, 1) === '"') {
    stripped = source.substr(1, source.length - 2);
  } else {
    stripped = source;
  }
  return stripped;
}

export function booleanStringToBoolean(booleanString) {
  let booleanValue;
  if (booleanString === 'true') {
    booleanValue = true;
  } else {
    booleanValue = false;
  }
  return booleanValue;
}
