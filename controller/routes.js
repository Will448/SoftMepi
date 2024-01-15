import {createNativeStackNavigator} from '@react-navigation/native-stack';

import dashboardSup from '../view/sup/dashboardSup.js';
import dashboardLider from '../view/lider/dashboardLider.js';
import dashboardOper from '../view/oper/dashboardOper.js';

const Stack = createNativeStackNavigator();

export default function Routes(){

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="dashboardSup"
                component={dashboardSup}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="dashboardLider"
                component={dashboardLider}
                options={{headerShown: false}}
            />
                        
            <Stack.Screen
                name="dashboardOper"
                component={dashboardOper}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}