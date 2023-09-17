import { useRouter } from "next/router";
import { Header } from '../../../../src/components/Header/Header';
import { Footer } from '../../../../src/components/Footer/Footer';
import conectarDB from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Link from 'next/link';
import s from '../../../../styles/container.module.scss';
import { useSession } from 'next-auth/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { Component } from 'react';

const UserPage = ({ success, error, user }) => {
    const router = useRouter();

    //sessão
    const { data: session } = useSession({
        required: true
    });

    if (!session) {
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
            await fetch(`/api/user/${id}`, {
                method: "DELETE",
            });
            router.push("/admin/login");
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
                    <div className={s.opcao2}>
                        <Link href="/admin/login">
                            <a className="btn btn-dark btn-sm me-2">Voltar</a>
                        </Link>

                    </div>
                    <div className="card-body">
                        <br />
                        <div>
                            <p className={s.conteudo}>
                                <b> Login:</b> {user.email}
                            </p>
                        </div>
                        <div>
                            <p className={s.conteudo}>
                                <b> senha:</b> {user.senha}
                            </p>
                        </div>

                        <div className={s.opcao}>

                            <Link href={`/admin/login/${user._id}/edit`}>
                                <   a className="btn btn-warning btn-sg me-2">Editar</a>
                            </Link>
                            <button className="btn btn-danger btn-sg" onClick={() => deleteData(user._id)}>Excluir</button>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default UserPage;

export async function getServerSideProps({ params }) {
    try {
        await conectarDB()

        const user = await User.findById(params.id).lean();

        if (!user) {
            return { props: { success: false, error: "Dados nao encontrados" } };
        }

        console.log(user);
        user._id = `${user._id}`;

        return { props: { success: true, user } };
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: "ID nao Valido" } };
        }
        return { props: { success: false, error: "Erro de Servidor" } };
    }
}