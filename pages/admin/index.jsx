import { Header } from '../../src/components/Header/Header'
import { Footer } from '../../src/components/Footer/Footer'
import s from '../../styles/container.module.scss'
import conectarDB from '../../lib/dbConnect';
import Empresa from '../../models/Empresa';
import Link from 'next/link';
import { BiLogOut } from "react-icons/bi";

import { useSession, signIn, signOut } from "next-auth/react"

import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";
export default function Listar({ empresas }) {
  const [busca, setBusca] = useState('');

  //ordenação
  const ordenadas = empresas.sort((a, b) =>
    a.namefantasia.localeCompare(b.namefantasia));

  //sessão
  const { data: session } = useSession({
    required: true
  });

  if (!session) {
    return <></>
  }

  return (
    <section className='index'>
      <header>
        <Header />
      </header>
      {/* botao Sair*/}
      <div className={s.sair}>
        <button className={s.out} onClick={() => {
          signOut({ redirect: false })
        }}>SAIR<BiLogOut size={25} /></button>
      </div>
      <section className={s.container}>

        {/* botao cadastro de empresa*/}
        <div className={s.botaoADM}>
          <Link href="/admin/empresa/new">
            <button className={s.cadastro}>Cadastrar Nova Empresa</button>
          </Link>
        </div>

        {/* botao Turoriais*/}
        <div className={s.botaoADM}>
          <Link href="/admin/help/">
            <button className={s.cadastro}>Ajuda / Tutoriais</button>
          </Link>
        </div>

        {/* botao Editar Banner*/}
        <div className={s.botaoADM}>
          <Link href="/admin/banner">
            <button className={s.cadastro}>Editar Banner</button>
          </Link>
        </div>

        {/* botao Editar Banner*/}
        <div className={s.botaoADM}>
          <Link href="/admin/login/">
            <button className={s.cadastro}>Lista Usuários</button>
          </Link>
        </div>

        <div className={s.admin}>

          <form className={s.busca}>
            <input
              className={s.pesquisa}
              type="text"
              placeholder="Search"
              name="busca"
              id="busca"
              value={busca}
              onChange={(ev) => setBusca(ev.target.value)}
            />
            <button className={s.but} type='submit'><BiSearchAlt2 size={25} /></button>

          </form>
          <div className={s.containerGrid}>
            {
              ordenadas.filter(e => e.namefantasia.toLowerCase().startsWith(busca.toLowerCase()) && e.pagamento == "true").map(({ _id, namefantasia, url }) => (
                <div className={s.cardEmpresa} key={_id}>
                  <img
                    src={url}
                    width="240px"
                    height="130px"
                  />
                  <h2 className="fw-normal text-center">{namefantasia}</h2>
                  <div className="text-center">
                    <Link href={`/admin/empresa/${_id}`}>
                      <div class={s.btnblueqa}>Sobre</div>
                    </Link>
                  </div>
                </div>
              ))
            }
            {
              ordenadas.filter(e => e.namefantasia.toLowerCase().startsWith(busca.toLowerCase()) && e.pagamento != "true").map(({ _id, namefantasia, url }) => (
                <div className={s.cardEmpresa} style={{ backgroundColor: "rgb(237, 113,104)" }} key={_id}>
                  <img
                    src={url}
                    width="240px"
                    height="130px"
                  />
                  <h2 className="fw-normal text-center">{namefantasia}</h2>
                  <div className="text-center">
                    <Link href={`/admin/empresa/${_id}`}>
                      <div class={s.btnredqa}>Sobre</div>
                    </Link>
                  </div>
                </div>
              ))
            }

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

