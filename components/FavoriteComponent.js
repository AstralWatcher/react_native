import React, { Component } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    render() {
        const navigation = this.props.navigation;



        const renderMenuItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite',
                            "Are you sure you wish to delete favorite dish " + item.name,
                            [
                                { text: 'Cancel', onPress: {}, style: 'cancel' },
                                { text: 'Ok', onPress: () => this.props.deleteFavorite(item.id), style: 'destructive' }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem bottomDivider
                            onPress={() => navigation.navigate('DishDetail', { dishId: item.id })}
                        >
                            <Avatar source={{ uri: baseUrl + item.image }} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.category}, {item.image} </ListItem.Subtitle>
                                <Text>{item.description}</Text>
                                <ListItem.Chevron />
                            </ListItem.Content >
                        </ListItem>
                    </Animatable.View>
                </Swipeout>
            )
        }
        const keyExtractor = (item, index) => index.toString()
        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        } else {
            return (
                <React.Fragment>
                    <FlatList style={{ flex: 1 }}
                        keyExtractor={keyExtractor}
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}

                    />
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);