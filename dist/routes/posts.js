"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.blogs;
    if (query) {
        const dataSearch = yield models_1.Posts.find({
            title: { $regex: "^" + query, $options: "i" },
        });
        res.json(dataSearch);
    }
    else {
        try {
            const posts = yield models_1.Posts.find();
            res.json(posts);
        }
        catch (e) {
            res.json({ message: e });
        }
    }
}));
exports.postRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new models_1.Posts({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        author: {
            name: req.body.author.name,
            prenume: req.body.author.prenume,
            id: req.body.author.id,
        },
        date: req.body.date,
    });
    try {
        const savedPost = yield post.save();
        res.json(savedPost);
    }
    catch (e) {
        res.json({ message: e });
    }
}));
exports.postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield models_1.Posts.findById(req.params.id);
        res.json(post);
    }
    catch (e) {
        res.json({ message: e });
    }
}));
exports.postRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editedBlog = req.body;
    try {
        const post = yield models_1.Posts.updateOne({ _id: editedBlog._id }, Object.assign({}, editedBlog));
        res.json(post);
    }
    catch (e) {
        res.json({ message: e });
    }
}));
exports.postRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleteResult = yield models_1.Posts.deleteOne({ _id: id });
        res.json(deleteResult);
    }
    catch (e) {
        res.json("error");
    }
}));
