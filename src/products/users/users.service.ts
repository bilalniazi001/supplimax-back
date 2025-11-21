import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    console.log('🔍 Searching user by email:', email);
    const user = await this.userModel.findOne({ email }).exec();
    console.log('📋 User found:', user ? user.email : 'None');
    return user;
  }

  async create(userData: any): Promise<UserDocument> {
    console.log('➕ Creating new user:', userData.email);
    const createdUser = new this.userModel(userData);
    return await createdUser.save();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  // ✅ Add method to create admin user
  async createAdminUser() {
    const adminData = {
      name: "Admin User",
      email: "admin@supplimax.com",
      password: "admin123", // Simple password
      role: "admin",
      age: 30,
      phone: "+923001234567",
      address: "123 Admin Street, Lahore",
      city: "Lahore",
      country: "Pakistan",
      postalCode: "54000",
      nationality: "Pakistani",
      cnic: "12345-6789012-3"
    };

    const existingAdmin = await this.findByEmail(adminData.email);
    if (!existingAdmin) {
      console.log('👑 Creating admin user...');
      return await this.create(adminData);
    }
    console.log('👑 Admin user already exists');
    return existingAdmin;
  }
}