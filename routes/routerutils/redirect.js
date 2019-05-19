function redirectLogin(req, res, next){
    if(!res.session['userid']){
        res.render('login');
    }
    else{
        next();
    }
}

module.exports = {
    redirectLogin:redirectLogin,
};