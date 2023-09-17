import { useState } from 'react';
import Modal from 'react-modal';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import s from './modal.module.scss'
import { Button } from 'primereact/button';

export const Login = () => {

    function handleSubmit(event) {

        const user = name
        const password = values

        console.log('Usuario:' + user)
        console.log('senha: ' + password)

        event.preventDefault();
    }

    // padrao do react modal***************
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // form do prime react com hooks********

    return (
        <div className={s.Login}>
            <button className={s.Loginbtn} onClick={openModal}>
                Login
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName={s.outsideModal}
                className={s.Modal}
            >
                <section className={s.Modaltop}>
                    <h4 className={s.Modaltop__title}>Entrar</h4>
                    <button className={s.Modaltop__btn} onClick={closeModal}><img src='/static/close.png' alt='fechar modal' /></button>
                </section>
                <form className={s.Modalform} onSubmit={handleSubmit}>
                    <div className={s.Modalform__field}>
                        <label>E-mail</label>
                        <InputText label='Insira sua e-mail'  onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={s.Modalform__field}>
                        {/* <i className='pi pi-eye'>p-float-label p-input-icon-right</i> */}
                        <label>Senha</label>
                        <Password label='Insira sua senha'  onChange={(e) => setValues(e.target.value)} />
                    </div>
                    <Button type="submit" label="Entrar" />
                </form>
            </Modal>
        </div>
    )
}