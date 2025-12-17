"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/signout", {
      method: "POST",
    });

    if (res.status === 200) {
      router.refresh();
      router.push("/login");
    }
  };
  return (
    <a
      className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleLogout}
    >
      Logout
    </a>
  );
}
