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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const model_1 = require("./model");
exports.router = express_1.Router();
exports.router.get('/notes', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getNotesRepository();
            const allNotes = yield repository.find();
            res.send(allNotes);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.get('/notes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getNotesRepository();
            const notes = yield repository.findOne(req.params.id);
            res.send(notes);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/notes', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getNotesRepository();
            const notes = new model_1.Notes();
            notes.name = req.body.name;
            notes.date = req.body.date;
            notes.description = req.body.description;
            console.log(notes);
            const result = yield repository.save(notes);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.post('/notes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getNotesRepository();
            const notes = yield repository.findOne(req.params.id);
            notes.name = req.body.name;
            notes.date = req.body.date;
            notes.description = req.body.description;
            const result = yield repository.save(notes);
            res.send(result);
        }
        catch (err) {
            return next(err);
        }
    });
});
exports.router.delete('/notes/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const repository = yield model_1.getNotesRepository();
            yield repository.delete(req.params.id);
            res.send('OK');
        }
        catch (err) {
            return next(err);
        }
    });
});
