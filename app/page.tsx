"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    // Panggil API Route yang baru dibuat
    const res = await fetch("/api/signout", {
      method: "POST",
    });

    if (res.ok) {
      // Refresh router agar server component (seperti Navbar) dirender ulang
      router.refresh();
      // Arahkan ke halaman login
      router.push("/signin");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </main>
    </div>
  );
}
