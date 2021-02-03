// https://reactnativeelements.com/docs/listitem/
import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
    }
}

class Menu extends Component {

    render() {
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
                    <ListItem.Chevron color="black" />
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
                    <FlatList style={{ flex: 1, backgroundColor: 'red' }}
                        keyExtractor={keyExtractor}
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
    
                    />
                    <Text>{this.props.selected || 'Nista'}  { /* TODO DELETE */}</Text>
                </React.Fragment>
            );
        }
    }
}

export default connect(mapStateToProps)(Menu);

// (alias) const DISHES: {
//     id: number;
//     name: string;
//     image: string;
//     category: string;
//     label: string;
//     price: string;
//     featured: boolean;
//     description: string;
// }