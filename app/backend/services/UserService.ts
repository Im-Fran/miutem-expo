/*
Create the 'useAuth' method that returns:
{
isLoggedIn: boolean,
user: User,
}

To get the data:
isLoggedIn: use the async AuthService.isValidToken() boolean function.
user: use the secureStore.getItem('user'), will return a string or null. Later with json parse the string to get the data and create a new User object.

The returned data must be isLoggedIn: boolean and user: User, not functions.
 */

import AuthService from "./AuthService";
import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import {useState} from "react";
const secureStore = createSecureStore()

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [user, setUser] = useState('{}')

    const checkToken = async () => {
        const user = await secureStore.getItem('user')
        setUser(user || '{}')
        AuthService.hasValidToken().then(setIsLoggedIn)
    }

    checkToken().then()

    return [isLoggedIn, user];
}