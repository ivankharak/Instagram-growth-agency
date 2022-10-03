import { useState } from "react";

export default function BlogTwo() {
  const [emailError, setEmailError] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  function SubmitEmail() {
    const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(emailInput.length === 0) {
      return;
    }
    emailValidation.test(emailInput) ? setEmailError(false) : setEmailError(true);
    setSubmitClicked(true);
  }
    return(
        <article className="relative sm:py-16">
        <section aria-hidden="true" className="hidden sm:block">
          <svg
            className="absolute top-8 left-1/2 -ml-3"
            width={404}
            height={392}
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </section>
        <section className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <section className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <section
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </section>
            <section className="relative">
              <section className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Get notified about new posts.
                </h2>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                  Sagittis scelerisque nulla cursus in enim consectetur quam.
                  Dictum urna sed consectetur neque tristique pellentesque.
                </p>
              </section>
              <form  className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                <section className="min-w-0 flex-1">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    onChange={(e) => setEmailInput(e.target.value)}
                    type="text"
                    className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter your email"
                  />
                </section>
                <section className="mt-4 sm:mt-0 sm:ml-3">
                  <button
           type="button"
                       onClick={SubmitEmail}
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                  >
                    Notify me
                  </button>
                </section>
               
              </form>
              {submitClicked ?  !emailError ?  <p className="py-3 text-green-500 text-center">You have successfully subscribed to our blog!</p> :  <p className="py-3 text-red-800 text-center">Invalid email. Try again!</p> : null}
            </section>
          </section>
        </section>
      </article>
    )
}