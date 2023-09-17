import { Header } from '../../../src/components/Header/Header'
import { Footer } from '../../../src/components/Footer/Footer'
import s from '../../../styles/container.module.scss'
import conectarDB from '../../../lib/dbConnect';
import Empresa from '../../../models/Empresa';
import Link from 'next/link';
import { BiSearchAlt2 } from "react-icons/bi";
import ButtonDown from '../../../src/components/ButtonDown/ButtonDown';
import { useState } from "react";

export default function Home({ empresas }) {
  const [busca, setBusca] = useState('');

  //ordenação
  const ordenadas = empresas.sort( (a,b) => 
  a.namefantasia.localeCompare(b.namefantasia));


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

      <section className={s.container8}>
      
      
        <div className={s.containerGrid}>
           
          
          {
            ordenadas.filter(e=>e.namefantasia.toLowerCase().startsWith(busca.toLowerCase()) && e.pagamento == "true").map(({ _id, namefantasia, url }) => (
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
                  <div class={s.btnblueqa}>Sobre+</div>
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

    const res = await Empresa.find({});

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