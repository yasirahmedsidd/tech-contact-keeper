const express = require("express");
const router = express.Router();
const Contact = require("../../model/Contact");
const gravatar = require("gravatar");
const { validationResult, check } = require("express-validator");

//  @route      POST api/contacts
//  @desc       Add Contact
//  @access     Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("contact", "Contact is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, contact, email } = req.body;
    try {
      let conct = await Contact.findOne({ contact });
      if (conct) {
        return res.status(400).json({ error: "Contact Already Exists!" });
      }
      // Get contact's gravatar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      conct = new Contact({ name, email, avatar, contact });
      await conct.save();
      res.json(conct);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);
//  @route      Get api/contacts
//  @desc       Get all Contacts
//  @access     Public

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
