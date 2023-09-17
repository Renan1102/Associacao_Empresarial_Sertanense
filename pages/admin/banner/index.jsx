import { Header } from '../../../src/components/Header/Header'
import { Footer } from '../../../src/components/Footer/Footer'
import s from '../../../styles/container.module.scss'
import conectarDB from '../../../lib/dbConnect';
import Banner from '../../../models/Banner';
import Link from 'next/link';
import Image from 'next/image'
import comercio1 from '../../../public/static/agroveterinaria.jpg'

import { useSession } from 'next-auth/react';
import banner from '../../../models/Banner';

export default function Home({ banners }) {
  //sessão
  const { data: session } = useSession({
    required: true
  });

  if (!session) {
    return <></>
  }

  //ordenação


  const deleteData = async (id) => {
    try {
      await fetch(`/api/banner/${id}`, {
        method: "DELETE",
      });
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='index'>
      <header>
        <Header />
      </header>


      <section className={s.container9}>
        <div className={s.containerList}>
          <div className={s.botaoADM}>
            <Link href="/admin/banner/new">
              <button className={s.cadastro}>Cadastrar Novo Banner</button>
            </Link>
          </div>
          <br/>
          <div className={s.opcao2}>
            <Link href="/admin/">
              <a className="btn btn-dark btn-sm me-2">Voltar</a>
            </Link>

          </div>
          {
            banners.map(({ _id, name,descricao, url }) => (
              <div className={s.lista} key={_id}>
                <div className={s.listaimagem}>
                <img
                        src={url}
                        width="340px"
                        height="210px"
                        //layout='fill'
                        />
                </div>
                <div className={s.listaconteudo}>
                  <h2 >{name}</h2>
                  <h4 >{descricao}</h4>
                  <Link href={`/admin/banner/${_id}`}>
                    <a className="btn btn-success btn-sm">Detalhes</a>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </section>
  )
}

export async function getServerSideProps() {
  try {
    await conectarDB()

    const res = await Banner.find({});

    const banners = res.map(doc => {
      const banner = doc.toObject();
      banner._id = `${banner._id}`;
      return banner;
    })
    banner._id = `${banner._id}`;
    return { props: { banners } };
  } catch (error) {
    console.log(error);
  }
}
