const mongoose = require("mongoose")
const router = require("express").Router();
const Cat = mongoose.model("Cat");
router.get("/", async (req, res, next) => {
    try {
        const cats = await Cat.find();
        res.send(cats);
    } catch (e) {
        next(e);
    }

});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const cat = await Cat.findById(id);
        res.send(cat);
    } catch (e) {
        next(e);
    }

});

router.post("/", async (req, res, next) => {
    try {
        const { body } = req;
        const cat = await Cat.create(body);
        res.send(cat);
    } catch (e) {
        next(e);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const cat = await Cat.findByIdAndUpdate(id, req.body, { new: true }).exec();

        res.send(cat);
    } catch (e) {
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const cat = await Cat.findByIdAndDelete(id).exec();

        res.send(cat);
    } catch (e) {
        next(e);
    }

});



module.exports = router;