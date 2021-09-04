const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (typeof req.body.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (req.body.budget < 1 || req.body.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const accounts = await Accounts.getAll();
  const nameIsTaken = accounts.find(
    (account) => account.name === req.body.name.trim()
  );
  if (nameIsTaken) {
    return res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(next);
};
