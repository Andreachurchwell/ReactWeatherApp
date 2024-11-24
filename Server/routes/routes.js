const UserController = require('../controllers/users.Controller')




module.exports = (app) => {



    app.get("/test", UserController.testRoute)


    app.post('/api/registration', UserController.registration)
    app.post('/api/login', UserController.login)
    app.get('/api/authed', UserController.authed)

    // app.post('/api/weather', UserController.weather)



    
}