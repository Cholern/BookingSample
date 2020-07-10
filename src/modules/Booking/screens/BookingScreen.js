import React, { Component } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';  
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';

import { colors } from '../../../components';     
import CardView from '../elements/CardView';  
 
export default class BookingScreen extends Component {   
  constructor(props) {
    super(props);  

    const rooms = require('../data/booking.json'); 
    this.state = { 
      rooms
    }; 
  }  

  groupByRoomId(rooms){   
    return _.chain(rooms).groupBy('roomId').map(item => {    
      const newItem = item.map(function(e){
        // convert to current timezone
        return {...e, 
          startTime: new Date(e.startTime.split('-').join('/')).getTime() / 1000, 
          endTime: new Date(e.endTime.split('-').join('/')).getTime() / 1000
        };
      });
       
      return {
        roomId: item[0].roomId,
        list: newItem,
        size: item.length 
      }
    }).value();   
  }   

  onItemRent(detail){
    // to function that accept room,
    Navigation.push(this.props.componentId,{
      component: {
        name: 'ForrentScreen',
        passProps: {
          items: detail.list,

        },
        options: {
           topBar: {   
            title: {
              text: detail.roomId
            }
          } 
        }
      }
    });
  }

  onItemMore(detail){
    // to function that return all current bookings that occur today, week and next week
    Navigation.push(this.props.componentId,{
      component: {
        name: 'ActivityCheckScreen',
        passProps: {
          items: detail.list,

        },
        options: {
           topBar: {   
            title: {
              text: detail.roomId
            }
          } 
        }
      }
    });
  }

  renderListHandle(data){
    return <CardView detail={data.item} onLeftButtonPress={this.onItemRent.bind(this)} onRightButtonPress={this.onItemMore.bind(this)} />;
  }

  render(){
    const {rooms} = this.state;
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        <FlatList 
          style={styles.listContainer}
          ref={c => this.flatlist = c}
          data={this.groupByRoomId(rooms)}
          keyExtractor={(item, index) => `flatlist${index}`}  
          renderItem={this.renderListHandle.bind(this)} 
          ListHeaderComponent={() => <View/>} 
          removeClippedSubviews={true}    
          bounces={false} 
        />   
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
  },
  listContainer: {
    width: '94%'
  }  
});
