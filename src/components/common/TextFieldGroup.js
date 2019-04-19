import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  id,
  name,
  placeholder,
  value,
  label,
  edit,
  error,
  info,
  type,
  onChange,
  onFocus,
  matClassName,
  disabled
}) => {
  const divClassName = 'mdc-text-field ' + matClassName;
  const divClassHelper = 'mdc-text-field-helper-text i' + matClassName;
  return (
    <div>
      <div
        className={classnames(`${divClassName}`, {
          'mdc-text-field--invalid': error
        })}
      >
        <input
          type={type}
          className={classnames('mdc-text-field__input', {
            'mdc-text-field--invalid': error
          })}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          disabled={disabled}
        />
        <label
          className={classnames('mdc-floating-label', {
            'mdc-floating-label--float-above': edit
          })}
          htmlFor='username-input'
        >
          {placeholder}*
        </label>
        <div className='mdc-line-ripple' />
      </div>

      {info && (
        <small className={classnames(`${divClassHelper}`)}>{info}</small>
      )}
      {error && <div className={classnames(`${divClassHelper}`)}>{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  matClassName: PropTypes.string.isRequired,
  edit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
