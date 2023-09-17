import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import s from './card-market.module.scss'

function CardMarket() {
    return (
        <a href='#'>
            <Card className={s.card}>
                <Card.Img variant="top" src="https://www.4devs.com.br/4devs_gerador_imagem.php?acao=gerar_imagem&txt_largura=107&txt_altura=113&extensao=png&fundo_r=0.06274509803921569&fundo_g=0.996078431372549&fundo_b=0.27784929252138324&texto_r=0&texto_g=0&texto_b=0&texto=Foto%20comercio&tamanho_fonte=10" />
                <Card.Body className={s.cardBody}>
                    <Card.Title>Nome do coisa</Card.Title>
                    <div className={s.alterCardBtn}>
                        <Button><img src='/static/edit.png' alt='lapis editar'/></Button><Button><img src='/static/close.png' alt='x excluir'/></Button>
                    </div>
                </Card.Body>
            </Card>
        </a>
    );
}

export default CardMarket;