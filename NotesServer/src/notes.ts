import { NextFunction, Request, Response, Router } from 'express';
import { getNotesRepository, Notes } from './model';

export const router: Router = Router();

router.get('/notes', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getNotesRepository();
    const allNotes = await repository.find();
    res.send(allNotes);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/notes/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getNotesRepository();
    const notes = await repository.findOne(req.params.id);
    res.send(notes);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/notes', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getNotesRepository();
    const notes = new Notes();
    notes.name = req.body.name;
    notes.date = req.body.date;
    notes.description = req.body.description;
    console.log(notes)
    const result = await repository.save(notes);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/notes/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getNotesRepository();
    const notes = await repository.findOne(req.params.id);
    notes.name = req.body.name;
    notes.date = req.body.date;
    notes.description = req.body.description;

    const result = await repository.save(notes);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/notes/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getNotesRepository();
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});
