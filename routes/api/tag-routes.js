const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    order: [['id', 'DESC']],
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock'
        ],
        through: ProductTag,
        as: 'tag_product',
        include: [
          {
            model: Category,
            attributes: [
              'id', 
              'category_name'
            ]
        },
        ]
      }
    ]
})
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock'
        ],
        through: ProductTag,
        as: 'tag_product',
        include: [
          {
            model: Category,
            attributes: [
              'id', 
              'category_name'
            ]
        },
        ]
      }
    ]
})
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
