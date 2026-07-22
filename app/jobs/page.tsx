import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Jobs from "./jobs";

export default async function  Post(){
        const session = await auth()
        if (!session){
          redirect("/signin")
        }
    return(
        <main>
            <Jobs  session={session}/>
        </main>
    )
}