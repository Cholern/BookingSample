import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';  
import * as PropTypes from 'prop-types';   

import { colors, fonts} from '../../../components';  
 
const VIEW_SIZE = {
  baseMargin: 10, 
  imgH: 140,
  detailH: 54,
  controlH: 44 
};

const FONT_SIZE = {
  title: 16,
  des: 14,
  button: 16
};

export default class CardView extends Component{    

  render(){
    const {detail, onLeftButtonPress, onRightButtonPress} = this.props; 
    return(
      <View style={styles.container}>
        <View style={styles.imageSectionContainer}/>
        <View style={styles.detailSectionContainer}>
          <Text numberOfLines={1} style={styles.titleTextStyle}>{detail.roomId}</Text>
          <Text numberOfLines={1} style={styles.descriptionTextStyle}>{`Cescription for ${detail.roomId}`}</Text>
        </View> 
        <View style={styles.controlSectionContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.leftButtonStyle} onPress={() => onLeftButtonPress(detail)}>
             <Text numberOfLines={1} style={styles.buttonTextStyle}>RENT</Text>
          </TouchableOpacity> 
          <TouchableOpacity activeOpacity={0.8} style={styles.rightButtonStyle} onPress={() => onRightButtonPress(detail)}>
             <Text numberOfLines={1} style={styles.buttonTextStyle}>MORE</Text>
          </TouchableOpacity> 
        </View>
      </View>
    );
  } 
} 

const styles = StyleSheet.create({  
  container: {
    marginTop: VIEW_SIZE.baseMargin,
    width: '100%', 
    borderRadius: VIEW_SIZE.baseMargin,
    // justifyContent: 'center',
    alignItems: 'center'      
  },  
  imageSectionContainer: {
    width: '100%',
    height: VIEW_SIZE.imgH,
    borderTopLeftRadius: VIEW_SIZE.baseMargin,
    borderTopRightRadius: VIEW_SIZE.baseMargin,
    backgroundColor: '#D5D5D5'
  },
  detailSectionContainer: {
    paddingHorizontal: VIEW_SIZE.baseMargin,
    width: '100%',
    height: VIEW_SIZE.detailH,
    justifyContent: 'center',
    backgroundColor: '#fff' 
  },
  controlSectionContainer: {
    flexDirection: 'row',
    marginTop: 2,
    width: '100%',
    height: VIEW_SIZE.controlH
  },
  leftButtonStyle: {
    marginRight: 1,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomLeftRadius: VIEW_SIZE.baseMargin
  },
  rightButtonStyle: {
    marginLeft: 1,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomRightRadius: VIEW_SIZE.baseMargin,
  },
  titleTextStyle: {
    fontSize: FONT_SIZE.title,
    fontWeight: '600',
    color: colors.appThemColor
  },
  descriptionTextStyle: {
    marginTop: 4,
    fontSize: FONT_SIZE.des,
    fontWeight: '200',
    color: '#7D7D7D'
  },
  buttonTextStyle: {
    fontSize: FONT_SIZE.button,
    fontWeight: '400',
    color: '#868686'
  },
})

CardView.defaultProps = { 
  detail: {}, 
  onLeftButtonPress: function(items){

  },
  onRightButtonPress: function(items){

  }
};

CardView.propTypes = { 
  detail: PropTypes.object,  
  onLeftButtonPress: PropTypes.func,
  onRightButtonPress: PropTypes.func 
};