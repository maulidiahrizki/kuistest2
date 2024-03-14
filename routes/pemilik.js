const express = require('express');
const router = express.Router();
const model_pemilik = require('../model/model_pemilik'); // Menggunakan model untuk tabel pemilik

router.get('/', async (req, res, next) => {
  try {
    let rows = await model_pemilik.getAll(); // Mengambil data dari tabel pemilik
    res.render('pemilik/index', { data: rows, messages: req.flash() }); // Menampilkan data di view pemilik/index
  } catch (error) {
    next(error);
  }
});

router.get('/create', (req, res) => {
  res.render('pemilik/create'); // Menampilkan form create di view pemilik/create
});

router.post("/store", async (req, res, next) => {
    try {
      const pemilikData = req.body; // Mengambil data dari form
      await model_pemilik.store(pemilikData); // Menyimpan data ke tabel pemilik
      req.flash("success", "Berhasil menyimpan data Pemilik"); 
      res.redirect("/pemilik"); // Redirect ke halaman index pemilik setelah berhasil menyimpan
    } catch (error) {
      console.log(error);
      req.flash("error", "Gagal menyimpan data Pemilik");
      res.redirect("/pemilik");
    }
  });
  

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await model_pemilik.getById(id); // Mengambil data pemilik berdasarkan ID
    res.render('pemilik/edit', { data: rows[0], messages: req.flash() }); // Menampilkan form edit dengan data yang akan diubah
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const pemilikData = req.body;
    await model_pemilik.update(id, pemilikData); // Melakukan update data pemilik berdasarkan ID
    req.flash('success', 'Berhasil menyimpan data Pemilik');
    res.redirect('/pemilik');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data Pemilik');
    res.redirect('/pemilik');
  }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      await model_pemilik.delete(id); // Menghapus data pemilik berdasarkan ID
      req.flash('success', 'Berhasil menghapus data Pemilik');
      res.redirect('/pemilik');
    } catch (error) {
      req.flash('error', 'Gagal menghapus data Pemilik');
      res.redirect('/pemilik');
    }
  });

module.exports = router;
