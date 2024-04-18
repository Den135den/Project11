import { NavLink, Routes, Route,  } from 'react-router-dom';
import { RouteUser, LinkUser } from '../../Routes/Routes';
import PrivateRoute from '../../Routes/PrivateRoute';
import Home from '../Home/Home';





function MainRouter() {
  return (
    <div>
      <div>
        {LinkUser.map(({ id, to, value }) => (
          <NavLink key={id} to={to}>
            {value}
          </NavLink>
        ))}
      </div>


      <Routes>

        {RouteUser.map(({ id, path, component }) => (
          <Route key={id} path={path} element={component} />
        ))}

        <Route element={<PrivateRoute/>}> 
          <Route path='/home' element={<Home/>}/>
        </Route>

        
      </Routes>
    </div>
  );
}

export default MainRouter;
