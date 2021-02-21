import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class ContactUs extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@balas.rs'],
            subject: 'Enquiry',
            body: 'To whom it may concern,\n'
        });
    }

    render() {
        const info = ['Our Address 121', 'Clear Water Bay Road', 'Clear Water Bay Kowloon', 'HONG KONG', 'Tel: +852 1234 5678', 'Fax: +852 8765 4321', 'Email:confusion@food.net'];

        const render = info.map((info, index) => <React.Fragment key={index}>{info + '\n'}</React.Fragment>);

        return (
            <View>
                <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
                    <Card>
                        <Card.Title>Contact Information</Card.Title>
                        <Card.Divider />
                        <Text>{render}</Text>
                        <Button
                            title=' Send Email'
                            buttonStyle ={{backgroundColor: '#512DA8'}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white'/>}
                            onPress={()=>this.sendMail()}
                         />
                    </Card>
                </Animatable.View>
            </View>
        );
    }

}

export default ContactUs;
