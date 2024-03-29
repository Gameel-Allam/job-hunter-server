const jobValidator = require("../utils/validators/jobs.vaildator");
const { jobModel } = require("../utils/DB");
const { companyModel } = require("../utils/DB");

const getAllJobs = async (page, pageSize) => {
	const jobs = await jobModel
		.find()
		.skip((page - 1) * pageSize)
		.limit(pageSize);
	return jobs;
};

const getJobById = async id => {
	return await jobModel.findById({ _id: id });
};

const getJobByCompany = async company => {
	return await jobModel.find({ company });
};

const createJob = async job => {
	const company = await companyModel.findById({ _id: job.company });
	if (!company) throw new Error("Company not found");
	if (company.avilableJobs <= 0) throw new Error("No available jobs");
	isValid = jobValidator(job);
	if (isValid) {
		company.avilableJobs -= 1;
		await companyModel.findByIdAndUpdate({ _id: job.company }, company);
		await jobModel.create(job);
		return job;
	} else throw new Error("Invalid job data");
};

const updateJob = async (id, job) => {
	isValid = jobValidator(job);
	if (isValid) {
		await jobModel.findByIdAndUpdate({ _id: id }, job);
		return job;
	} else throw new Error("Invalid job data");
};

const patchJob = async (id, job) => {
	return await jobModel.findByIdAndUpdate({ _id: id }, job, { new: true });
};

const deleteJob = async id => {
	return await jobModel.findByIdAndDelete({ _id: id });
};

module.exports = {
	getAllJobs,
	getJobById,
	getJobByCompany,
	createJob,
	updateJob,
	patchJob,
	deleteJob,
};
