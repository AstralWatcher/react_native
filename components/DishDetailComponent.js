import React, { Component } from 'react';
import { View, Text , FlatList, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

import {postFavorite} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

// https://stackoverflow.com/questions/59894919/how-to-overlay-text-on-card-image-in-react-native

function RenderDish(props) {
    const dish = props.dish;

    if (dish) {
        return (
            <Card>
                <Card.Image source={{uri: baseUrl + dish.Image}}>
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

    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }

    removeFavorite(dishId){
        //TODO
    }
    componentDidMount() {
    }
    render(){
        const {dishId} = this.props.route.params;
        let dishClicked= this.props.dishes.dishes[parseInt(dishId)];
        //TODO fix warrning1 ScrollView overlap with Flatlist
        return (
            <ScrollView>
                <RenderDish dish={dishClicked}
                onAdd={ ()=> this.markFavorite(dishId)}
                onRemove={ () => this.removeFavorite(dishId)}
                favorite={this.props.favorites.some(el => el === dishId)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId == dishId)} />
            </ScrollView>
         ); 
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
