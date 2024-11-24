const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


module.exports = {

    testRoute: (req, res) => {
        console.log('test route hit!!')
        res.json({ msg: 'Hello WOrld!' })
    },





    registration: (req, res) => {
        console.log('registration HIT!!!!!!!', req.body)

        const { username, password, first, last, email } = req.body

        User.findOne({ username: req.body.username })
            .then((found) => {
                console.log('found', found)
                if (!found) {
                    const hash = bcrypt.hashSync(password, 10)
                    const newUser = new User({
                        first: first,
                        last: last,
                        username: username,
                        email: email,
                        password: hash
                    })

                    User.create(newUser)
                        .then((created) => {
                            console.log('created==', created)
                            created.save()
                            res.json({ msg: 'successful reg', created })
                        })
                } else {
                    res.json({ msg: 'invaild Reg' })
                }
            })
    },

    login: (req, res) => {
        console.log("LOGIN HIT", req.body)
        User.findOne({ username: req.body.username })
            .then((found) => {
                console.log('found', found)
                if (!found) {
                    res.json({ msg: 'Invalid Login' })
                } else {



                    const passwordMatch = bcrypt.compareSync(req.body.password, found.password)
                    if (!passwordMatch) {
                        res.json({ msg: 'Invalid Login' })
                    } else {

                        const payload = {
                            username: found.username,
                            _id: found._id,
                            email: found.email
                        }

                        const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' })

                        console.log('token====', token)

                        found.isOnline = true
                        found.save()

                        // res.json({ msg: 'Successful Login', found, onLine: found.isOnline })


                        res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 })
                            .status(200)
                            .json({ message: "Logged in successfully", token: token, found })


                    }
                }
            })
    },
    authed: (req, res) => {
        if (!req.cookies['jwt']) {
            console.log('reqcookie==', req.cookies)
            console.log("no cookie")
            res.json({ msg: "Not Authed" })
        }
        if (req.cookies['jwt']) {
            console.log("about to verify")
            let decode = jwt.verify(req.cookies['jwt'], process.env.SECRETKEY)
            console.log("JWT verified", decode)
            if (decode._id) {
                console.log('if hit!')
                User.findById(decode._id)
                    .then(found => {
                        console.log('found', found)
                        res.json(found)

                    })

            } else {
                res.json({ message: "token expired" })
            }


        }
    }


}