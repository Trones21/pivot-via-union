import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/TextInput.css';


export default class Field extends Component {
  static propTypes = {
    id: PropTypes.string,
    parentStateId: PropTypes.string,
    locked: PropTypes.bool,
    focused: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    setParentState: PropTypes.func,
  };

  static defaultProps = {
    locked: false,
    focused: false,
    value: '',
    error: '',
    label: '',
    onChange: () => '',
    setParentState: () => '',
  };

  constructor(props) {
    super(props);

    this.state = {
      focused: (props.locked && props.focused) || false,
      value: props.value || '',
      error: props.error || '',
      label: props.label || '',
      onChange: this.onChange,
      setParentState: props.setParentState,
    };
  }

  onChange = event => {
    const { id } = this.props;
    const value = event.target.value;
    this.setState({ value, error: '' });
    this.props.setParentState(value, this.props.parentStateId);
    return this.props.onChange(id, value);
  }

  render() {
    const { focused, value, error, label } = this.state;
    const { id, type, locked } = this.props;
    const fieldClassName = `field useSpace ${(locked ? focused : focused || value) && 'focused'} ${locked && !focused && 'locked'}`;
    return (
      <div className={fieldClassName}>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.onChange}
          onFocus={() => !locked && this.setState({ focused: true })}
          onBlur={() => !locked && this.setState({ focused: false })}
        />
        <label htmlFor={id} className={error && 'error'}>
          {error || label}
        </label>
      </div>
    );

  }
}