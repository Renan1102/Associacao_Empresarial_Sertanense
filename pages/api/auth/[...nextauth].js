import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import conectarDB from "../../../lib/dbConnect";
import User from "../../../models/User";
const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "chaves",
    tipo : "hex"
};
function  criptografar(senha) {
	const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	cipher.update(senha);
	return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

export const authOptions = {
    
        session: {
            strategy: 'jwt'
        },
        providers:[
            CredentialsProvider({
                type: 'credentials',
                credentials: {},
               async authorize(credentials, req){
                 await conectarDB();
                 const usuar = await User.findOne ({email: req.body.email});

                 //chama função pra criptografar
                 const crip = await criptografar(req.body.senha)
                 
                 const cripado = await User.findOne({senha: crip})
                // console.log(cripado.senha)
                //console.log(usuar) 
                  
                    /*const {email, senha} = credentials as{
                        email: string;
                        senha: string;
                    };*/
                    
                    //
                    //
                    if(req.body.email !== usuar.email || cripado.senha !==usuar.senha){
                        //console.log(usuar)
                        return null;
                    }
                    
                    return {id: '1234', name: "Admininistrador ", email: req.body.email};
                    

                }
            })
        ],
        pages: {
            //redireciona pra pagina de login criada
            signIn: '/auth/login',
            signOut: '/',
        }

};

export default NextAuth(authOptions);