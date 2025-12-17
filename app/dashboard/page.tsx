import { createClient } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logoutButton";

export default async function dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }
  // Fetch data announcements
  const { data: notes } = await supabase.from("announcements").select();

  return (
    <div className="p-8">
      <h1>Welcome, {user.email}</h1>
        <h1>Your Announcements:</h1>
        {notes && notes.map((note) => (
          <div key={note.id} className="border p-4 m-2 text-white">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
        <LogoutButton />
    </div>
  );
}
