const User = new mongoose.Schema({
	netid: { type: String, required: true },
	nyuPassword: // hash
});
User.plugin(passportLocalMongoose); // ?

const Schedule = new mongoose.Schema({
	title: { type: String, required: true },
	date: { type: Date, required: true },
	done: { type: Boolean, required: true },
	estimate: { type: Number },
	actual: { type: Number },
	reminder: { type: Boolean }
});

const Tag = new mongoose.Schema({
	name: { type: String, required: true },
	schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }
});

