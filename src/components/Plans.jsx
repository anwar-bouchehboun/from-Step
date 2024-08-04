import { useEffect, useState } from "react"

import { plans } from "../data/plans"

import { getUserPlan } from "../data/subscription"
import { setUserPlan } from "../data/subscription"

import planStyles from '../styles/Plans.module.css'

const Plans = () => {

    const [planType, setPlanType] = useState(getUserPlan())

    console.log(getUserPlan())

    const planHandler = (plan) => {
        if(planType.selectedPlan === plan) {
            setPlanType({ selectedPlan: {}, subType: planType.subType })
        } else {
            setPlanType({ selectedPlan: plan, subType: planType.subType })
        }
    }

    const subscriptionHandler = () => {
        setPlanType({ selectedPlan: { name: "Default", price: 999, src: "" }, subType: !planType.subType })
    }

    useEffect(() => {
        console.log(planType)
        setUserPlan(planType)
    }, [planType])


    return (
        <div className={planStyles.plan_step} data-aos="fade-right">

            <div className={planStyles.plans_container}>

                {plans.map(plan => (

                    <div role="button" className={planType.selectedPlan.name === plan.name ? planStyles.plan_button_selected : planStyles.plan_button } key={plan.price}
                    onClick={() => planHandler(plan)}>

                        <img src={plan.src} aria-label="Plan symbol" className={planStyles.plan_icon} alt={plan.name}/>
                        
                        <div className={planStyles.name_price}>
                            <p>{plan.name}</p>

                            {/* if subType is yearly then it will multiply the plan price by 12 */}
                            <p>${!planType.subType ? `${plan.price * 12}/year` : `${plan.price}/month` }</p>
                        </div>



                    </div> 
                ))}
            </div>

            <div className={planStyles.subscription}>

                <p>Monthly</p>

                <button className={ planType.subType ? planStyles.sub_button_monthly : planStyles.sub_button_yearly } 
                 type="button" aria-label="Yearly or Monthly subscription" onClick={subscriptionHandler}>
                    
                    <div className={planStyles.plan_indicator}></div>

                </button>

                <p>Yearly</p>

            </div>
        </div>
    )
}

export default Plans