import { redirect } from "next/navigation";
import ProfileClient from "./profileClient";
import { auth } from "@/auth";

export default async function Profile(){
      const session = await auth();

  if (!session) {
    redirect("/signin"); // or your login route
  }
    return(
        <main>
            <ProfileClient session={session}/>
        </main>
    )
}