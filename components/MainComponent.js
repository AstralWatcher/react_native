import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutUsComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';

import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromotions } from '../redux/ActionCreators'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
      };
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

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
const ICON_RESERVATION = 'cutlery';
const ICON_FAVORITES = 'heart';
const ICON_SIZE = 24;

function DishStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={Menu} options={optionsMaker('Menu Stack', { name: ICON_MENU })} />
            <Stack.Screen name="DishDetail" component={DishDetail} options={optionsMaker('Dish Details Stack')} />
        </Stack.Navigator>
    );
}

function HomeStackScreen(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={optionsMaker('Home Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function AboutStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="About" component={AboutUs} options={optionsMaker('About Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function ContactStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Contact" component={ContactUs} options={optionsMaker('Contact Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function ReservationStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Reservation" component={Reservation} options={optionsMaker('Reservation Stack', { name: ICON_MENU })} />
        </Stack.Navigator>
    );
}

function FavoritesStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites" component={Favorites} options={optionsMaker('Favorites Stack', { name: ICON_MENU })} />
            <Stack.Screen name="DishDetail" component={DishDetail} options={optionsMaker('Dish Details Stack')} />
        </Stack.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => {
    return (
        <DrawerContentScrollView {...props} style={stylesDrawer.container} >
            <SafeAreaView style={stylesDrawer.container}>
                <View style={stylesDrawer.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../images/logo.png')} style={stylesDrawer.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={stylesDrawer.drawerHeaderText}>Risto restorant</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

class Main extends Component {

    componentDidMount(){
        this.props.fetchDishes(),
        this.props.fetchComments(),
        this.props.fetchPromotions(),
        this.props.fetchLeaders()
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="HomeNavigator" drawerContent={CustomDrawerContentComponent} drawerStyle={{ backgroundColor: '#D1C4E9' }}>
                    <Drawer.Screen name="HomeNavigator" component={HomeStackScreen}
                        options={{ title: 'Home Drawer', drawerIcon: drawerIconMaker(ICON_HOME) }} />
                    <Drawer.Screen name="DishMenuNavigator" component={DishStackScreen}
                        options={{ title: 'Menu Drawer', drawerIcon: drawerIconMaker(ICON_DISH) }} />
                    <Drawer.Screen name="AboutNavigator" component={AboutStackScreen}
                        options={{ title: 'About Drawer', drawerIcon: drawerIconMaker(ICON_ABOUT) }} />
                    <Drawer.Screen name="ContactNavigator" component={ContactStackScreen}
                        options={{ title: 'Contact Drawer', drawerIcon: drawerIconMaker(ICON_CONTACT, -2) }} />
                    <Drawer.Screen name="ReservationNavigator" component={ReservationStackScreen}
                        options={{ title: 'Reservation Drawer', drawerIcon: drawerIconMaker(ICON_RESERVATION) }} />
                    <Drawer.Screen name="FavoritesNavigator" component={FavoritesStackScreen}
                        options={{ title: 'Favorites Drawer', drawerIcon: drawerIconMaker(ICON_FAVORITES) }} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);



const styles = { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFFFF' }

const styleDrawerIcons = { alignSelf: "center", marginRight: 6, paddingLeft: 2 };

const stylesDrawer = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    }
});

const drawerIconMaker = (name, sizeAdjustment = 0, type = "font-awesome") =>
    ({ color, size, focused }) => <Icon style={styleDrawerIcons} name={name} type={type} size={ICON_SIZE + sizeAdjustment} color={color} />;

