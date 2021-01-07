import React, {Component} from 'react';
import {View, FlatList, Text } from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';

// https://reactnativeelements.com/docs/listitem/

class Menu extends Component {

    constructor(props){
        super(props);
    }

    render(){
        const renderMenuItem = ({item,index}) => {
            return(
                <ListItem bottomDivider
                onPress = {()=> this.props.onPress(item.id)}
                >
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
            <React.Fragment>
                <FlatList style={{flex: 1, backgroundColor:'red'}}
                    keyExtractor={keyExtractor}
                    data={this.props.dishes}
                    renderItem={renderMenuItem}
                    
                />
                <Text>{this.props.selected || 'Nista'}  { /* TODO DELETE */}</Text>
            </React.Fragment>
        );
    }
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