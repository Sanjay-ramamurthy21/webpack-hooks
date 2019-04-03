import React , {useState}  from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import Authcontext from './components/auth-context';


const app = props => {
const [page, setPage] = useState('auth');

const [authStatus, setAuthStatus] = useState(false);

const switchPage = pageName => {
   setPage(pageName);
  };

const login = () => {
  setAuthStatus(true);
};

    return (
    <div className="App">
        <Authcontext.Provider value={{status: authStatus, login:login}}>
          <Header
            onLoadTodos={switchPage.bind(this, 'todos')}
            onLoadAuth={switchPage.bind(this, 'auth')}
           />     
              <hr/>
      {page === 'auth' ?  <Auth/> : <Todo/> } 
        </Authcontext.Provider>  
    </div>
    );
  };

export default app;
