export function catchError(callback){
    return (req, res, next)=>{
        callback(req,res,next).catch((err)=>{
            // res.json(err)
            next(err); // this assures going to the error handler when there is an error, not the ""next"" in line 
        })
    }
}