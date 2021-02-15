import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Modal, TextInput, StyleSheet, Button, TouchableOpacity, Alert, PanResponder } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import { postComment, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { render } from 'react-dom';
import { Rating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

// https://stackoverflow.com/questions/59894919/how-to-overlay-text-on-card-image-in-react-native



class RenderDish extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCommentModal: false,
            rating: 3,
            author: '',
            comment: '',
        }
    }

    toggleModal() {
        this.setState({ showCommentModal: !this.state.showCommentModal });
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
        })
    }

    ratingCompleted(rating) {
        this.setState({ ...this.state, rating: rating });
    }
    submit() {
        this.toggleModal();
        this.props.postComment(this.props.dish.id, this.state.rating, this.state.author, this.state.comment);
    }




    render() {
        const dish = this.props.dish;
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }
    
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                if (recognizeDrag(gestureState))
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {this.props.favorite ? this.props.onRemove() : this.props.onAdd()}},
                        ],
                        { cancelable: false }
                    );
    
                return true;
            }
        })

        if (dish) {
            return (
                <View>
           
                    <Animatable.View animation='fadeInDown' duration={1000} delay={500} {...panResponder.panHandlers}>
                        <Card >
                            <Card.Image source={{ uri: baseUrl + dish.Image }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Card.FeaturedTitle style={{ backgroundColor: 'white', color: 'black' }}>{dish.name}</Card.FeaturedTitle>
                                </View>
                                <View style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'red' }}>
                                        How new
                        </Text>
                                </View>
                            </Card.Image>
                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                <Icon

                                    reverse
                                    raised
                                    name={this.props.favorite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => this.props.favorite ? this.props.onRemove() : this.props.onAdd()}
                                />
                                <Icon
                                    reverse
                                    raised
                                    name='edit'
                                    type='font-awesome'
                                    color={styles.buttons.backgroundColor}
                                    onPress={() => this.toggleModal()}
                                />
                            </View>

                            <Text style={{ margin: 10 }}>
                                {dish.description}
                            </Text>
                        </Card>
                    </Animatable.View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.showCommentModal}
                        onDismiss={() => { this.toggleModal(); this.resetForm() }}
                        onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                    >
                        <View style={{ marginTop: 10 }}>
                            <Rating
                                type='star'
                                startingValue={this.state.rating}
                                ratingCount={5}
                                imageSize={60}
                                showRating
                                onFinishRating={(rating) => this.ratingCompleted(rating)}
                            />
                            <View style={styles.inputFieldContainer}>
                                <Icon name="search" size={styles.iconSize} color="#000" />
                                <TextInput
                                    style={styles.TextInputFieldStyle}
                                    placeholderTextColor='gray'
                                    placeholder="Author"
                                    editable
                                    onChangeText={text => this.setState({ author: text })}
                                    value={this.state.author}
                                />

                            </View>
                            <View style={[styles.inputFieldContainer, { alignItems: 'center' }]}>
                                <Icon name="search" size={styles.iconSize} color="#000" />
                                <TextInput
                                    style={styles.TextInputFieldStyle}
                                    placeholderTextColor='gray'
                                    placeholder="Comment"
                                    multiline
                                    numberOfLines={2}
                                    editable
                                    onChangeText={text => this.setState({ comment: text })}
                                    value={this.state.comment}
                                />
                            </View>

                            <TouchableOpacity onPress={() => this.submit()}>
                                <Text style={styles.buttons}>
                                    Submit
                                </Text>
                            </TouchableOpacity >

                            <TouchableOpacity onPress={() => { this.toggleModal(); this.resetForm() }}>
                                <Text style={[styles.buttons, { backgroundColor: 'gray' }]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity >

                        </View>



                    </Modal>
                </View>

            );
        } else {
            return (<View></View>);
        }
    }

}

function RenderComments(props) {
    const comments = props.comments;
    if (!comments) {
        return (<React.Fragment></React.Fragment>)
    }
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating}</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + (new Date(item.date)).toISOString().substring(0, 10)}</Text>
            </View>
        );
    }
    return (
        <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
            <Card>
                <Card.Title>Comments</Card.Title>
                <View>
                    <FlatList
                        data={comments}
                        renderItem={renderCommentItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Card>
        </Animatable.View>

    )
}

class DishDetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    removeFavorite(dishId) {
        this.props.deleteFavorite(dishId);
    }
    componentDidMount() {
    }
    render() {
        const { dishId } = this.props.route.params;
        let dishClicked = this.props.dishes.dishes[parseInt(dishId)];
        let comments = null;
        if (this.props.comments.comments) {
            comments = this.props.comments.comments.filter((comment) => comment.dishId == dishId)
        }

        //TODO fix warrning1 ScrollView overlap with Flatlist
        return (
            <ScrollView>
                <RenderDish dish={dishClicked}
                    onAdd={() => this.markFavorite(dishId)}
                    postComment={this.props.postComment}
                    onRemove={() => this.removeFavorite(dishId)}
                    favorite={this.props.favorites.some(el => el === dishId)} />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 2,
        marginLeft: 10,
        marginRight: 10
    },
    TextInputFieldStyle: {
        flex: 1,
    },
    iconSize: 30,
    buttons: {
        margin: 10,
        marginTop: 20,
        backgroundColor: '#512DA8',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 35,
        color: 'white',
        borderRadius: 2,
        //Shadow
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,


    }
})
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
