import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes'

// https://stackoverflow.com/questions/59894919/how-to-overlay-text-on-card-image-in-react-native

function RenderDish(props) {
    const dish = props.dish;

    if (dish) {
        return (
            <Card>
                <Card.Image source={require('../images/alberto.png')}>
                    <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                        <Card.FeaturedTitle style={{ backgroundColor: 'white', color: 'black'}}>{dish.name}</Card.FeaturedTitle>
                    </View>
                    <View style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'red'}}>
                            How new
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }

}
class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
        }
    }
   
    render(){
        const {dishId} = this.props.route.params;
        let dishClicked= this.state.dishes[parseInt(dishId)];
        // let check = JSON.stringify(dishClicked);
        // const checkGot = JSON.stringify(this.props.route.params)
        // return (<Text>{checkGot + 'where dishID=' + dishId +' and got obj' + check} Aca </Text>);
        return (<RenderDish dish={dishClicked} /> ); 
    }
    
}

export default DishDetail;
