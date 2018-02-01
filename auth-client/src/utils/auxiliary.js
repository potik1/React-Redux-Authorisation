import React from 'react';

export function renderAlert(errorMessage) {
  if (errorMessage) {
    return (
        <div className="alert alert-danger">
          <strong>{errorMessage}</strong>
        </div>);
  } else {
    return null;
  }
}

export function regexValid(item, regex) {
  return regex.test(item);
}