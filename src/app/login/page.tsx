"use client";

import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail, HiLockClosed } from "react-icons/hi";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login
        </h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium text-sm">
              Email
            </label>
            <div className="relative w-full">
              <HiOutlineMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-gray-700 dark:text-gray-200 font-medium text-sm">
              Password
            </label>
            <div className="relative w-full">
              <HiLockClosed
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={22}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition mt-2"
          >
            Login
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
          <span className="border-t border-gray-300 flex-1 dark:border-gray-600"></span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <span className="border-t border-gray-300 flex-1 dark:border-gray-600"></span>
        </div>
        <button className="flex items-center justify-center gap-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium">
          <FcGoogle className="w-6 h-6" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
