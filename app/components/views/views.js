import React from 'react';
import PhoneView from './phoneView.js';
import TabletView from './tabletView.js';
import DesktopView from './desktopView.js';

export default (props) => {
  let isPhone = window.innerWidth <= 640;
  let isTablet = window.innerWidth <= 960;

  return (
    (isPhone && <PhoneView views={props.views} />) ||
    (isTablet && <PhoneView views={props.views} />) ||
    <DesktopView views={props.views} />
  );
};
