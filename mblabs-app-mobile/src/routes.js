import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from  '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Importando telas
 */
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import SignInOrOut from './pages/SignInOrOut';
import Search from './pages/Search';
import Settings from './pages/Settings';
import ShoppingCart from './pages/ShoppingCart';
import Filter from './pages/Filter';
import Account from './pages/Account';

const HomeStack = createStackNavigator();
const EventDetailsStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FilterStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle: { backgroundColor: '#f0f5f5' }
            }}
        >
            <HomeStack.Screen name="Home" component={ Home } />
            <HomeStack.Screen name="DetalhesEvento" component={ EventDetails } />
        </HomeStack.Navigator>
    );
}

function EventDetailsStackScreen(){
    return (
        <EventDetailsStack.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle: { backgroundColor: '#f0f5f5' }
            }}
        >
            <EventDetailsStack.Screen name="DetalhesEvento" component={ EventDetails }/>
            <EventDetailsStack.Screen name="Home" component={ EventDetails }/>
            <EventDetailsStack.Screen name="Carrinho" component={ ShoppingCart }/>
        </EventDetailsStack.Navigator>
    );
}

function SearchStackScreen(){
    return (
        <SearchStack.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle: { backgroundColor: '#f0f5f5' }
            }}
        >
            <SearchStack.Screen name="Busca" component={ Search }/>
            <SearchStack.Screen name="Filtro" component={ Filter }/>
            <SearchStack.Screen name="DetalhesEvento" component={ EventDetails }/>
        </SearchStack.Navigator>
    );
}

function FilterStackScreen(){
    return (
        <FilterStack.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle: { backgroundColor: '#f0f5f5' }
            }}
        >
            <FilterStack.Screen name="Filtro" component={ Filter }/>
            <FilterStack.Screen name="Busca" component={ Search }/>
        </FilterStack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

function AppBottomTabStack() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch(route.name) {
                    case 'Home':
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                        break;
                    case 'Busca':
                        iconName = focused
                            ? 'feature-search'
                            : 'feature-search-outline';
                        break;
                    case 'Carrinho':
                        iconName = focused
                            ? 'cart'
                            : 'cart-outline';
                        break;
                    case 'Perfil':
                        iconName = focused
                            ? 'account'
                            : 'account-outline';
                        break;
                    case 'Ajustes':
                        iconName = focused
                            ? 'settings'
                            : 'settings-outline';
                        break;
              }
  
              return <MaterialCommunityIcons name={ iconName } size={ size } color={ '#F0F5F5' } />;
            }})}
            initialRouteName="Home"
            activeColor="#F0F5F5"
            inactiveColor="#AAA"
            barStyle={{ backgroundColor: '#8370AD' }}

        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Busca" component={SearchStackScreen} />
            <Tab.Screen name="Carrinho" component={ShoppingCart} />
            <Tab.Screen name="Perfil" component={SignInOrOut} />
            <Tab.Screen name="Ajustes" component={Settings} />
            { () => (EventDetailsStackScreen) }
            { () => (FilterStackScreen) }
        </Tab.Navigator>
    );
}

const Routes = () => {
    return (
        <NavigationContainer>
            <AppBottomTabStack />
        </NavigationContainer>
    );
};

export default Routes;