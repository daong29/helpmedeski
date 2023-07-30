import NavBar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Ticket from './ticket';
import SignIn from './signin';
import Create from './create';
import Edit from './edit';

function App() {
  return (
    
    <div className="App">
      <header>
  
      <nav >
          <NavBar/>
      </nav>
      
        <Routes>
        <Route path='/edit' element={<Edit/>}/>
        <Route path='/Create' element={<Create/>}/>
        <Route path='/SignIn' element={<NavBar/>}/>
        <Route path='/SignIns' element={<SignIn/>}/>
        <Route path='/SignUps' element={<SignUp/>}/>
          <Route path='/Logout' element={<SignIn/>}/>
          <Route path='/request' element={<Ticket/>}/> 
        </Routes>
        </header>
      </div>

  );
}

export default App;
