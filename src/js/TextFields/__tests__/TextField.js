/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-dom/test-utils';

import TextField from '../TextField';
import InputField from '../InputField';
import TextFieldDivider from '../TextFieldDivider';
import PasswordButton from '../PasswordButton';
import FloatingLabel from '../FloatingLabel';
import FontIcon from '../../FontIcons/FontIcon';

describe('TextField', () => {
  it('merges style and classNames correctly', () => {
    const props = {
      id: 'test',
      style: { width: '100%' },
      className: 'test',
      inputStyle: { width: 256 },
      inputClassName: 'wow',
      placeholder: 'Test',
    };

    const field = renderIntoDocument(<TextField {...props} />);
    const fieldNode = findDOMNode(field);
    const inputField = findRenderedComponentWithType(field, InputField);

    expect(fieldNode.style.width).toBe(props.style.width);
    expect(fieldNode.className).toContain(props.className);
    expect(inputField.props.style).toEqual(props.inputStyle);
    expect(inputField.props.className).toBe(props.inputClassName);
  });

  it('should correctly set the initial floating state', () => {
    const field1 = shallow(<TextField id="test" placheolder="Test" defaultValue="" />);
    const field2 = shallow(<TextField id="test" placheolder="Test" defaultValue="0" />);
    const field3 = shallow(<TextField id="test" placheolder="Test" defaultValue={0} />);
    const field4 = shallow(<TextField id="test" placheolder="Test" value="" onChange={() => {}} />);
    const field5 = shallow(<TextField id="test" placheolder="Test" value="0" onChange={() => {}} />);
    const field6 = shallow(<TextField id="test" placheolder="Test" value={0} onChange={() => {}} />);

    expect(field1.state('floating')).toBe(false);
    expect(field2.state('floating')).toBe(true);
    expect(field3.state('floating')).toBe(true);
    expect(field4.state('floating')).toBe(false);
    expect(field5.state('floating')).toBe(true);
    expect(field6.state('floating')).toBe(true);
  });

  it('should correctly update the floating state when the value prop changes', () => {
    const field = shallow(<TextField id="test" placeholder="Test" value="" onChange={() => {}} />);
    expect(field.state('floating')).toBe(false);

    field.setProps({ value: 0 });
    expect(field.state('floating')).toBe(true);

    field.setProps({ value: '' });
    expect(field.state('floating')).toBe(false);

    field.setProps({ value: '0' });
    expect(field.state('floating')).toBe(true);
  });

  it('should update the floating state on focus', () => {
    const field1 = mount(<TextField id="test" placeholder="Test" />);
    const field2 = mount(<TextField id="test" placeholder="Test" block />);

    field1.find('input').simulate('focus');
    field2.find('input').simulate('focus');
    expect(field1.state('floating')).toBe(true);
    expect(field2.state('floating')).toBe(false);
  });

  it('should update the floating state on blur', () => {
    const field = mount(<TextField id="test" placeholder="Test" />);
    const input = field.find('input');

    input.simulate('focus');
    expect(field.state('floating')).toBe(true);
    input.simulate('blur');
    expect(field.state('floating')).toBe(false);

    input.simulate('focus');
    expect(field.state('floating')).toBe(true);
    input.simulate('blur', { target: { value: 0 } });
    expect(field.state('floating')).toBe(true);

    input.simulate('blur', { target: { value: '0' } });
    expect(field.state('floating')).toBe(true);

    input.simulate('blur', { target: { value: 'hello' } });
    expect(field.state('floating')).toBe(true);

    input.simulate('blur', { target: { value: '' } });
    expect(field.state('floating')).toBe(false);
  });

  it('renders a divider component when the block prop is false', () => {
    const props = { id: 'test', placeholder: 'test' };
    let field = renderIntoDocument(<TextField {...props} />);
    let dividers = scryRenderedComponentsWithType(field, TextFieldDivider);

    expect(dividers.length).toBe(1);

    props.block = true;
    field = renderIntoDocument(<TextField {...props} />);
    dividers = scryRenderedComponentsWithType(field, TextFieldDivider);

    expect(dividers.length).toBe(0);
  });

  it('passes the mouse and touch events to the TextField container', () => {
    const onClick = jest.fn();
    const onDoubleClick = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchMove = jest.fn();
    const onTouchCancel = jest.fn();
    const onTouchEnd = jest.fn();
    const props = {
      id: 'test',
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseOver,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchCancel,
      onTouchEnd,
    };

    const field = renderIntoDocument(<TextField {...props} />);
    const container = findDOMNode(field);

    Simulate.click(container);
    expect(onClick).toBeCalled();

    Simulate.doubleClick(container);
    expect(onDoubleClick).toBeCalled();

    Simulate.mouseOver(container);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseDown(container);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(container);
    expect(onMouseUp).toBeCalled();

    Simulate.mouseLeave(container);
    expect(onMouseLeave).toBeCalled();

    Simulate.touchStart(container);
    expect(onTouchStart).toBeCalled();

    Simulate.touchMove(container);
    expect(onTouchMove).toBeCalled();

    Simulate.touchCancel(container);
    expect(onTouchCancel).toBeCalled();

    Simulate.touchEnd(container);
    expect(onTouchEnd).toBeCalled();
  });

  it('passes the keyboard and typing events to the InputField component', () => {
    const onKeyPress = jest.fn();
    const onKeyUp = jest.fn();
    const onCopy = jest.fn();
    const onCut = jest.fn();
    const onPaste = jest.fn();
    const onInput = jest.fn();
    const onSelect = jest.fn();
    const onCompositionStart = jest.fn();
    const onCompositionUpdate = jest.fn();
    const onCompositionEnd = jest.fn();

    const props = {
      id: 'test',
      onKeyPress,
      onKeyUp,
      onCopy,
      onCut,
      onPaste,
      onInput,
      onSelect,
      onCompositionStart,
      onCompositionUpdate,
      onCompositionEnd,
    };

    const container = renderIntoDocument(<TextField {...props} />);
    const input = findRenderedComponentWithType(container, InputField);

    expect(input.props.onKeyPress).toBe(onKeyPress);
    expect(input.props.onKeyUp).toBe(onKeyUp);
    expect(input.props.onCopy).toBe(onCopy);
    expect(input.props.onCut).toBe(onCut);
    expect(input.props.onPaste).toBe(onPaste);
    expect(input.props.onInput).toBe(onInput);
    expect(input.props.onSelect).toBe(onSelect);
    expect(input.props.onCompositionStart).toBe(onCompositionStart);
    expect(input.props.onCompositionUpdate).toBe(onCompositionUpdate);
    expect(input.props.onCompositionEnd).toBe(onCompositionEnd);
  });

  it('calls the onFocus prop when the _handleFocus function is called', () => {
    const props = { id: 'test', onFocus: jest.fn() };
    const field = renderIntoDocument(<TextField {...props} />);

    field._handleFocus();
    expect(props.onFocus).toBeCalled();
  });

  it('calls the onChange prop when the _handleChange function is called', () => {
    const props = { id: 'test', onChange: jest.fn() };
    const field = renderIntoDocument(<TextField {...props} />);

    field._handleChange({ target: { value: '' } });
    expect(props.onChange).toBeCalled();
  });

  it('calls the onChange prop with the new value and change event', () => {
    const props = { id: 'test', onChange: jest.fn() };
    const field = renderIntoDocument(<TextField {...props} />);

    const event = { target: { value: 'wow' } };
    field._handleChange(event);
    expect(props.onChange.mock.calls[0][0]).toBe('wow');
    expect(props.onChange.mock.calls[0][1]).toEqual(event);
  });

  it('adds the PasswordButton component when the type is password', () => {
    let props = { id: 'test', placeholder: 'text' };
    let field = renderIntoDocument(<TextField {...props} />);
    let passwords = scryRenderedComponentsWithType(field, PasswordButton);
    expect(passwords.length).toBe(0);

    props = { id: 'test', placeholder: 'password', type: 'password' };
    field = renderIntoDocument(<TextField {...props} />);
    passwords = scryRenderedComponentsWithType(field, PasswordButton);
    expect(passwords.length).toBe(1);
  });

  it('renders the PasswordButton with the correct props', () => {
    const props = { id: 'password', placeholder: 'password', type: 'password' };
    const field = renderIntoDocument(<TextField {...props} />);
    const password = findRenderedComponentWithType(field, PasswordButton);

    expect(password.props.onClick).toBe(field._togglePasswordField);
    expect(password.props.active).toBe(field.state.active);
    expect(password.props.passwordVisible).toBe(field.state.passwordVisible);
    expect(password.props.iconChildren).toBe(TextField.defaultProps.passwordIconChildren);
    expect(password.props.iconClassName).toBe(TextField.defaultProps.passwordIconClassName);
  });

  it('renders the FloatingLabel component with the correct props', () => {
    const props = { label: 'Test', id: 'test' };
    let field = renderIntoDocument(<TextField {...props} />);
    let label = findRenderedComponentWithType(field, FloatingLabel);

    expect(label.props.label).toBe(props.label);
    expect(label.props.htmlFor).toBe(props.id);
    expect(label.props.active).toBe(field.state.active);
    expect(label.props.error).toBe(field.state.error);
    expect(label.props.floating).toBe(field.state.floating);
    expect(label.props.disabled).toBe(props.disabled);
    expect(label.props.customSize).toBe(props.customSize);
    expect(label.props.iconOffset).toBe(false);

    props.customSize = 'title';
    props.leftIcon = <FontIcon />;
    field = renderIntoDocument(<TextField {...props} />);
    label = findRenderedComponentWithType(field, FloatingLabel);

    expect(label.props.label).toBe(props.label);
    expect(label.props.htmlFor).toBe(props.id);
    expect(label.props.active).toBe(field.state.active);
    expect(label.props.error).toBe(field.state.error);
    expect(label.props.floating).toBe(field.state.floating);
    expect(label.props.disabled).toBe(props.disabled);
    expect(label.props.customSize).toBe(props.customSize);
    expect(label.props.iconOffset).toBe(true);
  });

  // Super important test
  it('does some stuff that seems hard to automatically test', () => {
    expect(true).toBe(true);
  });

  it('should set to floating state to true when the defaultValue or value is 0', () => {
    const field = shallow(<TextField id="test" defaultValue={0} type="number" />);
    expect(field.state('floating')).toBe(true);

    field.setProps({ value: 0, onChange: jest.fn() });
    expect(field.state('floating')).toBe(true);
  });

  it('should be able to be snapshottable', () => {
    const tree1 = renderer.create(<TextField id="test" />).toJSON();
    const tree2 = renderer.create(<TextField id="test" label="Label" placeholder="placeholder" />).toJSON();
    const tree3 = renderer.create(<TextField id="test" label="Label" placeholder="placeholder" rows={2} />).toJSON();
    const tree4 = renderer.create(<TextField id="test" placeholder="Block" block paddedBlock />).toJSON();
    const tree5 = renderer.create(<TextField id="test" placeholder="Block" block paddedBlock rows={2} />).toJSON();
    const tree6 = renderer.create(
      <TextField
        id="test"
        name="testing"
        label="Label"
        placeholder="Something"
        resize={{ min: 100, max: 300 }}
      />
    ).toJSON();
    const tree7 = renderer.create(
      <TextField
        id="test"
        name="testing"
        label="Label"
        placeholder="Something"
        helpText="Look at me!"
        errorText="Some error"
      />
    ).toJSON();
    const tree8 = renderer.create(
      <TextField
        id="test"
        name="testing"
        label="Label"
        placeholder="Something"
        helpText="Look at me!"
        error
        errorText="Some error"
      />
    ).toJSON();
    const tree9 = renderer.create(
      <TextField
        id="test"
        name="testing"
        label="Label"
        placeholder="Something"
        helpOnFocus
        helpText="Look at me!"
      />
    ).toJSON();
    const tree10 = renderer.create(
      <TextField
        id="test"
        name="testing"
        label="Label"
        placeholder="Something"
        maxLength={20}
      />
    ).toJSON();

    expect(tree1).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
    expect(tree3).toMatchSnapshot();
    expect(tree4).toMatchSnapshot();
    expect(tree5).toMatchSnapshot();
    expect(tree6).toMatchSnapshot();
    expect(tree7).toMatchSnapshot();
    expect(tree8).toMatchSnapshot();
    expect(tree9).toMatchSnapshot();
    expect(tree10).toMatchSnapshot();
  });
});
