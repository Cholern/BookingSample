import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';  

import { colors } from '../../../components';    

export default class ForrentScreen extends Component {     

  render(){ 
    const {items} = this.props;
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        <Text>Not support now</Text>
      </SafeAreaView>
    );
  }
}  

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    height: '100%',
    backgroundColor: colors.appBgColor,
    justifyContent: 'center',
    alignItems: 'center'
  } 
});
