import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import "./styles.css"

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginstatus, setLoginstatus] = useState("");
    const [logindata, setLogindata] = useState([]);
    const [alldata, setAlldata] = useState([]);

    const Login =()=>{
        Axios.post("http://localhost:8000/login",{
          email: email,
          password: password
        }).then((response)=>{
          if (response.data.message) {
              setLoginstatus(response.data.message)
          }
          else {
              console.log(response.data.data[0])
            setLoginstatus(response.data.data[0])
            setLogindata(response.data.data[0].role)
          }
        });
        
    }

useEffect(()=>{
    if(logindata==="ADMIN"){
        Axios.get('http://localhost:8000/')
        .then(response => setAlldata(response.data.data));
    }
},[logindata]);

  return (
      <React.Fragment>
        {!loginstatus ? 
        
        <div id="login">   
            <label>Email</label>   
            <input type="text" placeholder="Enter Email" name="email" required onChange={(e)=>{setEmail(e.target.value);}} autoComplete="off"/>  
            <label>Password</label>   
            <input type="password" placeholder="Enter Password" name="password" required onChange={(e)=>{setPassword(e.target.value);}}/>  
            <button type="submit" onClick={Login}>Submit</button>   
        </div> :"" }
        {logindata==="EMPLOYEE" ? 
        <div id="profile">
          <h1>Profile</h1>
        {Object.keys(loginstatus).filter(value => {return value === "name" || value === "email" || value === "role"}).map((keyName, i) => (
        <li key={i}>
        <span>{["Name","Email","Role"][i]}:</span><span>{loginstatus[keyName]}</span>
        </li>
       ))}

      </div>: null}
       { logindata==="ADMIN" ?
      <div><table>
          <tr><th>Name</th><th>Email</th><th>Role</th></tr>
                {alldata.map((value, key) => (
                  <tr key={key}>
                    <td >{value.name}</td>
                    <td >{value.email}</td>
                    <td >{value.role}</td>
                  </tr>
                ))}
           </table>
        </div> :""}
      </React.Fragment>   
  )
}