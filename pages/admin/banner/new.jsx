import Form from "../../../src/components/Cadastro/Banner";
import { Header } from '../../../src/components/Header/Header';
import { Footer } from "../../../src/components/Footer/Footer";
import s from '../../../styles/container.module.scss'
import { useSession } from 'next-auth/react';
const New = () => {
    //sessão
    const { data: session } = useSession({
        required: true
    });

    if (!session) {
        return <></>
    }
    const formData = {
        namejuridico: "",
        url: "",
        deescricao:"",
        link: "",
        posicao: "",
        
    };

    return (
        <div >
            <Header />
            <div className="container" style={{ backgroundColor: "#f1f1f1", borderRadius: "10px", padding: "20px" }}>
                <h2 className={s.h2}>Adicionar banner</h2>
                <Form formData={formData} />
            </div>
            <Footer />
        </div>
    );
}


export default New