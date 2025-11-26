'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

interface CreateProductData {
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  dimensions?: string;
  colors?: string;
  status: string;
}

export async function createProduct(data: CreateProductData) {
  try {
    await prisma.product.create({
      data: {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        image: data.image,
        gallery: data.gallery || [],
        dimensions: data.dimensions,
        colors: data.colors ? data.colors.split(',').map((c: string) => c.trim()) : [],
        status: data.status,
      },
    });
    revalidatePath('/catalogo');
    revalidatePath('/admin/products');
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/catalogo');
    revalidatePath('/admin/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
}
