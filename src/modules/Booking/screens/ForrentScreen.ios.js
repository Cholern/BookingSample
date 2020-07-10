import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';

import { colors, windows } from '../../../components';    

const VIEW_SIZE = {
  baseMargin: 10, 
  cellH: 46,
  headerPickerH: 34,
  pickerH: 280
};

const FONT_SIZE ={
  res: 16,
  submit: 16,
  err: 15,
  pickerHeader: 18
};
 
const STEP_VIEW = {input: 0, success: 1};
const STEP_FOCUS = {start: 0, end: 1};

export default class ForrentScreen extends Component {    

  constructor(props) {
    super(props);  

    this.state = {
      iosShow: false, 
      currentFocus: 0,
      startPicker: new Date(),
      endPicker: new Date(),
      bottomMsgTxt: '',
      bottomMsgColor: 'red'
    }; 
  }    

  onStartDatePress(){
    this.setState({iosShow: true, currentFocus: STEP_FOCUS.start});
  }

  onEndDatePress(){
    this.setState({iosShow: true, currentFocus: STEP_FOCUS.end});
  }

  onRentPress(){
    const {startPicker, endPicker} = this.state;
    const {items} = this.props;
    const mStartTime = startPicker.getTime() / 1000;
    const mEndTime = endPicker.getTime() / 1000;
    // check correct time
    if(mStartTime >= mEndTime){
      this.setState({bottomMsgTxt: 'Wrong time, end time must more than start time.', bottomMsgColor: 'red'});
      return;
    }
     
    // find the room is avaliable with timestamp
    const currentBooking = items.find(function(item){ 
      return (mStartTime >= item.startTime && mStartTime <= item.endTime) || (mEndTime >= item.startTime && mEndTime <= item.endTime);
    });

    if(currentBooking){
      this.setState({bottomMsgTxt: `This time is unavailable cause there are the "${currentBooking.title}" group.`, bottomMsgColor: 'red'});
    }else{
      // TODO save to state 
      this.setState({bottomMsgTxt: 'This time is unavailable.', bottomMsgColor: 'green'});
    } 
  }

  onPickerChange(e, selectedDate){ 
    const {currentFocus} = this.state;
    // with only picker
    if(currentFocus === STEP_FOCUS.start){
      this.setState({startPicker: selectedDate});
    }else{
      this.setState({endPicker: selectedDate});
    } 
  } 

  datetimeString(date){
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  }

  renderInputView(){
    const {startPicker, endPicker, bottomMsgTxt, bottomMsgColor} = this.state;
    return (
      <View style={[styles.container,{padding: VIEW_SIZE.baseMargin}]}> 
        <TouchableOpacity activeOpacity={0.8} style={styles.touchCellStyle} onPress={() => this.onStartDatePress()}>
          <Text style={styles.resTextStyle}>{`START : ${this.datetimeString(startPicker)}`}</Text>
        </TouchableOpacity> 
        <TouchableOpacity activeOpacity={0.8} style={styles.touchCellStyle} onPress={() => this.onEndDatePress()}>
          <Text style={styles.resTextStyle}>{`END : ${this.datetimeString(endPicker)}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.submitCellStyle} onPress={() => this.onRentPress()}>
          <Text style={styles.submitTextStyle}>RENT</Text>
        </TouchableOpacity>
        <Text style={[styles.errorTextStyle,{color: bottomMsgColor}]}>{bottomMsgTxt}</Text>
      </View>
    );
  }

  renderPickerIos(){
    const {currentFocus, startPicker, endPicker} = this.state;
    return (
      <View style={styles.pickerIosContainer}>
        <View style={styles.piclerHeaderView}> 
          <Text style={styles.pickerHeaderTextStyle}>{currentFocus === STEP_FOCUS.start ? 'START DATE' : 'END DATE'}</Text>
        </View>
        <DateTimePicker
          style={{flex: 1, width: '100%'}}
          testID="dateTimePicker" 
          value={currentFocus === STEP_FOCUS.start ? startPicker : endPicker}
          mode={'datetime'}
          is24Hour={true}
          display="default"
          onChange={this.onPickerChange.bind(this)}
        />
      </View>
    );
  }

  render(){ 
    const {items} = this.props;
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        {this.renderInputView()}
        {this.state.iosShow ? this.renderPickerIos() : undefined}
      </SafeAreaView>
    );
  }
}  

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    height: '100%',
    backgroundColor: colors.appBgColor,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  pickerIosContainer: {
    borderTopWidth: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: VIEW_SIZE.pickerH,
    borderColor: 'hsla(0, 0%, 0%, 0.04)',
    backgroundColor: '#C1C1C1'
  },
  piclerHeaderView: {
    width: '100%',
    height: VIEW_SIZE.headerPickerH,
    borderBottomWidth: 1,
    borderColor: 'hsla(0, 0%, 0%, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchCellStyle: {
    marginTop: VIEW_SIZE.baseMargin,
    width: '100%',
    height: VIEW_SIZE.cellH,
    borderWidth: 1,
    borderColor: colors.appThemColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appAdverseColor
  },
  submitCellStyle: {
    marginTop: VIEW_SIZE.baseMargin,
    width: '100%',
    height: VIEW_SIZE.cellH,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appThemColor
  },
  pickerHeaderTextStyle: {
    fontSize: FONT_SIZE.pickerHeader,
     fontWeight: '500'
  },
  errorTextStyle: {
    marginTop: VIEW_SIZE.baseMargin,
    width: '100%',
    textAlign: 'right',
    fontSize: FONT_SIZE.err,
    color: '#DA0000'
  },
  resTextStyle: { 
    paddingLeft: VIEW_SIZE.baseMargin * 2,
    width: '100%',
    textAlign: 'left',
    fontSize: FONT_SIZE.res,
    fontWeight: '400',
    color: colors.appThemColor
  },
  submitTextStyle: {
    fontSize: FONT_SIZE.submit,
    fontWeight: '600',
    color: colors.appAdverseColor
  }
});
