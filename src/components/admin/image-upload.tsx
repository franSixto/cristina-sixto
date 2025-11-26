'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X, Upload } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    } finally {
      setIsUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
        <div className="z-10 absolute top-2 right-2">
          <Button
            type="button"
            onClick={() => onChange('')}
            variant="destructive"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Image fill className="object-cover" alt="Image" src={value} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click para subir</span>
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onUpload}
          disabled={disabled || isUploading}
        />
      </label>
    </div>
  );
}
