import Card from 'react-bootstrap/Card';
import s from "./Sobre.module.scss";
import AES from "../../../public/static/img-aes.jpg"
import Image from 'next/image';

export const Sobre = () => {
    return (
        <div>
            <Card className={s.divCard}>
            <Image src={AES} alt="aes" className={s.imgAES}/>
             <h2 className={s.missao}>Missão AES</h2>
             <p className={s.missaoTxt}>
             “Ser o agente transformador, facilitador e a voz daqueles que cuprem o digno papel de ser empreendedor em Sertão, 
             além de promover a satisfação dos associados e seu clientes, identificando suas necessidades, trazendo informações e soluções de forma precisa, objetiva e inovadora.”
             </p>

             <h2 className={s.missao}>Visão</h2>

             <p className={s.missaoTxt}>
             “Ser reconhecida como entidade defensora dos associados, 
             multiplicadora de oportunidades e de informações buscando o desenvolvimento econômico sustentável dos negócios que envolvem o comércio, 
             a indústria e a prestação de serviços.”
             </p>


             <h2 className={s.missao}>Valores</h2>
            <div className={s.divValores}>
             <div>
             <p className={s.valores}>Compromisso com a Excelência </p>
             <p className={s.valores}>Comportamento Ético </p>
             <p className={s.valores}> Atitude Proativa </p>
             </div>

             <div>
             <p className={s.valores}>Foco das relações </p>
             <p className={s.valores}>Credibilidade </p>
             <p className={s.valores}> Inovação </p>
             </div>  
            </div>    
            </Card>
        </div>
    )
}

export default Sobre;