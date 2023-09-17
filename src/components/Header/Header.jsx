import s from "./header.module.scss";
import logo from '../../../public/static/logo.jpg';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
    return (
        <section className={s.header}>
            <Link  href="/">
            <div className={s.logo}>
                <Image className={s.logoImg} src={logo} alt="Picture do comercio" />
            </div>
            </Link>
            <p className={s.titulo}>Associação Empresarial Sertanense</p>
        </section>
    )
}