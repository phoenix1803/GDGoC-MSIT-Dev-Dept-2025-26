"use client"
import { signOut, useSession } from "next-auth/react"
import Navbar from "@/component/Header/Navbar"
import {useState,useEffect} from "react"
import { LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ProfilePage = () => {
  const { data: session } = useSession()
  const [userData,setUserData] = useState(null)
  const router = useRouter();

  useEffect(()=>{
    if(!session?.user?.id) return
    const fetchUserData = async()=>{
      try{
        const res = await fetch("/api/user/user-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session.user.id }),
        })
        const data = await res.json()
        setUserData(data)
      }catch(err){
        console.error(err)
      }
    }
    fetchUserData()
  },[session?.user?.id])

    const [isLoading, setIsLoading] = useState(true)
    const [credit, setCredit] = useState(0)

    useEffect(() => {
    if (session === null) {
      router.push('/signin');
    } else if (session !== undefined) {
      setIsLoading(false);
      // Update credit when session loads
      if (session?.user?.credit !== undefined) {
        setCredit(session.user.credit);
      }
    }
  }, [session, router]);

  const clearChatHistory = async () => {
    console.log(session.user.email);
       const res = await fetch("/api/user/clear-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({email: session.user.email}),
        })
       const data = await res.json();
       alert("Chat history cleared successfully");
    
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  if(session){
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow border p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="relative">
                {session.user.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={`${session.user.name}'s avatar`} 
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    unoptimized={true}
                  />
                ) : null}
                <div 
                  className={`w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg ${session.user.image ? 'hidden' : 'flex'}`}
                  style={{ display: session.user.image ? 'none' : 'flex' }}
                >
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-semibold">{session.user.name} </h1>
                <p className="text-gray-600">{session.user.email}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600">
                  <span className="px-2 py-1 rounded bg-gray-100 border">Credits: {session.user.credit ?? 0}</span>
                  {userData?.username && <span className="px-2 py-1 rounded bg-gray-100 border">@{userData.username}</span>}
                </div>
              </div>
              <button onClick={() => signOut()} className="mt-2 sm:mt-0 inline-flex items-center gap-2 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
  
            {userData && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="font-semibold mb-2">Profile</h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><span className="text-gray-500">Name:</span> {userData.name}</div>
                    <div><span className="text-gray-500">Username:</span> {userData.username}</div>
                    <div><span className="text-gray-500">Contact:</span> {userData.contact || "-"}</div>
                    <div><span className="text-gray-500">College Email:</span> {userData.collegeEmail || "-"}</div>
                  </div>
                </div>
  
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h2 className="font-semibold mb-2">Account</h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><span className="text-gray-500">Credits:</span> {userData.credit ?? 0}</div>
                    <div><span className="text-gray-500">Member since:</span> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "-"}</div>
                    <div><span className="text-gray-500">College ID verified:</span> 
                      <span className={`ml-1 ${userData.collegeId ? "text-green-600" : "text-red-600"}`}>
                        {userData.collegeId ? "Yes" : "No"}
                      </span>
                    </div>
                    {!userData.collegeId && (
                      <div className="mt-2">
                        <a 
                          href="/verify-college-id" 
                          className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                        >
                          Verify College ID
                        </a>
                      </div>
                    )}
                   <button className="text-blue-500 hover:underline" onClick={clearChatHistory}>Clear chat history</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }


}

export default ProfilePage


     
  
          
    

