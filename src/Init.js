import { Navigation } from 'react-native-navigation'; 
// import { Platform } from 'react-native';   

import colors from './components/config/colors'; 
  
Navigation.registerComponent('MainScreen', () => require('./modules/Main/screens/MainScreen').default);  

Navigation.registerComponent('BookingScreen', () => require('./modules/Booking/screens/BookingScreen').default);  
Navigation.registerComponent('ForrentScreen', () => require('./modules/Booking/screens/ForrentScreen').default);  
Navigation.registerComponent('ActivityCheckScreen', () => require('./modules/Booking/screens/ActivityCheckScreen').default);  

Navigation.registerComponent('ListImageScreen', () => require('./modules/List/screens/ListImageScreen').default);  

Navigation.events().registerAppLaunchedListener(() => {    
    Navigation.setDefaultOptions({
      statusBar: {
        visible: true,
        style: 'dark',
        drawBehind: false, 
        backgroundColor: colors.appAdverseColor
      },
      layout: {
        backgroundColor: 'transparent',
        orientation: ['portrait']  
      },
      topBar: {  
        background: {
          color: colors.appAdverseColor,
        }, 
        title: {
          textFontSize: 16,
          color: colors.appThemColor,
          // fontFamily: 'Kanit-Medium',
          alignment: 'center'
        },   
        largeTitle: {
          visible: false,
          fontSize: 30,
          color: colors.appThemColor,
          // fontFamily: 'Kanit-Medium'
        }, 
        noBorder: true,
        buttonColor: colors.topIcon,
        backButton:{ color: colors.topIcon, title: ""}
      },
      bottomTabs: {
        backgroundColor: colors.appAdverseColor
      },
    // animations: {
    //   push: { 
    //       content: {
    //             x: {
    //               from: 0,
    //               to: 100,
    //               duration: 1000,
    //               interpolation: 'accelerate',
    //             }
    //       }
    //   } 
    // } 
    });   
 

    Navigation.setRoot({
      root: { 
        component: {
          name: 'MainScreen',
          options: {
            topBar:{
                visible: false,
                drawBehind: true
            } 
          }
        } 
      }
    });   

}); 

 
 