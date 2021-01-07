import React, {Component} from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import {Text} from 'react-native';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
        }
    }
    render(){
        return(
            <React.Fragment>
                <Menu dishes={this.state.dishes}/>
                <Text>Main component 1.1</Text>
            </React.Fragment>
        );
    }

}

export default Main;


// style={{ flex: 1, justifyContent: "center",  alignItems: "center",backgroundColor: '#FFFFFF' }}