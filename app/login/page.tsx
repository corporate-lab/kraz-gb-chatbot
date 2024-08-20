"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push("/");
      document.cookie = `userEmail=${email}; path=/; max-age=86400;`;
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //     required
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //     required
    //   />
    //   <button type="submit">Log in</button>
    // </form>

    <div className={`flex flex-col items-center justify-center min-h-screen bg-white`}>
      <div className={`w-full max-w-md`}>
        <div className={`flex justify-center mb-8`}>
          <img src="/atria-logo.png" alt="Atria Logo" className={`w-12`} />
        </div>
        <form onSubmit={handleSubmit} className={`bg-white border border-[#D9D9D9] rounded-lg px-8 pt-6 pb-8 mb-4`}>
          <div className={`mb-4`}>
            <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Value"
              required
            />
          </div>
          <div className={`mb-6`}>
            <label className={`block text-gray-700 text-sm font-bold mb-2`} htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Value"
              required
            />
          </div>
          <div className={`flex items-center justify-between`}>
            <button
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-normal py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full`}
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className={`text-center text-sm`}>
          <a className={`text-indigo-600 hover:text-indigo-800`} href="mailto:lab@viko.net?subject=Atria%20-%20Reset%20password%20&body=I%20want%20to%20reset%20the%20password%20from%20my%20account.%0AEmail%3A">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
}
