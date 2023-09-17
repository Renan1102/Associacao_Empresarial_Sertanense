import { Header } from '../src/components/Header/Header'
import { Footer } from '../src/components/Footer/Footer'
import s from '../styles/container.module.scss'
import conectarDB from '../lib/dbConnect';
import Banner from '../models/Banner';
import { BiSearchAlt2 } from "react-icons/bi";
import ButtonDown from '../src/components/ButtonDown/ButtonDown';
import Empresas from '../src/components/Empresa/Empresas';
import Sobre from '../src/components/Sobre/Sobre'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';

export default function Home({ banners }) {
 
  return (
    <section className='index'>
      <header>
        <Header />
      </header>

      <div>
        <div class="carousel-wrapper">
          <Carousel infiniteLoop useKeyboardArrows autoPlay transactionTime >
            {
              banners.map(({ _id, url, link }) => (
                <div className="text-center" key={_id}>

                  <div className={s.banner}>
                    <img src={url} />
                  </div>


                </div>
              ))
            }
          </Carousel>
        </div>
      </div>


      <div className={s.divCategoriasEmpresas}>
        <div>
          <form className={s.busca} >
            <ButtonDown />
            <input
              className={s.pesquisa}
              type="text"
              placeholder="Search"
              id="pesquisa"
              
            />
            <button className={s.but} type='submit'><BiSearchAlt2 size={25} /></button>
            <Empresas />
          </form>

        </div>
      </div>

      <div className={s.conteudo2}>
        <div className={s.botao}></div>
        <Sobre />
      </div>
      <div className={s.containerGrid}>
        <br />
        <br />
        <br />
      </div>
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

    return { props: { banners } };
  } catch (error) {
    console.log(error);
  }

}