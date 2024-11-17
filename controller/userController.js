import user from "../model/userModel.js";


export const create = async (req, res) => {
  try {
    const userData = new user(req.body);
    const { email } = userData;

    const userExist = await user.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: "user already exists" })
    }
    const savedUser = await userData.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }

}
export const fetch = async (req, res) => {
  try {
    const users = await user.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "user not found" })
    }
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById({ _id: id })
    if (!userExist) {
      return res.status(404).json({ message: "user not found " })
    }
    const updateUser = await user.findByIdAndUpdate(id, req.body, { new: true })
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById({ _id: id })
    if (!userExist) {
      return res.status(404).json({ message: "user not found " });
    }
    await user.findByIdAndDelete(id);
    res.status(201).json({ message: "user deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};