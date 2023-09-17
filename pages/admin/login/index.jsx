import { Header } from '../../../src/components/Header/Header'
import { Footer } from '../../../src/components/Footer/Footer'
import s from '../../../styles/container.module.scss'
import conectarDB from '../../../lib/dbConnect';
import User from '../../../models/User';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import user from '../../../models/User';

export default function Home({ users }) {
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


      <section className={s.container9}>
        <div className={s.containerList}>
          <div className={s.botaoADM}>
            <Link href="/admin/login/new">
              <button className={s.cadastro}>Novo Usuario</button>
            </Link>
          </div>
          <br />
          <div className={s.opcao2}>
            <Link href="/admin/">
              <a className="btn btn-dark btn-sm me-2">Voltar</a>
            </Link>

          </div>
          {
            users.map(({ _id, email }) => (
              <div className={s.lista2} key={_id}>
                <div className={s.listaconteudo}>
                  <div className={s.testes}>
                  <h2 >Usuário: {email}</h2>
                  </div>
                  <div className={s.testes}>
                    <Link href={`/admin/login/${_id}`}>
                      <   a className="btn btn-warning btn-sg me-2">Detalhes</a>
                    </Link>
                  </div>

                </div>
              </div>
            ))
          }

        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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

    const res = await User.find({});

    const users = res.map(doc => {
      const user = doc.toObject();
      user._id = `${user._id}`;
      return user;
    })
    user._id = `${user._id}`;
    return { props: { users } };
  } catch (error) {
    console.log(error);
  }
}
