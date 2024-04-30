 import React, { useState,useEffect } from 'react'
 import axios from 'axios'
 import {Link} from 'react-router-dom'


 const Register = () => {
    
    const [show , setShow] = useState(false);
    const [userId, setUserId] = useState('');
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
        age: '',
        weight: '',
        height: '',
        lifestyle: '',
        targetWeight: '',
        gender:'',
        username: '',
        email:'',
        password: '',
        weightLossRate:'',
        weightGainRate: ''
    });


        
        const decodeToken = () => {
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const decoded = JSON.parse(atob(token.split('.')[1]));
              console.log('Decoded token:', decoded);
              if (decoded && decoded.userId) {
                setUserId(decoded.userId);
              } else {
                console.error('Error: Decoded token does not contain user information');
              }
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          } else {
            console.error('Token not found in local storage');
          }
        };
    
        

      const sendDataToBackend = async () => {
        try {
          const backendUrl = `http://localhost:5000/api/v1/${userId}`; 
    
          const response = await axios.post(backendUrl, { userId });
    
          console.log('Calculation result saved successfully:', response.data);
          
        } catch (error) {
          console.error('Error while sending POST request:', error);
          
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        setStep(prevStep => prevStep + 1); 
    }


    const handleSubmit2 = async (e) =>{
        e.preventDefault()
        
        try {
            const {username, email, password, age, height, weight, targetWeight,gender,lifestyle,weightLossRate,weightGainRate} = userData
            const response = await axios.post('http://localhost:5000/api/v1/register',{username, email, password, age, height, weight, targetWeight,gender,lifestyle,weightLossRate,weightGainRate})
            localStorage.setItem('token', response.data.token);
            decodeToken();
            setShow(true);
            
        } catch (error) {
            console.error('Sign Up error:', error.response.data);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit3 = async() => {
        try {
            await sendDataToBackend();
            window.location.href="/dashboard"
            
        } catch (error) {
            console.error('Cannot reach dashboard:', error);
        }
    }

    

    const renderFormFields = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <label>Age:</label>
                        <input type="number" name="age" id="age" value={userData.age} onChange={handleChange} />

                        <fieldset>
                            <legend>Gender:</legend>
                            <label>
                                <input type="radio" name="gender" value="male" checked={userData.gender === 'male'} onChange={handleChange} />
                                 male
                            </label>
                            <label>
                                <input type="radio" name="gender" value="female" checked={userData.gender === 'female'} onChange={handleChange} />
                                 female
                            </label>
                        </fieldset>

                        <label>Weight (in Kg):</label>
                        <input type="number" name="weight" id="weight" value={userData.weight} onChange={handleChange} />
                        <label>Target Weight (in kg):</label>
                        <input type="number" name="targetWeight" id="targetWeight" value={userData.targetWeight} onChange={handleChange} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <label>Height (in cm):</label>
                        <input type="number" name="height" id="height" value={userData.height} onChange={handleChange} />

                        <fieldset>
                            <legend>Lifestyle:</legend>
                            <label>
                                <input type="radio" name="lifestyle" value="sedentary" checked={userData.lifestyle === 'sedentary'} onChange={handleChange} />
                                Sedentary
                            </label>
                            <label>
                                <input type="radio" name="lifestyle" value="lightlyactive" checked={userData.lifestyle === 'lightlyactive'} onChange={handleChange} />
                                Lightly Active
                            </label>
                            <label>
                                <input type="radio" name="lifestyle" value="moderatelyactive" checked={userData.lifestyle === 'moderatelyactive'} onChange={handleChange} />
                                Moderately Active
                            </label>
                            <label>
                                <input type="radio" name="lifestyle" value="veryactive" checked={userData.lifestyle === 'veryactive'} onChange={handleChange} />
                                Very Active
                            </label>
                            <label>
                                <input type="radio" name="lifestyle" value="extremelyactive" checked={userData.lifestyle === 'extremelyactive'} onChange={handleChange} />
                                Extremely Active
                            </label>
                        </fieldset>
                        
                         {userData.weight > userData.targetWeight ? (
                            <fieldset>
                                <legend>Weight Loss</legend>
                                <label>
                                    <input type="radio" name='weightLossRate' value={0.25} checked={userData.weightLossRate === '0.25'} onChange={handleChange}/>
                                    0.25 Kg/week
                                </label>
                                <label>
                                    <input type="radio" name='weightLossRate' value={0.5} checked={userData.weightLossRate === '0.5'} onChange={handleChange}/>
                                    0.5 Kg/week
                                </label>
                                <label>
                                    <input type="radio" name='weightLossRate' value={1} checked={userData.weightLossRate === '1'} onChange={handleChange}/>
                                    1 Kg/week
                                </label>
                            </fieldset>
                         ): (<fieldset>
                            <legend>Weight Gain</legend>
                                <label>
                                    <input type="radio" name='weightGainRate' value={0.25} checked={userData.weightGainRate === '0.25'} onChange={handleChange}/>
                                    0.25 Kg/week
                                </label>
                                <label>
                                    <input type="radio" name='weightGainRate' value={0.5} checked={userData.weightGainRate === '0.5'} onChange={handleChange}/>
                                    0.5 Kg/week
                                </label>
                                <label>
                                    <input type="radio" name='weightGainRate' value={1} checked={userData.weightGainRate === '1'} onChange={handleChange}/>
                                    1 Kg/week
                                </label>
                         </fieldset>)} 
                            
                    </div>

                    
                );
            case 3:
                return (
        <div>
        
        <div>
        <label>Username</label>
            <input
                name="username" 
                type='text'
                value={userData.username}
                onChange = {handleChange}
            />
        </div>
                  
        <div>
        <label>Email</label>
            <input 
                name="email" 
                type='text'
                value={userData.email}
                onChange = {handleChange}
            />
        </div>
                  
        <div>
        <label>Password</label>
            <input 
                name="password" 
                type='password'
                value={userData.password}
                onChange = {handleChange}
            />
        </div>
            <button onClick={handleSubmit2}>Submit</button>
            {show && <button onClick={handleSubmit3}>Go to Dashboard</button>}
            <br/>
            <p>Already a User</p>
            <Link to='/login'>Login</Link>
        </div>
    );
        default:
        return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Step {step}</h2>
            {renderFormFields()}
            {step<3 && <button type="submit">Next</button>}
        </form>
    );

 }

 export default Register