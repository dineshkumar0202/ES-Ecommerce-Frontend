import User from '../../models/users/UserModel';
import Buyer from '../../models/users/BuyerModel';
import Seller from '../../models/users/SellerModel';

class UserService {
    async getUserProfile(userId: string) {
        return await User.findById(userId).select('-password') ||
            await Buyer.findById(userId).select('-password') ||
            await Seller.findById(userId).select('-password');
    }

    async registerFreelancer(userId: string, freelancerData: any) {
        // Find user in any collection
        let user: any = await User.findById(userId) || await Buyer.findById(userId) || await Seller.findById(userId);

        if (user) {
            // If they are currently a Buyer, we need to promote them to Seller collection or update role
            // In split model architecture, we might need to move them to the Seller collection
            if (user.role === 'Buyer') {
                const userData = user.toObject();
                // Remove from Buyer collection if exists
                if (user.constructor.modelName === 'Buyer') {
                    await Buyer.deleteOne({ _id: userId });
                }

                // Create in Seller collection
                const newSeller = new Seller({
                    ...userData,
                    role: 'Seller',
                    freelancer: {
                        ...freelancerData,
                        isRegistered: true,
                        status: 'Pending'
                    }
                });
                return await newSeller.save();
            } else {
                // Already a Seller or Admin (or in legacy User collection)
                user.freelancer = {
                    ...freelancerData,
                    isRegistered: true,
                    status: 'Pending'
                };
                if (user.role !== 'Admin') user.role = 'Seller';
                return await user.save();
            }
        }
        return null;
    }

    async updateUserProfile(userId: string, updateData: any) {
        let user: any = await User.findById(userId) || await Buyer.findById(userId) || await Seller.findById(userId);

        if (user) {
            user.username = updateData.username || user.username;
            user.email = updateData.email || user.email;
            if (updateData.password) {
                user.password = updateData.password;
            }

            if (updateData.profile) {
                user.profile = { ...user.profile, ...updateData.profile };
            }

            // Sync with Seller specific fields if they exist
            if (updateData.businessDetails) {
                user.businessDetails = { ...user.businessDetails, ...updateData.businessDetails };
            }
            if (updateData.bankDetails) {
                user.bankDetails = { ...user.bankDetails, ...updateData.bankDetails };
            }

            const updatedUser = await user.save();
            return {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                profile: updatedUser.profile,
                businessDetails: (updatedUser as any).businessDetails,
                bankDetails: (updatedUser as any).bankDetails,
                uniqueId: (updatedUser as any).uniqueId,
            };
        }
        return null;
    }

    async getAllUsers() {
        const users = await User.find({});
        const buyers = await Buyer.find({});
        const sellers = await Seller.find({});
        return [...users, ...buyers, ...sellers];
    }

    async getUserById(id: string) {
        return await User.findById(id).select("-password") ||
            await Buyer.findById(id).select("-password") ||
            await Seller.findById(id).select("-password");
    }

    async updateUser(id: string, updateData: any) {
        let user: any = await User.findById(id) || await Buyer.findById(id) || await Seller.findById(id);

        if (user) {
            user.username = updateData.username || user.username;
            user.email = updateData.email || user.email;
            user.role = updateData.role || user.role;

            const updatedUser = await user.save();
            return {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
            };
        }
        return null;
    }

    async deleteUser(id: string) {
        let user: any = await User.findById(id) || await Buyer.findById(id) || await Seller.findById(id);
        if (user) {
            if (user.constructor.modelName === 'User') await User.deleteOne({ _id: id });
            else if (user.constructor.modelName === 'Buyer') await Buyer.deleteOne({ _id: id });
            else if (user.constructor.modelName === 'Seller') await Seller.deleteOne({ _id: id });
            return true;
        }
        return false;
    }
}

export default new UserService();
