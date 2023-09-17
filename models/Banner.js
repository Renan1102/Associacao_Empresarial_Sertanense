import mongoose  from "mongoose";

const BannerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Insira um Nome para o Banner"],
    },
    url: {
        type: String,
    },
    descricao:{
        type: String,
    },
    link:{
        type: String
    },
    posicao:{
        type: String
    },
}, {versionKey: false
});

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema)