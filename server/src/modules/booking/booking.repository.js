const mongoose = require("mongoose");
const { BookingSchema, MemberShipSchema, PaymentSchema, UserSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class BookingRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBooking(payload) {
    const newTransaction = await this.#model.create(payload);
    return newTransaction;
  }

  async updateBooking(id, payload) {
    const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
    return updatedTransaction;
  }
  async getCategoryWiseBooking(id) {
    return this.#model.find({ bookingCategoryRef: id }).populate('bookingCategoryRef').sort({ createdAt: -1 });;
  }

  // async getAllBookingWithPagination(payload) {
  //   try {
  //     const { packageRef, membershipRef } = payload
  //     console.log("packageRef, membershipRef", packageRef, membershipRef);
  //     const bookings = await pagination(payload, async (limit, offset, sortOrder) => {
  //       const query = {};
  //       if (packageRef && membershipRef) {

  //         query['packageRef.packageRef'] = packageRef;
  //           query.membershipRef = membershipRef; 
  //       }else if(membershipRef){
  //         query.membershipRef = membershipRef;
  //       }

  //       const bookings = await this.#model.find(query)
  //         .sort({ createdAt: sortOrder, })
  //         .skip(offset)
  //         .limit(limit)
  //         .populate('personRef')
  //         .populate('userRef')
  //         .populate('packageRef')
  //         .populate('membershipRef')


  //       // Count total documents
  //       const totalBooking = await this.#model.countDocuments();

  //       return { doc: bookings, totalDoc: totalBooking };
  //     });

  //     return bookings;
  //   } catch (error) {
  //     console.error("Error getting bookings with pagination:", error);
  //     throw error;
  //   }
  // }


  async getAllBookingWithPagination(payload) {
    try {
      const { packageRef, membershipRef } = payload;
      console.log("packageRef, membershipRef", packageRef, membershipRef);
  
      // Start building the aggregation pipeline
      const matchStage = {};
  
      // Add match conditions based on the provided payload
      if (membershipRef) {
        matchStage.membershipRef = new mongoose.Types.ObjectId(membershipRef); // Match the membershipRef
      }
  
      const aggregationPipeline = [
        {
          $match: matchStage // Initial match for membershipRef
        },
        {
          $lookup: {
            from: 'packages', 
            localField: 'packageRef',
            foreignField: '_id',
            as: 'packageRef'
          }
        },
        {
          $unwind: {
            path: '$packageRef', 
            preserveNullAndEmptyArrays: true 
          }
        },
        ...(packageRef ? [{
          $match: {
            'packageRef.packageRef': new mongoose.Types.ObjectId(packageRef) 
          }
        }] : []),
        {
          $lookup: {
            from: 'persons',
            localField: 'personRef',
            foreignField: '_id',
            as: 'personRef'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userRef',
            foreignField: '_id',
            as: 'userRef'
          }
        },
        {
          $lookup: {
            from: 'memberships',
            localField: 'membershipRef',
            foreignField: '_id',
            as: 'membershipRef'
          }
        },
        {
          $unwind: {
            path: '$membershipRef',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            'userRef.password': 0,  // Exclude 'password' from 'userRef'
            // Include other fields explicitly if needed or keep as is to include all
          }
        }
      ];
  
      // Execute the aggregation pipeline
      const bookings = await pagination(payload, async (limit, offset, sortOrder) => {
      const bookingsTotal = await this.#model.aggregate(aggregationPipeline);
  
      // Count total documents matching the initial match stage without pagination
      const totalBooking = await this.#model.countDocuments(matchStage);
  
      return { doc: bookingsTotal, totalDoc: totalBooking };
      })
      return bookings;
    } catch (error) {
      console.error("Error getting bookings with pagination:", error);
      throw error;
    }
  }
  
  
  
  
  async bookingPayment(id, amount, session) {
    console.log("id, amount", id, amount);
    amount = Number(amount)
    // Find the booking document using the session
    const booking = await this.#model.findById(id).session(session);
    console.log("booking", booking)
    if (!booking) {
      throw new Error('Booking not found');
    }

    const totalDue = booking.totalDue - amount;
    const totalPay = booking.totalPay + amount;

    // Check if total pay matches total price
    if (totalPay >= booking.totalPrice) {
      console.log("booking.membershipRefb", booking.membershipRef);

      const membershipResult = await MemberShipSchema.findById(booking.membershipRef).session(session);
      console.log(membershipResult);
      console.log(membershipResult?.agentType);

      let commissionPercent;
      if (membershipResult?.agentType === 'silver') {
        commissionPercent = 5;
      } else if (membershipResult?.agentType === 'gold') {
        commissionPercent = 6;
      } else if (membershipResult?.agentType === 'diamond') {
        commissionPercent = 7;
      } else {
        commissionPercent = 0;
      }

      const commissionAmount = (booking.totalPrice * commissionPercent) / 100;
      console.log('commissionAmount', commissionAmount);

      // Update booking with commission amount
      await BookingSchema.findByIdAndUpdate(id, { agentCommissions: commissionAmount }, { new: true, session });

      // Update user amount
      await UserSchema.findByIdAndUpdate(booking.userRef, { $inc: { amount: commissionAmount } }, { new: true, session });
      let agentType = 'silver';
      if (membershipResult?.referUsers > 99) {
        agentType = 'diamond';
      } else if (membershipResult?.referUsers > 49) {
        agentType = 'gold';
      }
      // Increment the referUsers count for membership
      await MemberShipSchema.findByIdAndUpdate(booking.membershipRef, { $inc: { referUsers: 1 }, agentType }, { new: true, session });
    }

    // Save payment details in PaymentSchema
   const bookingPayment = await PaymentSchema.create([{ userRef: booking.userRef, bookingRef: booking._id, amount, paymentMethod: "online" }], { session });
   const populatedPayment = await PaymentSchema.findById(bookingPayment[0]._id)
   .session(session) 
   .populate('userRef')
   .populate('bookingRef'); 

   
    console.log(totalDue, totalPay);

    await this.#model.findByIdAndUpdate(id, { totalDue, totalPay }, { new: true, session });
    return populatedPayment;
  }
  async bankPaymentBooking(bookingRef, amount,accountNumber, bankName, session) {
    console.log("id, amount", bookingRef, amount);
    amount = Number(amount)
    // Find the booking document using the session
    const booking = await this.#model.findById(bookingRef).session(session);
    console.log("booking", booking)
    if (!booking) {
      throw new Error('Booking not found');
    }

    const totalDue = booking.totalDue - amount;
    const totalPay = booking.totalPay + amount;

    // Check if total pay matches total price
    if (totalPay >= booking.totalPrice) {
      console.log("booking.membershipRefb", booking.membershipRef);

      const membershipResult = await MemberShipSchema.findById(booking.membershipRef).session(session);
      console.log(membershipResult);
      console.log(membershipResult?.agentType);

      let commissionPercent;
      if (membershipResult?.agentType === 'silver') {
        commissionPercent = 5;
      } else if (membershipResult?.agentType === 'gold') {
        commissionPercent = 6;
      } else if (membershipResult?.agentType === 'diamond') {
        commissionPercent = 7;
      } else {
        commissionPercent = 0;
      }

      const commissionAmount = (booking.totalPrice * commissionPercent) / 100;
      console.log('commissionAmount', commissionAmount);

      // Update booking with commission amount
      await BookingSchema.findByIdAndUpdate(bookingRef, { agentCommissions: commissionAmount }, { new: true, session });

      // Update user amount
      await UserSchema.findByIdAndUpdate(booking.userRef, { $inc: { amount: commissionAmount } }, { new: true, session });
      let agentType = 'silver';
      if (membershipResult?.referUsers > 100) {
        agentType = 'diamond';
      } else if (membershipResult?.referUsers > 50) {
        agentType = 'gold';
      }
      // Increment the referUsers count for membership
      const data = await MemberShipSchema.findByIdAndUpdate(booking.membershipRef, { $inc: { referUsers: 1 }, agentType }, { new: true, session });
    }

    // Save payment details in PaymentSchema
    const bookingPayment =  await PaymentSchema.create([{ userRef: booking.userRef, bookingRef: booking._id, amount, paymentMethod: "bank", accountNumber, bankName }], { session });
    const populatedPayment = await PaymentSchema.findById(bookingPayment[0]._id)
    .session(session) 
    .populate('userRef')
    .populate('bookingRef'); 

    console.log(totalDue, totalPay, populatedPayment);

    await this.#model.findByIdAndUpdate(bookingRef, { totalDue, totalPay }, { new: true, session });
    return  populatedPayment;
  }

}

module.exports = new BookingRepository(BookingSchema);
