const islogin = async(req, res, next) => {
    try {
        if(req.session.userId){}
        else{
            res.redirect('/dashboard')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const islogOut = async(req, res, next) => {
    try {
        if(req.session.userId){

            res.redirect('/home')
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    islogin,
    islogOut
}