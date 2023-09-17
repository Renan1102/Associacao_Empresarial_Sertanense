import Form from "../../../src/components/Cadastro/Usuario";
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
        email: "",
        senha: "",
    };

    return (
        <div >
            <Header />
            <div className="container" style={{ backgroundColor: "#f1f1f1", borderRadius: "10px", padding: "20px" }}>
                <h2 className={s.h2}>Novo Usuário</h2>
                <Form formData={formData} />
            </div>
            <Footer />
        </div>
    );
}


export default New