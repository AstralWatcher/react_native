import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Switch, Modal, Button} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker'; // TODO Fix Component https://github.com/xgfe/react-native-datepicker/issues/355 change for @react-native-community/datetimepicker


class Reservation extends Component {
    constructor(props){
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

    handleReservation() {
        console.log(JSON.stringify(this.state))
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    resetForm(){
        this.setState ({
            guests: 1,
            smoking: false,
            date: new Date(),
        });
    }
    render(){
        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of guests:</Text>
                    <Picker
                     style={styles.formItem}
                     selectedValue={this.state.guests}    
                     onValueChange={(itemValue,itemIndex) => this.setState({guests: itemValue})}
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
                        onValueChange= {(value) => this.setState({smoking: value})}
                    />
                </View>

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and time</Text>
                    
                    <DatePicker
                        useNativeDriver="true"
                        style={{flex:2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        placeholder='Select date and time'
                        minDate='2017-01-01'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        onDateChange ={(date) => {this.setState({date:date}) }}

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
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress= {()=> this.handleReservation()}
                        accessibilityLabel='Reserve button for this restoront'
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={()=> {this.toggleModal(); this.resetForm()}}
                    onRequestClose={()=> {this.toggleModal(); this.resetForm()}}
                >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your Reservation</Text>
                    <Text style={styles.modalText}>Number of guests: {this.state.guests}</Text>
                    <Text style={styles.modalText}>Smoking: {this.state.smoking? 'Yes':'No'}</Text>
                    <Text style={styles.modalText}>Date and Time: {JSON.stringify(this.state.date)}</Text>
                    <Button title='Close' onPress={()=> {this.toggleModal(); this.resetForm()}}></Button>
                </View>

                </Modal>
            </ScrollView>
          
        );
    }

}

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
        flex:2
    },
    formItem: {
        flex:1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign:'center',
        color:'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin:10
    }
});

export default Reservation;