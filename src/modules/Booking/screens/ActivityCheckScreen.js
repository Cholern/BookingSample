import React, { Component } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native';  

import { colors } from '../../../components';     

const VIEW_SIZE = {
  baseMargin: 10,
  cellH: 80,
  cellHeaderH: 25
};

export default class ActivityCheckScreen extends Component {     

  constructor(props) {
    super(props);  

    this.state = { 
      itemsData: []
    }; 
  }  

  componentDidMount(){
    const {items} = this.props;

    // set item date when did mount
    const todayData = this.getActivityToday(items);
    const thisWeekData = this.getActivityTodayWithThisWeek(items);
    const nextWeekData = this.getActivityTodayWithNextWeek(items);

    this.setState({
      itemsData: [
        {
          title: 'Today',
          data: todayData.length ? todayData : [{id: 'EMPTY'}] // if null will return empty view
        },
        {
          title: 'This Week',
          data: thisWeekData.length ? thisWeekData : [{id: 'EMPTY'}]
        },
        {
          title: 'Next Week',
          data: nextWeekData.length ? nextWeekData : [{id: 'EMPTY'}]
        }
      ]
    }); 
  }

  getActivityToday(items){ 
    // start with midnight and end with tomorrow (midnight)
    const todayDate = new Date(new Date().setHours(0,0,0,0));
    // convert to sec
    const todayTs = todayDate.getTime() / 1000;
    // next with 24 hour
    const tomorrowTs = (todayTs) + (24 * 3600);  
    return items.filter(function(item){  
      return (item.startTime >= todayTs && item.startTime <= tomorrowTs) || (item.endTime >= todayTs && item.endTime <= tomorrowTs);
    }); 
  }

  getActivityTodayWithThisWeek(items){
    const todayDate = new Date(new Date().setHours(0,0,0,0));
    // convert to sec
    const todayTs = todayDate.getTime() / 1000;
    // days is ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekend = 7;
    const dayCount = weekend - todayDate.getDay(); 
    // end timestamp this weeks is days * hour * Sec of hour
    const lastDayTs = todayTs + (dayCount * 24 * 3600);  
    // this result will find the activity that start with today until sunday (midnight)
    return items.filter(function(item){  
      return (item.startTime >= todayTs && item.startTime <= lastDayTs) || (item.endTime >= todayTs && item.endTime <= lastDayTs);
    }); 
  }

  getActivityTodayWithNextWeek(items){
    const todayDate = new Date(new Date().setHours(0,0,0,0));
    // convert to sec
    const todayTs = todayDate.getTime() / 1000;
    // days is ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekend = 7;
    const dayCount = weekend - todayDate.getDay(); 
    // end timestamp this weeks is days * hour * Sec of hour
    const startNextWeekDayTs = todayTs + (dayCount * 24 * 3600); 
    const endNextWeekDayTs = startNextWeekDayTs + (weekend * 24 * 3600); 
    // this result will find the activity that start with last day of this week until next week sunday (midnight)
    return items.filter(function(item){  
      return (item.startTime >= startNextWeekDayTs && item.startTime <= endNextWeekDayTs) || (item.endTime >= startNextWeekDayTs && item.endTime <= endNextWeekDayTs);
    }); 
  } 

  convertTimeToString(title, ts){
    const date = new Date(ts * 1000);
    return `${title} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  }
 
  renderCell(data){  
    const isEmpty = data.item.id === 'EMPTY';
    return( 
      <View style={styles.cellContainer}>
        <Text numberOfLines={1} style={styles.titleTextStyle}>{isEmpty ? "EMPTY" : data.item.title}</Text>
        {!isEmpty ?  
          ( 
            <View style={styles.timeSectionView}>
              <Text numberOfLines={1} style={styles.timeTextStyle}>{this.convertTimeToString('Start',data.item.startTime)}</Text> 
              <Text numberOfLines={1} style={styles.timeTextStyle}>{this.convertTimeToString('End',data.item.startTime)}</Text>
            </View>
          ) : undefined}
        
      </View>
    );
  } 

  render(){  
    const {itemsData} = this.state;
    return (
      <SafeAreaView ref={(c) => this.refView = c} style={styles.container} >    
        <SectionList
          sections={itemsData}
          keyExtractor={(item, index) => item + index}
          renderItem={this.renderCell.bind(this)} 
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerContainer}> 
              <Text style={styles.headerTextStyle}>{title}</Text>
            </View>
          )}
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
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  headerContainer: {
    paddingHorizontal: VIEW_SIZE.baseMargin,
    height: VIEW_SIZE.cellHeaderH,
    width: '100%',
    justifyContent: 'center'
  },
  cellContainer: {
    width: '100%',
    height: VIEW_SIZE.cellH, 
    borderBottomWidth: 1,
    borderColor: colors.appBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.appAdverseColor
  },
  timeSectionView:{
    marginTop: VIEW_SIZE.baseMargin / 2,
  },  
  titleTextStyle: {
    fontSize: 16,
    fontWeight: '400' 
  },
  timeTextStyle: { 
    fontSize: 14,
    fontWeight: '200' 
  },
  headerTextStyle: {
    fontSize: 16,
    color: '#646464',
    fontWeight: '500' 
  } 
});
