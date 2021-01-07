import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { Text, View } from 'react-native';
import DishDetail from './DishDetailComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    MainScreen = ({navigation}) => {
        return(
            <Menu
             selected={this.state.selectedDish}
             dishes={this.state.dishes}
             onPress={(dishId) => {
                this.onDishSelect(dishId);
                navigation.navigate('DishDetails');
             }}
             />
        );
    }

    DishScreen = ({navigation}) => {
        return(
            <DishDetail navigation={navigation} dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        );
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        return (
           <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={this.MainScreen} />
                    <Stack.Screen name="DishDetails" component={this.DishScreen} /> 
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}
//  <View style={{ flex: 1 }}>
export default Main;


const styles = { flex: 1, justifyContent: "center",  alignItems: "center",backgroundColor: '#FFFFFF' }