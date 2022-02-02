const router = require('express').Router();
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [ Product ],
    })
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
try{
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [ Product ],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/', (req, res) => {
  try {
    const categorynData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try{
    const categoryData = await Category.update({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
}
});

router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
