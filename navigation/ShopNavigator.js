import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ProductDeatilsScreen from "../screens/shop/ProductDeatilsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrderScreen";
import Colors from "../constants/Colors";
import UserProdectScreen from "../screens/user/UserProdectScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// deafult style for headers
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
// first stack created
const productStack = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="ProductsOverviewScreen"
      component={ProductsOverviewScreen}
      options={{
        title: "All Products",
      }}
    />
    <Stack.Screen
      name="ProductDeatilsScreen"
      component={ProductDeatilsScreen}
      options={({ route }) => ({
        title: route.params.productTitle,
      })}
    />
    <Stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        title: "Your Cart",
      }}
    />
  </Stack.Navigator>
);
//sec stack created
const orderStack = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{
        title: "Your Orders",
      }}
    />
  </Stack.Navigator>
);
// third stack
const AdminStack = () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name="UserProdectScreen"
      component={UserProdectScreen}
      options={{
        title: "Your Products",
      }}
    />
    <Stack.Screen
      name="EditProductScreen"
      component={EditProductScreen}
      options={({ route }) => ({
        title: route.params?.productId ? "Edit Product" : "Add Product",
      })}
    />
  </Stack.Navigator>
);

const DrwaerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      drawerType={"front"}
    >
      <Drawer.Screen
        name="Shop"
        component={productStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={orderStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const ShopNavigator = () => {
  const logginState = useSelector((state) => state.auth.isLoggedin);
  const didTrytoAutoLogin = useSelector(
    (state) => state.auth.didTrytoAutoLogin
  );
  return (
    <NavigationContainer>
      {logginState && <DrwaerNavigator />}
      {!logginState && didTrytoAutoLogin && <AuthStack />}
      {!logginState && !didTrytoAutoLogin && <StartupScreen />}
      {/* {!logginState || didTrytoAutoLogin ? <AuthStack /> : <DrwaerNavigator />} */}
    </NavigationContainer>
  );
};

export default ShopNavigator;
