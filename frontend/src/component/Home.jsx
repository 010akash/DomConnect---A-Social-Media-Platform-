import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Home = ({history}) => {

const nav = useNavigate();
 useEffect(()=>{
    if(localStorage.getItem("userInfo1"))
    {
         nav('/s')
    }
  },[history])

  return (
    <div>
    <div className="jumbotron centered align-items-center">
    <div className="container  ">
    <h1 className="display-3 mt-3 mb-3">DomConnect</h1>
    <a className="btn btn-light btn-lg mr-2" href="/register" role="button">Register</a>
    <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
  </div>
  </div>
</div>
  )
}
export default Home;