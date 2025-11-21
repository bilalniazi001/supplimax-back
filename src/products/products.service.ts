import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log('🔄 [BACKEND] Creating product with data:', createProductDto);
      
      // ✅ Unique ID generate karein
      const id = Math.random().toString(36).substr(2, 9); // Random ID
      const productData = {
        ...createProductDto,
        id: id, // ✅ Frontend compatible ID
        isInStock: createProductDto.quantityInStock > 0,
      };

      console.log('✅ [BACKEND] Product data with generated ID:', productData);
      
      const createdProduct = new this.productModel(productData);
      const savedProduct = await createdProduct.save();
      
      console.log('✅ [BACKEND] Product created successfully:', savedProduct.name);
      return savedProduct;
    } catch (error) {
      console.error('❌ [BACKEND] Error creating product:', error);
      throw new BadRequestException(`Failed to create product: ${error.message}`);
    }
  }

  async findAll(filters?: any): Promise<Product[]> {
    try {
      console.log('🔄 [BACKEND] Fetching all products with filters:', filters);
      
      let products;
      if (filters && Object.keys(filters).length > 0) {
        products = await this.productModel.find(filters).exec();
      } else {
        products = await this.productModel.find().exec();
      }
      
      console.log(`✅ [BACKEND] Found ${products.length} products`);
      
      // ✅ Debug: First product check
      if (products.length > 0) {
        console.log('🔍 [BACKEND] First product sample:', {
          id: products[0].id,
          name: products[0].name,
          _id: products[0]._id
        });
      }
      
      return products;
    } catch (error) {
      console.error('❌ [BACKEND] Error fetching all products:', error);
      throw new BadRequestException('Failed to fetch products');
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      console.log('🔍 [BACKEND] Finding product with ID:', id);
      console.log('🔍 [BACKEND] ID type:', typeof id);
      
      if (!id || id === 'undefined') {
        throw new BadRequestException('Product ID is required');
      }

      let product;
      
      // ✅ METHOD 1: Pehle custom ID field se dhoondein (frontend compatibility)
      console.log('🔍 [BACKEND] Searching by custom ID field:', id);
      product = await this.productModel.findOne({ id: id }).exec();
      
      // ✅ METHOD 2: Agar custom ID se nahi mila, toh MongoDB ObjectId search karein
      if (!product && isValidObjectId(id)) {
        console.log('🔍 [BACKEND] Searching by MongoDB ID:', id);
        product = await this.productModel.findById(id).exec();
      }
      
      // ✅ METHOD 3: Agar dono methods se nahi mila, toh error throw karein
      if (!product) {
        console.log('❌ [BACKEND] Product not found with ID:', id);
        
        // ✅ Additional debug: Check if any products exist
        const totalProducts = await this.productModel.countDocuments();
        console.log(`📊 [BACKEND] Total products in database: ${totalProducts}`);
        
        if (totalProducts > 0) {
          const sampleProducts = await this.productModel.find().limit(3);
          console.log('📊 [BACKEND] Sample products in database:', 
            sampleProducts.map(p => ({ id: p.id, name: p.name }))
          );
        }
        
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      
      console.log('✅ [BACKEND] Product found:', product.name);
      console.log('🔍 [BACKEND] Found product details:', {
        id: product.id,
        _id: product._id,
        name: product.name
      });
      
      return product;
    } catch (error) {
      console.error('❌ [BACKEND] Error finding product:', error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      console.log('🔄 [BACKEND] Updating product with ID:', id);
      console.log('📝 [BACKEND] Update data:', updateProductDto);
      
      if (!id || id === 'undefined') {
        throw new BadRequestException('Product ID is required');
      }

      let updatedProduct;
      
      // ✅ Pehle custom ID field se update karein
      if (!isValidObjectId(id)) {
        console.log('🔍 [BACKEND] Updating by custom ID field:', id);
        updatedProduct = await this.productModel
          .findOneAndUpdate({ id: id }, updateProductDto, { new: true })
          .exec();
      } else {
        // ✅ MongoDB ObjectId se update karein
        console.log('🔍 [BACKEND] Updating by MongoDB ID:', id);
        updatedProduct = await this.productModel
          .findByIdAndUpdate(id, updateProductDto, { new: true })
          .exec();
      }

      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      
      console.log('✅ [BACKEND] Product updated successfully:', updatedProduct.name);
      return updatedProduct;
    } catch (error) {
      console.error('❌ [BACKEND] Error updating product:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      console.log('🗑️ [BACKEND] Deleting product with ID:', id);
      
      if (!id || id === 'undefined') {
        throw new BadRequestException('Product ID is required');
      }

      let result;
      
      // ✅ Pehle custom ID field se delete karein
      if (!isValidObjectId(id)) {
        console.log('🔍 [BACKEND] Deleting by custom ID field:', id);
        result = await this.productModel.deleteOne({ id: id }).exec();
      } else {
        // ✅ MongoDB ObjectId se delete karein
        console.log('🔍 [BACKEND] Deleting by MongoDB ID:', id);
        result = await this.productModel.deleteOne({ _id: id }).exec();
      }

      if (result.deletedCount === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      
      console.log('✅ [BACKEND] Product deleted successfully');
    } catch (error) {
      console.error('❌ [BACKEND] Error deleting product:', error);
      throw error;
    }
  }

  async findFeatured(): Promise<Product[]> {
    try {
      console.log('🌟 [BACKEND] Fetching featured products from database...');
      const featuredProducts = await this.productModel.find({ isFeatured: true }).limit(8).exec();
      console.log(`✅ [BACKEND] Found ${featuredProducts.length} featured products`);
      return featuredProducts;
    } catch (error) {
      console.error('❌ [BACKEND] Error fetching featured products:', error);
      return [];
    }
  }

  async findExclusive(): Promise<Product[]> {
    try {
      console.log('🎯 [BACKEND] Fetching exclusive products from database...');
      const exclusiveProducts = await this.productModel.find({ isExclusive: true }).limit(3).exec();
      console.log(`✅ [BACKEND] Found ${exclusiveProducts.length} exclusive products`);
      return exclusiveProducts;
    } catch (error) {
      console.error('❌ [BACKEND] Error fetching exclusive products:', error);
      return [];
    }
  }

  async getCategoriesWithCount(): Promise<any[]> {
    try {
      console.log('📂 [BACKEND] Fetching categories from database...');
      const categories = await this.productModel.aggregate([
        {
          $group: {
            _id: "$category",
            productCount: { $sum: 1 },
            imageSrc: { $first: "$imageUrl" },
          }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$_id",
            productCount: 1,
            imageSrc: 1,
            href: { $concat: ["/shop/", "$_id"] }
          }
        }
      ]).exec();
      console.log(`✅ [BACKEND] Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      console.error('❌ [BACKEND] Error fetching categories:', error);
      return [];
    }
  }

  async findByCategory(category: string): Promise<Product[]> {
    try {
      console.log(`📂 [BACKEND] Fetching products for category: ${category}`);
      const products = await this.productModel.find({ 
        category: { $regex: new RegExp(category, 'i') } 
      }).exec();
      console.log(`✅ [BACKEND] Found ${products.length} products in category ${category}`);
      return products;
    } catch (error) {
      console.error('❌ [BACKEND] Error fetching category products:', error);
      return [];
    }
  }

  // ✅ ADDED: Database health check
  async getDatabaseStats(): Promise<any> {
    try {
      const totalProducts = await this.productModel.countDocuments();
      const featuredCount = await this.productModel.countDocuments({ isFeatured: true });
      const exclusiveCount = await this.productModel.countDocuments({ isExclusive: true });
      
      return {
        totalProducts,
        featuredCount,
        exclusiveCount,
        status: 'healthy'
      };
    } catch (error) {
      console.error('❌ [BACKEND] Error getting database stats:', error);
      return { status: 'error', error: error.message };
    }
  }
}