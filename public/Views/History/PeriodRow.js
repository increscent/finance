import React from 'react';
import Helpers from '../../Helpers.js';
import ClassNames from 'classnames';

export default function PeriodRow(props) {
  let startDate = Helpers.readableDate(props.period.start_date);
  let endDate = Helpers.readableDate(props.period.end_date);
  let periodClass = ClassNames({selected: props.selected});
  return (
    <li onClick={props.clickHandler} className={periodClass}>{startDate} - {endDate}</li>
  );
}
