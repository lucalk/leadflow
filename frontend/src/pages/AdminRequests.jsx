import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminRequests(){
    const [requests,setRequests] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    const { token, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchRequests = async() => {
            try{
                const response = await api.get("/contact-requests/admin", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setRequests(response.data)
            }catch(error){
                if(error.response?.status === 401){
                    logout()
                    navigate('/login')
                }else{
                    setErrorMessage("Accès impossible aux demandes")
                }
            }
        }
        fetchRequests()
    },[token, logout, navigate])

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return(
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Demandes clients
                    </h1>

                    <button onClick={handleLogout} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                        Se déconnecter
                    </button>
                </div>

                {
                    errorMessage && (
                        <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
                    )
                }

                <div className="space-y-4">
                    {
                        requests.length === 0 ? (
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                                <p className="text-slate-600">Aucune demande pour le moment.</p>
                            </div>
                        ) : (
                            requests.map((request)=>(
                                <article key={request.id} className="rounded-2xl bg-white p-6 whadow-sm ring-1 ring-slate-200">
                                    <div className="mb-3">
                                        <h2 className="text-lg font-semibold text-slate-900">{request.name}</h2>
                                        <p className="text-sm text-slate-500">{request.email}</p>
                                    </div>

                                    <p className="mb-3 text-slate-700">{request.message}</p>

                                    <p className="text-xs text-slate-400">
                                        Créeée le {new Date(request.createdAt).toLocaleString("fr-FR")}
                                    </p>
                                </article>
                            ))
                        )
                    }
                </div>
            </div>
        </main>
    )
}