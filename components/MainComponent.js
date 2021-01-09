import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const color = '#512DA8';
const WHITE = '#fff'

const stackNavigatorOptions = {
 headerStyle: { backgroundColor: color },
 headerTintColor: WHITE,
 headerTitleStyle: { color: WHITE }
 }

 const menuOptions = {...stackNavigatorOptions,  title: 'Menurino'}
 const DishDetailsOptions = {...stackNavigatorOptions, title:"Dish Details"}
 const HomeOptions = {...stackNavigatorOptions, title:"Home Stack"}

function DishStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={menuOptions} />
            <Stack.Screen name="DishDetail" component={DishDetail} options={DishDetailsOptions} />
        </Stack.Navigator>
    );
}

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={HomeOptions} />
        </Stack.Navigator>
    );
}


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerStyle={{backgroundColor:'#D1C4E9'}}>
                    <Drawer.Screen name="HomeNavigator" component={HomeStackScreen} options={{ title: 'Home Drawer' }} />
                    <Drawer.Screen name="MenuNavigator" component={DishStackScreen} options={{ title: 'Home Menu' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

}
export default Main;


const styles = { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }