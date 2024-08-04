const USER_INFO_KEY = 'userInfo'

let userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY)) || { name: "", email: "", number: "" }

export const getUserInfo = () => userInfo;

export const setUserInfo = (newInfo) => {
    userInfo = newInfo;
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}




const USER_PLANS_KEY = 'userPlans'

const selectedPlan = {   
    name: "Default",
    price: 999,
    src: ""
}
let userPlan = JSON.parse(localStorage.getItem(USER_PLANS_KEY)) || { selectedPlan, subType: false }

export const getUserPlan = () => userPlan;

export const setUserPlan = (newPlan) => {
    userPlan = newPlan;
    localStorage.setItem(USER_PLANS_KEY, JSON.stringify(userPlan))
}




const USER_ADDONS_KEY = 'userAddOns'

let userAddOns = JSON.parse(localStorage.getItem(USER_ADDONS_KEY)) || {};

export const getUserAddOns = () => userAddOns;

export const setUserAddOns = (newAddOns) => {
    userAddOns = newAddOns;
    localStorage.setItem(USER_ADDONS_KEY, JSON.stringify(userAddOns));
};



