import { Referral } from "../models/referralModel";

export const getAllReferrals = async (req, res) => {
    const referals = await Referral.find();
    try {
        res.status(200).json({
            status: 'success',
            results: referals.length,
            data: {
                referals
            }
          });
        } catch (err) {
          res.status(404).json({
            status: 'fail',
            message: err
          });
        }
}