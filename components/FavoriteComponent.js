import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {
    
    render(){
        const navigation = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem bottomDivider
                    onPress={() => navigation.navigate('DishDetail', { dishId: item.id })}
                >
                    <Avatar source={{uri: baseUrl + item.image}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.category}, {item.image} </ListItem.Subtitle>
                        <Text>{item.description}</Text>
                        <ListItem.Chevron />
                    </ListItem.Content >
                </ListItem>
            )
        }
        const keyExtractor = (item, index) => index.toString()
        if(this.props.dishes.isLoading){
            return(
                <Loading/>
            );
        }
        else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        } else {
            return (
                <React.Fragment>
                    <FlatList style={{ flex: 1}}
                        keyExtractor={keyExtractor}
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}
    
                    />
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStateToProps)(Favorites);