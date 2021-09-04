const { nextTick } = require("process");
const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id: id }).first();
};

const create = (account) => {
  const name = account.name.trim();
  const budget = account.budget;
  return db("accounts")
    .insert({ name, budget })
    .then((newAccountId) => {
      return getById(newAccountId);
    });
};

const updateById = (id, { name, budget }) => {
  return db("accounts")
    .where({ id: id })
    .update({ name, budget })
    .then(() => {
      return getById(id);
    });
};

const deleteById = (id) => {
  return db("accounts")
    .where({ id: id })
    .del()
    .then(() => {
      return getById(id);
    });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
