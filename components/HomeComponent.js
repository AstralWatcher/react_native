import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Easing, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    }
}

function RenderCard(props) {
    const info = props.info;

    if (props.isLoading) {
        return (
            <Loading />
        )
    } else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    if (info) {
        const subText = (info.designation) ? info.designation : '';

        const textStyle = { backgroundColor: 'white', color: 'black' };
        const textStyleAligment = { flex: 1, alignItems: 'center', justifyContent: 'center' };
        return (
            <Card>
                <Card.Image source={{ uri: info.image }}>
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
        this.animatedValue = new Animated.Value(0);
        this.state = {
            stopAnimation: false
        }
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                useNativeDriver:true,
                easing: Easing.linear
            }
        ).start(() => 
        {
            if(this.state.stopAnimation === false) {
                this.animate();
            }
        }
        )
    }

    _onPressButtonSlider(){
        //TODO needs fixing for stopping animation
        this.animatedValue.stopAnimation();
        this.animatedValue.setValue(0);
        this.setState({
            stopAnimation: !this.state.stopAnimation
        })
        this.animate()
    }

    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [600, 300, 0, -300, -600]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [600, 300, 0, -300, -600]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [600, 300, 0, -300, -600]
        });
        return (
            <ScrollView>
                <View>
                    <Text>Home component</Text>
                    <TouchableHighlight onPress={() => this._onPressButtonSlider} underlayColor="white">
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos1 }] }}>
                                <RenderCard errMess={this.props.dishes.errMess} isLoading={this.props.dishes.isLoading} info={this.props.dishes.dishes.filter(item => item.featured === true)[0]} />
                            </Animated.View>
                            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos2 }] }}>
                                <RenderCard errMess={this.props.promotions.errMess} isLoading={this.props.promotions.isLoading} info={this.props.promotions.promotions.filter(item => item.featured === true)[0]} />
                            </Animated.View>
                            <Animated.View style={{ width: '100%', transform: [{ translateX: xpos3 }] }}>
                                <RenderCard errMess={this.props.leaders.errMess} isLoading={this.props.leaders.isLoading} info={this.props.leaders.leaders.filter(item => item.featured === true)[0]} />
                            </Animated.View>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }


}
export default connect(mapStateToProps)(Home);