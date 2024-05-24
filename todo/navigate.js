import React, { useEffect, useState } from 'react';
import { Profile } from './src/pages/Profile';
import { Search } from './src/pages/Search';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { gStyle } from "./src/styles/style";
import { Footer } from "./src/components/Footer";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import ChangePassword from "./src/pages/ChangePassword";
import {View} from "react-native";
import {Mynew} from "./src/pages/Mynew";

const Stack = createStackNavigator();

export default function Navigate() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = (signedIn) => {
        setIsSignedIn(signedIn);
    };

    useEffect(() => {
    }, [isSignedIn])

    return (
            <NavigationContainer>
                <Stack.Navigator>
                    {isSignedIn ? (
                        <>
                            <Stack.Screen
                                name={"Profile"}
                                // component={Profile}
                                options={{
                                    title: 'Profile',
                                    headerStyle: gStyle.headerStyle,
                                    headerTitleStyle: gStyle.headerTitleStyle,
                                }}
                            >
                                {props => <Profile {...props} onSignIn={handleSignIn} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name={"Mynew"}
                                component={Mynew}
                                options={{
                                    title: 'Mynew',
                                    headerStyle: gStyle.headerStyle,
                                    headerTitleStyle: gStyle.headerTitleStyle,
                                }}
                            />
                            <Stack.Screen
                                name={"Search"}
                                component={Search}
                                options={{
                                    headerStyle: gStyle.headerStyle,
                                    headerTitleStyle: gStyle.headerTitleStyle,
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                            >
                                {props => <Login {...props} onSignIn={handleSignIn} />}
                            </Stack.Screen>
                            <Stack.Screen
                                name={"Registration"}
                                component={Register}
                                options={{
                                    headerStyle: gStyle.headerStyle,
                                    headerTitleStyle: gStyle.headerTitleStyle,
                                }}
                            />
                            <Stack.Screen
                                name={"ChangePassword"}
                                component={ChangePassword}
                                options={{
                                    headerStyle: gStyle.headerStyle,
                                    headerTitleStyle: gStyle.headerTitleStyle,
                                }}
                            />
                        </>
                    )}
                </Stack.Navigator>
                {isSignedIn ? (<Footer />) : (<></>)}
            </NavigationContainer>
    );
}
