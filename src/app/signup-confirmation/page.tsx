import Link from "next/link";

export default function SignupConfirmationPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-800">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Check Your Email
        </h1>
        <div className="mb-6 text-center">
          <svg
            className="mx-auto h-16 w-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          We've sent a confirmation link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          After confirming your email, you'll need to return to the login page
          to access your account.
        </p>
        <div className="text-center">
          <Link
            href="/login"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
}
