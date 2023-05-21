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

export const getAllMessage = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
