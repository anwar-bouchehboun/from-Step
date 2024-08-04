import { useEffect, useState } from 'react'

import { addOns } from '../data/addons'
import { getUserAddOns, setUserAddOns } from '../data/subscription'

import Checkmark from '../assets/icon-checkmark.svg'

import addOnStyles from '../styles/AddOns.module.css'



const AddOns = () => {

    const [selectedAddOn, setSelectedAddOn] = useState(getUserAddOns());


    const handleSelection = (addOn) => {
        
        setSelectedAddOn(prevState => {
            const updatedState = { ...prevState };

            if (updatedState[addOn.name]) {
                delete updatedState[addOn.name];
            } else {
                updatedState[addOn.name] = addOn;
            }
            return updatedState;
        });
    }

    useEffect(() => {
        setUserAddOns(selectedAddOn)
    }, [selectedAddOn])

    return (
        <div className={addOnStyles.addOn_main} data-aos="fade-right">

            {addOns.map(addOn => (
                <div key={addOn.type} className={Object.keys(selectedAddOn).includes(addOn.name) ? addOnStyles.selected_container : addOnStyles.container} role='button'
                onClick={() => handleSelection(addOn)} name={addOn.type}>

                    <div className={!Object.keys(selectedAddOn).includes(addOn.name) ? addOnStyles.checkmark_unselected : addOnStyles.checkmark}>
                        <img src={Checkmark}/>
                    </div>

                    <div className={addOnStyles.name_desc}>
                        <p>{addOn.name}</p>
                        <p>{addOn.desc}</p>
                    </div>

                    <p className={addOnStyles.price}>+${addOn.price}/mo</p>
                </div>

            ))}

        </div>
    )
}

export default AddOns