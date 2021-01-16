import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';

import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const color = '#512DA8';
const WHITE = '#fff'

const stackNavigatorOptions = {
    headerStyle: { backgroundColor: color },
    headerTintColor: WHITE,
    headerTitleStyle: { color: WHITE }
}

const optionsMaker = (title, iconOptions) => ({ navigation, route }) => {
    let options = {
        ...stackNavigatorOptions,
        title: title,
    }
    if (iconOptions) {
        iconOptions.size = typeof iconOptions.size === undefined ? ICON_SIZE : iconOptions.size;
        options = {
            ...options,
            headerLeftContainerStyle: { marginLeft: 15 },
            headerLeft: () => <Icon name={iconOptions.name} type={iconOptions.type} size={iconOptions.size} color="white" onPress={() => navigation.toggleDrawer()} />
        };
    }
    return options;
};

const ICON_MENU = 'menu';
const ICON_HOME = 'home';
const ICON_ABOUT = 'info-circle';
const ICON_CONTACT = 'address-card';
const ICON_DISH = 'list';
const ICON_SIZE = 24;

function DishStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={optionsMaker('Menu Stack', { name: ICON_MENU })} />
            <Stack.Screen name="DishDetail" component={DishDetail} options={optionsMaker('Dish Details Stack')} />
        </Stack.Navigator>
    );
}

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={optionsMaker('Home Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function AboutStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutUs} options={optionsMaker('Home Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function ContactStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Contact" component={ContactUs} options={optionsMaker('Home Stack', { name: ICON_MENU })} />
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
                <Drawer.Navigator initialRouteName="HomeNavigator" drawerStyle={{ backgroundColor: '#D1C4E9' }}>
                    <Drawer.Screen name="HomeNavigator" component={HomeStackScreen}
                        options={{ title: 'Home Drawer', drawerIcon: drawerIconMaker(ICON_HOME) }} />
                    <Drawer.Screen name="DishMenuNavigator" component={DishStackScreen}
                        options={{ title: 'Menu Drawer', drawerIcon: drawerIconMaker(ICON_DISH) }} />
                    <Drawer.Screen name="AboutNavigator" component={AboutStackScreen}
                        options={{ title: 'About Drawer', drawerIcon: drawerIconMaker(ICON_ABOUT) }} />
                    <Drawer.Screen name="ContactNavigator" component={ContactStackScreen}
                        options={{ title: 'Contact Drawer', drawerIcon: drawerIconMaker(ICON_CONTACT,-2) }} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

}
export default Main;


const styles = { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }

const styleDrawerIcons = { alignSelf: "center", marginRight: 6, paddingLeft: 2 };

const drawerIconMaker = (name, sizeAdjustment=0, type="font-awesome") =>
 ({ color, size, focused }) => <Icon style={styleDrawerIcons} name={name} type={type} size={ICON_SIZE + sizeAdjustment} color={color} />;

