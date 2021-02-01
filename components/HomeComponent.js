import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    }
}

function RenderCard(props) {
    const info = props.info;

    if (info) {
        const subText = (info.designation) ? info.designation : '';

        const textStyle = { backgroundColor: 'white', color: 'black' };
        const textStyleAligment = { flex: 1, alignItems: 'center', justifyContent: 'center' };
        return (
            <Card>
                <Card.Image source={ {uri:  info.image}}>
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

    render() {
        return (
            <View>
                <Text>Home component</Text>
                <ScrollView>
                    <RenderCard info={this.props.dishes.dishes.filter( item => item.featured === true)[0]} />
                    <RenderCard info={this.props.promotions.promotions.filter( item => item.featured === true)[0]} />
                    <RenderCard info={this.props.leaders.leaders.filter( item => item.featured === true)[0]} />
                </ScrollView>
            </View>
        );
    }


}
export default connect(mapStateToProps)(Home);