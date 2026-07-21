import { redirect } from "next/navigation";
import Postjob from "./post";
import { auth } from "@/auth";

export default async function  Post(){
        const session = await auth()
        if (!session){
          redirect("/signin")
        }
    return(
        <main>
            <Postjob  session={session}/>
        </main>
    )
}