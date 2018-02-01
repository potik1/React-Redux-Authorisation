import React from 'react';

export function renderFormField(field) {
  return (
      <div className="form-group">
        <label>{field.label}:</label>
        <input className="form-control"
               type={field.type}
               {...field.input}
        />
      </div>
  );
}

export function renderFormFieldErr(field) {

  const {meta: {touched, error}} = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
      <div className={className}>
        <label>{field.label}:</label>
        <input className="form-control"
               type={field.type}
               {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
  );
}