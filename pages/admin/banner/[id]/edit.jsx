import Form from "../../../../src/components/Cadastro/Banner";
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


const EditBanner = () => {

  const router = useRouter();
  const { id } = router.query;

  const { data: banner, error } = useSWR(
    id ? `/api/banner/${id}` : null,
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

  if (!banner) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const formData = {
    name: banner.name,
    url: banner.url,
    descricao: banner.descricao,
    link: banner.link,
    posicao: banner.posicao,
  };

  return (
    <div >
      <Header />
      <div className="container" style={{ backgroundColor: "#f1f1f1", borderRadius: "10px", padding: "20px" }}>
        <h2 className={s.h2}>Editar Banner</h2>
        <Form forNewBanner={false} formData={formData}></Form>
      </div>
      <Footer />
    </div>
  );
};

export default EditBanner;
