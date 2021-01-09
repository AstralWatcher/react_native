import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import {DISHES} from '../shared/dishes'
import {PROMOTIONS} from '../shared/promotions'
import {LEADERS} from '../shared/leaders'

function RenderCard(props) {
    const info = props.info;

    if (info) {
        const subText = (info.designation) ? info.designation : '';

        const textStyle = { backgroundColor: 'white', color: 'black' };
        const textStyleAligment = { flex: 1, alignItems: 'center', justifyContent: 'center' };
        return (
            <Card>
                <Card.Image source={require('../images/alberto.png')}>
                    <View style={textStyleAligment}>
                        <Card.FeaturedTitle style={textStyle}>{info.name}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle style={textStyle}>{subText}</Card.FeaturedSubtitle>
                    </View>
                </Card.Image>
                <Text style={{ margin: 10 }}>
                    {info.description}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }

}


class Home extends Component {

    constructor(props) {
        super(props);
        this.state ={
            dishes:DISHES,
            leaders:LEADERS,
            promotions:PROMOTIONS
        }
    }

    render() {
        return (
            <View>
                <Text>Home component</Text>
                <ScrollView>
                    <RenderCard info={this.state.dishes.filter( item => item.featured === true)[0]} />
                    <RenderCard info={this.state.promotions.filter( item => item.featured === true)[0]} />
                    <RenderCard info={this.state.leaders.filter( item => item.featured === true)[0]} />
                </ScrollView>
            </View>
        );
    }


}

export default Home;