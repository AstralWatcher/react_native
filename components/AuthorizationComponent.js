import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { baseUrl } from '../shared/baseUrl';

const Tab = createBottomTabNavigator();

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username });
                    this.setState({ password: userinfo.password });
                    this.setState({ remember: true });
                }
            })
    }

    handleLogin() {
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            )
                .catch((error) => console.log('Could not save user to store ' + error));
        } else {
            SecureStore.deleteItemAsync('userInfo')
                .catch((error) => console.log('Could not delete item from store ' + error));
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Input placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    >
                    </Input>
                    <Input placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    >
                    </Input>
                    <CheckBox
                        title="Remember me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleLogin()}
                            title="Login"
                            color="#512DA8"
                        />
                        <Button
                            style={{ marginBottom: 20 }}
                            onPress={() => this.props.navigation.navigate('Register')}
                            title="Register"
                            color="#512DA8"
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: {width: 400}}
            ], 
            { format: 'png'}
        );
        this.setState({imageUri: processedImage.uri})
        // TODO FINISH upload image to server
    }
 
    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userInfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            );
        }

    }

    getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraPermission.status === 'granted' && libraryPermission.status === 'granted') {
            let captureImage = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (!captureImage.cancelled) {
                this.processImage(captureImage.uri);
            }
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('../images/logo.png')}
                            style={styles.image}
                        ></Image>
                        <Button
                            title="Camera"
                            onPress={() => this.getImageFromCamera()}
                         />
                    </View>
                    <Input placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        secureTextEntry
                    />
                    <Input placeholder="Firstname"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({ firstname: firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input placeholder="Lastname"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(lastname) => this.setState({ lastname: lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(email) => this.setState({ email: email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title="Remember me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            style={{ marginBottom: 20 }}
                            onPress={() => this.handleRegister()}
                            title="Register"
                            color="#512DA8"
                            icon={<Icon
                                name="user-plus"
                                type='font-awesome'
                                size={24}
                                color='white'
                            />}
                        />
                    </View>

                </View>
            </ScrollView>
        );
    }
}


class Authorization extends Component {

    render() {
        return (
            <NavigationContainer independent>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Login') {
                            iconName = focused
                                ? 'sign-in'
                                : 'sign-in';
                        } else if (route.name === 'Register') {
                            iconName = focused ? 'address-card' : 'address-card';
                        }
                        return <Icon name={iconName} type="font-awesome" size={size} color={color} />;
                    },
                })}
                    tabBarOptions={{
                        activeTintColor: 'purple',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Login" component={LoginTab} />
                    <Tab.Screen name="Register" component={RegisterTab} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        alignItems:'center'
    },
    image: {
        marginRight: 10,
        width: 80,
        height: 60,
        backgroundColor:'gray',
    },
    formInput: {
        margin: 0
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default Authorization;