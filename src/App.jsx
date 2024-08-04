import { useEffect, useState } from 'react'

import { steps } from './data/steps.js'
import { forms } from './data/forms.js'
import { inputs } from './data/inputs.js'

import { getUserInfo, getUserPlan, setUserInfo } from './data/subscription.js'


import Plans from './components/Plans.jsx'
import AddOns from './components/AddOns.jsx'
import Summary from './components/Summary.jsx'
import Finished from './components/Finished.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css';

import "./App.css"



const App = () => {


    useEffect(() => {
        AOS.init({
            duration: 400
        })
    }, [])

    const [stepNumber, setStepNumber] = useState(1)

    const [personalInfo, setPersonalInfo] = useState(getUserInfo());

    const [isEmpty, setIsEmpty] = useState({
        name: false,
        email: false,
        number: false
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));

        setIsEmpty(prevState => ({
            ...prevState,
            [name]: false
        }))
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if(stepNumber === 1) {
            let emptyField = false
            const newEmptyFields = { ...isEmpty };
    
            Object.keys(personalInfo).forEach(key => {
                if(personalInfo[key] === "") {
                    newEmptyFields[key] = true;
    
                    setIsEmpty(newEmptyFields)
                    emptyField = true
                }
            })

            if(emptyField) {
                return;
            }
            else {
                setUserInfo(personalInfo)
            }
        }


        const userPlan = getUserPlan()

        if(stepNumber < 5) {
            if((userPlan.selectedPlan.name === "Default") && (stepNumber === 2)) {
                return;
            }

            setStepNumber(stepNumber + 1);
            return;
        }
    }

    const resetSteps = () => {
        setStepNumber(2)
    }

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main>

            <section className='form_container'>

                <ol className='steps'>

                    {steps.map(step => (
                        <li className='step_container' key={step.number}>

                            <div className={step.number !== stepNumber && !(stepNumber === 5 && step.number === 4) ? "step_number_unselected" : "step_number"}>
                                <p>{step.number}</p>
                            </div>

                            {screenWidth > 1000 && (
                                <div className='step'>
                                    <p>{step.step}</p>
                                    <p>{step.name}</p>
                                </div>
                            )}

                    
                        </li>
                    ))}

                </ol>

                
                <div className='form_content'>
                    
                    {forms.filter(form => form.step === stepNumber).map(filteredForm => (
                        <div className='form_step' key={filteredForm.step}>
                            <h1 className='form_title'>{filteredForm.title}</h1>
                            <p className='form_desc'>{filteredForm.desc}</p>
                        </div>
                    ))}

                    <form method="post" className='form' onSubmit={handleSubmit}>
                        

                        {stepNumber === 1 && ( 
                            <div className='input_map' data-aos="fade-right">
                                {inputs.map(input => (

                                    <div key={input.field} className='input_container'>

                                        <div className='label_error'>
                                            <label htmlFor='input'>{input.field}</label>
                                            {isEmpty[input.name] && <p className="error_message">This field is required</p>}
                                        </div>

                                        <input type={input.type} name={input.name} className={isEmpty[input.name] ? "input_field_error" : "input_field" } 
                                        id='input' onChange={handleInputChange} value={personalInfo[input.name]} aria-label={`Input you ${input.field} here!`}/>
                                    </div>

                                ))}
                            </div>
                        )}

                        {stepNumber === 2 && <Plans />}

                        {stepNumber === 3 && <AddOns /> }

                        {stepNumber === 4 && <Summary handleReset={resetSteps}/>}


                        {stepNumber === 5 && <Finished />}


                        {(screenWidth > 1000 && stepNumber !== 5) && (
                            <div className="form_buttons">
                                <button type='button' className={stepNumber > 1 ? 'back_button' : 'back_button_hidden'}
                                onClick={() => setStepNumber(stepNumber - 1)}>Go Back</button>
                                
                                {stepNumber !== 4 ? (
                                    <button type="submit" className='next_button'>Next Step</button>
                                ) : (
                                    <button type="submit" className='next_button'>Confirm</button>
                                )}
                            </div>
                        )}


                    </form>


                        

                </div>

                {screenWidth < 1000 && (
                    <div className={stepNumber !== 5 ? 'form_buttons_mobile' : "form_buttons_hide"}>

                        <button type='button' className={stepNumber > 1 ? 'back_button' : 'back_button_hidden'}
                        onClick={() => setStepNumber(stepNumber - 1)}>Go Back</button>
                        
                        {stepNumber !== 4 ? (
                            <button type="button" onClick={handleSubmit} className='next_button'>Next Step</button>
                        ) : (
                            <button type="button" onClick={handleSubmit} className='next_button'>Confirm</button>
                        )}
                    </div>
                )}

            </section>

        </main>
    )
}

export default App