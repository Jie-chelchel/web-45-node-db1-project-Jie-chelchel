const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");
const express = require("express");
const Accounts = require("./accounts-model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res) => {
  res.json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.create(req.body)
      .then((newAccount) => res.status(201).json(newAccount))
      .catch(next);
  }
);

router.put("/:id", checkAccountPayload, checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch(next);
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((account) => {
      res.json(account);
    })
    .catch(next);
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
