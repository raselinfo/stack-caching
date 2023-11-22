const redisClient = require("./redisClient");

const deletePatternKey=(pattern)=>{
    redisClient.scanStream({
        match:pattern,
        count:1000
    }).on("data",(keys)=>{
        if(keys.length>0){
            redisClient.del(...keys)
        }
    }).on("end",()=>{
        console.log("delete pattern key success")
    })

}



const deleteCache = ({ keys, pattern }) => {
    try{
        if(pattern){
            deletePatternKey(pattern)
        }
        if(keys?.length){

            redisClient.del(...keys)
        }
    }catch(err){
        throw new Error(err)
    }
};

module.exports = deleteCache;
