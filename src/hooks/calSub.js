import React from 'react'

import { plans } from '../data/plans'

import { getUserAddOns, getUserPlan } from '../data/subscription'

export const calSub = () => {

    const userPlan = getUserPlan()
    console.log(userPlan)

    const userAddOns = getUserAddOns()
    console.log(userAddOns)

    const addOns = Object.values(userAddOns)
    console.log(addOns)
}
