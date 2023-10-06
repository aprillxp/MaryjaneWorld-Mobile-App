import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import About from "../screens/About";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "./MainStack";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MainStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name="information-circle" size={24} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
