const adminValidator = require("../utils/validators/admins.vaildator");
const { adminModel } = require("../utils/DB");
const bcrypt = require("bcrypt");

const getAllAdmins = async () => {
	return await adminModel.find();
};

const getAdminById = async id => {
	return await adminModel.findById({ _id: id });
};

const getAdminByEmail = async email => {
	return await adminModel.findOne({ email });
};

const createAdmin = async admin => {
	isValid = adminValidator(admin);
	if (isValid) {
		const salt = await bcrypt.genSalt(10);
		admin.password = await bcrypt.hash(admin.password, salt);
		await adminModel.create(admin);
		return admin;
	} else throw new Error("Invalid admin data");
};

const updateAdmin = async (id, admin) => {
	isValid = adminValidator(admin);
	if (isValid) {
		const salt = await bcrypt.genSalt(10);
		admin.password = await bcrypt.hash(admin.password, salt);
		return await adminModel.findByIdAndUpdate({ _id: id }, admin, {
			new: true,
		});
	} else throw new Error("Invalid admin data");
};

const patchAdmin = async (id, admin) => {
	const salt = await bcrypt.genSalt(10);
	admin.password = await bcrypt.hash(admin.password, salt);
	return await adminModel.findByIdAndUpdate({ _id: id }, admin, { new: true });
};

const deleteAdmin = async id => {
	return await adminModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	patchAdmin,
	deleteAdmin,
	getAdminByEmail,
};
