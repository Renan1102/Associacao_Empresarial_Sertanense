import { Header } from '../../../src/components/Header/Header'
import { Footer } from '../../../src/components/Footer/Footer'
import s from '../../../styles/container.module.scss'
import conectarDB from '../../../lib/dbConnect';
import Empresa from '../../../models/Empresa';
import Link from 'next/link';
import Image from 'next/image'



export default function Home({ }) {


  return (
    <section className='index'>
      <header>
        <Header />
      </header>
      <br />
      <br />
      <section>
        <div >
          <div className={s.opcao2}>
            <Link href="/admin/">
              <a className="btn btn-dark btn-sm me-2">Voltar</a>
            </Link>

          </div>
          <h2>Tela de ajuda</h2>
          <div className={s.video}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/HXlfA7R_25A?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>


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