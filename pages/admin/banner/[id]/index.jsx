import { useRouter } from "next/router";
import { Header } from '../../../../src/components/Header/Header';
import { Footer } from '../../../../src/components/Footer/Footer';
import conectarDB from "../../../../lib/dbConnect";
import Banner from "../../../../models/Banner";
import Link from 'next/link';
import s from '../../../../styles/container.module.scss';

import { useSession } from 'next-auth/react';

const BannerPage = ({ success, error, banner }) => {
    const router = useRouter();

    //sessão
    const {data: session } = useSession({
        required: true
      });
    
      if(!session) {
        return <></>
      }

    if (!success) {
        return (
            <div className="container text-center my-5">
                <h1>{error}</h1>

                <Link href="/admin">
                    <a className="btn btn-success">Voltar</a>
                </Link>
            </div>
        );
    }

    const deleteData = async (id) => {
        try {
            await fetch(`/api/banner/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/banner");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <header>
                <Header />
            </header>
            <div className={s.container}>

                <div className={s.contentEmpresa}>
                    <div className="card-body">

                        <div className={s.opcao}>
                            <Link href={`/admin/banner/${banner._id}/edit`}>
                                <   a className="btn btn-warning btn-sg me-2">Editar</a>
                            </Link>
                            <button className="btn btn-danger btn-sg" onClick={() => deleteData(banner._id)}>Excluir</button>
                            <p></p>
                        </div>

                        <img
                        src={banner.url}
                        width="400px"
                        height="200px"
                        //layout='fill'
                        />
                        <p className={s.conteudo}>
                            <b> Nome do Banner:</b> {banner.name}
                        </p>

                        <p className={s.conteudo}>
                            <b> Descricao:</b> {banner.descricao}
                        </p>

                        <p className={s.conteudo}>
                            <b> Link Promocional:</b> {banner.link}
                        </p>

                        <p className={s.conteudo}>
                            <b> Posição:</b> {banner.posicao}
                        </p>


                        <Link href="/admin/banner">
                            <a className="btn btn-dark btn-sm me-2">Voltar</a>
                        </Link>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default BannerPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const banner = await Banner.findById(params.id).lean();

        if (!banner) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(banner);
        banner._id = `${banner._id}`;

        return { props: { success: true, banner } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}