import mongoose from 'mongoose';

const clubMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
      required: true
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ],
    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'clubmembers'
  }
);

// Unique compound index so a user can only join a club once
clubMemberSchema.index({ userId: 1, clubId: 1 }, { unique: true });
clubMemberSchema.index({ clubId: 1 }); // For querying all members of a club

clubMemberSchema.set('toJSON', { virtuals: true });
clubMemberSchema.set('toObject', { virtuals: true });

export const ClubMember = mongoose.model('ClubMember', clubMemberSchema);
export default ClubMember;
