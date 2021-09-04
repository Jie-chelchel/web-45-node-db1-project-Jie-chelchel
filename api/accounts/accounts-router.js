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

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
