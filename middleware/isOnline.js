
module.exports = (req,res,next) =>{
    if(!req.user){
        res.redirect("/api/auth");
    }

    res.status(200).send({loggedIn: true})
}