
const mongoose = require("mongoose");
const { MemberShipSchema, UserSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class MembershipRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async isUserExists(userRef) {
    const membership = await this.#model.findOne({ userRef: userRef });
    return membership;
  }
  async membershipExists(payload, session) {
    const { tran_id } = payload;


    // Convert `tran_id` to a Mongoose ObjectId
    const objectId = new mongoose.Types.ObjectId(tran_id);

    // Find the membership and populate the `userRef`
    const membership = await this.#model.findById(objectId).populate('userRef').session(session);


    // Update the user's role to 'agent'
    if (membership?.userRef?._id) {
      const userId = membership.userRef._id;
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        { role: 'agent', isAgent: true },
        { new: true, session } // Return updated document and include session
      );


      return user;
    }

    return null; // Return null if no user reference is found
  }

  async getFindMembership(payload) {

    const { memberId, phone, agentType } = payload;
    const query = {};
    if (phone) {
      query.phone = { $regex: `.*${phone}.*`, $options: 'i' };
    }
    if (memberId) {
      query.referCode = { $regex: `.*${memberId}.*`, $options: 'i' };
    }
    if (agentType) {
      query.agentType = agentType;
    }

    try {
      // Find memberships matching the query, sorted by creation date
      const memberships = await this.#model.find(query)
        .sort({ createdAt: -1 })
        .populate('userRef', '-password'); // Exclude the 'password' field from 'userRef'

      return memberships;
    } catch (error) {
      console.error('Error fetching memberships:', error);
      throw error;
    }
  }


  async findMembershipByReferCode(refer_code) {
    return this.#model.findOne({ referCode: refer_code });
  }


  async createMembership(payload, session) {
    const { userRef } = payload;

    const newMembership = await this.#model.create([payload], { session });

    if (newMembership) {
      const updatedUser = await UserSchema.findByIdAndUpdate(
        userRef,
        { role: 'agent', membershipRef: newMembership?._id },
        { session, new: true } // `new: true` returns the updated document
      );

      return newMembership;
    }

    return null;

  }

  async getFindMembershipMemberId(memberId) {
    return this.#model.findOne({ referCode: memberId });
  }
  async updateMembership(id, payload) {
    const updatedMembership = await this.#model.findByIdAndUpdate(id, payload);
    return updatedMembership;
  }
  async getCategoryWiseMembership(id) {
    return this.#model.find({ membershipCategoryRef: id }).populate('membershipCategoryRef').sort({ createdAt: -1 });;
  }

  async getAllMembershipWithPagination(payload) {
    try {
      const { memberId, phone } = payload;
      const memberships = await pagination(payload, async (limit, offset, sortOrder) => {

        const query = {};
        if (phone) {
          query.phone = { $regex: `.*${phone}.*`, $options: 'i' };
        }
        if (memberId) {
          query.referCode = memberId;
        }
        const memberships = await this.#model.find(query)
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
          .populate({
            path: 'userRef',
            select: '-password' // Exclude the 'password' field
          });
        // .populate('') 


        // Count total documents
        const totalMembership = await this.#model.countDocuments();

        return { doc: memberships, totalDoc: totalMembership };
      });

      return memberships;
    } catch (error) {
      console.error("Error getting memberships with pagination:", error);
      throw error;
    }
  }

  async deleteMembership(payload, session) {
    const { tran_id } = payload;


    // Convert `tran_id` to a Mongoose ObjectId
    const objectId = new mongoose.Types.ObjectId(tran_id);
    // findbyId this information ony find 


    // Use `findOneAndDelete` to find and delete the membership
    const membership = await this.#model.findOneAndDelete({ _id: objectId }, { session });


    return membership;
  }

  async deleteMembershipByUserId(userId, session) {
    const objectId = new mongoose.Types.ObjectId(userId);
    const membership = await this.#model.findOneAndDelete({ userRef: objectId }, { session });
    return membership;
  }



}

module.exports = new MembershipRepository(MemberShipSchema);
