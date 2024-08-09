const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const companySchema = {
	type: "object",
	properties: {
		name: { type: "string", minLength: 3, maxLength: 20 },
		address: { type: "string" },
		email: { type: "string", format: "email" },
		password: { type: "string", minLength: 8, maxLength: 20, pattern: "(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
		foundedIn: { type: "string", format: "date" },
		employeesNumber: { type: "number", minimum: 0 },
		industry: { type: "string" },
		contactInfo: {
			type: "object",
			properties: {
				phoneNumber: { type: "string", pattern: "^[0-9]{11}$" },
				website: { type: "string" },
			},
			required: ["phoneNumber", "website"],
		},
		links: {
			type: "object",
			properties: {
				linkedIn: { type: "string" },
				facebook: { type: "string" },
				instagram: { type: "string" },
			},
		},
		techStack: {
			type: "array",
			items: {
				type: "string",
			},
		},
		description: { type: "string" },
		image: { type: "string" },
		workplace: { type: "string" },
		role: {
			type: "string",
			enum: ["company"],
		},
	},
	required: [
		"name",
		"address",
		"email",
		"password",
		"foundedIn",
		"employeesNumber",
		"industry",
		"contactInfo",
		"links",
		"role",
		"techStack",
		"description",
		"workplace",
	],
};

module.exports = ajv.compile(companySchema);
