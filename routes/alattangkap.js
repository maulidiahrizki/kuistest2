var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const model_alattangkap = require('../model/model_alattangkap.js');

router.get('/', async function (req, res, next) {
    let rows = await model_alattangkap.getAll();
    res.render('alattangkap/index', {
        data: rows
    })
})



router.get('/create', function (req, res, next) {
    res.render('alattangkap/create', {
        nama_alat_tangkap: ''
    })
})


router.post('/store', async function (req, res, next) {
    try {
        let {nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap
        }
            await model_alattangkap.Store(Data);
            req.flash('success', 'Berhasil menyimpan data!');
            res.redirect('/alattangkap');
        } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/alattangkap')
    }
})


router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let rows = await model_alattangkap.getId(id);
            res.render('alattangkap/edit', {
                id: rows[0].id_alat_tangkap,
                nama_alat_tangkap: rows[0].nama_alat_tangkap,
            })
        })

router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap
        }
        await model_alattangkap.Update(id, Data);
         req.flash('success', 'Berhasil memperbaharui data baru!');
         res.redirect('/alattangkap');
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/alattangkap');
    }
})


router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await model_alattangkap.Delete(id);
        req.flash('success', 'Data terhapus!');
        res.redirect('/alattangkap');
    })


module.exports = router;
