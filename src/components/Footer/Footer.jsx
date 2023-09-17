import s from "./footer.module.scss"
import Link from 'next/link';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react"

export const Footer = () => {
    return (
        <section className={s.footer}>
            <div>
                <div className={s.caixa_footer}>
                    <div className={s.sociais}>
                        <Link href="https://pt-br.facebook.com/aes.sertanense/">
                            <BsFacebook className={s.ico} />
                        </Link>

                        <Link href="https://www.instagram.com/aessertanense/?igshid=YmMyMTA2M2Y%3D">
                            <BsInstagram className={s.ico} />
                        </Link>

                        <Link href="https://api.whatsapp.com/send?phone=5554997153996&text=Ol%C3%A1%2C+achei+seu+contato+no+YouTube...">
                            <BsWhatsapp className={s.ico} />
                        </Link>

                        <Link href="https://www.youtube.com/channel/UCV_IbPz2Y2gHjVo1l-nykXA">
                            <BsYoutube className={s.ico} />
                        </Link>
                    </div>

                    <div className={s.infos}>
                        

                        <Link className={s.help} href="/">
                            <p className={s.parag}>Contato</p>
                        </Link>

                        <button className={s.parag} onClick={() => {
                            signIn()
                        }}><p>Login</p></button>
                    </div>
                    <div className={s.infos}>
                        <div className={s.teste}>
                            <p>Endereço: Av. Getúlio Vargas - 405</p>
                        </div>
                        <div className={s.teste}>
                            <p>|</p>
                        </div>
                        <div className={s.teste}>
                            <p>Contato: (54)9 9715-3996</p>
                        </div>
                    </div>
                    <div className={s.infos}>
                        <div className={s.teste}>
                            <p>Horário de atendimento: Segunda a Sexta - 08:00h às 11:45h</p>
                        </div>
                    </div>
                    <div className={s.aa}>© Copyright 2022 - IFRS Campus Sertão - ADS</div>
                </div>
            </div>
        </section>
    )
}