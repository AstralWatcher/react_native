import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { Text, View } from 'react-native';
import DishDetail from './DishDetailComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Menu dishes={this.state.dishes}
                    onPress={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                <Text>Main component 1.1</Text>
            </View>
        );
    }

}

export default Main;


// style={{ flex: 1, justifyContent: "center",  alignItems: "center",backgroundColor: '#FFFFFF' }}