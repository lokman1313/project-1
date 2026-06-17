import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { email } from 'better-auth'
import { creatSubscription } from '@/lib/action/subscription'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details ,metadata} = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const subinfo = {
      email : customerEmail,
      planId : metadata.planId
    }
    const result =await creatSubscription(subinfo)
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 antialiased">
        <section 
          id="success" 
          className="max-w-md w-full bg-gray-300 rounded-2xl shadow-xl p-8 text-center border border-slate-100 transform transition-all"
        >
          {/* Emerald Success Checkmark Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <svg 
              className="h-8 w-8 text-emerald-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Typography Hierarchy */}
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Thank You!
          </h1>
          <p className="text-emerald-600 font-medium mb-6">
            Your payment was successful
          </p>

          <hr className="border-slate-100 my-4" />

          {/* Main Content */}
          <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6">
            We appreciate your business! A confirmation email has been sent to{' '}
            <strong className="text-slate-900 font-semibold break-all">{customerEmail}</strong>.
          </p>

          {/* Support Section Box */}
          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-xs md:text-sm text-slate-500">
            Have questions about your order? Reach out at{' '}
            <a 
              href="mailto:orders@example.com" 
              className="text-indigo-600 hover:text-indigo-500 font-medium underline transition-colors"
            >
              orders@example.com
            </a>
          </div>

          {/* Responsive Action Button */}
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-950 transition-colors shadow-sm"
          >
            Return to Dashboard
          </Link>
        </section>
      </div>
    )
  }

  // Safety fallback for unexpected Stripe statuses
  return redirect('/')
}