import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import s from '../../../styles/container.module.scss';



const Form = ({ formData, forNewUser = true }) => {

    const router = useRouter();
    

    const [form, setForm] = useState({
        email: formData.email,
        senha: formData.senha,
        
    })

    const [message, setMenssage] = useState([]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (forNewUser) {
            postData(form);
        } else {
            putData(form);
        }
    };

    const putData = async (form) => {
        setMenssage([]);
        const { id } = router.query;
        try {
            const res = await fetch(`/api/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",

                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message },
                    ]);
                }
            } else {
                setMenssage([]);
                router.push("/admin/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
            const res = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);
            console.log(url)
            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMenssage(oldmenssage => [
                        ...oldmenssage,
                        { message: error.message },
                    ]);
                }
            } else {
                router.push("/admin/login");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label className={s.lab_inputs} htmlFor="email">Email / Login:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2 " type="text" placeholder="E-mail/Login" autoComplete="off" name="email" required value={form.email} onChange={handleChange} />
                    
                    <label className={s.lab_inputs} htmlFor="senha">Senha:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2 " type="text" placeholder="Senha" autoComplete="off" name="senha" required value={form.senha} onChange={handleChange} />
                    
                    <button className="btn btn-success w-100" type="submit">{forNewUser ? "Enviar" : "Editar"}</button>
                    <Link href="/admin/login">
                        <a className="btn btn-danger w-100 my-2">Cancelar</a>
                    </Link>
                    {message.map(({ message }) => (
                        <p key={message}>{message}</p>
                    ))}
                </form>
            </div>
            <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        
    );
};

export default Form;