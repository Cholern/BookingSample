import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'; 
   
import { Api, colors } from '../../../components';    
 
const VIEW_SIZE = { 
  pixPd: 4,
  cellH: 150
};

const MEM_FIX = false; // set ture is avoid memory leak when test
 
export default class ListImageScreen extends Component {  

  constructor(props) {
    super(props);  

    this.state = {
      imageData: []
    };
  }

  componentDidMount(){
    Api
    .get(`https://picsum.photos/v2/list`) 
    .then((responseJson) => {   
      this.setState({imageData: responseJson}); 
    })
    .catch((error) => {    
    })  
  }

  renderListHandle(data, i){ 
    // TODO memory leak, must use rn-fast-image
    return (
      <View key={i} style={styles.cellContainer} >
        <Image
          style={{height: VIEW_SIZE.cellH, aspectRatio: data.width / data.height}}
          source={{uri: MEM_FIX ? 'https://reactnative.dev/img/tiny_logo.png' : data.download_url}}
        />
      </View>
    );
  }
 
  render(){
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        <ScrollView style={{width: '100%'}} >
          <View style={styles.imageCoverView}>
            {this.state.imageData.map(this.renderListHandle.bind(this))}
          </View> 
        </ScrollView>
      </SafeAreaView>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.appBgColor, 
    alignItems: 'center'
  },
  imageCoverView: {  
    paddingHorizontal: VIEW_SIZE.pixPd,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'center' 
  },
  cellContainer: {
    padding: VIEW_SIZE.pixPd / 2 
  } 
});
