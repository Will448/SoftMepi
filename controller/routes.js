import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomePrincipal from '../view/WelcomePrincipal';
import LoginPrincipal from '../view/LoginPrincipal';
import DashboardSup from '../view/sup/DashboardSup';
const Stack = createNativeStackNavigator();

export default function Routes(){

    return(
        <Stack.Navigator>
            <Stack.Screen
                name='WelcomePrincipal'
                component={WelcomePrincipal}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='LoginPrincipal'
                component={LoginPrincipal}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='DashboardSup'
                component={DashboardSup}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}