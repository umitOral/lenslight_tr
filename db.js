import mongoose from 'mongoose';

const conn=()=>{
    mongoose.connect(process.env.DB_URI,{  
        dbName:"lenslight_deneme",
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("mongodb atlas bağlantısı başarılı")
    })
    .catch((err)=>{
        console.log("Db error:"+err)
    })
}

export default conn;