import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID={
    "seeker_pro" : "price_1TixzXQr1oDCB0wt00AVic9X" ,
    "seeker_premium" : "price_1Tj0y7Qr1oDCB0wtiqPhI3Nz",
    "recruiter_growth" : "price_1Tj1nDQr1oDCB0wtU9U78CXy",
    "recruiter_enterprise" : "price_1Tj1oZQr1oDCB0wtwz7wn4oN",
}