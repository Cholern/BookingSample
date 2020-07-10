import { Navigation } from 'react-native-navigation'
// import { Platform } from 'react-native'; 
 
import { colors } from '../components';    
 

export const ToBookingScreen = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'BookingScreen',
                        options: {
                            statusBar: {
                                visible: true,
                                style: 'dark',
                                drawBehind: false,
                                backgroundColor:  Platform.OS === 'android' ? '#ffffff' : null
                            },
                            topBar:{
                                visible: true,
                                drawBehind: false,
                                title: {
                                    text: 'Booking'
                                }
                            }
                        }
                    }
                }] 
            }
        }
    });  
}

export const ToListImageScreen = () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'ListImageScreen',
                        options: {
                            layout: {
                                orientation: ['landscape']
                            },
                            statusBar: {
                                visible: true,
                                style: 'dark',
                                drawBehind: false,
                                backgroundColor:  Platform.OS === 'android' ? '#ffffff' : null
                            },
                            topBar:{
                                visible: true,
                                drawBehind: false,
                                title: {
                                    text: 'Image fetch'
                                }
                            }
                        }
                    }
                }] 
            }
        }
    });  
}
 
 

 