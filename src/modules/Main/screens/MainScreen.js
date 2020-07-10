import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'; 
  
import * as route from '../../../management/route';   
import { colors } from '../../../components';    
 
const VIEW_SIZE = {
  baseMargin: 10,
  cellH: 50
};
 
export default class MainScreen extends Component {  

  onBookingTestPress(){
    route.ToBookingScreen();
  }

  onListImagePress(){
    route.ToListImageScreen();
  }

  render(){
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        <TouchableOpacity activeOpacity={0.7} style={styles.cellContainer} onPress={() => this.onListImagePress()}>
          <Text style={styles.cellTextStyle}>CSS Test</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.cellContainer} onPress={() => this.onBookingTestPress()} >
          <Text style={styles.cellTextStyle}>Booking Test</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.appBgColor,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  cellContainer: {
    paddingHorizontal: VIEW_SIZE.baseMargin,
    width: '100%',
    height: VIEW_SIZE.cellH, 
    borderBottomWidth: 1,
    borderColor: colors.appBgColor,
    justifyContent: 'center',
    backgroundColor: colors.appAdverseColor
  }, 
  cellTextStyle: {  
    color: '#000',
    fontSize: 16,
    fontWeight: '200'
  } 
});
