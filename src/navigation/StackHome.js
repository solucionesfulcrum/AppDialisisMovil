import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Profile from '../core/Profile'
import Principal from '../core/Principal'
import Splash from '../screens/splash/Splash'
import AgregarTrat from '../core/AgregarTrat'
import Welcome from '../core/Welcome'
import ApiEnvio from '../resource/ApiRest/ApiEnvio'

const Stack = createStackNavigator();
const forFade =({current})=>({
    cardStyle:{
        opacity: current.progress
    }
});
const StackHome = () =>{
    return(
        <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Splash" 
        screenOptions={{cardStyleInterpolator:forFade,}}>
            <Stack.Screen
            name="Principal"
            component={Principal}
            options={{header: () => null}}
            />
            <Stack.Screen
            name="Profile"
            component={Profile}
            options={{header: () => null}}
            />
            <Stack.Screen
            name="Splash"
            component={Splash}
            options={{header: () => null}}
            />
            <Stack.Screen
            name="AgregarTrat"
            component={AgregarTrat}
            options={{header: () => null}}
            />
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{header: () => null}}
            />
            <Stack.Screen
            name="ApiEnvio"
            component={ApiEnvio}
            options={{header: () => null}}
            />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackHome;

