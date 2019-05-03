import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  edit,
  error,
  info,
  matClassName,
  onChange
}) => {
  const divClassName = 'mdc-text-field ' + matClassName;
  return (
    <div>
      <div className='mdc-text-field mdc-text-field--textarea'>
        <textarea
          id='textarea'
          className='mdc-text-field__input'
          rows='8'
          cols='40'
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className='mdc-notched-outline'>
          <div className='mdc-notched-outline__leading' />
          <div className='mdc-notched-outline__notch'>
            <label
              htmlFor='textarea'
              className={classnames('mdc-floating-label', {
                'mdc-floating-label--float-above': edit
              })}
            >
              Short Description
            </label>
          </div>
          <div className='mdc-notched-outline__trailing' />
        </div>
      </div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
