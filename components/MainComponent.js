import React, { Component } from 'react';
import Menu from './MenuComponent';
import { Text, View } from 'react-native';
import DishDetail from './DishDetailComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }


    HomeScreen = ({ route, navigation }) => {
        return (
         <Menu navigation={navigation}/>
        );
      }

    DishScreen = (navigationObject) => {
    return (
        <DishDetail {...navigationObject}/>
    );
    }; // Can also interchange with DishDetails if no other params are passed other to navigationObject


    render() {
        return (
           <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={this.HomeScreen} />
                    <Stack.Screen name="DishDetail" component={this.DishScreen} /> 
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}
//  <View style={{ flex: 1 }}>
export default Main;


const styles = { flex: 1, justifyContent: "center",  alignItems: "center",backgroundColor: '#FFFFFF' }