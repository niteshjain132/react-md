/* eslint-env jest*/
import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-dom/test-utils';

import CalendarDate from '../CalendarDate';
import CalendarMonth from '../CalendarMonth';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';


describe('CalendarMonth', () => {
  it('merges className and style', () => {
    const style = { display: 'block' };
    const className = 'test';
    const props = {
      style,
      className,
      calendarDate: new Date(),
      calendarTempDate: new Date(),
      onCalendarDateClick: jest.fn(),
      DateTimeFormat,
      locales: 'en-US',
    };
    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);

    const calendarMonthNode = findDOMNode(calendarMonth);
    expect(calendarMonthNode.style.display).toBe(style.display);
    expect(calendarMonthNode.classList.contains(className)).toBe(true);
  });

  it('renders the number of days in a month', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2016, 3, 12),
      calendarTempDate: new Date(2016, 3, 12),
      onCalendarDateClick: jest.fn(),
    };

    const calendarMonth = renderIntoDocument(<CalendarMonth {...props} />);
    const days = scryRenderedComponentsWithType(calendarMonth, CalendarDate);
    expect(days.length).toBe(30);
    expect(days[11].props.active).toBe(true);
  });

  it('should change days order when "firstDayOfWeek" property is not 0', () => {
    function checkEmptyDayNode(node) {
      expect(node.nodeName).toBe('DIV');
      expect(node.innerHTML).toBe('');
    }

    function checkDayNode(node) {
      expect(node.nodeName).toBe('BUTTON');
    }

    const props = {
      DateTimeFormat,
      locales: 'en-US',
      calendarDate: new Date(2017, 6, 1),
      calendarTempDate: new Date(2017, 6, 1),
      onCalendarDateClick: jest.fn(),
      firstDayOfWeek: 5,
    };

    let header = renderIntoDocument(<CalendarMonth {...props} />);
    let days = scryRenderedDOMComponentsWithClass(header, 'md-calendar-date');
    expect(days.length).toBeGreaterThan(27);
    checkEmptyDayNode(days[0]);
    checkDayNode(days[1]);

    props.calendarDate = new Date(2017, 4, 1);
    props.calendarTempDate = new Date(2017, 4, 1);
    props.firstDayOfWeek = 4;

    header = renderIntoDocument(<CalendarMonth {...props} />);
    days = scryRenderedDOMComponentsWithClass(header, 'md-calendar-date');
    expect(days.length).toBeGreaterThan(27);
    checkEmptyDayNode(days[0]);
    checkEmptyDayNode(days[3]);
    checkDayNode(days[4]);
  });
});
