const express = require('express');
const router = express.Router();
const model_dpi = require('../model/model_dpi');

router.get('/', async (req, res, next) => {
  try {
    let rows = await model_dpi.getAll();
    res.render('dpi/index', { data: rows, messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.get('/create', (req, res) => {
  res.render('dpi/create');
});

router.post("/store", async (req, res, next) => {
    try {
      const dpiData = req.body;
      await model_dpi.store(dpiData);
      req.flash("success", "Berhasil menyimpan data DPI");
      res.redirect("/dpi");
    } catch (error) {
      console.log(error); // Tambahkan ini untuk mencatat kesalahan
      req.flash("error", "Gagal menyimpan data DPI");
      res.redirect("/dpi");
    }
  });
  

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await model_dpi.getById(id);
    res.render('dpi/edit', { data: rows[0], messages: req.flash() });
  } catch (error) {
    next(error);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const dpiData = req.body;
    await model_dpi.update(id, dpiData);
    req.flash('success', 'Berhasil menyimpan data DPI');
    res.redirect('/dpi');
  } catch (error) {
    req.flash('error', 'Gagal menyimpan data DPI');
    res.redirect('/dpi');
  }
});

router.get('/delete/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      await model_dpi.delete(id);
      req.flash('success', 'Berhasil menghapus data DPI');
      res.redirect('/dpi');
    } catch (error) {
      req.flash('error', 'Gagal menghapus data DPI');
      res.redirect('/dpi');
    }
  });

module.exports = router;
