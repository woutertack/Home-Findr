import AgencyMessage from "../models/AgencyMessage";

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
