import React, {Component} from 'react';
import {View, FlatList, Text } from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

// https://reactnativeelements.com/docs/listitem/

function Menu(props) {

    const renderMenuItem = ({item,index}) => {
        return(
            <ListItem bottomDivider>
                <Avatar source={require('../images/alberto.png')} /> 
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
    return(
            <FlatList style={{flex: 1, backgroundColor:'red'}}
                keyExtractor={keyExtractor}
                data={props.dishes}
                renderItem={renderMenuItem}
                
            />
    );

}

export default Menu;

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