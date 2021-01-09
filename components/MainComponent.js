import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const color = '#512DA8';
const WHITE = '#fff'

const stackNavigatorOptions = {
 headerStyle: { backgroundColor: color },
 headerTintColor: WHITE,
 headerTitleStyle: { color: WHITE }
 }

 const menuOptions = {...stackNavigatorOptions,  title: 'Menu Stack'}
 const DishDetailsOptions = {...stackNavigatorOptions, title:"Dish Details Stack"}
 const HomeOptions = {...stackNavigatorOptions, title:"Home Stack"}
 const AboutUsOptions = {...stackNavigatorOptions, title:"About Stack"}
 const ContactUsOptions = {...stackNavigatorOptions, title:"Contact Stack"}

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

function AboutStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutUs} options={AboutUsOptions} />
        </Stack.Navigator>
    );
}

function ContactStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Contact" component={ContactUs} options={ContactUsOptions} />
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
                    <Drawer.Screen name="MenuNavigator" component={DishStackScreen} options={{ title: 'Menu Drawer' }} />
                    <Drawer.Screen name="AboutNavigator" component={AboutStackScreen} options={{ title: 'About Drawer' }} />
                    <Drawer.Screen name="ContactNavigator" component={ContactStackScreen} options={{ title: 'Contact Drawer'}} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

}
export default Main;


const styles = { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }