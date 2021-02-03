import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem, Card } from 'react-native-elements';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

import {Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        leaders: state.leaders
    }
}

function History() {
    const info = "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";

    return(
        <Card>
            <Card.Title>Our history</Card.Title>
            <Card.Divider />
            <Text style={{margin:10}}>{'' + info}</Text>
        </Card>
    )
}

class AboutUs extends Component {

    render() {
  
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem key={index.toString()} bottomDivider>
                    <Avatar source={{uri: baseUrl + item.image }} />
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight:'bold'}}>{item.name}</ListItem.Title>
                        <Text>{item.description}</Text>
                    </ListItem.Content >
                </ListItem>
            );
        }
        const leaders = this.props.leaders.leaders.map((item,index) => {
            return renderMenuItem({item,index});
        });

        if(this.props.leaders.isLoading){
            return(
                <ScrollView>
                    <History />
                    <Card>
                        <Card.Title>Corporate Leadearship</Card.Title>
                        <Loading/>
                    </Card>
                </ScrollView>
            )
        }
        else if(this.props.leaders.errMess) {
            <ScrollView>
                <History />
                <Card>
                    <Card.Title>Corporate Leadearship</Card.Title>
                    <Text>{this.props.leaders.errMess}</Text>
                </Card>
        </ScrollView>
        }

        return (
            <ScrollView>
                <View>
                    <History />                    
                    <Card>
                        <Card.Title>Corporate leadership</Card.Title>
                        <Card.Divider/>
                        {leaders}
                                
                    </Card>
                </View>
            </ScrollView>
        );
    }

}

export default connect(mapStateToProps)(AboutUs);
