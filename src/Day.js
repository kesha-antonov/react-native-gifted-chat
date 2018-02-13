/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './Color';

const dayFormat = function({ context, dayFormat }) {
  if( dayFormat ) {
    const locale = context.getLocale();
    return dayFormat[locale] || dayFormat;
  } else {
    return null;
  }
}

  
import { isSameDay, isSameUser, warnDeprecated } from './utils';
import { DATE_FORMAT } from './Constant';

export default function Day(
  { dateFormat, currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle, dayFormat },
  context,
) {
  if (!isSameDay(currentMessage, previousMessage)) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={wrapperStyle}>
          <Text style={[styles.text, textStyle]}>
            {moment(currentMessage.createdAt)
              .locale(context.getLocale())
              .calendar(null, dayFormat({ context, dayFormat }))
              .toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '600',
  },
});

Day.contextTypes = {
  getLocale: PropTypes.func,
};

Day.defaultProps = {
  currentMessage: {
    // TODO: test if crash when createdAt === null
    createdAt: null,
  },
  previousMessage: {},
  dayFormat: {
    sameDay: 'll',
    nextDay: 'll',
    lastDay: 'll',
    nextWeek: 'll',
    lastWeek: 'll',
    sameElse: 'll',
  },
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  // TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
  dateFormat: DATE_FORMAT,
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  dayFormat: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  // TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
  dateFormat: PropTypes.string,
};
