import Dropdown from 'react-bootstrap/Dropdown';
 function ButtonDown() {

  return (
    <Dropdown >
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Categorias
      </Dropdown.Toggle>

      <Dropdown.Menu  >
        <Dropdown.Item  href="/public/empresa"><b>Mostrar todas</b></Dropdown.Item>
        <Dropdown.Item href="/public/categoria/agropecuária">Agropecuaria</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/bemEstarSaude">Bem, estar e saúde</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/autoeletrica">Auto Eletrica</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/mecanica">Açougue</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/banco">Banco</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/clinicaMedica">Clínica Médica</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/comercioCereais">Comércio de Cereais</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/consultorioDeAdvocacia">Consultório de advocacia</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/consultorioOsontoologico">Consultório Odontológico</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/farmacia">Farmácia</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/lazer">Lazer</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/loja">Loja</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/mecanica">Mecânica</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/mercado">Mercado</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/restaurante">Restaurante</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/panificadora">Panificadora</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/salaoDeBeleza">Salão de Beleza</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/setorAgricola">Setor Agrícolas</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/sonorizacao">Sonorização</Dropdown.Item>
        <Dropdown.Item href="/public/categoria/indComercioAgropecuaria">Indústria de Comércio Agropecuária</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ButtonDown;

