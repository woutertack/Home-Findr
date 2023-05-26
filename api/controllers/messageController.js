import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  try {
    const savedMessage = await updatedMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json("Message deleted");
  } catch (err) {
    next(err);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};

// get all messages where agencyId, userId and propertyId match
export const getMatchingMessages = async (req, res, next) => {
  const { agencyId, userId, propertyId } = req.query;

  try {
    const matchingMessages = await Message.find({
      sender: userId,
      receiver: agencyId,
      property: propertyId,
    }).exec();

    res.status(200).json(matchingMessages);
  } catch (err) {
    next(err);
  }
};

// get all user messages
export const getUserMessages = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({ sender: userId }).exec();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

// delete all messages when agency is deleted
export const deleteMessagesByAgencyId = async (req, res, next) => {
  const agencyId = req.params.agencyId;

  try {
    await Message.deleteMany({ receiver: agencyId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
};

// delete all messages when property is deleted
export const deleteMessagesByPropertyId = async (req, res, next) => {
  const propertyId = req.params.propertyId;

  try {
    await Message.deleteMany({ property: propertyId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
}

// delete all messages when user is deleted
export const deleteMessagesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    await Message.deleteMany({ sender: userId });
    res.status(200).json("Messages deleted");
  } catch (err) {
    next(err);
  }
}