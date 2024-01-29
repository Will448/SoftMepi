import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomePrincipal from '../view/WelcomePrincipal';
import LoginPrincipal from '../view/LoginPrincipal';
import DashboardLider from '../view/lider/DashboardLider';
import DashboardOper from '../view/oper/DashboardOper';
import DashboardSup from '../view/sup/DashboardSup';
import CadastroOper from '../view/lider/CadastroOper';

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
                name='DashboardLider'
                component={DashboardLider}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='DashboardOper'
                component={DashboardOper}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
                name='DashboardSup'
                component={DashboardSup}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name='CadastroOper'
                component={CadastroOper}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}