import express from 'express';
import AgencyMessage from '../models/AgencyMessage';

import { createAgencyMessage, getAgencyMessage, getMatchingMessages } from '../controllers/agencyMessageController';

const router = express.Router();

// create
router.post('/', createAgencyMessage);

// get
router.get('/:id', getAgencyMessage);

// get all
router.get('/', getMatchingMessages);