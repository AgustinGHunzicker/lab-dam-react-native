import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import Listar from './components/listar';
import Detalle from './components/detalle';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {StoreProvider} from './context/storeContext';
import {Home} from './components/home';
import {ListaCategorias} from './components/listaCategorias';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ListaCompradores from "./components/listaCompradores";
import Shop from "./components/shop";
import IniciarSesion from "./components/iniciarSesion";
import ListaCompras from "./components/listaComprados";

const Stack = createStackNavigator();

export const screens = {
  iniciarSesion: 'Iniciar Sesión',
  listar: 'Listado de Productos',
  detalle: 'Detalle de Producto',
  homepage: 'Página Principal',
  listaCategorias: 'Categorias',
  listaCompradores: 'Compradores',
  listaCompras: 'Compras hechas',
  shop: 'Comprar'
};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <StoreProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator>
            <Stack.Screen name={screens.iniciarSesion} initial={true} component={IniciarSesion} />
            <Stack.Screen name={screens.listaCompradores}  component={ListaCompradores} />
            <Stack.Screen name={screens.listaCompras}  component={ListaCompras} />
            <Stack.Screen name={screens.homepage} options={{headerShown: false}} component={Home} />
            <Stack.Screen name={screens.shop} component={Shop} />
            <Stack.Screen name={screens.listaCategorias}  component={ListaCategorias} />
            <Stack.Screen name={screens.listar} component={Listar} />
            <Stack.Screen name={screens.detalle} component={Detalle} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </ApplicationProvider>
  );
};

export default App;
