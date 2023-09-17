import mongoose  from "mongoose";

const EmpresaSchema = new mongoose.Schema({
    numerosocio:{
        type: String,
        required: [true, "Insira numero de asociado"],
    },
    cnpj: {
        type: String,
        required: [true, "Insira o cnpj"],
    },
    namejuridico: {
        type: String,
        required: [true, "Insira um nome Juridico Valido"],
    },
    namefantasia: {
        type: String,
        required: [true, "Insira um nome Fantasia Valido"],
    },
    endereco: {
        type: String,
        required: [true, "Insira um endereco valido"],
    },
    email: {
        type: String,
    },
    telefonefixo: {
        type: String,
    },
    telefonecelular: {
        type: String,
    },
    tipopessoa:{
        type: String,
        required: [true, "Insira tipo de pessoa"],
    },
    responsavel:{
        type: String,
        required: [true, "Insira um responsavel"],
    },
    setor:{
        type: String,
        required: [true, "Insira um setor"],
    },
    pagamento:{
        type: String,
        
    },
    url:{
        type: String,
    },
    url2:{
        type: String,
    },
    instagram:{
        type: String,
    },
    facebook:{
        type: String,
    },
    whatsapp:{
        type: String,
    },
    mapa:{
        type: String,
    },
    foto:{
        type: String,
    },
    inscricaoestadual:{
        type: String,
    },
    dataadmissao:{
        type: String,
        
    },
    
}, {versionKey: false
});

export default mongoose.models.Empresa || mongoose.model("Empresa", EmpresaSchema)