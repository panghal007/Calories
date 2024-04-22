import React from 'react';
import AddFoodItem from './components/AddFoodItem';
import {UserContextProvider} from "./UserContext";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserCalories from './components/UserCalories';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
const App = () => {
    return (
      <UserContextProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/add' element={<AddFoodItem />}></Route>
          <Route path='/userCalories' element={<UserCalories />}></Route>
          
        </Routes>
        </BrowserRouter>
        </UserContextProvider>
    );
};

export default App;
{/* <AddFoodItem /> */}
{/* <UserCalories /> */}