import { useState } from "react";
import api from "../api/axios";

export default function HomePage(){
    const [form,setForm] = useState({
        name: "",
        email: "",
        message: ""
    })

    const [feedback,setFeedback] = useState({
        type: "",
        message: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setFeedback({ type: "", message: "" })

        if(form.name.length <2 || form.name.length > 10){
            setFeedback({
                type: "erreur",
                message: "La longueur du nom doit être comprise entre 2 et 10 caractères."
            })
            return
        }

        if(form.message.length <10 || form.message.length > 2000){
            setFeedback({
                type: "erreur",
                message: "La longueur du message doit être comprise entre 10 et 2000 caractères."
            })
            return
        }

        try{
            await api.post("/contact-requests", form)

            setFeedback({
                type: "succès",
                message: "Votre demande a bien été envoyée."
            })

            setForm({
                name: "",
                email: "",
                message: ""
            })
        }catch(error){
            if(error.response?.status === 400){
                setFeedback({
                    type: "error",
                    message: "Les données envoyées sont invalides."
                })
            }else{
                setFeedback({
                    type: "error",
                    message: "Une erreur est survenur lors de l'envoi."
                })
            }
        }
    }

    return(
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-3xl">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">LeadFlow</h1>
                    <p className="mt-3 text-slate-600">Envoyez votre demande via ce formulaire. Notre équipe vous recontactera.</p>
                </header>

                <section className="rounded-2xl bg(white p-6 shadow-sm ring-1 ring-slate-200">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900">Formulaire de contact</h2>
                </section>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nom */}
                    <div>
                        <label htmlFor="name" className="mb-1 block text-md font-medium text-slate-700">
                            Nom 
                            <span className="text-[10px] text-slate-400"> (2 à 100 caractères)</span>
                        </label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Votre nom"
                            className="w-full rounded-lg border-slate-300 px-4 py-2 outline-none focus:border-slate-400"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="mb-1 block text-md font-medium text-slate-700">Email</label>
                        <input type="text" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Votre email"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-400"
                        />
                    </div>
                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="mb-1 block text-md font-medium text-slate-700">
                            Message
                            <span className="text-[10px] text-slate-400"> (10 à 2000 caractères)</span>
                        </label>
                        <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Votre message" rows="6"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-400"
                        />
                    </div>

                    <button type="submit" className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                        Envoyer
                    </button>
                </form>

                {
                    feedback.message && (
                        <p className={`mt-4 text-sm ${feedback.type === "succès" ? "text-green-600" : "text-red-600"}`}>
                            {feedback.message}
                        </p>
                    )
                }
            </div>
        </main>
    )
}