"use client";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from 'next/navigation';

const Profile = async () => {
  const session = await getServerSession(options)
  if(!session){
    redirect("/api/auth/signin?callbackUrl=/ClientProfile");
}
    return (
      <div>
        <h1>Profile Client Session</h1>
        <p>{session?.user?.email}</p>
        {/* <p>{session?.user?.role}</p> */}
      </div>
    )
};
  
export default Profile