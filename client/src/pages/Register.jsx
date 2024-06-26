import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Register = () => {
 
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

   const handleSubmit = (e) => {
       e.preventDefault()
       setStep(prevStep => prevStep + 1); 
   }


   const handleSubmit2 = async(e) =>{
       e.preventDefault()
       
       const {username, email, password, age, height, weight, targetWeight,gender,lifestyle,weightLossRate,weightGainRate} = userData
       await axios.post('http://localhost:3000/api/register',{username, email, password, age, height, weight, targetWeight,gender,lifestyle,weightLossRate,weightGainRate})
       .then(window.location.href='/login')    
       .catch(err => console.log(err))
   }

   const handleChange = (e) => {
       const { name, value } = e.target;
       setUserData(prevData => ({
           ...prevData,
           [name]: value
       }));
   };

   

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
                       <label>Target Weight (in Kg):</label>
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
                               <input type="radio" name="lifestyle" value="moderatelyActive" checked={userData.lifestyle === 'moderatelyActive'} onChange={handleChange} />
                               Moderately Active
                           </label>
                           <label>
                               <input type="radio" name="lifestyle" value="veryActive" checked={userData.lifestyle === 'veryActive'} onChange={handleChange} />
                               Very Active
                           </label>
                           <label>
                               <input type="radio" name="lifestyle" value="extremelyActive" checked={userData.lifestyle === 'extremelyActive'} onChange={handleChange} />
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
           <br/>
           <p>Already a User ?</p>
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