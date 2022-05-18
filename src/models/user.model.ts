import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
interface IUser {
    name: string;
    email: string;
    password: string;
    versionKey: Boolean;
    timestamps: Boolean;
    checkpassword: Function;
}

const userSchema = new Schema<IUser>({
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
},
{
    versionKey: false,
    timestamps: true,
});

// it is called hook it run before saving in database

userSchema.pre("save", function (next) {
    // create and update
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password,10,  (err,hash) => {
        this.password = hash;
        return next();
    });
});

userSchema.methods.checkpassword = function (password:string) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,this.password, function(err,same) {
            if(err) return reject(err);

            return resolve(same);
        })
    })
}

const Users = model<IUser>("user", userSchema);
export {Users}

