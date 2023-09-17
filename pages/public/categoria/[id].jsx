import { Header } from '../../../src/components/Header/Header'
import { Footer } from '../../../src/components/Footer/Footer'
import s from '../../../styles/container.module.scss'
import conectarDB from '../../../lib/dbConnect';
import Empresa from '../../../models/Empresa';
import Link from 'next/link';
import Image from 'next/image'
import React, { useState } from 'react';
import comercio1 from '../../../public/static/agroveterinaria.jpg'
import { BiParagraph, BiSearchAlt2 } from "react-icons/bi";
import ButtonDown from '../../../src/components/ButtonDown/ButtonDown';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


export default function Home({ empresas }) {
  const router = useRouter();
  const parametro = router.query.id;

  const [busca, setBusca] = useState('');

  const [filtrados, setFiltrados] = useState(empresas);

  return (
    <section className='index'>
      <header>
        <Header />
      </header>
      <form className={s.busca}>
          <ButtonDown/>
          <input
            className={s.pesquisa}
            type="text"
            placeholder="Search"
            name="busca"
            id="busca"
            value={busca}
            onChange={(ev)=> setBusca(ev.target.value)}
          />
          <button className={s.but} type='submit'><BiSearchAlt2 size={25} /></button>
        </form>

      <section className={s.container}>
        <div className={s.containerGrid}>

          {
            empresas.filter(e=>e.namefantasia.toLowerCase().startsWith(busca.toLowerCase()) && e.pagamento == "true").map(({ _id, namefantasia, url }) => (
              <div className={s.cardEmpresa} key={_id}>
                <div className={s.cardEmpresaImg}>
                <img
                    src={url}
                    width="240px"
                    height="130px"
                  />
                </div>
                <h2 className={s.titleCard}>{namefantasia}</h2>
                <div className="text-center">
                  <Link href={`/public/empresa/${_id}`}>
                  <div class={s.btnblueqa}>Sobre</div>
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
};


export async function getServerSideProps(context) {

  try {
    await conectarDB();

    const setorDaQuery = context.query.id;

    const res = await Empresa.find({ setor: setorDaQuery });
    // console.dir(res)
    const empresas = res.map(doc => {
      const empresa = doc.toObject();
      empresa._id = `${empresa._id}`;
      return empresa;
    })

    return { props: { empresas } };
  } catch (error) {
    console.log(error);
  }
}

