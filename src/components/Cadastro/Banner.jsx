import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import Cookies from 'js-cookie';
import s from '../../../styles/container.module.scss';
const Form = ({ formData, forNewBanner = true }) => {
    const [url, setUrl] = useState();

    const router = useRouter();
    const urlPronta = Cookies.get('url');
    
    const [form, setForm] = useState({
        name: formData.name,
        descricao: formData.descricao,
        link: formData.link,
        posicao: formData.posicao,
        url: formData.url,


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

        if (forNewBanner) {
            postData(form);
        } else {
            putData(form);
        }
    };
    
    const putData = async (form) => {
        setMenssage([]);
        const { id } = router.query;
        try {
            const res = await fetch(`/api/banner/${id}`, {
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
                router.push("/admin/banner");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
            const res = await fetch("/api/banner", {
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
                router.push("/admin/banner");
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input className="form-control my-2" type="text" placeholder="Nome Banner" autoComplete="off" name="name" required value={form.name} onChange={handleChange} />
                    <input className="form-control my-2" type="text" placeholder="Descricao Banner" autoComplete="off" name="descricao"  value={form.descricao} onChange={handleChange} />
                    <input className="form-control my-2" type="tex" placeholder="Link Promocional" autoComplete="off" name="link"  value={form.link} onChange={handleChange} />
                    <label className="my-3" htmlFor="Posicao">Selecionar Posição</label>
                    <select className={s.setor} name="posicao" value={form.posicao} onChange={handleChange}>
                        <option value="" disabled selected>Selecione a Posição</option>
                        <option value="primeiro">Primeiro</option>
                        <option value="segundo">Segundo</option>
                        <option value="terceiro">Terceiro</option>
                    </select>
                    <br/>
                    <CldUploadButton className="btn btn-success" uploadPreset="oomqje1v"name="url" value={form.url=url} onChange={handleChange} onUpload={function (error, result, widget) {
                        setUrl(result.info.url)
                        console.log(url)
                        Cookies.set('url',url);
                    }} />
                    <input type="text" name= "url"value={form.url} disabled/>
                    
                    <button className="btn btn-success w-100 my-2" type="submit">{forNewBanner ? "Enviar" : "Editar"}</button>
                    <Link href="/admin/banner">
                        <a className="btn btn-danger w-100 my-2">Cancelar</a>
                    </Link>
                    <br/>
                    {message.map(({ message }) => (
                        <p key={message}>{message}</p>
                    ))}
                </form>
                
            </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
        </div>
        
    );
};

export default Form;