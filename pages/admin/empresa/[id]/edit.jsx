import Form from "../../../../src/components/Cadastro/Editar";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";
import { useSession } from 'next-auth/react';
import { Header } from '../../../../src/components/Header/Header';
import { Footer } from "../../../../src/components/Footer/Footer";
import s from '../../../../styles/container.module.scss';

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const { data } = await res.json();

  return data;
};


const EditEmpresa = () => {

  const router = useRouter();
  const { id } = router.query;

  const { data: empresa, error } = useSWR(
    id ? `/api/empresa/${id}` : null,
    fetcher
  );
  //sessão
  const { data: session } = useSession({
    required: true
  });

  if (!session) {
    return <></>
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!empresa) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const formData = {
    numerosocio: empresa.numerosocio,
    cnpj: empresa.cnpj,
    namejuridico: empresa.namejuridico,
    namefantasia: empresa.namefantasia,
    endereco: empresa.endereco,
    email: empresa.email,
    telefonefixo: empresa.telefonefixo,
    telefonecelular: empresa.telefonecelular,
    tipopessoa: empresa.tipopessoa,
    responsavel: empresa.responsavel,
    setor: empresa.setor,
    pagamento: empresa.pagamento,
    url: empresa.url,
    url2: empresa.url2,
    instagram: empresa.instagram,
    facebook: empresa.facebook,
    whatsapp: empresa.whatsapp,
    mapa: empresa.mapa,
    inscricaoestadual: empresa.inscricaoestadual,
    dataadmissao: empresa.dataadmissao,
  };

  return (
    <div >
      <Header />
      <div className="container" style={{ backgroundColor: "#f1f1f1", borderRadius: "10px", padding: "20px" }}>
        <h2 className={s.h2}>Editar Empresa</h2>
        <Form forNewEmpresa={false} formData={formData}></Form>
      </div>
      <Footer />
    </div>
  );
};

export default EditEmpresa;
