import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Modal, Button, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker'; // TODO Fix Component https://github.com/xgfe/react-native-datepicker/issues/355 change for @react-native-community/datetimepicker
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        };
    },
});


const getDefaultCalendarSource = async () => {
    //TODO TEST, Not tested on IOS, just coppied from docs
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendars = calendars.filter(each => each.source.name === 'ConFusion');
    return defaultCalendars[0].source;
}

const getConFusionCalendarSource = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    const calendar = calendars.find(({name})=> name === 'ConFusion');
    return calendar;
}

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        }
    }

    static navigationOptions = {
        title: "Reserve Table",
    }
    
    createCalendar = async () => {
        let defaultCalendarSource = Platform.OS === 'ios' ? (await getDefaultCalendarSource()) : (await getConFusionCalendarSource());

        const startDateTime = new Date(Date.parse(this.state.date));
        const difference = 2*60*60*1000; // 2 hours
        const endDateTime = new Date(startDateTime.getTime() + difference);

        if(!defaultCalendarSource) {
            const newValues = { isLocalAccount: true, name: 'ConFusion' }

            defaultCalendarSource = await Calendar.createCalendarAsync({
                title: 'ConFusion',
                color: '#512DA8',
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: newValues.id,
                source: newValues,
                name: 'ConFusion',
                ownerAccount: 'personal',
                isVisible: true,
                isPrimary: false,
                isSynced: false,
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
                });
        }
        if(defaultCalendarSource){
            const event = await Calendar.createEventAsync(
                defaultCalendarSource.id,
                {
                    title: 'Con Fusion Table Reservation',
                    startDate: startDateTime,
                    endDate: endDateTime,
                    timeZone: 'Asia/Hong_Kong',
                    location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
                },
            );
        }
    }

    obtainCalendarPermission = async () => {
        const calendarPermission = await Calendar.requestCalendarPermissionsAsync();
        if (calendarPermission.status === 'granted') {
            this.createCalendar();
        }
    }

    handleReservation() {
        var message = `Number of guests:${this.state.guests}\nSmoking:${this.state.smoking}\nDate and time:${JSON.stringify(this.state.date)}`;
        Alert.alert('Your reservation', message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { this.resetForm() }
                },
                {
                    text: 'Ok',
                    style: 'default',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.obtainCalendarPermission();
                        this.resetForm();
                    }
                }
            ]
        )
        this.toggleModal(); // For modal that is not used
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show for alert');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        if(!date){
            return;
        }
        var notification = await this.obtainNotificationPermission();
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'I am one, hasty notification',
                body: 'Reservation for ' + date + 'requested',
                data: 'Reservation for ' + date + 'requested',
            },
            trigger: null
        })
    }

    render() {
        return (

            <ScrollView>
                <Animatable.View duration={1000} animation="zoomIn">
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of guests:</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1'></Picker.Item>
                            <Picker.Item label='2' value='2'></Picker.Item>
                            <Picker.Item label='3' value='3'></Picker.Item>
                            <Picker.Item label='4' value='4'></Picker.Item>
                            <Picker.Item label='5' value='5'></Picker.Item>
                            <Picker.Item label='6' value='6'></Picker.Item>
                        </Picker>
                    </View>


                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}
                        />
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and time</Text>

                        <DatePicker
                            useNativeDriver="true"
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            onDateChange={(date) => { this.setState({ date: date }) }}

                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                        >
                        </DatePicker>
                    </View>
                </Animatable.View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Reserve button for this restoront'
                    />
                </View>


            </ScrollView>

        );
    }

}

/* // Modal that was shown after clicking reservation
<Modal
    animationType="slide"
    transparent={false}
    visible={this.state.showModal}
    onDismiss={() => { this.toggleModal(); this.resetForm() }}
    onRequestClose={() => { this.toggleModal(); this.resetForm() }}
>
    <View style={styles.modal}>
        <Text style={styles.modalTitle}>Your Reservation</Text>
        <Text style={styles.modalText}>Number of guests: {this.state.guests}</Text>
        <Text style={styles.modalText}>Smoking: {this.state.smoking ? 'Yes' : 'No'}</Text>
        <Text style={styles.modalText}>Date and Time: {JSON.stringify(this.state.date)}</Text>
        <Button title='Close' onPress={() => { this.toggleModal(); this.resetForm() }}></Button>
    </View>

</Modal>
*/

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,

    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;