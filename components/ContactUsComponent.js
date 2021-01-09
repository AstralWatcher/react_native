import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

class ContactUs extends Component {


    render() {
        const info = ['Our Address 121', 'Clear Water Bay Road', 'Clear Water Bay Kowloon', 'HONG KONG', 'Tel: +852 1234 5678', 'Fax: +852 8765 4321', 'Email:confusion@food.net'];

        const render = info.map((info) => <React.Fragment>{info + '\n'}</React.Fragment>);

        return (
            <View>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text>{render}</Text>
                </Card>
            </View>
        );
    }

}

export default ContactUs;
