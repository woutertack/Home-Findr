import AgencyMessage from "../models/AgencyMessage.js";

export const createAgencyMessage = async (req, res, next) => {
  const newAgencyMessage = new AgencyMessage(req.body);

  try {
    const savedAgencyMessage = await newAgencyMessage.save();
    res.status(200).json(savedAgencyMessage);
  } catch (err) {
    next(err);
  }
};

export const getAgencyMessage = async (req, res, next) => {
  try {
    const agencyMessage = await AgencyMessage.findById(req.params.id);
    res.status(200).json(agencyMessage);
  } catch (err) {
    next(err);
  }
};

// get all messages where agencyId, userId and propertyId match
export const getMatchingMessages = async (req, res, next) => {
  const { agencyId, userId, propertyId } = req.query;

  try {
    const matchingMessages = await AgencyMessage.find({
      sender: agencyId,
      receiver: userId,
      property: propertyId,
    }).exec();

    res.status(200).json(matchingMessages);
  } catch (err) {
    next(err);
  }
};

// get all agency messages
export const getAgencyMessages = async (req, res, next) => {
  const { agencyId } = req.params;

  try {
    const messages = await AgencyMessage.find({ sender: agencyId }).exec();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// get all user messages
export const getUserMessages = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const messages = await AgencyMessage.find({ receiver: userId }).exec();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// delete all messages when agency is deleted
export const deleteMessagesByAgencyId = async (req, res, next) => {
  const agencyId = req.params.agencyId;

  try {
    await AgencyMessage.deleteMany({ sender: agencyId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
};

// delete all messages when property is deleted
export const deleteMessagesByPropertyId = async (req, res, next) => {
  const propertyId = req.params.propertyId;

  try {
    await AgencyMessage.deleteMany({ property: propertyId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
};

// delete all messages when user is deleted
export const deleteMessagesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    await AgencyMessage.deleteMany({ receiver: userId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
};
