import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text , FlatList, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';


// https://stackoverflow.com/questions/59894919/how-to-overlay-text-on-card-image-in-react-native

function RenderDish(props) {
    const dish = props.dish;

    if (dish) {
        return (
            <Card>
                <Card.Image source={require('../images/alberto.png')}>
                    <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                        <Card.FeaturedTitle style={{ backgroundColor: 'white', color: 'black'}}>{dish.name}</Card.FeaturedTitle>
                    </View>
                    <View style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'red'}}>
                            How new
                        </Text>
                    </View>
                </Card.Image>
                <Icon
                 reverse
                 raised
                 name={props.favorite? 'heart' :'heart-o'}
                 type='font-awesome'
                 color='#f50'
                 onPress={()=> props.favorite ? props.onRemove() : props.onAdd()}
                 />
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }

}

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating}</Text>
                <Text style={{fontSize:12}}>{'-- ' + item.author +', ' + (new Date(item.date)).toISOString().substring(0,10)}</Text>
            </View>
        );
    }
    return(
        <Card>
            <Card.Title>Comments</Card.Title>
            <View>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item=> item.id.toString()}
                />
            </View>
        </Card>
    )
}

class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: [],
        }
    }

    markFavorite(dishId){
        this.setState({ favorites: this.state.favorites.concat(dishId)});
    }

    removeFavorite(dishId){
        var index = this.state.favorites.indexOf(dishId)
        if(index !== 1)
            this.state.favorites.splice(index,1);
        this.setState({favorites: this.state.favorites})
    }
   
    render(){
        const {dishId} = this.props.route.params;
        let dishClicked= this.state.dishes[parseInt(dishId)];
        //TODO fix warrning1 ScrollView overlap with Flatlist
        return (
            <ScrollView>
                <RenderDish dish={dishClicked}
                onAdd={ ()=> this.markFavorite(dishId)}
                onRemove={ () => this.removeFavorite(dishId)}
                favorite={this.state.favorites.some(el => el === dishId)} />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId == dishId)} />
            </ScrollView>
         ); 
    }
    
}

export default DishDetail;
