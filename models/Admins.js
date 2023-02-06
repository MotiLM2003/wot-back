const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    firstName: { type: String, default: '', trim: true },
    lastName: { type: String, default: '', trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    // adminName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    status: { type: Number, default: 0 },
    role: { type: { type: String, default: 'admin', trim: true } },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
}, {
    timestamps: true,
});

adminSchema.methods.toJSON = function() {
    const admin = this;
    const adminObject = admin.toObject();

    delete adminObject.tokens;
    delete adminObject.__v;
 

    return adminObject;
};

adminSchema.statics.findByCredentials = async(email, password) => {
    const filters = { email, password: password };
    const user = await Admin.findOne({ filters });

    if (!user || user === null) {
        return { message: 'unable to log in email' };
    }

    return user;
};

adminSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() },
        process.env.JWTSECRET, {
            expiresIn: '365 days',
        }
    );
    try {
        user.tokens = user.tokens.concat({ token });
        user.save();
    } catch (error) {}
    return token;
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;