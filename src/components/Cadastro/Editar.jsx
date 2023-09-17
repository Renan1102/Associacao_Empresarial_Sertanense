import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import Cookies from 'js-cookie';
import s from '../../../styles/container.module.scss'
import { IMaskInput } from "react-imask";

const Form = ({ formData, forNewEmpresa = true }) => {


    const [url, setUrl] = useState();
    const [url2, setUrl2] = useState();

    const router = useRouter();
    const urlPronta = Cookies.get('url');

    const [form, setForm] = useState({
        numerosocio: formData.numerosocio,
        cnpj: formData.cnpj,
        namejuridico: formData.namejuridico,
        namefantasia: formData.namefantasia,
        endereco: formData.endereco,
        email: formData.email,
        telefonefixo: formData.telefonefixo,
        telefonecelular: formData.telefonecelular,
        tipopessoa: formData.tipopessoa,
        responsavel: formData.responsavel,
        setor: formData.setor,
        pagamento: formData.pagamento,
        url: formData.url,
        url2: formData.url2,
        instagram: formData.instagram,
        facebook: formData.facebook,
        whatsapp: formData.whatsapp,
        mapa: formData.mapa,
        inscricaoestadual: formData.inscricaoestadual,
        dataadmissao: formData.dataadmissao,
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
    
        
        if (forNewEmpresa) {
            
            postData(form);
            
        } else {
            putData(form);
        }
    };

    const putData = async (form) => {
        setMenssage([]);
        const { id } = router.query;
        try {
            const res = await fetch(`/api/empresa/${id}`, {
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
                
                router.push("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const postData = async () => {
        try {
            console.log(form);
            const res = await fetch("/api/empresa", {
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
                
                router.push("/admin");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label className={s.lab_inputs} htmlFor="numerosocio">Nº Sócio:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2 " type="number" placeholder="Ex: 49" autoComplete="off" name="numerosocio" required value={form.numerosocio} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="cnpj">CNPJ:<span className={s.obg} >*</span></label>
                    <IMaskInput mask="00.000.000/0000-00" className="form-control my-2" type="text" placeholder="Ex: 61.499.076/0001-06" autoComplete="off" name="cnpj" required value={form.cnpj} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="namejuridico">Nome Jurídico:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Loja Teste" autoComplete="off" name="namejuridico" value={form.namejuridico} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="namefantasia">Nome Fantasia:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Loja Teste" autoComplete="off" name="namefantasia" required value={form.namefantasia} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="endereco">Endereço:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Avenida Brasil, 300, centro, Sertão" autoComplete="off" name="endereco" required value={form.endereco} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="email">Email:<span className={s.obg} >*</span></label>
                    <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="form-control my-2" type="email" placeholder="Ex: exemplo@gmail.com" autoComplete="off" name="email" required value={form.email} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="telefonecelular">Telefone Celular:<span className={s.obg} >*</span></label>
                    <IMaskInput mask="(00) 00000-0000" className="form-control my-2" type="text" placeholder="Ex:(54) 00000-0000" autoComplete="off" name="telefonecelular" required value={form.telefonecelular} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="telefonefixo">Telefone Fixo:</label>
                    <IMaskInput mask="(00) 00000-0000" className="form-control my-2" type="text" placeholder="Ex:(54) 00000-0000" autoComplete="off" name="telefonefixo" value={form.telefonefixo} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="tipopessoa">Tipo da pessoa:<span className={s.obg} >*</span></label><br />
                    <select name="tipopessoa" value={form.tipopessoa} onChange={handleChange} required>
                        <option value="" disabled selected>Selecione tipo da pessoa</option>
                        <option value="Física, MEI ou Autônomo">Física, MEI ou Autônomo</option>
                        <option value="Jurídica">Jurídica</option>
                    </select><br />

                    <label className={s.lab_inputs} htmlFor="Setor">Setor/Categoria:<span className={s.obg} >*</span></label><br />
                    <select name="setor" value={form.setor} onChange={handleChange} required>
                        <option value="" disabled selected>Selecione a categoria<span className={s.obg} >*</span></option>
                        <option value="agropecuária">Agropecuária</option>
                        <option value="agricola">Agrícola</option>
                        <option value="automotivo">Automotivo</option>
                        <option value="autoeletrica">Auto Eletrica</option>
                        <option value="mecanica">Açougue</option>
                        <option value="bar">Bar</option>
                        <option value="barbearia">Barbearia</option>
                        <option value="departamento">Departamento</option>
                        <option value="farmacia">Farmácia</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="floricultura">Floricultura</option>
                        <option value="hospital">Hospital</option>
                        <option value="joalheria">Joalheria</option>
                        <option value="mecanica">Mecânica</option>
                        <option value="mercado">Mercado</option>
                        <option value="mercearia">Mercearia</option>
                        <option value="vestimenta">Vestimenta</option>
                        <option value="restaurante">Restaurante</option>
                        <option value="postodegasolina">Posto de gasolina</option>
                        <option value="petshop">Pet Shop</option>
                        <option value="religiao">Religião</option>
                        <option value="taxi">Taxi</option>
                        <option value="teleentrega">Tele Entrega</option>
                        <option value="telecom">Telecomunicaçao</option>

                    </select>

                    <br />
                    <label className={s.lab_inputs} htmlFor="Setor">Situação Cadastral:<span className={s.obg} >*</span></label><br />
                    <select name="pagamento" value={form.pagamento} onChange={handleChange} required>
                        <option value="" disabled selected>Selecione a Situação Cadastral</option>
                        <option value="true">PAGO</option>
                        <option value="false">Não PAGO</option>
                    </select>
                    <br />
                    <br />
                    <label className={s.lab_inputs} htmlFor="Imagem1">Imagem 1:<span className={s.obg} >*</span></label>
                    <CldUploadButton uploadPreset="oomqje1v" name="url" value={form.url = url} onChange={handleChange} onUpload={function (error, result, widget) {
                        setUrl(result.info.url)
                        console.log(url)
                        Cookies.set('url', url);
                    }} /><br />
                    <label className={s.lab_inputs} htmlFor="Imagem2">Imagem 2:<span className={s.obg} >*</span></label>
                    <CldUploadButton uploadPreset="oomqje1v" name="url2" value={form.url2 = url2} onChange={handleChange} onUpload={function (error, result, widget) {
                        setUrl2(result.info.url)
                        console.log(url)
                        Cookies.set('url', url);
                    }} /><br />

                    <label className={s.lab_inputs} htmlFor="responsavel">Responsável:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Maria Clara" autoComplete="off" name="responsavel" required value={form.responsavel} onChange={handleChange} />

                    <label className={s.lab_inputs} htmlFor="instagram">Instagram:</label>
                    <input className="form-control my-2" type="url" placeholder="Ex: Link do Instagram" autoComplete="off" name="instagram" value={form.instagram} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="facebook">Facebook:</label>
                    <input className="form-control my-2" type="url" placeholder="Ex: Link do Facebook" autoComplete="off" name="facebook" value={form.facebook} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="whatsapp">Whatsapp:</label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Link do Whatsapp" autoComplete="off" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="mapa">Localização:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="text" placeholder="Ex: Link da localização Google Maps" autoComplete="off" name="mapa" required value={form.mapa} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="inscricaoestadual">Inscrição estadual:</label>
                    <IMaskInput mask="000/0000000" className="form-control my-2" type="text" placeholder="Ex: 123/4567898" autoComplete="off" name="inscricaoestadual" value={form.inscricaoestadual} onChange={handleChange} />
                    <label className={s.lab_inputs} htmlFor="Data Admissão">Data Admissão:<span className={s.obg} >*</span></label>
                    <input className="form-control my-2" type="date" placeholder="Data Admissão" autoComplete="off" name="dataadmissao" required value={form.dataadmissao} onChange={handleChange} />

                    <button className="btn btn-success w-100" type="submit">{forNewEmpresa ? "Enviar" : "Editar"}</button>
                    <Link href="/admin">
                        <a className="btn btn-danger w-100 my-2">Cancelar</a>
                    </Link>
                    {message.map(({ message }) => (
                        <p key={message}>{message}</p>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default Form;