import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "DOCTOR", "PATIENT"],
      default: "PATIENT"
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "PATIENT"
      }
    }

  },
  { timestamps: true } // cratedAt , updatedAt
);

const User = mongoose.model("User", userSchema);

//pre hook
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  }catch(error){
    next(error);
  }
})

export default User;