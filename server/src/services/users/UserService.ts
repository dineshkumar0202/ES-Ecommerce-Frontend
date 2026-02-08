import User from '../../models/users/UserModel';

class UserService {
    async getUserProfile(userId: string) {
        return await User.findById(userId).select('-password');
    }

    async updateUserProfile(userId: string, updateData: any) {
        const user = await User.findById(userId);

        if (user) {
            user.username = updateData.username || user.username;
            user.email = updateData.email || user.email;
            if (updateData.password) {
                user.password = updateData.password;
            }

            if (updateData.profile) {
                user.profile = { ...user.profile, ...updateData.profile };
            }

            const updatedUser = await user.save();
            return {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                profile: updatedUser.profile,
            };
        }
        return null;
    }

    async getAllUsers() {
        return await User.find({});
    }

    async getUserById(id: string) {
        return await User.findById(id).select("-password");
    }

    async updateUser(id: string, updateData: any) {
        const user = await User.findById(id);

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
        const user = await User.findById(id);
        if (user) {
            await User.deleteOne({ _id: id });
            return true;
        }
        return false;
    }
}

export default new UserService();
