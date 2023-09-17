import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    
    email: {
        type: String,
    },
    senha: {
        type: String,
    },
    
}, {versionKey: false
});

export default mongoose.models.User || mongoose.model("User", UserSchema)