import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage(){
    const [form,setForm] = useState({
        email: "",
        password: ""
    })

    const [errorMessage,setErrorMessage] = useState("")
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrorMessage("")

        try{
            const response = await api.post("/auth/login", form)
            login(response.data.access_token)
            navigate("/admin/requests")
        }catch(error){
            if(error.response?.status === 401){
                setErrorMessage("Identifiants invalides.")
            }else{
                setErrorMessage("Une erreur est survenue. Veuillez réessayer.")
            }
        }
    }

    return(
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-sm ring-slate-200">
                <h1 className="mb-6 text-2xl font-bold text-slate-900">Connexion admin</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="admin@leadflow.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">Mot de passe</label>
                        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Votre mot de passe"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-400"
                        />
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                        Se connecter
                    </button>
                </form>

                {
                    errorMessage && (
                        <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                    )
                }
            </div>
        </main>
    )
}